import dotenv from "dotenv";
import { writeFile } from "node:fs/promises";

dotenv.config({ path: ".env.local" });
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Add them to .env.local or your deployment environment.",
  );
}

await writeFile(
  "runtime-config.js",
  `window.__SUPABASE_CONFIG__ = ${JSON.stringify({ url, publishableKey })};\n`,
  "utf8",
);
