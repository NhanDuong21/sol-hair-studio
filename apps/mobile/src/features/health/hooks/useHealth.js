import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiBaseUrl } from '../../../config/env.js'
import { createLatestRequest } from '../../../lib/latest-request.js'
import { fetchHealth, getHealthErrorMessage } from '../api/health.api.js'

export function useHealth() {
  const [state, setState] = useState({ kind: 'loading' })
  const requestManager = useMemo(() => createLatestRequest(), [])

  const loadHealth = useCallback(async () => {
    const result = await requestManager.run((signal) =>
      fetchHealth(apiBaseUrl, { signal }),
    )

    if (result.kind === 'success') {
      setState({ kind: 'success', data: result.value })
    } else if (result.kind === 'error') {
      setState({ kind: 'error', message: getHealthErrorMessage(result.error) })
    }
  }, [requestManager])

  const retry = useCallback(() => {
    if (state.kind === 'loading') return
    setState({ kind: 'loading' })
    void loadHealth()
  }, [loadHealth, state.kind])

  useEffect(() => {
    const initialRequest = setTimeout(() => {
      void loadHealth()
    }, 0)

    return () => {
      clearTimeout(initialRequest)
      requestManager.cancel()
    }
  }, [loadHealth, requestManager])

  return { state, retry }
}
