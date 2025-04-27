import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Brain, Heart, Leaf, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-semibold text-teal-800">Serene</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-teal-900 mb-6">Your Personal Mental Wellness Companion</h1>
          <p className="text-lg text-teal-700 mb-8">
            Nurture your mind, track your moods, and find peace with guided activities designed to improve your mental
            wellbeing.
          </p>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
            <Link href="/auth/signup">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="border-teal-100 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4 bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-800">AI Companion</h3>
              <p className="text-teal-600">
                Chat with a supportive AI companion designed to help you reflect and process your thoughts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4 bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-800">Guided Activities</h3>
              <p className="text-teal-600">
                Access a library of meditation, breathing exercises, and mindfulness activities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4 bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-800">Private Journaling</h3>
              <p className="text-teal-600">
                Keep a digital journal to track your moods, thoughts, and progress over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="container mx-auto py-8 border-t border-teal-100 text-center text-teal-500 text-sm">
        <p>Serene is a supportive tool and not a replacement for professional medical advice or therapy.</p>
      </footer>
    </div>
  )
}
