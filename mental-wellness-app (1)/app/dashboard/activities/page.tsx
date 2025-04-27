import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Play, Bookmark } from "lucide-react";
import Link from "next/link";

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold text-teal-900 mb-6">
        Guided Activities
      </h1>
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Coming Soon</h2>
        <p className="text-lg text-gray-500">
          New wellness activities will be available here soon. Stay tuned!
        </p>
      </div>
    </div>
  );
}
