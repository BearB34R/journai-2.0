"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SmilePlus, Smile, Meh, Frown, FrownIcon as FrownPlus } from "lucide-react"

type Mood = "great" | "good" | "okay" | "bad" | "terrible" | null

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const moods = [
    { value: "great", icon: SmilePlus, label: "Great", color: "text-green-500" },
    { value: "good", icon: Smile, label: "Good", color: "text-teal-500" },
    { value: "okay", icon: Meh, label: "Okay", color: "text-blue-500" },
    { value: "bad", icon: Frown, label: "Bad", color: "text-orange-500" },
    { value: "terrible", icon: FrownPlus, label: "Terrible", color: "text-red-500" },
  ]

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
  }

  const handleSubmit = () => {
    if (selectedMood) {
      // In a real app, this would save the mood to a database
      setIsSubmitted(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setSelectedMood(null)
      }, 3000)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-4">
            <p className="text-teal-600 mb-2">Thanks for sharing your mood!</p>
            <p className="text-sm text-gray-500">Your response has been recorded.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-6">
              {moods.map((mood) => (
                <Button
                  key={mood.value}
                  variant="ghost"
                  className={`flex flex-col items-center p-2 ${selectedMood === mood.value ? "bg-teal-50" : ""}`}
                  onClick={() => handleMoodSelect(mood.value as Mood)}
                >
                  <mood.icon className={`h-8 w-8 mb-1 ${mood.color}`} />
                  <span className="text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700" disabled={!selectedMood} onClick={handleSubmit}>
              Save Mood
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
