import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createLatestRequest,
  fetchHealth,
  getHealthErrorMessage,
  normalizeBaseUrl,
} from './api'

const statusStyles = {
  loading: 'bg-[#b78024] ring-[#b78024]/15',
  success: 'bg-[#2f7d55] ring-[#2f7d55]/15',
  error: 'bg-[#b23a36] ring-[#b23a36]/15',
}

function getStatusTitle(kind) {
  if (kind === 'loading') return 'Đang kiểm tra…'
  if (kind === 'success') return 'Đã kết nối'
  return 'Chưa kết nối'
}

function App() {
  const apiBaseUrl = useMemo(
    () =>
      normalizeBaseUrl(
        import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000',
      ),
    [],
  )
  const [requestState, setRequestState] = useState({ kind: 'loading' })
  const requestManager = useMemo(() => createLatestRequest(), [])

  const loadHealth = useCallback(async () => {
    const result = await requestManager.run((signal) =>
      fetchHealth(apiBaseUrl, { signal }),
    )

    if (result.kind === 'success') {
      setRequestState({ kind: 'success', data: result.value })
    } else if (result.kind === 'error') {
      setRequestState({
        kind: 'error',
        message: getHealthErrorMessage(result.error),
      })
    }
  }, [apiBaseUrl, requestManager])

  const checkApi = useCallback(async () => {
    setRequestState({ kind: 'loading' })
    await loadHealth()
  }, [loadHealth])

  useEffect(() => {
    const initialRequest = setTimeout(() => {
      void loadHealth()
    }, 0)

    return () => {
      clearTimeout(initialRequest)
      requestManager.cancel()
    }
  }, [loadHealth, requestManager])

  return (
    <main className="min-h-svh min-w-80 bg-[#f7f3ed] bg-[radial-gradient(circle_at_12%_8%,#eadfd2_0,transparent_32%),radial-gradient(circle_at_88%_88%,#e4d3c7_0,transparent_28%)] px-5 py-9 font-sans text-[#22201f] sm:grid sm:place-items-center sm:py-12">
      <section className="mx-auto w-full max-w-3xl" aria-labelledby="page-title">
        <p className="mb-[18px] text-xs font-extrabold tracking-[0.18em] text-[#8d4939]">
          SOL HAIR STUDIO
        </p>
        <h1
          id="page-title"
          className="mb-[18px] max-w-[700px] font-serif text-[clamp(2.4rem,7vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.045em]"
        >
          Nền tảng dùng chung đã sẵn sàng.
        </h1>
        <p className="mb-9 max-w-2xl text-[1.08rem] text-[#716d69]">
          Đây là màn hình kiểm tra kết nối giữa website React và API chung.
          Danh mục dịch vụ sẽ được triển khai trong công việc tiếp theo trên
          Sheet.
        </p>

        <div className="rounded-[22px] border border-[#ded6cb] bg-white/80 p-[22px] shadow-[0_22px_60px_rgba(72,49,38,0.11)] backdrop-blur-md sm:p-7">
          <div className="flex items-center gap-[18px]">
            <span
              className={`h-3.5 w-3.5 shrink-0 rounded-full ring-[7px] ${statusStyles[requestState.kind]}`}
              aria-hidden="true"
            />
            <div>
              <p className="mb-[3px] text-[0.82rem] tracking-[0.08em] text-[#716d69] uppercase">
                Trạng thái API
              </p>
              <h2 className="text-xl font-bold" aria-live="polite">
                {getStatusTitle(requestState.kind)}
              </h2>
            </div>
          </div>

          {requestState.kind === 'success' && (
            <dl className="my-[26px] grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-[14px] bg-[#f4efe8] px-4 py-3.5">
                <dt className="text-[0.78rem] text-[#716d69]">Dịch vụ</dt>
                <dd className="mt-[3px] font-bold text-[#22201f]">
                  {requestState.data.service}
                </dd>
              </div>
              <div className="rounded-[14px] bg-[#f4efe8] px-4 py-3.5">
                <dt className="text-[0.78rem] text-[#716d69]">Cơ sở dữ liệu</dt>
                <dd className="mt-[3px] font-bold text-[#22201f]">
                  {requestState.data.database}
                </dd>
              </div>
            </dl>
          )}

          {requestState.kind === 'error' && (
            <p className="my-6 text-[#b23a36]">{requestState.message}</p>
          )}

          <div className="mt-6 flex flex-col items-stretch justify-between gap-[18px] border-t border-[#ded6cb] pt-[18px] sm:flex-row sm:items-center">
            <code className="break-all text-[0.82rem] text-[#716d69] sm:break-words">
              {apiBaseUrl}/api/health
            </code>
            <button
              type="button"
              onClick={() => void checkApi()}
              disabled={requestState.kind === 'loading'}
              className="shrink-0 cursor-pointer rounded-full bg-[#8d4939] px-[15px] py-2.5 font-bold text-white transition-colors hover:bg-[#74392d] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#8d4939]/35 disabled:cursor-wait disabled:opacity-60"
            >
              Kiểm tra lại
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
