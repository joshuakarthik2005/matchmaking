"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Send, Bot, Upload, FileText, ImageIcon, FileArchive, Mic, Video, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  files?: File[]
}

export default function ChatbotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [requirementScore, setRequirementScore] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        content:
          "Hi there! I'm your AI assistant. I can help you create detailed service requests and find the best matches. You can describe what you need or upload files like images, documents, or audio to help me understand your requirements better. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSendMessage = async () => {
    if (!input.trim() && files.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      files: files.length > 0 ? [...files] : undefined,
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setFiles([])

    // Simulate typing indicator
    setIsTyping(true)

    // Process the message and generate a response
    processMessage(input, files)
  }

  const processMessage = (userMessage: string, userFiles: File[]) => {
    // In a real app, you would use the AI SDK to generate responses
    // This is a simplified example with predefined responses

    if (userFiles.length > 0) {
      setIsAnalyzing(true)

      // Simulate file analysis
      setTimeout(() => {
        setIsAnalyzing(false)
        setIsTyping(false)

        const newScore = Math.min(requirementScore + 25, 100)
        setRequirementScore(newScore)

        const fileTypes = userFiles.map((file) => {
          const type = file.type.split("/")[0]
          return type === "application" ? "document" : type
        })

        const uniqueTypes = [...new Set(fileTypes)]

        const botResponse: Message = {
          id: Date.now().toString(),
          content: `I've analyzed the ${userFiles.length} ${userFiles.length === 1 ? "file" : "files"} you uploaded (${uniqueTypes.join(", ")}). ${userMessage ? `Combined with your message: "${userMessage}"` : ""}

Based on this information, I've updated your requirement profile. Your requirement completeness is now at ${newScore}%.

${newScore >= 70 ? "Your requirements are quite detailed now. Would you like me to summarize what I understand about your needs, or would you like to add more information?" : "To improve matching accuracy, consider providing more details about:"}
${newScore < 70 ? "\n• Timeline and urgency\n• Budget constraints\n• Location preferences\n• Specific qualifications needed" : ""}`,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
      }, 2000)

      return
    }

    setTimeout(() => {
      let botResponse = ""
      const lowerCaseMessage = userMessage.toLowerCase()

      if (lowerCaseMessage.includes("emergency") || lowerCaseMessage.includes("urgent")) {
        botResponse =
          "I understand this is an urgent request. To help find the fastest service providers, could you please specify:\n\n1. Your exact location\n2. The nature of the emergency\n3. Any specific requirements\n\nThis will help us prioritize your request and find immediate assistance."
      } else if (
        lowerCaseMessage.includes("plumb") ||
        lowerCaseMessage.includes("leak") ||
        lowerCaseMessage.includes("pipe")
      ) {
        botResponse =
          "It sounds like you need plumbing services. To better match you with qualified plumbers, could you provide:\n\n• The specific issue (leak, clog, installation, etc.)\n• How urgent this is\n• Your location\n• Any photos of the problem\n\nThis will help us find the right professional for your needs."
      } else if (
        lowerCaseMessage.includes("website") ||
        lowerCaseMessage.includes("app") ||
        lowerCaseMessage.includes("develop")
      ) {
        botResponse =
          "I see you're looking for development services. To help match you with the right developers, could you share:\n\n• The type of project (website, mobile app, etc.)\n• Key features needed\n• Your timeline\n• Budget range\n\nYou can also upload any design mockups or requirement documents you have."
      } else if (lowerCaseMessage.includes("summarize") || lowerCaseMessage.includes("summary")) {
        const newScore = Math.min(requirementScore + 15, 100)
        setRequirementScore(newScore)

        botResponse = `Based on our conversation, here's a summary of your requirements:

You're looking for professional services related to ${requirementScore > 50 ? "technology development or support" : "assistance with a project or service"}.

Your requirement completeness is at ${newScore}%.

${newScore >= 70 ? "I have enough information to start matching you with service providers. Would you like to proceed with finding matches?" : "I still need more information to make accurate matches. Could you provide more details about your specific needs, timeline, and budget?"}

You can also upload files like images or documents to help clarify your requirements.`
      } else if (
        lowerCaseMessage.includes("match") ||
        lowerCaseMessage.includes("find provider") ||
        lowerCaseMessage.includes("find service")
      ) {
        botResponse = `I'll help you find service providers that match your requirements.

Based on the information you've provided (${requirementScore}% complete), here are the types of providers that would be a good fit:

${requirementScore >= 50 ? "• Professional plumbers with emergency service availability\n• Providers within 10 miles of your location\n• Highly rated professionals (4.5+ stars)" : "I need more specific information to provide accurate matches. Could you tell me more about your exact needs?"}

Would you like to create a formal request to start receiving quotes from these providers?`
      } else {
        const newScore = Math.min(requirementScore + 10, 100)
        setRequirementScore(newScore)

        botResponse = `Thanks for providing that information. I've updated your requirement profile, which is now ${newScore}% complete.

To help find the best matches for your needs, could you also tell me:

• What is your timeline for this service?
• Do you have a specific budget in mind?
• Are there any specific qualifications or certifications you require?

You can also upload images, documents, or other files to help clarify your requirements.`
      }

      const responseMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, responseMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getFileIcon = (file: File) => {
    const type = file.type.split("/")[0]
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "audio":
        return <Mic className="h-5 w-5 text-purple-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "application":
        if (file.type.includes("pdf")) {
          return <FileText className="h-5 w-5 text-red-500" />
        }
        return <FileArchive className="h-5 w-5 text-amber-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">
            Describe your needs or upload files, and our AI will help create your request and find matches.
          </p>
        </div>

        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0 bg-primary/10">
                      <AvatarFallback>
                        <Bot className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    } ${message.sender === "user" ? "bounce-in" : "scale-in"}`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>

                    {message.files && message.files.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs opacity-70">Uploaded files:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.files.map((file, index) => (
                            <Badge
                              key={index}
                              variant={message.sender === "user" ? "secondary" : "outline"}
                              className="flex items-center gap-1 text-xs"
                            >
                              {getFileIcon(file)}
                              <span className="truncate max-w-[100px]">{file.name}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

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
                  <Avatar className="h-8 w-8 mr-2 mt-1 bg-primary/10">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-primary" />
                    </AvatarFallback>
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

              {isAnalyzing && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1 bg-primary/10">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary px-4 py-3 rounded-lg max-w-[80%]">
                    <p className="text-sm mb-2">Analyzing your files...</p>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {files.length > 0 && (
              <div className="mb-4 p-3 border rounded-md bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Files to upload ({files.length})</h3>
                  <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setFiles([])}>
                    Clear all
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 p-1 pl-2 border rounded-md bg-background text-sm"
                    >
                      {getFileIcon(file)}
                      <span className="truncate max-w-[150px]">{file.name}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-5 w-5" />
                <span className="sr-only">Upload files</span>
              </Button>
              <Input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

              <Input
                placeholder="Describe what you need..."
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

              <Button
                className="flex-shrink-0"
                onClick={handleSendMessage}
                disabled={(!input.trim() && files.length === 0) || isTyping || isAnalyzing}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-muted-foreground">
                Upload images, documents, audio, or video to help describe your needs
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Requirement completeness:</span>
                <Progress value={requirementScore} className="w-24 h-1.5" />
                <span className="text-xs font-medium">{requirementScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
