import { getMoodEntries } from "../../actions/mood"
import JournalForm from "../journal-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function NewJournalPage() {
  const { data: moodEntries } = await getMoodEntries()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">New Journal Entry</h1>

      <Card>
        <CardHeader>
          <CardTitle>Write a new entry</CardTitle>
          <CardDescription>Express your thoughts and feelings</CardDescription>
        </CardHeader>
        <CardContent>
          <JournalForm moodEntries={moodEntries || []} />
        </CardContent>
      </Card>
    </div>
  )
}
