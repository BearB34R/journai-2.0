"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ActivitiesPage() {
  const [statements, setStatements] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [shouldGenerate, setShouldGenerate] = useState(false);

  useEffect(() => {
    if (!shouldGenerate) return;
    const fetchAndSummarize = async () => {
      setLoading(true);
      setError(null);
      setStatements([]);
      try {
        const supabase = createBrowserClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setError("You must be logged in to see your AI outtake.");
          setLoading(false);
          return;
        }
        const { data: entries, error: fetchError } = await supabase
          .from("journal_entries")
          .select("content, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);
        if (fetchError) {
          setError(fetchError.message);
          setLoading(false);
          return;
        }
        if (!entries || entries.length === 0) {
          setError(
            "No recent journal entries found. Write some to get your AI outtake!"
          );
          setLoading(false);
          return;
        }
        const combined = entries
          .map(
            (e: any, i: number) => `Entry ${entries.length - i}: ${e.content}`
          )
          .join("\n\n");
        const prompt =
          `Here are my last 5 journal entries. For each entry, give me a short, sweet, and positive statement (1-2 sentences) that highlights something good, hopeful, or encouraging about what I wrote. Respond as a JSON array of 5 strings, one for each entry.` +
          "\n\n" +
          combined;
        const res = await fetch("/api/ai-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          // Try to extract a valid JSON array from the AI response
          let arr: string[] = [];
          try {
            // Try to find the first valid JSON array in the response
            const match = data.aiMessage.match(/\[[\s\S]*?\]/);
            if (match) {
              arr = JSON.parse(match[0]);
            } else {
              arr = JSON.parse(data.aiMessage);
            }
          } catch {
            // fallback: try to split numbered list
            arr = data.aiMessage
              .split(/\n|\r/)
              .map((line: string) => line.replace(/^\d+\.|^- /, "").trim())
              .filter(
                (line: string) =>
                  line.length > 0 &&
                  line !== "[" &&
                  line !== "]" &&
                  line !== "```json" &&
                  line !== "```"
              );
          }
          // Filter out empty or whitespace-only statements and limit to 5
          arr = arr.filter((s) => s && s.trim().length > 0).slice(0, 5);
          setStatements(arr);
          setFlippedCards(new Array(arr.length).fill(false));
        }
      } catch (err: any) {
        setError("Something went wrong. Please try again later.");
      }
      setLoading(false);
    };
    fetchAndSummarize();
  }, [shouldGenerate]);

  const handleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleRetry = () => window.location.reload();

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold text-teal-900 mb-6">
        AI Wellness Cards
      </h1>
      {!shouldGenerate ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-4"
            onClick={() => setShouldGenerate(true)}
          >
            Generate Cards
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin h-8 w-8 text-teal-600" />
              <span className="text-gray-500">
                Analyzing your journal entries...
              </span>
            </div>
          ) : error ? (
            <Card className="max-w-lg w-full">
              <CardContent className="text-center py-8">
                <p className="text-red-500 mb-2">{error}</p>
                <Button onClick={handleRetry} className="mt-2">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : statements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {statements.map((statement, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer perspective"
                  onClick={() => handleFlip(idx)}
                >
                  <div
                    className={`relative aspect-[2.5/3.5] transition-transform duration-500 transform-style-3d ${
                      flippedCards[idx] ? "rotate-y-180" : ""
                    }`}
                  >
                    <div className="absolute w-full h-full backface-hidden">
                      <Card className="w-full h-full bg-teal-600 hover:shadow-xl">
                        <CardContent className="flex items-center justify-center h-full text-white text-xl">
                          Click to reveal
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                      <Card className="w-full h-full">
                        <CardContent className="prose-2xl text-gray-800 p-6 flex items-center justify-center h-full text-center text-3xl font-medium leading-snug">
                          {statement}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
