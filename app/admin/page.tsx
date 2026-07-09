// app/admin/page.tsx
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
 
export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
 
  // 1. Authenticate (Are you logged in?)
  if (!session) {
    redirect("/login")
  }
 
  // 2. Authorize (Do you have the correct privileges?)
  if (session.user.role !== "admin") {
    return (
      <main className="flex h-screen w-full flex-col items-center justify-center p-4">
        <div className="max-w-md rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-destructive">
            403 - Forbidden
          </h1>
          <p className="text-sm text-muted-foreground">
            Access denied. This panel requires an <strong>admin</strong> role.
            Your current role is <strong>"{session.user.role}"</strong>.
          </p>
        </div>
      </main>
    )
  }
 
  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <h1 className="text-2xl font-black">Admin Management Suite</h1>
        <p className="text-sm opacity-90">
          Authorized as: {session.user.email}
        </p>
      </div>
 
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <h3 className="font-bold">Total Database Users</h3>
          <p className="text-2xl font-black text-emerald-600">Locked</p>
        </div>
        {/* Admin controls would render here */}
      </div>
    </main>
  )
}
 
 