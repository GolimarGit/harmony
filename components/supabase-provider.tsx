"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase-client"

type SupabaseContext = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  supabase: ReturnType<typeof getSupabaseClient>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = getSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signOut = async () => {
    await supabase.auth.signOut()
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    })
    router.push("/login")
  }

  const value = {
    user,
    loading,
    signOut,
    supabase,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useSupabase() {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}
