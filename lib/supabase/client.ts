import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createBrowserClient() {
  if (client) return client

  client = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: true,
    },
  })

  return client
}
