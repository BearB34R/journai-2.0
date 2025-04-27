"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Calendar, Edit } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { createBrowserClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createBrowserClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user) {
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("full_name, avatar_url, wellness_goals")
          .eq("user_id", data.user.id)
          .single();
        setProfile(profileData);
        setFullName(profileData?.full_name || "");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    setSaveStatus(null);
    const supabase = createBrowserClient();
    // Try update first
    const {
      data: updateData,
      error: updateError,
      count,
    } = await supabase
      .from("user_profiles")
      .update({ full_name: fullName })
      .eq("user_id", user.id)
      .select()
      .single();
    if (updateError || !updateData) {
      // If no row was updated, insert a new profile
      const { error: insertError } = await supabase
        .from("user_profiles")
        .insert({ user_id: user.id, full_name: fullName });
      if (insertError) {
        setSaveStatus("Failed to update profile. Please try again.");
        return;
      }
    }
    // Update Supabase Auth user metadata as well
    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });
    if (authError) {
      setSaveStatus(
        "Profile updated, but failed to update authentication metadata."
      );
    } else {
      setSaveStatus("Profile updated successfully!");
    }
    // Re-fetch profile
    const { data: profileData } = await supabase
      .from("user_profiles")
      .select("full_name, avatar_url, wellness_goals")
      .eq("user_id", user.id)
      .single();
    setProfile(profileData);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;
    setAvatarUploading(true);
    const supabase = createBrowserClient();
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`;
    // Upload to Supabase Storage (bucket: 'avatars')
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      setSaveStatus("Failed to upload avatar. Please try again.");
      setAvatarUploading(false);
      return;
    }
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    const avatarUrl = publicUrlData?.publicUrl;
    if (avatarUrl) {
      // Update user_profiles
      await supabase
        .from("user_profiles")
        .update({ avatar_url: avatarUrl })
        .eq("user_id", user.id);
      // Re-fetch profile
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("full_name, avatar_url, wellness_goals")
        .eq("user_id", user.id)
        .single();
      setProfile(profileData);
      setSaveStatus("Profile photo updated!");
    }
    setAvatarUploading(false);
  };

  if (loading) {
    return <div className="container mx-auto p-4 max-w-4xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-teal-900 mb-6">Your Profile</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={profile?.avatar_url || "/placeholder-user.jpg"}
                alt="Profile"
              />
              <AvatarFallback className="text-2xl bg-teal-100 text-teal-800">
                {(profile?.full_name || user?.email || "U")[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarUploading}
            >
              <Edit className="h-4 w-4 mr-2" />
              {avatarUploading ? "Uploading..." : "Change Photo"}
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
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                          <Mail className="h-4 w-4" />
                        </span>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user?.email}
                          className="rounded-l-none"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <Input
                          id="dob"
                          type="date"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                  {saveStatus && (
                    <div
                      className={
                        saveStatus.includes("success")
                          ? "text-green-600 mt-2"
                          : "text-red-600 mt-2"
                      }
                    >
                      {saveStatus}
                    </div>
                  )}
                  {profile?.wellness_goals &&
                    profile.wellness_goals.length > 0 && (
                      <div className="mt-4">
                        <Label>Wellness Goals</Label>
                        <ul className="list-disc ml-6 text-sm text-gray-700">
                          {profile.wellness_goals.map(
                            (goal: string, idx: number) => (
                              <li key={idx}>{goal}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
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
                    Customize your experience with Serene by adjusting your
                    preferences.
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
                  <p className="text-gray-500 mb-4">
                    Track your wellness journey and see how far you've come.
                  </p>
                  <div className="space-y-4">
                    {/* Placeholder for stats UI */}
                    <p className="text-sm text-muted-foreground">
                      Detailed statistics will be available as you use the app
                      more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
