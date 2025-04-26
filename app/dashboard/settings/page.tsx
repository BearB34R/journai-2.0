import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bell, Sun, Globe, Shield, LogOut } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-teal-900 mb-6">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-teal-600" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-reminder" className="font-medium">
                  Daily Reminders
                </Label>
                <p className="text-sm text-muted-foreground">Receive a daily reminder to check in</p>
              </div>
              <Switch id="daily-reminder" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="activity-suggestions" className="font-medium">
                  Activity Suggestions
                </Label>
                <p className="text-sm text-muted-foreground">Get suggestions for new activities to try</p>
              </div>
              <Switch id="activity-suggestions" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Receive updates and summaries via email</p>
              </div>
              <Switch id="email-notifications" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-teal-600" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize how the app looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <Switch id="dark-mode" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reduce-motion" className="font-medium">
                  Reduce Motion
                </Label>
                <p className="text-sm text-muted-foreground">Minimize animations throughout the app</p>
              </div>
              <Switch id="reduce-motion" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-teal-600" />
              <CardTitle>Privacy & Security</CardTitle>
            </div>
            <CardDescription>Manage your data and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-collection" className="font-medium">
                  Data Collection
                </Label>
                <p className="text-sm text-muted-foreground">Allow anonymous usage data to improve the app</p>
              </div>
              <Switch id="data-collection" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor" className="font-medium">
                  Two-Factor Authentication
                </Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline" size="sm">
                Set Up
              </Button>
            </div>
            <Separator />
            <div>
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Log Out of All Devices
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-teal-600" />
              <CardTitle>Language & Region</CardTitle>
            </div>
            <CardDescription>Set your preferred language and regional settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Language settings will be available in a future update.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <p className="text-sm text-muted-foreground">
            Serene v1.0.0 •{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Terms of Service
            </a>{" "}
            •{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
