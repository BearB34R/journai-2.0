import { getJournalEntries } from "../actions/journal"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Edit, Plus } from "lucide-react"

export default async function JournalPage() {
  const { data: journalEntries } = await getJournalEntries()

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Journal</h1>
        <Link href="/journal/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </div>

      {journalEntries && journalEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journalEntries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>{entry.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {new Date(entry.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{entry.content}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/journal/${entry.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    View Entry
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="mb-4">You haven't created any journal entries yet.</p>
            <Link href="/journal/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Entry
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
