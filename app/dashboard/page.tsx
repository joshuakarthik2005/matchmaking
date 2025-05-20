"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Clock, CheckCircle, FileText, Users, Zap, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userType] = useState<"buyer" | "seller">("buyer") // In a real app, this would come from auth state

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your {userType === "buyer" ? "requests" : "services"}.
            </p>
          </div>
          <Button className="mt-4 md:mt-0" asChild>
            <Link href={userType === "buyer" ? "/create-request" : "/create-service"}>
              {userType === "buyer" ? "Create New Request" : "Add New Service"}
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          <Card className="col-span-3 lg:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Your activity summary for the past 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {userType === "buyer" ? "Active Requests" : "Active Listings"}
                  </p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {userType === "buyer" ? "Matched Providers" : "Potential Clients"}
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {userType === "buyer" ? "Completed Matches" : "Completed Services"}
                  </p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>{userType === "buyer" ? "Your Requests" : "Your Services"}</CardTitle>
              <CardDescription>
                Manage your {userType === "buyer" ? "service requests" : "service listings"}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="space-y-4">
                  {userType === "buyer" ? (
                    <>
                      <RequestCard
                        title="Emergency Plumbing Repair"
                        description="Need a plumber to fix a leaking pipe in my bathroom. Water is starting to damage the floor."
                        category="Home Repair"
                        status="active"
                        matches={3}
                        date="2 days ago"
                        id="req-1"
                      />
                      <RequestCard
                        title="Website Development for Small Business"
                        description="Looking for a web developer to create a simple website for my bakery business. Need e-commerce functionality."
                        category="Technology"
                        status="active"
                        matches={5}
                        date="1 week ago"
                        id="req-2"
                      />
                      <RequestCard
                        title="Moving Help Needed"
                        description="Need assistance moving from a 2-bedroom apartment to a house. Heavy furniture included."
                        category="Moving Services"
                        status="active"
                        matches={4}
                        date="3 days ago"
                        id="req-3"
                      />
                    </>
                  ) : (
                    <>
                      <ServiceCard
                        title="Professional Plumbing Services"
                        description="Emergency plumbing repairs, installation, and maintenance. Available 24/7 for urgent calls."
                        category="Home Repair"
                        status="active"
                        matches={7}
                        date="Updated 3 days ago"
                        id="serv-1"
                      />
                      <ServiceCard
                        title="Full-Stack Web Development"
                        description="Custom website development for small businesses. Specializing in e-commerce solutions."
                        category="Technology"
                        status="active"
                        matches={10}
                        date="Updated 1 week ago"
                        id="serv-2"
                      />
                      <ServiceCard
                        title="Professional Moving Services"
                        description="Full-service moving assistance for homes and apartments. Includes packing, loading, and transport."
                        category="Moving Services"
                        status="active"
                        matches={5}
                        date="Updated 2 days ago"
                        id="serv-3"
                      />
                    </>
                  )}
                </TabsContent>
                <TabsContent value="pending" className="space-y-4">
                  {userType === "buyer" ? (
                    <RequestCard
                      title="Graphic Design for Business Cards"
                      description="Need a professional design for business cards and letterhead for my consulting business."
                      category="Design"
                      status="pending"
                      matches={0}
                      date="Just now"
                      id="req-4"
                    />
                  ) : (
                    <ServiceCard
                      title="Graphic Design Services"
                      description="Professional graphic design for business materials, logos, and branding. Fast turnaround times."
                      category="Design"
                      status="pending"
                      matches={0}
                      date="Pending approval"
                      id="serv-4"
                    />
                  )}
                </TabsContent>
                <TabsContent value="completed" className="space-y-4">
                  {userType === "buyer" ? (
                    <RequestCard
                      title="Lawn Maintenance"
                      description="Regular lawn mowing and garden maintenance for a medium-sized yard."
                      category="Gardening"
                      status="completed"
                      matches={2}
                      date="Completed 2 weeks ago"
                      id="req-5"
                    />
                  ) : (
                    <ServiceCard
                      title="Lawn Care and Gardening"
                      description="Professional lawn and garden maintenance. Services include mowing, trimming, and seasonal cleanup."
                      category="Gardening"
                      status="completed"
                      matches={8}
                      date="Completed 5 jobs"
                      id="serv-5"
                    />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="col-span-3 md:col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest notifications and updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">New match found</p>
                  <p className="text-xs text-muted-foreground">A new provider matched with your plumbing request</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">New message</p>
                  <p className="text-xs text-muted-foreground">
                    You received a message about your website development request
                  </p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Request completed</p>
                  <p className="text-xs text-muted-foreground">Your lawn maintenance request was marked as completed</p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/notifications">
                  View all notifications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

interface RequestCardProps {
  title: string
  description: string
  category: string
  status: "active" | "pending" | "completed"
  matches: number
  date: string
  id: string
}

function RequestCard({ title, description, category, status, matches, date, id }: RequestCardProps) {
  return (
    <div className="rounded-lg border p-4 slide-in">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{title}</h3>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
            <Badge variant="outline">{category}</Badge>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {date}
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-3 w-3" />
              {matches} {matches === 1 ? "match" : "matches"}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/request/${id}`}>View Details</Link>
          </Button>
          {status === "active" && (
            <Button size="sm" asChild>
              <Link href={`/request/${id}/matches`}>View Matches</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  category: string
  status: "active" | "pending" | "completed"
  matches: number
  date: string
  id: string
}

function ServiceCard({ title, description, category, status, matches, date, id }: ServiceCardProps) {
  return (
    <div className="rounded-lg border p-4 slide-in">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{title}</h3>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
            <Badge variant="outline">{category}</Badge>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {date}
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-3 w-3" />
              {matches} potential {matches === 1 ? "client" : "clients"}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/service/${id}`}>View Details</Link>
          </Button>
          {status === "active" && (
            <Button size="sm" asChild>
              <Link href={`/service/${id}/matches`}>View Matches</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: "active" | "pending" | "completed" }) {
  if (status === "active") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600">
        <CheckCircle className="mr-1 h-3 w-3" /> Active
      </Badge>
    )
  }
  if (status === "pending") {
    return (
      <Badge variant="outline" className="text-amber-500 border-amber-500 bg-amber-50">
        <Clock className="mr-1 h-3 w-3" /> Pending
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      <CheckCircle className="mr-1 h-3 w-3" /> Completed
    </Badge>
  )
}
