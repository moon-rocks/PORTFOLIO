/* Supabase browser configuration. Public anon/publishable keys are safe to expose in a browser when RLS is correctly configured. */
(() => {
  const SUPABASE_URL = "https://msrzuwobdyljltrfqmyh.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_BEn7p_a_xDybamBL6-gPmw_pQ6ULVsP";
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
  window.isConfigured = () => !!client && typeof client.from === "function";
})();
