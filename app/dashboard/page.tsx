import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserNav } from "@/components/layout/user-nav";
import { LogoutButton } from "@/components/auth/logout-button";
 
export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
 
  if (!session) {
    redirect("/login");
  }
 
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 border-b bg-background px-8 h-16 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight">My Academy Portal</span>
        <div className="flex items-center gap-4">
          {/* Option A: Dropdown Profile menu */}
          <UserNav user={session.user} />
        </div>
      </header>
 
      {/* Main Content Area */}
      <main className="p-8 max-w-2xl mx-auto space-y-6">
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {session.user.name}</h1>
            <p className="text-muted-foreground text-sm">Role level: {session.user.role}</p>
          </div>
          {/* Option B: Standard Logout Button standalone */}
          <LogoutButton />
        </div>
      </main>
    </div>
  );
}