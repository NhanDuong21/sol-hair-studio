import { requestJson } from '../../../lib/http.js'

export function fetchHealth(apiBaseUrl, { signal } = {}) {
  return requestJson('/api/health', { baseUrl: apiBaseUrl, signal })
}

export function getHealthErrorMessage(error) {
  return error instanceof Error ? error.message : 'Không thể kết nối API.'
}
