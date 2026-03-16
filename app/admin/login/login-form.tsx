"use client"

import { useActionState } from "react"
import { signIn } from "./actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => signIn(formData),
    null
  )

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-white/70">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-white/70">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Accesso..." : "Accedi"}
      </Button>
    </form>
  )
}
