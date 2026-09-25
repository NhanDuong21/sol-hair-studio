export const DEFAULT_REQUEST_TIMEOUT_MS = 8_000

export function normalizeBaseUrl(value) {
  return value.trim().replace(/\/+$/, '')
}

export async function requestJson(
  path,
  {
    baseUrl,
    signal,
    timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
  } = {},
) {
  const controller = new AbortController()
  let didTimeout = false
  const abortFromCaller = () => controller.abort()

  if (signal?.aborted) controller.abort()
  else signal?.addEventListener('abort', abortFromCaller, { once: true })

  const timeoutId = setTimeout(() => {
    didTimeout = true
    controller.abort()
  }, timeoutMs)

  try {
    const response = await fetch(
      normalizeBaseUrl(baseUrl) + path,
      { signal: controller.signal },
    )

    if (!response.ok) {
      throw new Error('API trả về HTTP ' + response.status + '.')
    }

    return await response.json()
  } catch (error) {
    if (didTimeout) {
      throw new Error(
        'Yêu cầu kiểm tra API đã hết thời gian chờ. Vui lòng thử lại.',
        { cause: error },
      )
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abortFromCaller)
  }
}
