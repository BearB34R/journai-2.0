import { createBrowserClient } from "./client";
import { createServerClient } from "./server";
import { redirect } from "next/navigation";

export async function signUp(email: string, password: string, name?: string) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  return { data, error };
}

export async function signIn(email: string, password: string) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOut() {
  const supabase = createBrowserClient();
  await supabase.auth.signOut();
}

export async function getSession() {
  try {
    // Try to use the App Router version with cookies
    const { createServerClientWithCookies } = await import("./server");
    const supabase = await createServerClientWithCookies();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    // Fallback to the version without cookies
    const supabase = createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  }
}

export async function getUserId() {
  const session = await getSession();
  return session?.user.id;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return session;
}
