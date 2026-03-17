"use client"

import { useActionState, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GlbUploader } from "./GlbUploader"

type FormState = { error?: string } | null

type Props = {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  defaultValues?: {
    name?: string; slug?: string; description?: string
    emoji?: string; color?: string; modelUrl?: string
    positionX?: number; positionY?: number; positionZ?: number
    isVisible?: boolean; useModelColor?: boolean
  }
}

export function PassionForm({ action, defaultValues: d = {} }: Props) {
  const [state, formAction, pending] = useActionState(action, null)
  const [modelUrl, setModelUrl] = useState(d.modelUrl ?? "")

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Nome</Label>
          <Input name="name" defaultValue={d.name ?? ''} required />
        </div>
        <div className="space-y-1.5">
          <Label>Emoji</Label>
          <Input name="emoji" defaultValue={d.emoji ?? ''} placeholder="📷 (opzionale)" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Slug</Label>
        <Input name="slug" defaultValue={d.slug ?? ''} required placeholder="fotografia" />
      </div>
      <div className="space-y-1.5">
        <Label>Descrizione</Label>
        <Textarea name="description" defaultValue={d.description ?? ''} required rows={3} />
      </div>
      <div className="space-y-1.5">
        <Label>Colore (hex)</Label>
        <div className="flex gap-2">
          <Input name="color" defaultValue={d.color ?? "#ffffff"} required placeholder="#E8A87C" className="flex-1" />
          <input type="color" name="colorPicker" defaultValue={d.color ?? "#ffffff"}
            className="w-10 h-10 rounded cursor-pointer bg-transparent border border-white/10"
            onChange={(e) => {
              const input = e.currentTarget.closest("form")?.querySelector<HTMLInputElement>("input[name=color]")
              if (input) input.value = e.currentTarget.value
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {(["positionX", "positionY", "positionZ"] as const).map((axis) => (
          <div key={axis} className="space-y-1.5">
            <Label>{axis.replace("position", "Pos ")}</Label>
            <Input name={axis} type="number" step="0.1" defaultValue={d[axis] ?? 0} />
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <Label>Modello 3D (.glb)</Label>
        <GlbUploader
          bucket="passion-models"
          currentUrl={modelUrl || undefined}
          onUpload={(url) => setModelUrl(url)}
        />
        {/* Input hidden che porta l'URL al server action */}
        <input type="hidden" name="modelUrl" value={modelUrl} />
        {modelUrl && (
          <button
            type="button"
            onClick={() => setModelUrl("")}
            className="text-xs text-white/30 hover:text-red-400 transition-colors"
          >
            Rimuovi modello
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="isVisible" name="isVisible" defaultChecked={d.isVisible ?? true} className="w-4 h-4" />
        <Label htmlFor="isVisible">Visibile</Label>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="useModelColor" name="useModelColor" defaultChecked={d.useModelColor ?? false} className="w-4 h-4" />
        <Label htmlFor="useModelColor">Usa colore texture del modello 3D (ignora colore admin)</Label>
      </div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <Button type="submit" disabled={pending}>
        {pending ? "Salvataggio..." : "Salva"}
      </Button>
    </form>
  )
}
