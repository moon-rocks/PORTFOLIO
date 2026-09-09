/* Supabase browser configuration loaded from the ignored build-time runtime config. */
(() => {
  const runtimeConfig = window.__SUPABASE_CONFIG__ || {};
  const SUPABASE_URL = runtimeConfig.url || "";
  const SUPABASE_ANON_KEY = runtimeConfig.publishableKey || "";
  const sdk = window.supabase;

  let client = null;
  try {
    if (sdk && typeof sdk.createClient === "function") {
      client = sdk.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: window.localStorage,
        },
      });
    }
  } catch (error) {
    console.error("Supabase initialization failed:", error);
  }

  // Export only through window to avoid global var/const redeclaration conflicts.
  window.supabaseClient = client;
  window.supabase = client;
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
  window.isConfigured = () =>
    !!client &&
    typeof client.from === "function" &&
    !!SUPABASE_URL &&
    !!SUPABASE_ANON_KEY;
})();
