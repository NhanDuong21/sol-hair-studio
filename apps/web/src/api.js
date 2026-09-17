export function normalizeBaseUrl(value) {
  return value.trim().replace(/\/+$/, '')
}

export async function fetchHealth(apiBaseUrl, signal) {
  const response = await fetch(`${normalizeBaseUrl(apiBaseUrl)}/api/health`, {
    signal,
  })

  if (!response.ok) {
    throw new Error(`API trả về HTTP ${response.status}.`)
  }

  return response.json()
}
