"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = getSupabaseClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
  
      if (error) {
        throw error
      }
  
      toast({
        title: "Success!",
        description: "You have successfully signed in.",
      })
  
      // Add a small delay before navigation to ensure auth state is properly set
      setTimeout(() => {
        router.push("/dashboard")
        router.refresh()
      }, 500)
    } catch (error: any) {
      console.error("Authentication error:", error)
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center text-sm text-rose-500 hover:text-rose-600">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>
      </div>
      <form onSubmit={handleSignIn} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/reset-password" className="text-sm text-rose-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-rose-500 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </>
  )
}
