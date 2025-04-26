"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Plus, Save, Calendar } from "lucide-react"

type JournalEntry = {
  id: string
  title: string
  content: string
  date: Date
}

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState("write")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "First day of meditation",
      content:
        "Today I tried meditation for the first time. It was challenging to quiet my mind, but I managed to focus on my breath for a few minutes. I'm looking forward to building this habit.",
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
    },
    {
      id: "2",
      title: "Reflecting on progress",
      content:
        "I've been using the app for a week now, and I'm starting to notice small changes in how I respond to stress. Taking a moment to breathe before reacting has been helpful.",
      date: new Date(Date.now() - 86400000), // 1 day ago
    },
  ])
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveEntry = () => {
    if (!title.trim() || !content.trim()) return

    setIsSaving(true)

    // Simulate saving to database
    setTimeout(() => {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date(),
      }

      setEntries([newEntry, ...entries])
      setTitle("")
      setContent("")
      setActiveTab("entries")
      setIsSaving(false)
    }, 1000)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-teal-900 flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Journal
        </h1>
        <Button onClick={() => setActiveTab("write")} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="entries">Past Entries</TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <Card>
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your entry a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your thoughts here..."
                  className="min-h-[200px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSaveEntry}
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={!title.trim() || !content.trim() || isSaving}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Entry
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries">
          {entries.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500 mb-4">No journal entries yet</p>
                <Button onClick={() => setActiveTab("write")} className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardHeader className="bg-teal-50 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="whitespace-pre-line">{entry.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
