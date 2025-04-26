"use server"

import { createServerClient } from "@/lib/supabase/server"
import { getUserId, requireAuth } from "@/lib/supabase/auth"
import { revalidatePath } from "next/cache"

export async function createMoodEntry(formData: FormData) {
  const session = await requireAuth()
  const userId = session.user.id

  const moodScore = Number.parseInt(formData.get("moodScore") as string)
  const notes = formData.get("notes") as string

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("mood_entries")
    .insert({
      user_id: userId,
      mood_score: moodScore,
      notes: notes || null,
    })
    .select()
    .single()

  revalidatePath("/dashboard")

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getMoodEntries() {
  const userId = await getUserId()

  if (!userId) {
    return { data: null, error: "Not authenticated" }
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("mood_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function deleteMoodEntry(id: string) {
  await requireAuth()

  const supabase = createServerClient()

  const { error } = await supabase.from("mood_entries").delete().eq("id", id)

  revalidatePath("/dashboard")

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
