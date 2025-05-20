"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function MatchesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMatches([
        {
          id: 1,
          name: "Sophia",
          age: 28,
          lastActive: "2 min ago",
          avatar: "/placeholder.svg?height=100&width=100",
          compatibility: 92,
          isOnline: true,
        },
        {
          id: 2,
          name: "James",
          age: 31,
          lastActive: "1 hour ago",
          avatar: "/placeholder.svg?height=100&width=100",
          compatibility: 87,
          isOnline: false,
        },
        {
          id: 3,
          name: "Emma",
          age: 26,
          lastActive: "3 hours ago",
          avatar: "/placeholder.svg?height=100&width=100",
          compatibility: 85,
          isOnline: false,
        },
        {
          id: 4,
          name: "Michael",
          age: 30,
          lastActive: "Just now",
          avatar: "/placeholder.svg?height=100&width=100",
          compatibility: 81,
          isOnline: true,
        },
      ])
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-xl font-bold">Your Matches</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                            <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                            <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              : matches.map((match, index) => (
                  <Card
                    key={match.id}
                    className="overflow-hidden slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="relative mr-4">
                          <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                            <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {match.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-semibold">
                              {match.name}, {match.age}
                            </h3>
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                              {match.compatibility}% Match
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {match.isOnline ? "Online" : `Last active: ${match.lastActive}`}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-10 w-10"
                            onClick={() => router.push(`/chat/${match.id}`)}
                          >
                            <MessageCircle className="h-5 w-5" />
                          </Button>
                          <Button
                            size="icon"
                            className="rounded-full h-10 w-10 bg-rose-500 hover:bg-rose-600"
                            onClick={() => router.push(`/profile/${match.id}`)}
                          >
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">You have no new matches at the moment.</p>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">You haven't added any favorites yet.</p>
              <Button onClick={() => router.push("/home")}>Explore Matches</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  )
}
