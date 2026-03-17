"use client"

import { useState, useRef, DragEvent, ChangeEvent } from "react"
import { uploadDirect } from "@/lib/upload-client"

interface GlbUploaderProps {
  bucket: "avatars" | "passion-models"
  currentUrl?: string
  onUpload: (url: string) => void
}

type State = "idle" | "dragging" | "uploading" | "done" | "error"

export function GlbUploader({ bucket, currentUrl, onUpload }: GlbUploaderProps) {
  const [state, setState] = useState<State>("idle")
  const [fileName, setFileName] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = async (file: File) => {
    if (!file.name.match(/\.(glb|gltf)$/i)) {
      setError("Solo file .glb o .gltf")
      setState("error")
      return
    }

    setState("uploading")
    setFileName(file.name)
    setError(null)
    setProgress(0)

    // Simula progresso visivo mentre carica (XHR non disponibile con fetch semplice)
    const interval = setInterval(() => setProgress(p => Math.min(p + 4, 90)), 200)

    try {
      const url = await uploadDirect(file, bucket)
      clearInterval(interval)
      setProgress(100)
      setState("done")
      onUpload(url)
    } catch (e) {
      clearInterval(interval)
      setError((e as Error).message)
      setState("error")
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setState("idle")
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
    e.target.value = ""
  }

  const isDragging = state === "dragging"
  const isUploading = state === "uploading"

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setState("dragging") }}
        onDragLeave={() => setState(s => s === "dragging" ? "idle" : s)}
        onDrop={onDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
        className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors cursor-pointer select-none overflow-hidden"
        style={{
          padding: "28px 20px",
          borderColor: isDragging ? "#7C5CFC" : state === "done" ? "#2ED573" : state === "error" ? "#FF6B6B" : "rgba(255,255,255,0.12)",
          background: isDragging ? "rgba(124,92,252,0.06)" : "rgba(255,255,255,0.02)",
        }}
      >
        <input ref={inputRef} type="file" accept=".glb,.gltf" className="hidden" onChange={onChange} disabled={isUploading} />

        {isUploading ? (
          <>
            <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
            <p className="text-xs text-white/50">Caricamento {fileName}…</p>
            {/* Barra progresso */}
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-white/60 transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </>
        ) : state === "done" ? (
          <>
            <span className="text-2xl">✅</span>
            <p className="text-xs text-green-400 font-medium">{fileName}</p>
            <p className="text-xs text-white/30">Clicca per sostituire</p>
          </>
        ) : (
          <>
            <span className="text-2xl opacity-40">📦</span>
            <p className="text-xs text-white/50 text-center">
              {isDragging ? "Rilascia qui il file" : "Trascina il .glb qui oppure clicca"}
            </p>
            <p className="text-xs text-white/20">Nessun limite di dimensione</p>
          </>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {currentUrl && state !== "done" && (
        <p className="text-xs text-white/30 truncate">Attuale: {currentUrl.split("/").pop()}</p>
      )}
    </div>
  )
}
