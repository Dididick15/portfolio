import { loadEnvFile } from "node:process"
loadEnvFile(".env.local")

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const buckets = [
  { name: "avatars", allowedMimeTypes: ["model/gltf-binary", "model/gltf+json"] },
  { name: "passion-models", allowedMimeTypes: ["model/gltf-binary", "model/gltf+json"] },
  { name: "project-images", allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"] },
]

async function setup() {
  for (const bucket of buckets) {
    const { error } = await supabase.storage.createBucket(bucket.name, {
      public: true,
      allowedMimeTypes: bucket.allowedMimeTypes,
      fileSizeLimit: bucket.name === "project-images" ? 5 * 1024 * 1024 : 10 * 1024 * 1024,
    })

    if (error?.message.includes("already exists")) {
      console.log(`✓ ${bucket.name} già esistente`)
    } else if (error) {
      console.error(`✗ ${bucket.name}:`, error.message)
    } else {
      console.log(`✓ ${bucket.name} creato`)
    }
  }
}

setup()
