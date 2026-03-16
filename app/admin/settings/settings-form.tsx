"use client"

import { useActionState } from "react"
import { updateSettings } from "./actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Config = {
  ownerName?: string; title?: string; bio?: string | null
  avatarUrl?: string | null; githubUrl?: string | null
  linkedinUrl?: string | null; instagramUrl?: string | null
  emailContact?: string | null
}

export function SettingsForm({ defaultValues: d = {} }: { defaultValues?: Config }) {
  const [state, formAction, pending] = useActionState(updateSettings, null)

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Nome</Label>
          <Input name="ownerName" defaultValue={d.ownerName} required placeholder="Davide Dickmann" />
        </div>
        <div className="space-y-1.5">
          <Label>Titolo</Label>
          <Input name="title" defaultValue={d.title ?? "Software Developer"} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Bio / Tagline</Label>
        <Textarea name="bio" defaultValue={d.bio ?? ""} rows={3} />
      </div>
      <div className="space-y-1.5">
        <Label>URL Modello 3D Volto (.glb)</Label>
        <Input name="avatarUrl" defaultValue={d.avatarUrl ?? ""} placeholder="https://..." />
      </div>
      <div className="space-y-3 pt-2 border-t border-white/10">
        <p className="text-sm text-white/40">Social & Contatti</p>
        {[
          { name: "githubUrl", label: "GitHub URL", placeholder: "https://github.com/..." },
          { name: "linkedinUrl", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
          { name: "instagramUrl", label: "Instagram URL", placeholder: "https://instagram.com/..." },
          { name: "emailContact", label: "Email", placeholder: "hello@example.com" },
        ].map(({ name, label, placeholder }) => (
          <div key={name} className="space-y-1.5">
            <Label>{label}</Label>
            <Input name={name} defaultValue={(d as Record<string, string | null | undefined>)[name] ?? ""} placeholder={placeholder} />
          </div>
        ))}
      </div>
      {state && "error" in state && <p className="text-sm text-red-400">{state.error}</p>}
      {state && "success" in state && <p className="text-sm text-green-400">Salvato!</p>}
      <Button type="submit" disabled={pending}>
        {pending ? "Salvataggio..." : "Salva impostazioni"}
      </Button>
    </form>
  )
}
