type Bucket = "avatars" | "passion-models" | "project-images"

export async function uploadDirect(file: File, bucket: Bucket): Promise<string> {
  // 1. Chiedi al server una signed URL (zero dati passano per Next.js)
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bucket, filename: file.name }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? "Errore signed URL")

  const { signedUrl, publicUrl } = json as { signedUrl: string; publicUrl: string }

  // 2. Carica direttamente su Supabase Storage — bypassa Next.js completamente
  const uploadRes = await fetch(signedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  })

  if (!uploadRes.ok) {
    const msg = await uploadRes.text()
    throw new Error(`Upload fallito: ${msg}`)
  }

  return publicUrl
}
