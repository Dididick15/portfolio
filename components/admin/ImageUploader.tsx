"use client"

import { useState, useRef, DragEvent, ChangeEvent } from "react"
import { uploadDirect } from "@/lib/upload-client"

interface ImageUploaderProps {
  bucket: "avatars" | "project-images"
  multiple?: boolean
  currentUrls?: string[]
  onUpload: (urls: string[]) => void
}

interface UploadItem {
  name: string
  url?: string
  status: "uploading" | "done" | "error"
  error?: string
}

export function ImageUploader({ bucket, multiple = false, currentUrls = [], onUpload }: ImageUploaderProps) {
  const [items, setItems] = useState<UploadItem[]>([])
  const [urls, setUrls] = useState<string[]>(currentUrls)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFiles = async (files: File[]) => {
    const accepted = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f.name))
    if (!accepted.length) return

    const startIndex = items.length
    setItems(prev => [...prev, ...accepted.map(f => ({ name: f.name, status: "uploading" as const }))])

    const results = await Promise.all(
      accepted.map(async (file, i) => {
        try {
          const url = await uploadDirect(file, bucket)
          setItems(prev => prev.map((it, idx) => idx === startIndex + i ? { ...it, status: "done", url } : it))
          return url
        } catch (e) {
          setItems(prev => prev.map((it, idx) => idx === startIndex + i ? { ...it, status: "error", error: (e as Error).message } : it))
          return null
        }
      })
    )

    const uploaded = results.filter(Boolean) as string[]
    const next = multiple ? [...urls, ...uploaded] : uploaded.slice(-1)
    setUrls(next)
    onUpload(next)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    uploadFiles(Array.from(e.dataTransfer.files))
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(Array.from(e.target.files))
    e.target.value = ""
  }

  const removeUrl = (url: string) => {
    const next = urls.filter(u => u !== url)
    setUrls(next)
    onUpload(next)
  }

  const uploading = items.some(i => i.status === "uploading")

  return (
    <div className="space-y-3">
      {urls.length > 0 && (
        <div className={`grid gap-2 ${multiple ? "grid-cols-4" : "grid-cols-1"}`}>
          {urls.map(url => (
            <div key={url} className="relative group rounded-lg overflow-hidden border border-white/10" style={{ aspectRatio: multiple ? "1" : "16/7" }}>
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeUrl(url)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {(multiple || urls.length === 0) && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors cursor-pointer"
          style={{
            padding: "24px 16px",
            borderColor: dragging ? "#7C5CFC" : "rgba(255,255,255,0.12)",
            background: dragging ? "rgba(124,92,252,0.06)" : "rgba(255,255,255,0.02)",
          }}
        >
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple={multiple} className="hidden" onChange={onChange} />
          <span className="text-xl opacity-40">🖼️</span>
          <p className="text-xs text-white/40 text-center">
            {dragging ? "Rilascia qui" : uploading ? "Caricamento..." : multiple ? "Trascina le immagini o clicca" : "Trascina un'immagine o clicca"}
          </p>
          <p className="text-xs text-white/20">jpg, png, webp</p>
        </div>
      )}

      {items.filter(i => i.status !== "done").map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          {item.status === "uploading" && <div className="w-3 h-3 rounded-full border border-white/20 border-t-white/80 animate-spin shrink-0" />}
          {item.status === "error" && <span className="text-red-400">✗</span>}
          <span className={item.status === "error" ? "text-red-400" : "text-white/40"}>
            {item.name}{item.error ? ` — ${item.error}` : ""}
          </span>
        </div>
      ))}
    </div>
  )
}
