"use client"

import type React from "react"

import { useState } from "react"
import { createMoodEntry } from "../actions/mood"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function MoodForm() {
  const [moodScore, setMoodScore] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (moodScore === null) {
      setError("Please select a mood score")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("moodScore", moodScore.toString())
      formData.append("notes", notes)

      const { error } = await createMoodEntry(formData)

      if (error) {
        setError(error)
        return
      }

      // Reset form
      setMoodScore(null)
      setNotes("")

      // Refresh the page to show the new entry
      router.refresh()
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Rate your mood (1-10)</label>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => setMoodScore(score)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                moodScore === score ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {score}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-2">
          Notes (optional)
        </label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How are you feeling today? What's on your mind?"
          rows={4}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading || moodScore === null}>
        {loading ? "Saving..." : "Save Mood"}
      </Button>
    </form>
  )
}
