"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  SmilePlus,
  Smile,
  Meh,
  Frown,
  FrownIcon as FrownPlus,
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

type Mood = "great" | "good" | "okay" | "bad" | "terrible" | null;

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const router = useRouter();

  const moods = [
    {
      value: "great",
      icon: SmilePlus,
      label: "Great",
      color: "text-green-500",
    },
    { value: "good", icon: Smile, label: "Good", color: "text-teal-500" },
    { value: "okay", icon: Meh, label: "Okay", color: "text-blue-500" },
    { value: "bad", icon: Frown, label: "Bad", color: "text-orange-500" },
    {
      value: "terrible",
      icon: FrownPlus,
      label: "Terrible",
      color: "text-red-500",
    },
  ];

  useEffect(() => {
    const checkMoodToday = async () => {
      const supabase = createBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const { data: moodsToday } = await supabase
          .from("mood_entries")
          .select("id")
          .eq("user_id", user.id)
          .gte("created_at", startOfDay.toISOString())
          .lte("created_at", endOfDay.toISOString());
        setHasSubmittedToday(!!(moodsToday && moodsToday.length > 0));
      }
    };
    checkMoodToday();
  }, []);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async () => {
    if (selectedMood && !hasSubmittedToday) {
      const supabase = createBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("mood_entries").insert({
          user_id: user.id,
          mood: selectedMood,
          created_at: new Date().toISOString(),
        });
        setHasSubmittedToday(true);
      }
      setIsSubmitted(true);

      // Redirect to chat after a short delay
      setTimeout(() => {
        router.push(`/dashboard/chat?mood=${selectedMood}`);
      }, 1500); // 1.5 seconds to show the thank you message

      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedMood(null);
      }, 3000);
    }
  };

  if (hasSubmittedToday) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-teal-600 mb-2">
              You've already submitted your mood for today.
            </p>
            <p className="text-sm text-gray-500">
              Come back tomorrow to track your mood again!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-4">
            <p className="text-teal-600 mb-2">Thanks for sharing your mood!</p>
            <p className="text-sm text-gray-500">
              Your response has been recorded.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-6">
              {moods.map((mood) => (
                <Button
                  key={mood.value}
                  variant="ghost"
                  className={`flex flex-col items-center p-3 h-full min-h-[5rem] min-w-[4.5rem] ${
                    selectedMood === mood.value ? "bg-teal-50" : ""
                  }`}
                  onClick={() => handleMoodSelect(mood.value as Mood)}
                >
                  <mood.icon className={`h-8 w-8 mb-1 ${mood.color}`} />
                  <span className="text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={!selectedMood}
              onClick={handleSubmit}
            >
              Save Mood
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
