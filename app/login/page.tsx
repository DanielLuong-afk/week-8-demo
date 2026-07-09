// app/login/page.tsx
import { SignInForm } from "@/components/auth/sign-in-form"
import Link from "next/link"
 
export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-slate-50 px-4">
      {/* Renders your Shadcn Sign In form */}
      <SignInForm />
 
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}