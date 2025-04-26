import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Play, Bookmark } from "lucide-react"
import Link from "next/link"

const activities = [
  {
    id: "1",
    title: "Mindful Breathing",
    description: "A simple breathing exercise to help you relax and focus on the present moment.",
    duration: "5 min",
    category: "breathing",
    level: "beginner",
  },
  {
    id: "2",
    title: "Body Scan Meditation",
    description: "A guided meditation to help you become aware of sensations throughout your body.",
    duration: "10 min",
    category: "meditation",
    level: "beginner",
  },
  {
    id: "3",
    title: "Loving-Kindness Meditation",
    description: "Develop feelings of goodwill, kindness and warmth towards others.",
    duration: "15 min",
    category: "meditation",
    level: "intermediate",
  },
  {
    id: "4",
    title: "Progressive Muscle Relaxation",
    description: "Tense and relax different muscle groups to reduce physical tension.",
    duration: "8 min",
    category: "relaxation",
    level: "beginner",
  },
  {
    id: "5",
    title: "Mindful Walking",
    description: "Practice mindfulness while walking to reduce stress and increase awareness.",
    duration: "10 min",
    category: "mindfulness",
    level: "beginner",
  },
  {
    id: "6",
    title: "Deep Breathing for Anxiety",
    description: "A breathing technique specifically designed to help reduce anxiety.",
    duration: "5 min",
    category: "breathing",
    level: "beginner",
  },
]

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold text-teal-900 mb-6">Guided Activities</h1>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="meditation">Meditation</TabsTrigger>
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </TabsContent>

        <TabsContent value="meditation" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities
            .filter((activity) => activity.category === "meditation")
            .map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
        </TabsContent>

        <TabsContent value="breathing" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities
            .filter((activity) => activity.category === "breathing")
            .map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
        </TabsContent>

        <TabsContent value="relaxation" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities
            .filter((activity) => activity.category === "relaxation")
            .map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
        </TabsContent>

        <TabsContent value="mindfulness" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities
            .filter((activity) => activity.category === "mindfulness")
            .map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ActivityCard({ activity }: { activity: (typeof activities)[0] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-teal-50 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{activity.title}</CardTitle>
          <Badge variant="outline" className="bg-white">
            {activity.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-600 mb-4">{activity.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{activity.duration}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm">
          <Bookmark className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button className="bg-teal-600 hover:bg-teal-700" size="sm" asChild>
          <Link href={`/dashboard/activities/${activity.id}`}>
            <Play className="h-4 w-4 mr-2" />
            Start
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
