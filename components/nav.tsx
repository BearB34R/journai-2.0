"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "@/lib/supabase/auth"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Calendar, Activity, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth/signin")
    router.refresh()
  }

  // Skip rendering on auth pages
  if (pathname?.startsWith("/auth/")) {
    return null
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/journal", label: "Journal", icon: BookOpen },
    { href: "/mood", label: "Mood Tracker", icon: Calendar },
    { href: "/activities", label: "Activities", icon: Activity },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-primary">
              Mental Wellness
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div>
            <Button variant="ghost" onClick={handleSignOut} className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t fixed bottom-0 left-0 right-0 bg-white">
        <div className="grid grid-cols-5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 ${isActive ? "text-primary" : "text-gray-600"}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
