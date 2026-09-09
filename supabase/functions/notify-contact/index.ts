import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
  "Content-Type": "application/json"
};

const esc = (value: unknown) => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "POST required" }), { status: 405, headers: cors });

  const expected = Deno.env.get("WEBHOOK_SECRET");
  if (expected && req.headers.get("x-webhook-secret") !== expected) {
    return new Response(JSON.stringify({ error: "Unauthorized webhook" }), { status: 401, headers: cors });
  }

  try {
    const payload = await req.json();
    const record = payload?.record ?? payload?.new ?? payload;
    const name = esc(record?.name);
    const email = esc(record?.email);
    const subject = esc(record?.subject || "New portfolio inquiry");
    const message = esc(record?.message);
    const created = esc(record?.created_at || new Date().toISOString());

    const resendKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "ck797097224@gmail.com";
    const fromEmail = Deno.env.get("FROM_EMAIL") || "Portfolio <onboarding@resend.dev>";
    if (!resendKey) throw new Error("RESEND_API_KEY is not configured");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto">
        <h2>New portfolio message</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Received:</strong> ${created}</p>
        <hr>
        <p style="white-space:pre-wrap">${message}</p>
      </div>`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: fromEmail, to: [adminEmail], reply_to: [record?.email], subject: `Portfolio: ${record?.subject || "New inquiry"}`, html })
    });
    if (!r.ok) throw new Error(`Resend failed: ${await r.text()}`);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), { status: 500, headers: cors });
  }
});
