import { useServices } from '../../services/hooks/useServices.js'
import ServiceCard from '../../services/components/ServiceCard.jsx'

function LoadingCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-label="Đang tải dịch vụ">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-[22px] border border-border/70 bg-white p-3 sm:p-4"
          aria-hidden="true"
        >
          <div className="aspect-[1.55] rounded-[16px] bg-soft-surface" />
          <div className="mt-5 h-6 w-3/5 rounded bg-soft-surface" />
          <div className="mt-3 h-4 w-2/5 rounded bg-soft-surface" />
          <div className="mt-3 h-4 w-1/3 rounded bg-soft-surface" />
        </div>
      ))}
    </div>
  )
}

export default function ServicePreview() {
  const { state, retry } = useServices()

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 bg-soft-surface/75 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.24em] text-terracotta uppercase">
              Dịch vụ tại Sol
            </p>
            <h2
              id="services-title"
              className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Dịch vụ dành cho bạn.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Bắt đầu từ điều mái tóc bạn đang cần.
            </p>
          </div>
          <a
            href="#services-list"
            className="mb-1 hidden shrink-0 items-center gap-2 text-sm text-ink/70 transition hover:text-terracotta sm:flex"
          >
            Xem tất cả dịch vụ <span aria-hidden="true">→</span>
          </a>
        </div>

        <div id="services-list" aria-live="polite" aria-busy={state.kind === 'loading'}>
          {state.kind === 'loading' && <LoadingCards />}
          {state.kind === 'error' && (
            <div className="rounded-2xl border border-terracotta/20 bg-white p-6 text-center sm:p-10">
              <p className="text-ink">Chưa thể tải danh mục dịch vụ.</p>
              <p className="mt-2 text-sm text-muted">{state.message}</p>
              <button
                type="button"
                onClick={retry}
                className="mt-5 rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white transition hover:bg-terracotta-dark focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-terracotta/35"
              >
                Thử lại
              </button>
            </div>
          )}
          {state.kind === 'success' && state.data.length === 0 && (
            <div className="rounded-2xl border border-border bg-white p-8 text-center text-muted sm:p-12">
              Danh mục dịch vụ đang được cập nhật. Vui lòng quay lại sau.
            </div>
          )}
          {state.kind === 'success' && state.data.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {state.data.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
