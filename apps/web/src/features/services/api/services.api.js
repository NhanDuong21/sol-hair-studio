import { requestJson } from '../../../lib/http.js'

export async function fetchServices(apiBaseUrl, { signal } = {}) {
  const response = await requestJson('/api/services', {
    baseUrl: apiBaseUrl,
    signal,
  })

  return response.data
}

export function getServicesErrorMessage(error) {
  return error instanceof Error ? error.message : 'Không thể tải danh mục dịch vụ.'
}
