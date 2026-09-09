import dotenv from "dotenv";
import { copyFile, mkdir, writeFile } from "node:fs/promises";

dotenv.config({ path: ".env.local" });
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Add them to .env.local or your deployment environment.",
  );
}

const config = `window.__SUPABASE_CONFIG__ = ${JSON.stringify({ url, publishableKey })};\n`;
await writeFile("runtime-config.js", config, "utf8");
await mkdir("public", { recursive: true });
await writeFile("public/runtime-config.js", config, "utf8");
await mkdir("public/js", { recursive: true });
await copyFile("js/supabase.js", "public/js/supabase.js");
await copyFile("js/app.js", "public/js/app.js");
