import { getJournalEntry } from "../../actions/journal"
import { notFound } from "next/navigation"
import JournalForm from "../journal-form"
import { getMoodEntries } from "../../actions/mood"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface JournalEntryPageProps {
  params: {
    id: string
  }
}

export default async function JournalEntryPage({ params }: JournalEntryPageProps) {
  const { data: entry, error } = await getJournalEntry(params.id)
  const { data: moodEntries } = await getMoodEntries()

  if (error || !entry) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Journal Entry</h1>

      <Card>
        <CardHeader>
          <CardTitle>Edit entry</CardTitle>
          <CardDescription>Update your thoughts and feelings</CardDescription>
        </CardHeader>
        <CardContent>
          <JournalForm
            moodEntries={moodEntries || []}
            initialData={{
              id: entry.id,
              title: entry.title,
              content: entry.content,
              mood_id: entry.mood_id,
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
