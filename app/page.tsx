import { getSession } from "@/lib/supabase/auth";

export default async function HomePage() {
  // Public home page content
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Mental Wellness</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your journey to better mental health starts here.
      </p>
      {/* Add more public content or links as desired */}
    </main>
  );
}
