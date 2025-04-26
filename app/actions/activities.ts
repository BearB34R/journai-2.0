"use server"

import { createServerClient } from "@/lib/supabase/server"
import { getUserId, requireAuth } from "@/lib/supabase/auth"
import { revalidatePath } from "next/cache"

export async function getWellnessActivities() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("wellness_activities").select("*").order("name")

  if (error) {
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function completeActivity(formData: FormData) {
  const session = await requireAuth()
  const userId = session.user.id

  const activityId = formData.get("activityId") as string
  const notes = formData.get("notes") as string

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("user_activities")
    .insert({
      user_id: userId,
      activity_id: activityId,
      completed_at: new Date().toISOString(),
      notes: notes || null,
    })
    .select()
    .single()

  revalidatePath("/activities")

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getUserActivities() {
  const userId = await getUserId()

  if (!userId) {
    return { data: null, error: "Not authenticated" }
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("user_activities")
    .select(`
      *,
      wellness_activities (*)
    `)
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })

  if (error) {
    return { data: null, error: error.message }
  }

  return { data, error: null }
}
