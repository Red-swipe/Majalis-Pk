import { createClient } from '@supabase/supabase-js'

// Browser-safe credential. Two formats are supported by the Supabase API and this
// client treats both as opaque strings (it forwards the value as the `apikey`
// header), so either one is valid here:
//   - publishable key  -> "sb_publishable_..."
//   - legacy anon key  -> a JWT beginning with "eyJ"
// A service-role key must NEVER be used: it would expose a secret to the browser.
const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

const PROJECT_API_URL = /^https:\/\/([a-z0-9][a-z0-9-]*)\.supabase\.co\/?$/i

function assertUsableConfig() {
  const errors = []

  if (!url) {
    errors.push('VITE_SUPABASE_URL is not set. Copy .env.example to .env and fill it in.')
  } else if (/supabase\.com\/dashboard/i.test(url)) {
    errors.push(
      `VITE_SUPABASE_URL points at the Supabase dashboard (${url}), which is not an API endpoint. ` +
        'Use your project API URL instead: https://<project-ref>.supabase.co ' +
        '(Project Settings -> API).'
    )
  } else if (!PROJECT_API_URL.test(url)) {
    errors.push(
      `VITE_SUPABASE_URL is not a valid Supabase project API URL. ` +
        'Expected https://<project-ref>.supabase.co'
    )
  }

  if (!key) {
    errors.push('VITE_SUPABASE_ANON_KEY is not set. Copy .env.example to .env and fill it in.')
  } else if (key.startsWith('sb_secret_') || /service_role/i.test(key)) {
    errors.push(
      'VITE_SUPABASE_ANON_KEY looks like a service_role/secret key. That key bypasses RLS and ' +
        'must never be shipped to a browser. Use the publishable key or the legacy anon key.'
    )
  }

  if (errors.length > 0) {
    throw new Error(`[Supabase] Invalid configuration:\n - ${errors.join('\n - ')}`)
  }
}

assertUsableConfig()

export const supabase = createClient(url, key)
