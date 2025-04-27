"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { signUp } from "@/lib/supabase/auth";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const { data, error } = await signUp(email, password, name);
    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else if (!data.session) {
      setConfirmationSent(true);
    } else {
      router.push("/dashboard");
    }
  };

  if (confirmationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Confirm your email
              </CardTitle>
              <CardDescription className="text-center">
                We've sent a confirmation link to{" "}
                <span className="font-semibold">{email}</span>.<br />
                Please check your inbox and follow the link to activate your
                account.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-semibold text-teal-800">Serene</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Start your wellness journey today
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-teal-600 hover:text-teal-800"
                  >
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-teal-600 hover:text-teal-800"
                  >
                    privacy policy
                  </Link>
                </label>
              </div>
              {error && (
                <div className="text-red-500 text-center text-sm">{error}</div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-teal-600 hover:text-teal-800 font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
