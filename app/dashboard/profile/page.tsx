import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Calendar, Edit } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-teal-900 mb-6">Your Profile</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="text-2xl bg-teal-100 text-teal-800">JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mb-1">John Doe</h2>
            <p className="text-gray-500 mb-4">john@example.com</p>
            <Button variant="outline" className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="stats">Stats & Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                          <User className="h-4 w-4" />
                        </span>
                        <Input id="fullName" defaultValue="John Doe" className="rounded-l-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                          <Mail className="h-4 w-4" />
                        </span>
                        <Input id="email" type="email" defaultValue="john@example.com" className="rounded-l-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <Input id="dob" type="date" defaultValue="1990-01-01" className="rounded-l-none" />
                      </div>
                    </div>
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    Customize your experience with Serene by adjusting your preferences.
                  </p>
                  <div className="space-y-4">
                    {/* Placeholder for preferences UI */}
                    <p className="text-sm text-muted-foreground">
                      Preference settings will be available in a future update.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">Track your wellness journey and see how far you've come.</p>
                  <div className="space-y-4">
                    {/* Placeholder for stats UI */}
                    <p className="text-sm text-muted-foreground">
                      Detailed statistics will be available as you use the app more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
