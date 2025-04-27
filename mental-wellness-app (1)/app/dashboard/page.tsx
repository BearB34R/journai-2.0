import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Brain, BookOpen, Compass } from "lucide-react"
import { WelcomeMessage } from "@/components/welcome-message"
import { MoodTracker } from "@/components/mood-tracker"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <WelcomeMessage />
        <MoodTracker />
      </div>

      <h2 className="text-2xl font-semibold text-teal-900 mt-8 mb-4">Quick Actions</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-teal-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-teal-600" />
              Chat with AI Companion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Talk about your day, get advice, or just have a friendly conversation.
            </p>
            <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50" asChild>
              <Link href="/dashboard/chat">
                Start chatting <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-teal-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-teal-600" />
              Write in Journal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Record your thoughts, feelings, and experiences in your private journal.
            </p>
            <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50" asChild>
              <Link href="/dashboard/journal">
                Open journal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-teal-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Compass className="h-5 w-5 text-teal-600" />
              Explore Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Discover guided meditations, breathing exercises, and mindfulness practices.
            </p>
            <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50" asChild>
              <Link href="/dashboard/activities">
                Browse activities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 bg-teal-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-teal-900 mb-2">Daily Wellness Tip</h2>
        <p className="text-teal-700">
          "Take a few minutes today to practice deep breathing. Inhale for 4 counts, hold for 4, and exhale for 6. This
          simple practice can help reduce stress and bring clarity to your mind."
        </p>
      </div>
    </div>
  )
}
