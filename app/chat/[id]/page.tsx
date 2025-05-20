"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, Paperclip, Mic, Bot } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  content: string
  sender: "user" | "match" | "bot"
  timestamp: Date
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [matchInfo, setMatchInfo] = useState<any>(null)
  const [showAIHelp, setShowAIHelp] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load match info and chat history
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    setMatchInfo({
      id: params.id,
      name: "Sophia",
      age: 28,
      avatar: "/placeholder.svg?height=100&width=100",
      isOnline: true,
    })

    // Simulate initial messages
    setMessages([
      {
        id: "1",
        content: "Hi there! I saw we matched and wanted to say hello 👋",
        sender: "match",
        timestamp: new Date(Date.now() - 3600000),
      },
    ])
  }, [params.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")

    // Simulate typing indicator
    setIsTyping(true)

    // Simulate response after delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "That sounds great! I'd love to chat more about our shared interests.",
        sender: "match",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, responseMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleAIHelp = async () => {
    setShowAIHelp(false)

    // Add a bot message to indicate it's generating a suggestion
    const botProcessingMessage: Message = {
      id: Date.now().toString(),
      content: "Generating conversation suggestions...",
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botProcessingMessage])

    try {
      // In a real app, you would use the AI SDK to generate suggestions
      // This is a simplified example
      const lastMatchMessage = messages.filter((m) => m.sender === "match").pop()

      const prompt = `
        You are a helpful dating assistant. The user is chatting with someone named ${matchInfo?.name}.
        The last message from ${matchInfo?.name} was: "${lastMatchMessage?.content}"
        
        Suggest a thoughtful, engaging response that will help keep the conversation going.
        Keep it natural, friendly, and under 150 characters.
      `

      // Simulate AI response
      setTimeout(() => {
        // Remove the processing message
        setMessages((prev) => prev.filter((m) => m.id !== botProcessingMessage.id))

        // Add the AI suggestion
        const aiSuggestion: Message = {
          id: Date.now().toString(),
          content:
            "Suggestion: I noticed you're interested in photography too! What kind of subjects do you enjoy capturing the most?",
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiSuggestion])
      }, 1500)
    } catch (error) {
      console.error("Error generating AI suggestion:", error)

      // Remove the processing message and add an error message
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== botProcessingMessage.id)
          .concat({
            id: Date.now().toString(),
            content: "Sorry, I couldn't generate a suggestion right now.",
            sender: "bot",
            timestamp: new Date(),
          }),
      )
    }
  }

  if (!matchInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center ml-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={matchInfo.avatar || "/placeholder.svg"} alt={matchInfo.name} />
              <AvatarFallback>{matchInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-sm">{matchInfo.name}</h2>
              <p className="text-xs text-muted-foreground">{matchInfo.isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>

          <div className="ml-auto">
            <Button variant="ghost" size="icon" className="text-primary" onClick={() => setShowAIHelp(!showAIHelp)}>
              <Bot className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "match" && (
                <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                  <AvatarImage src={matchInfo.avatar || "/placeholder.svg"} alt={matchInfo.name} />
                  <AvatarFallback>{matchInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : message.sender === "bot"
                      ? "bg-muted border border-border"
                      : "bg-secondary"
                } ${message.sender === "user" ? "bounce-in" : "scale-in"}`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src={matchInfo.avatar || "/placeholder.svg"} alt={matchInfo.name} />
                <AvatarFallback>{matchInfo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="bg-secondary px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {showAIHelp && (
            <Card className="p-4 scale-in">
              <h3 className="font-semibold mb-2">AI Conversation Help</h3>
              <p className="text-sm mb-3">
                Need help with your conversation? Our AI can suggest responses based on your chat history.
              </p>
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleAIHelp}>
                  Get Suggestions
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAIHelp(false)}>
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="border-t p-4 bg-background">
        <div className="max-w-lg mx-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>

          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="flex-1"
          />

          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>

          <Button size="icon" onClick={handleSendMessage} disabled={!input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
