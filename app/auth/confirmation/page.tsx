import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent you a confirmation link to complete your registration
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            Please check your email inbox and click on the confirmation link to activate your account.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/signin">
            <Button variant="outline">Return to sign in</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
