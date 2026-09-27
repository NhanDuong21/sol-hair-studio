import { useServices } from '../../services/hooks/useServices.js'
import ServiceCard from '../../services/components/ServiceCard.jsx'
import RevealOnScroll from './RevealOnScroll.jsx'

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
      className="scroll-mt-24 bg-soft-surface/75 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.24em] text-terracotta uppercase">
              Dịch vụ tại Sol
            </p>
            <h2
              id="services-title"
              className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Dịch vụ dành cho bạn.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Bắt đầu từ điều mái tóc bạn đang cần.
            </p>
          </div>
          <a
            href="#services-list"
              className="inline-flex min-h-11 self-start items-center gap-2 text-sm text-ink/70 transition hover:text-terracotta sm:self-auto"
          >
            Xem tất cả dịch vụ <span aria-hidden="true">→</span>
          </a>
        </RevealOnScroll>

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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {state.data.map((service, index) => (
                <RevealOnScroll key={service.id} delay={index * 80}>
                  <ServiceCard service={service} />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
