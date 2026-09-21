export const DEFAULT_HEALTH_TIMEOUT_MS = 8_000

export function normalizeBaseUrl(value) {
  return value.trim().replace(/\/+$/, '')
}

export function isAbortError(error) {
  return error instanceof Error && error.name === 'AbortError'
}

export function getHealthErrorMessage(error) {
  return error instanceof Error ? error.message : 'Không thể kết nối API.'
}

export function createLatestRequest() {
  let requestId = 0
  let activeController

  return {
    async run(request) {
      const currentRequestId = ++requestId
      activeController?.abort()
      const controller = new AbortController()
      activeController = controller

      try {
        const value = await request(controller.signal)
        if (currentRequestId !== requestId) return { kind: 'ignored' }
        return { kind: 'success', value }
      } catch (error) {
        if (currentRequestId !== requestId || isAbortError(error)) {
          return { kind: 'ignored' }
        }
        return { kind: 'error', error }
      } finally {
        if (currentRequestId === requestId) activeController = undefined
      }
    },
    cancel() {
      requestId += 1
      activeController?.abort()
      activeController = undefined
    },
  }
}

export async function fetchHealth(
  apiBaseUrl,
  { signal, timeoutMs = DEFAULT_HEALTH_TIMEOUT_MS } = {},
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
      normalizeBaseUrl(apiBaseUrl) + '/api/health',
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
