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

export default function HealthStatusCard({ state, endpoint, onRetry }) {
  return (
    <div className="rounded-[22px] border border-[#ded6cb] bg-white/80 p-[22px] shadow-[0_22px_60px_rgba(72,49,38,0.11)] backdrop-blur-md sm:p-7">
      <div className="flex items-center gap-[18px]">
        <span
          className={`h-3.5 w-3.5 shrink-0 rounded-full ring-[7px] ${statusStyles[state.kind]}`}
          aria-hidden="true"
        />
        <div>
          <p className="mb-[3px] text-[0.82rem] tracking-[0.08em] text-[#716d69] uppercase">
            Trạng thái API
          </p>
          <h2 className="text-xl font-bold" aria-live="polite">
            {getStatusTitle(state.kind)}
          </h2>
        </div>
      </div>

      {state.kind === 'success' && (
        <dl className="my-[26px] grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-[14px] bg-[#f4efe8] px-4 py-3.5">
            <dt className="text-[0.78rem] text-[#716d69]">Dịch vụ</dt>
            <dd className="mt-[3px] font-bold text-[#22201f]">
              {state.data.service}
            </dd>
          </div>
          <div className="rounded-[14px] bg-[#f4efe8] px-4 py-3.5">
            <dt className="text-[0.78rem] text-[#716d69]">Cơ sở dữ liệu</dt>
            <dd className="mt-[3px] font-bold text-[#22201f]">
              {state.data.database}
            </dd>
          </div>
        </dl>
      )}

      {state.kind === 'error' && (
        <p className="my-6 text-[#b23a36]">{state.message}</p>
      )}

      <div className="mt-6 flex flex-col items-stretch justify-between gap-[18px] border-t border-[#ded6cb] pt-[18px] sm:flex-row sm:items-center">
        <code className="break-all text-[0.82rem] text-[#716d69] sm:break-words">
          {endpoint}
        </code>
        <button
          type="button"
          onClick={onRetry}
          disabled={state.kind === 'loading'}
          className="shrink-0 cursor-pointer rounded-full bg-[#8d4939] px-[15px] py-2.5 font-bold text-white transition-colors hover:bg-[#74392d] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#8d4939]/35 disabled:cursor-wait disabled:opacity-60"
        >
          Kiểm tra lại
        </button>
      </div>
    </div>
  )
}
