import { createClient } from "@supabase/supabase-js";

let client: any = null;

export function createBrowserClient() {
  if (client) return client;

  client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
      },
    }
  );

  return client;
}
