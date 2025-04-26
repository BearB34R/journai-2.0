import { getMoodEntries } from "../actions/mood"
import { getJournalEntries } from "../actions/journal"
import { getUserProfile } from "../actions/profile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, BookOpen, Activity } from "lucide-react"

export default async function DashboardPage() {
  const { data: moodEntries } = await getMoodEntries()
  const { data: journalEntries } = await getJournalEntries()
  const { data: userProfile } = await getUserProfile()

  const latestMood = moodEntries && moodEntries.length > 0 ? moodEntries[0] : null
  const recentJournals = journalEntries ? journalEntries.slice(0, 3) : []

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome{userProfile?.full_name ? `, ${userProfile.full_name}` : ""}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mood Tracker Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Mood Tracker
            </CardTitle>
            <CardDescription>Track how you're feeling today</CardDescription>
          </CardHeader>
          <CardContent>
            {latestMood ? (
              <div>
                <p className="text-2xl font-bold">{latestMood.mood_score}/10</p>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(latestMood.created_at).toLocaleDateString()}
                </p>
                {latestMood.notes && <p className="mt-2 text-gray-700">{latestMood.notes}</p>}
              </div>
            ) : (
              <p>No mood entries yet</p>
            )}
            <div className="mt-4">
              <Link href="/mood">
                <Button>Track Mood</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Journal Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Journal
            </CardTitle>
            <CardDescription>Express your thoughts and feelings</CardDescription>
          </CardHeader>
          <CardContent>
            {recentJournals.length > 0 ? (
              <div className="space-y-2">
                {recentJournals.map((entry) => (
                  <div key={entry.id} className="border-b pb-2">
                    <Link href={`/journal/${entry.id}`} className="font-medium hover:underline">
                      {entry.title}
                    </Link>
                    <p className="text-sm text-gray-500">{new Date(entry.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No journal entries yet</p>
            )}
            <div className="mt-4">
              <Link href="/journal">
                <Button>View Journal</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Activities Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Wellness Activities
            </CardTitle>
            <CardDescription>Discover activities to improve your wellbeing</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Explore mindfulness exercises, physical activities, and more.</p>
            <div className="mt-4">
              <Link href="/activities">
                <Button>Explore Activities</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
