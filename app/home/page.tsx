"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Settings, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("demand")
  const [isLoading, setIsLoading] = useState(true)
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setProfiles([
        {
          id: 1,
          name: "Sophia",
          age: 28,
          location: "New York, NY",
          interests: ["Photography", "Travel", "Cooking"],
          avatar: "/placeholder.svg?height=100&width=100",
          compatibility: 92,
        },
        {
          id: 2,
          name: "James",
          age: 31,
          location: "Los Angeles, CA",
          interests: ["Hiking", "Movies", "Music"],
          avatar: "/placeholder.svg?height=100&width=100",
          compatibility: 87,
        },
        {
          id: 3,
          name: "Emma",
          age: 26,
          location: "Chicago, IL",
          interests: ["Reading", "Yoga", "Art"],
          avatar: "/placeholder.svg?height=100&width=100",
          compatibility: 85,
        },
        {
          id: 4,
          name: "Michael",
          age: 30,
          location: "Austin, TX",
          interests: ["Fitness", "Technology", "Coffee"],
          avatar: "/placeholder.svg?height=100&width=100",
          compatibility: 81,
        },
      ])
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">MatchAI</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/search")}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 fade-in">Hello Sheriar!</h2>
          <p className="text-muted-foreground fade-in">Here are your matches for today</p>
        </div>

        <Tabs defaultValue="demand" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="demand">Demand</TabsTrigger>
            <TabsTrigger value="supply">Supply</TabsTrigger>
          </TabsList>

          <TabsContent value="demand" className="space-y-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
                            <div className="space-y-2">
                              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 w-full bg-muted animate-pulse rounded" />
                            <div className="h-3 w-3/4 bg-muted animate-pulse rounded" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              : profiles.map((profile, index) => (
                  <Card
                    key={profile.id}
                    className="overflow-hidden slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-center space-x-4 mb-3">
                          <Avatar className="h-12 w-12 border-2 border-primary">
                            <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">
                                {profile.name}, {profile.age}
                              </h3>
                              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                {profile.compatibility}% Match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{profile.location}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm">Interests:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {profile.interests.map((interest: string) => (
                              <Badge key={interest} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => router.push(`/chat/${profile.id}`)}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat
                          </Button>
                          <Button
                            className="flex-1 bg-rose-500 hover:bg-rose-600"
                            onClick={() => router.push(`/profile/${profile.id}`)}
                          >
                            <Heart className="mr-2 h-4 w-4" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </TabsContent>

          <TabsContent value="supply" className="space-y-4">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Complete your profile to appear in others' matches</p>
              <Button onClick={() => router.push("/profile")}>Complete Profile</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  )
}
