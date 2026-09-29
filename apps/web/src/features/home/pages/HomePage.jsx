import EditorialSection from '../components/EditorialSection.jsx'
import ExperienceSection from '../components/ExperienceSection.jsx'
import ServicePreview from '../components/ServicePreview.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import RevealOnScroll from '../components/RevealOnScroll.jsx'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          id="home"
          aria-labelledby="home-title"
          className="pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:gap-12 lg:grid-cols-12 lg:px-8">
            <RevealOnScroll className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.26em] text-terracotta uppercase">
                Sol Hair Studio
              </p>
              <h1
                id="home-title"
                className="mt-4 max-w-xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl"
              >
                Một khoảng thời gian dành riêng cho mái tóc.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Khám phá những dịch vụ, phong cách và trải nghiệm được thiết kế để bạn cảm thấy tự tin theo cách của riêng mình.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#services"
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-terracotta px-6 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(161,79,61,0.18)] transition hover:-translate-y-0.5 hover:bg-terracotta-dark"
                >
                  Khám phá dịch vụ <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-white/70 px-6 text-sm font-medium text-ink transition hover:border-terracotta/50 hover:text-terracotta"
                >
                  Đặt lịch
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-border/70 pt-5 text-xs text-muted">
                <span className="font-display text-2xl italic text-terracotta">01</span>
                <span>Chăm chút vừa vặn với mái tóc và nhịp sống của bạn.</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="relative lg:col-span-7" delay={100}>
              <div className="relative aspect-[1.18/1] overflow-hidden rounded-[2rem_2rem_2rem_7rem] border border-border/60 bg-soft-surface shadow-[0_24px_70px_rgba(71,51,39,0.12)] sm:aspect-[1.42/1]">
                <video
                  src="/video/hero.mp4"
                  aria-label="Stylist tạo kiểu tóc tại Sol Hair Studio"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full -translate-x-[1%] scale-[1.04] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-4 max-w-[90%] rounded-2xl border border-border/70 bg-white/95 px-4 py-3 shadow-lg sm:bottom-5 sm:left-5 sm:px-5">
                <p className="text-[0.58rem] font-semibold tracking-[0.18em] text-terracotta uppercase">
                  Beauty shines within
                </p>
                <p className="mt-1 font-display text-lg text-ink sm:text-xl">
                  Chạm vào phiên bản tự tin hơn.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <ServicePreview />
        <ExperienceSection />
        <EditorialSection />

        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <RevealOnScroll className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-terracotta px-6 py-9 text-white shadow-[0_18px_55px_rgba(91,47,37,0.17)] sm:flex-row sm:items-center sm:px-10 sm:py-12 lg:px-14">
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-white/75 uppercase">
                Your time at Sol
              </p>
              <h2 className="mt-2 max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl">
                Mái tóc mới bắt đầu từ một cuộc hẹn.
              </h2>
              <p className="mt-3 text-sm text-white/80 sm:text-base">
                Chọn stylist và thời gian phù hợp với bạn.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-full bg-canvas px-6 text-sm font-medium text-ink transition hover:bg-white lg:self-auto"
            >
              Đặt lịch tại Sol <span aria-hidden="true">→</span>
            </a>
          </RevealOnScroll>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
