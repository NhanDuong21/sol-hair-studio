import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchHealth, normalizeBaseUrl, type HealthPayload } from './api'
import './App.css'

type RequestState =
  | { kind: 'loading' }
  | { kind: 'success'; data: HealthPayload }
  | { kind: 'error'; message: string }

function App() {
  const apiBaseUrl = useMemo(
    () =>
      normalizeBaseUrl(
        import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000',
      ),
    [],
  )
  const [requestState, setRequestState] = useState<RequestState>({
    kind: 'loading',
  })

  const checkApi = useCallback(
    async (signal?: AbortSignal) => {
      setRequestState({ kind: 'loading' })

      try {
        const data = await fetchHealth(apiBaseUrl, signal)
        setRequestState({ kind: 'success', data })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return

        setRequestState({
          kind: 'error',
          message:
            error instanceof Error ? error.message : 'Không thể kết nối API.',
        })
      }
    },
    [apiBaseUrl],
  )

  useEffect(() => {
    const controller = new AbortController()

    void (async () => {
      try {
        const data = await fetchHealth(apiBaseUrl, controller.signal)
        setRequestState({ kind: 'success', data })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return

        setRequestState({
          kind: 'error',
          message:
            error instanceof Error ? error.message : 'Không thể kết nối API.',
        })
      }
    })()

    return () => controller.abort()
  }, [apiBaseUrl])

  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">SOL HAIR STUDIO</p>
        <h1 id="page-title">Nền tảng dùng chung đã sẵn sàng.</h1>
        <p className="intro">
          Đây là màn hình kiểm tra kết nối giữa website React và API chung.
          Service catalog sẽ được triển khai trong issue tiếp theo.
        </p>

        <div className={`status-card status-card--${requestState.kind}`}>
          <div className="status-heading">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <p className="status-label">API health</p>
              <h2 aria-live="polite">
                {requestState.kind === 'loading' && 'Đang kiểm tra…'}
                {requestState.kind === 'success' && 'Đã kết nối'}
                {requestState.kind === 'error' && 'Chưa kết nối'}
              </h2>
            </div>
          </div>

          {requestState.kind === 'success' && (
            <dl>
              <div>
                <dt>Service</dt>
                <dd>{requestState.data.service}</dd>
              </div>
              <div>
                <dt>Database</dt>
                <dd>{requestState.data.database}</dd>
              </div>
            </dl>
          )}

          {requestState.kind === 'error' && (
            <p className="error-message">{requestState.message}</p>
          )}

          <div className="status-footer">
            <code>{apiBaseUrl}/api/health</code>
            <button type="button" onClick={() => void checkApi()}>
              Kiểm tra lại
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
