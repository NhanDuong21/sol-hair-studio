function isAbortError(error) {
  return error instanceof Error && error.name === 'AbortError'
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
