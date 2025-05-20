"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { SimpleRadioGroup, SimpleRadioGroupItem } from "@/components/ui/simple-radio-group"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "buyer", // Default to buyer
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUserTypeChange = (value: string) => {
    console.log("User type changed to:", value)
    setFormData((prev) => ({ ...prev, userType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would authenticate with your backend
    console.log("Form submitted with user type:", formData.userType)

    // Extract name from email for demo purposes
    const emailName = formData.email.split("@")[0] || "User"
    const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1)

    // Store user info in localStorage
    localStorage.setItem("userName", formattedName)
    localStorage.setItem("userType", formData.userType)
    localStorage.setItem("userEmail", formData.email)

    if (formData.userType === "provider") {
      console.log("Redirecting to provider dashboard")
      router.push("/dashboard")
    } else {
      console.log("Redirecting to buyer home")
      router.push("/home")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md scale-in">
        <CardHeader className="space-y-1">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>I am a</Label>
              <SimpleRadioGroup value={formData.userType} onValueChange={handleUserTypeChange} className="flex gap-4">
                <SimpleRadioGroupItem value="buyer" id="buyer" />
                <SimpleRadioGroupItem value="provider" id="provider" />
              </SimpleRadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
