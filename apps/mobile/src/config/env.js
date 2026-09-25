function normalizeBaseUrl(value) {
  return value.trim().replace(/\/+$/, '')
}

export const apiBaseUrl = normalizeBaseUrl(
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
)
