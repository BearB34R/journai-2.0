"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your wellness companion. How can I support you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I understand how you feel. Would you like to talk more about that?",
        "That's interesting. Can you tell me more about why you feel that way?",
        "I'm here to support you. Have you tried any relaxation techniques recently?",
        "Thank you for sharing that with me. How has this been affecting your daily life?",
        "I appreciate you opening up. What would help you feel better right now?",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl h-[calc(100vh-4rem)] flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b bg-teal-50">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-teal-600" />
            AI Wellness Companion
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-teal-50 p-3 rounded-lg text-sm text-teal-800 mb-6">
            <p>
              <strong>Note:</strong> I'm here to provide support and companionship, but I'm not a replacement for
              professional mental health care. If you're experiencing a crisis, please contact a mental health
              professional or emergency services.
            </p>
          </div>

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start max-w-[80%]">
                {message.sender === "ai" && (
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-teal-100 text-teal-800">AI</AvatarFallback>
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
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="ml-2 h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-teal-600 text-white">JD</AvatarFallback>
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
                  <AvatarFallback className="bg-teal-100 text-teal-800">AI</AvatarFallback>
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
  )
}
