"use client"

import type React from "react"

import { useState } from "react"
import { createJournalEntry, updateJournalEntry } from "../actions/journal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MoodEntry {
  id: string
  created_at: string
  mood_score: number
  notes: string | null
}

interface JournalFormProps {
  moodEntries: MoodEntry[]
  initialData?: {
    id: string
    title: string
    content: string
    mood_id: string | null
  }
}

export default function JournalForm({ moodEntries, initialData }: JournalFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [moodId, setMoodId] = useState(initialData?.mood_id || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    if (!content.trim()) {
      setError("Content is required")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("moodId", moodId)

      if (initialData) {
        // Update existing entry
        const { error } = await updateJournalEntry(initialData.id, formData)

        if (error) {
          setError(error)
          return
        }
      } else {
        // Create new entry
        const { error } = await createJournalEntry(formData)

        if (error) {
          setError(error)
          return
        }
      }

      // Redirect to journal list
      router.push("/journal")
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
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your entry a title"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={10}
          required
        />
      </div>

      {moodEntries.length > 0 && (
        <div className="space-y-2">
          <label htmlFor="mood" className="block text-sm font-medium">
            Link to a mood entry (optional)
          </label>
          <Select value={moodId} onValueChange={setMoodId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a mood entry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {moodEntries.map((mood) => (
                <SelectItem key={mood.id} value={mood.id}>
                  {new Date(mood.created_at).toLocaleDateString()} - {mood.mood_score}/10
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.push("/journal")}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update Entry" : "Save Entry"}
        </Button>
      </div>
    </form>
  )
}
