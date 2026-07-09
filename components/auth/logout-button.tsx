// components/auth/logout-button.tsx
"use client"
 
import { authClient } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react" // Make sure lucide-react is installed (default with shadcn)
import { useState } from "react"
 
export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
 
  const handleLogout = async () => {
    setLoading(true)
 
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Force a router refresh and redirect to login page
          router.push("/login")
          router.refresh()
        },
      },
    })
 
    setLoading(false)
  }
 
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleLogout}
      disabled={loading}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Logging out..." : "Log Out"}
    </Button>
  )
}
 