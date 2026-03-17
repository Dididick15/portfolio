"use client"

import { useActionState, useState } from "react"
import { updateSettings } from "./actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GlbUploader } from "@/components/admin/GlbUploader"

type Config = {
  ownerName?: string; title?: string; bio?: string | null
  avatarUrl?: string | null; bioLong?: string | null
  location?: string | null; availableForWork?: boolean
  cvUrl?: string | null; githubUrl?: string | null
  linkedinUrl?: string | null; instagramUrl?: string | null
  emailContact?: string | null; tags?: string[]
}

export function SettingsForm({ defaultValues: d = {} }: { defaultValues?: Config }) {
  const [state, formAction, pending] = useActionState(updateSettings, null)
  const [avatarUrl, setAvatarUrl] = useState(d.avatarUrl ?? "")
  const [tags, setTags] = useState<string[]>(d.tags ?? [])
  const [tagInput, setTagInput] = useState("")

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Nome</Label>
          <Input name="ownerName" defaultValue={d.ownerName ?? ''} required placeholder="Davide Dickmann" />
        </div>
        <div className="space-y-1.5">
          <Label>Titolo</Label>
          <Input name="title" defaultValue={d.title ?? "Software Developer"} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Bio / Tagline</Label>
        <Textarea name="bio" defaultValue={d.bio ?? ""} rows={2} placeholder="Software Developer appassionato di..." />
      </div>
      <div className="space-y-1.5">
        <Label>Bio estesa (sidebar Chi sono)</Label>
        <Textarea name="bioLong" defaultValue={d.bioLong ?? ""} rows={5} placeholder="Racconta chi sei, cosa fai, cosa ti appassiona..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Posizione</Label>
          <Input name="location" defaultValue={d.location ?? ""} placeholder="Milano, Italia" />
        </div>
        <div className="space-y-1.5">
          <Label>CV (URL PDF)</Label>
          <Input name="cvUrl" defaultValue={d.cvUrl ?? ""} placeholder="https://..." />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="availableForWork" name="availableForWork" defaultChecked={d.availableForWork ?? false} className="w-4 h-4" />
        <Label htmlFor="availableForWork">Disponibile per lavoro / collaborazioni</Label>
      </div>

      <div className="space-y-1.5">
        <Label>Modello 3D Volto (.glb)</Label>
        <GlbUploader
          bucket="avatars"
          currentUrl={avatarUrl || undefined}
          onUpload={(url) => setAvatarUrl(url)}
        />
        <input type="hidden" name="avatarUrl" value={avatarUrl} />
        {avatarUrl && (
          <button
            type="button"
            onClick={() => setAvatarUrl("")}
            className="text-xs text-white/30 hover:text-red-400 transition-colors"
          >
            Rimuovi modello
          </button>
        )}
      </div>

      <div className="space-y-3 pt-2 border-t border-white/10">
        <p className="text-sm text-white/40">Tag</p>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault()
                const t = tagInput.trim()
                if (t && !tags.includes(t)) setTags(prev => [...prev, t])
                setTagInput("")
              }
            }}
            placeholder="Aggiungi tag e premi Enter"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-sm">
              {t}
              <button type="button" onClick={() => setTags(prev => prev.filter(x => x !== t))} className="text-white/40 hover:text-red-400">×</button>
            </span>
          ))}
        </div>
        <input type="hidden" name="tags" value={tags.join(",")} />
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
