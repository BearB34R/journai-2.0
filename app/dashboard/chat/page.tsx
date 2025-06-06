"use client";

import type React from "react";
import { Suspense } from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}

function ChatPageContent() {
  // Use a lazy initializer to load messages from localStorage synchronously
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wellnessChatMessages");
      if (saved) {
        try {
          return JSON.parse(saved).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
        } catch (e) {
          // Ignore parse errors and use default
        }
      }
    }
    return [
      {
        id: "1",
        content:
          "Hello! I'm your wellness companion. How can I support you today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ];
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("wellnessChatMessages", JSON.stringify(messages));
  }, [messages]);

  // Add follow-up AI message if mood is present in query params
  useEffect(() => {
    const mood = searchParams.get("mood");
    if (mood && !messages.some((msg) => msg.id === "mood-followup")) {
      let moodText = "";
      switch (mood) {
        case "great":
          moodText =
            "That's wonderful to hear! How was your day, and what made you feel great?";
          break;
        case "good":
          moodText =
            "I'm glad you're feeling good! Can you tell me about your day and what contributed to your mood?";
          break;
        case "okay":
          moodText =
            "Thanks for sharing. How was your day, and what made you feel this way?";
          break;
        case "bad":
          moodText =
            "I'm sorry to hear that. Would you like to talk about your day and what made you feel this way?";
          break;
        case "terrible":
          moodText =
            "I'm here for you. If you want to share, what happened today that made you feel this way?";
          break;
        default:
          moodText = "How was your day, and what made you feel that way?";
      }
      setMessages((prev) => [
        ...prev,
        {
          id: "mood-followup",
          content: moodText,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [searchParams, messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
        credentials: "include", // Ensure cookies (auth) are sent
      });
      const data = await res.json();
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: data.aiMessage || "Sorry, I couldn't generate a response.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-ai-error",
          content: "Sorry, there was a problem connecting to the AI.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
    setIsTyping(false);
  };

  const handleExportToJournal = () => {
    // Format chat log as text
    const chatLog = messages
      .map(
        (msg) =>
          `[${msg.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}] ${msg.sender === "user" ? "You" : "AI"}: ${msg.content}`
      )
      .join("\n");
    // Pass chatLog as query param to journal page
    router.push(
      `/dashboard/journal?exportedChat=${encodeURIComponent(chatLog)}`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl h-[calc(100vh-4rem)] flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b bg-teal-50">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-teal-600" />
            AI Wellness Companion
          </CardTitle>
          <div className="flex ml-auto mt-2">
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleExportToJournal}
              disabled={messages.length === 0}
            >
              Export to Journal
            </Button>
            <Button
              className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={() => {
                setMessages([
                  {
                    id: "1",
                    content:
                      "Hello! I'm your wellness companion. How can I support you today?",
                    sender: "ai",
                    timestamp: new Date(),
                  },
                ]);
                localStorage.removeItem("wellnessChatMessages");
              }}
              disabled={messages.length === 1 && messages[0].sender === "ai"}
            >
              Clear Chat
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-teal-50 p-3 rounded-lg text-sm text-teal-800 mb-6">
            <p>
              <strong>Note:</strong> I'm here to provide support and
              companionship, but I'm not a replacement for professional mental
              health care. If you're experiencing a crisis, please contact a
              mental health professional or emergency services.
            </p>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-start max-w-[80%]">
                {message.sender === "ai" && (
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-teal-100 text-teal-800">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-teal-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-teal-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="ml-2 h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-teal-600 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start max-w-[80%]">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-teal-100 text-teal-800">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
