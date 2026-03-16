import { createClient } from "@supabase/supabase-js"

// Solo server-side — usato per upload/delete file su Storage
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)
