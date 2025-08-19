"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const check = async () => {
      const { data } = await supabase.auth.getUser()
      if (!isMounted) return
      if (!data.user) {
        router.replace("/sign-in")
      } else {
        setIsLoading(false)
      }
    }

    check()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) router.replace("/sign-in")
    })

    return () => {
      isMounted = false
      subscription.subscription.unsubscribe()
    }
  }, [router, supabase])

  if (isLoading) return null
  return <>{children}</>
}


