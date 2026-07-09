import { SignUpForm } from "@/components/auth/sign-up-form"
import Link from "next/link"
 
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-slate-50 px-4">
      {/* Renders your Shadcn Sign Up form */}
      <SignUpForm />
 
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}