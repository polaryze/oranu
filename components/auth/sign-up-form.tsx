"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Simulate loading for demo purposes
    setTimeout(() => {
      setLoading(false)
      setMessage("Account created successfully! Redirecting to dashboard...")
      // Just redirect to dashboard without authentication
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    }, 1000)
  }

  const handleOAuth = async (provider: "google" | "apple") => {
    setLoading(true)
    setMessage("")
    
    // Simulate loading for demo purposes
    setTimeout(() => {
      setLoading(false)
      // Just redirect to dashboard without authentication
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary mb-2">Join Oranu</CardTitle>
        <CardDescription className="text-white/70 text-lg">Create your account to start your study journey</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary/50"
            />
          </div>
          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 text-lg shadow-lg" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button type="button" variant="outline" onClick={() => handleOAuth("google")} disabled={loading} className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            Continue with Google
          </Button>
          <Button type="button" variant="outline" onClick={() => handleOAuth("apple")} disabled={loading} className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            Continue with Apple
          </Button>
        </div>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:text-primary/80 font-medium">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
