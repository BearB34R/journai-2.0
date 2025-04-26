import { getMoodEntries } from "../actions/mood"
import MoodForm from "./mood-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function MoodPage() {
  const { data: moodEntries } = await getMoodEntries()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Mood Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling?</CardTitle>
              <CardDescription>Track your mood on a scale of 1-10</CardDescription>
            </CardHeader>
            <CardContent>
              <MoodForm />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Mood History</CardTitle>
              <CardDescription>Your recent mood entries</CardDescription>
            </CardHeader>
            <CardContent>
              {moodEntries && moodEntries.length > 0 ? (
                <div className="space-y-4">
                  {moodEntries.map((entry) => (
                    <div key={entry.id} className="border-b pb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xl font-bold">{entry.mood_score}/10</p>
                          <p className="text-sm text-gray-500">{new Date(entry.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      {entry.notes && <p className="mt-2 text-gray-700">{entry.notes}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No mood entries yet. Start tracking your mood!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
