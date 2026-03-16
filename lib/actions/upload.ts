"use server"

import { supabaseAdmin } from "@/lib/supabase"

type Bucket = "avatars" | "passion-models" | "project-images"

export async function uploadFile(bucket: Bucket, file: File): Promise<string> {
  const ext = file.name.split(".").pop()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, { upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFile(bucket: Bucket, url: string) {
  const path = url.split(`/${bucket}/`)[1]
  if (!path) return

  const { error } = await supabaseAdmin.storage.from(bucket).remove([path])
  if (error) throw new Error(error.message)
}
