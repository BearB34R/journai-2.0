import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function createServerClient() {
  // Create a server client that doesn't use cookies
  // This will work in both App Router and Pages Router
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// For App Router only - use this in app/ directory components
export async function createServerClientWithCookies() {
  // Dynamic import to avoid the error in Pages Router
  const { cookies } = await import("next/headers");
  const cookieStore = cookies();

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
