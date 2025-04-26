"use server"

import { createServerClient } from "@/lib/supabase/server"
import { getUserId, requireAuth } from "@/lib/supabase/auth"
import { revalidatePath } from "next/cache"

export async function getUserProfile() {
  const userId = await getUserId()

  if (!userId) {
    return { data: null, error: "Not authenticated" }
  }

  const supabase = createServerClient()

  // First check if profile exists
  const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    return { data: null, error: error.message }
  }

  // If no profile exists, create one
  if (!data) {
    const { data: newProfile, error: createError } = await supabase
      .from("user_profiles")
      .insert({
        user_id: userId,
      })
      .select()
      .single()

    if (createError) {
      return { data: null, error: createError.message }
    }

    return { data: newProfile, error: null }
  }

  return { data, error: null }
}

export async function updateUserProfile(formData: FormData) {
  const session = await requireAuth()
  const userId = session.user.id

  const fullName = formData.get("fullName") as string
  const goalsString = formData.get("wellnessGoals") as string
  const wellnessGoals = goalsString ? goalsString.split(",").map((goal) => goal.trim()) : []

  const supabase = createServerClient()

  // First check if profile exists
  const { data: existingProfile } = await supabase.from("user_profiles").select("id").eq("user_id", userId).single()

  if (existingProfile) {
    // Update existing profile
    const { data, error } = await supabase
      .from("user_profiles")
      .update({
        full_name: fullName,
        wellness_goals: wellnessGoals,
      })
      .eq("user_id", userId)
      .select()
      .single()

    revalidatePath("/profile")

    if (error) {
      return { error: error.message }
    }

    return { data }
  } else {
    // Create new profile
    const { data, error } = await supabase
      .from("user_profiles")
      .insert({
        user_id: userId,
        full_name: fullName,
        wellness_goals: wellnessGoals,
      })
      .select()
      .single()

    revalidatePath("/profile")

    if (error) {
      return { error: error.message }
    }

    return { data }
  }
}
