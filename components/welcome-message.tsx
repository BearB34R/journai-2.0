"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"

export function WelcomeMessage() {
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let newGreeting = ""

      if (hour < 12) {
        newGreeting = "Good morning"
      } else if (hour < 18) {
        newGreeting = "Good afternoon"
      } else {
        newGreeting = "Good evening"
      }

      setGreeting(newGreeting)
    }

    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
      setCurrentTime(now.toLocaleDateString("en-US", options))
    }

    updateGreeting()
    updateTime()

    const interval = setInterval(() => {
      updateGreeting()
      updateTime()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gradient-to-br from-teal-500 to-teal-700 text-white border-none">
      <CardContent className="pt-6">
        <h1 className="text-3xl font-bold mb-2">{greeting}, John</h1>
        <p className="text-teal-100">{currentTime}</p>
        <p className="mt-4 text-teal-50">How are you feeling today? Remember to take a moment for yourself.</p>
      </CardContent>
    </Card>
  )
}
