export type HealthPayload = {
  status: 'ok'
  service: string
  database: 'connected' | 'disconnected' | 'not-configured'
  timestamp: string
}

export function normalizeBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, '')
}

export async function fetchHealth(
  apiBaseUrl: string,
  signal?: AbortSignal,
): Promise<HealthPayload> {
  const response = await fetch(`${normalizeBaseUrl(apiBaseUrl)}/api/health`, {
    signal,
  })

  if (!response.ok) {
    throw new Error(`API trả về HTTP ${response.status}.`)
  }

  return (await response.json()) as HealthPayload
}
