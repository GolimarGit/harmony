"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RoutePrefetcher() {
  const router = useRouter()

  useEffect(() => {
    // Prefetch common routes
    router.prefetch("/dashboard")
    router.prefetch("/login")
    router.prefetch("/signup")
    router.prefetch("/dashboard/inbox")
    router.prefetch("/dashboard/upcoming")
    router.prefetch("/dashboard/completed")
    router.prefetch("/dashboard/settings")
  }, [router])

  return null
}
