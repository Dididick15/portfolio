import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

const ALLOWED_BUCKETS = ["avatars", "passion-models", "project-images"] as const
type Bucket = typeof ALLOWED_BUCKETS[number]

function validateExt(bucket: Bucket, ext: string): string | null {
  if (bucket === "project-images") {
    return ["jpg", "jpeg", "png", "webp"].includes(ext) ? null : "Solo jpg, png, webp"
  }
  return ["glb", "gltf"].includes(ext) ? null : "Solo file .glb o .gltf"
}

// POST /api/upload/signed — genera signed URL per upload diretto browser→Supabase
export async function POST(req: NextRequest) {
  const { bucket, filename } = await req.json()

  if (!ALLOWED_BUCKETS.includes(bucket)) {
    return NextResponse.json({ error: "Bucket non valido" }, { status: 400 })
  }

  const ext = filename?.split(".").pop()?.toLowerCase() ?? ""
  const extError = validateExt(bucket as Bucket, ext)
  if (extError) return NextResponse.json({ error: extError }, { status: 400 })

  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUploadUrl(path)

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Errore signed URL" }, { status: 500 })
  }

  const { data: pub } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)

  return NextResponse.json({
    signedUrl: data.signedUrl,
    token: data.token,
    path: data.path,
    publicUrl: pub.publicUrl,
  })
}
