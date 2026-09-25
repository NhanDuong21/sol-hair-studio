function normalizeBaseUrl(value) {
  return value.trim().replace(/\/+$/, '')
}

export const apiBaseUrl = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000',
)
