"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Passion = { id: string; name: string }
type FormState = { error?: string } | null

type Props = {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  passions: Passion[]
  defaultValues?: {
    title?: string; slug?: string; description?: string; longDesc?: string
    coverImage?: string; externalUrl?: string; tags?: string[]
    isFeatured?: boolean; isVisible?: boolean
    passion?: { id: string; name: string }
  }
}

export function ProjectForm({ action, passions, defaultValues: d = {} }: Props) {
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      <div className="space-y-1.5">
        <Label>Passione</Label>
        <Select name="passionId" defaultValue={d.passion?.id} required>
          <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
          <SelectContent>
            {passions.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Titolo</Label>
          <Input name="title" defaultValue={d.title} required />
        </div>
        <div className="space-y-1.5">
          <Label>Slug</Label>
          <Input name="slug" defaultValue={d.slug} required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Descrizione breve</Label>
        <Textarea name="description" defaultValue={d.description} required rows={2} />
      </div>
      <div className="space-y-1.5">
        <Label>Descrizione completa</Label>
        <Textarea name="longDesc" defaultValue={d.longDesc ?? ""} rows={5} />
      </div>
      <div className="space-y-1.5">
        <Label>URL copertina</Label>
        <Input name="coverImage" defaultValue={d.coverImage} placeholder="https://..." />
      </div>
      <div className="space-y-1.5">
        <Label>Link esterno</Label>
        <Input name="externalUrl" defaultValue={d.externalUrl ?? ""} placeholder="https://github.com/..." />
      </div>
      <div className="space-y-1.5">
        <Label>Tag (separati da virgola)</Label>
        <Input name="tags" defaultValue={d.tags?.join(", ")} placeholder="React, TypeScript, ..." />
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={d.isFeatured} className="w-4 h-4" />
          <Label htmlFor="isFeatured">In evidenza</Label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="isVisible" name="isVisible" defaultChecked={d.isVisible ?? true} className="w-4 h-4" />
          <Label htmlFor="isVisible">Visibile</Label>
        </div>
      </div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <Button type="submit" disabled={pending}>
        {pending ? "Salvataggio..." : "Salva"}
      </Button>
    </form>
  )
}
