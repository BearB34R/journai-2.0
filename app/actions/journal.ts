"use server"

import { createServerClient } from "@/lib/supabase/server"
import { getUserId, requireAuth } from "@/lib/supabase/auth"
import { revalidatePath } from "next/cache"

export async function createJournalEntry(formData: FormData) {
  const session = await requireAuth()
  const userId = session.user.id

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const moodId = (formData.get("moodId") as string) || null

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("journal_entries")
    .insert({
      user_id: userId,
      title,
      content,
      mood_id: moodId || null,
    })
    .select()
    .single()

  revalidatePath("/journal")

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getJournalEntries() {
  const userId = await getUserId()

  if (!userId) {
    return { data: null, error: "Not authenticated" }
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("journal_entries")
    .select(`
      *,
      mood_entries (*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getJournalEntry(id: string) {
  const userId = await getUserId()

  if (!userId) {
    return { data: null, error: "Not authenticated" }
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("journal_entries")
    .select(`
      *,
      mood_entries (*)
    `)
    .eq("id", id)
    .eq("user_id", userId)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function updateJournalEntry(id: string, formData: FormData) {
  await requireAuth()

  const title = formData.get("title") as string
  const content = formData.get("content") as string

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("journal_entries")
    .update({
      title,
      content,
    })
    .eq("id", id)
    .select()
    .single()

  revalidatePath("/journal")
  revalidatePath(`/journal/${id}`)

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function deleteJournalEntry(id: string) {
  await requireAuth()

  const supabase = createServerClient()

  const { error } = await supabase.from("journal_entries").delete().eq("id", id)

  revalidatePath("/journal")

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
