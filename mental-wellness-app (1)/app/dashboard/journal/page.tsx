"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus, Save, Calendar, Trash2 } from "lucide-react";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  date: Date;
};

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState("write");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const fetchEntries = async () => {
    setError(null);
    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: dbEntries, error: fetchError } = await supabase
        .from("journal_entries")
        .select("id, title, content, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (fetchError) setError(fetchError.message);
      if (dbEntries) {
        setEntries(
          dbEntries.map((entry: any) => ({
            id: entry.id,
            title: entry.title,
            content: entry.content,
            date: new Date(entry.created_at),
          }))
        );
      }
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Prefill from exported chat if present
  useEffect(() => {
    const exportedChat = searchParams.get("exportedChat");
    if (exportedChat) {
      setContent(exportedChat);
      setActiveTab("write");
    }
  }, [searchParams]);

  const handleSaveEntry = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsSaving(true);
    setError(null);
    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error: insertError } = await supabase
        .from("journal_entries")
        .insert({
          user_id: user.id,
          title,
          content,
          created_at: new Date().toISOString(),
        });
      if (insertError) {
        setError(insertError.message);
      } else {
        await fetchEntries();
        setTitle("");
        setContent("");
        setActiveTab("entries");
      }
    }
    setIsSaving(false);
  };

  const handleDeleteEntry = async (id: string) => {
    setDeletingId(id);
    setError(null);
    const supabase = createBrowserClient();
    const { error: deleteError } = await supabase
      .from("journal_entries")
      .delete()
      .eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
    } else {
      await fetchEntries();
    }
    setDeletingId(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-teal-900 flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Journal
        </h1>
        <Button
          onClick={() => setActiveTab("write")}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="entries">Past Entries</TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <Card>
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your entry a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your thoughts here..."
                  className="min-h-[200px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              {error && (
                <div className="text-red-500 text-center text-sm">{error}</div>
              )}
              <Button
                onClick={handleSaveEntry}
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={!title.trim() || !content.trim() || isSaving}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Entry
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries">
          {entries.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500 mb-4">No journal entries yet</p>
                <Button
                  onClick={() => setActiveTab("write")}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardHeader className="bg-teal-50 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(entry.date)}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 text-red-500 hover:bg-red-100"
                          onClick={() => handleDeleteEntry(entry.id)}
                          disabled={deletingId === entry.id}
                          aria-label="Delete entry"
                        >
                          {deletingId === entry.id ? (
                            <span className="text-xs">...</span>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="whitespace-pre-line">{entry.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
