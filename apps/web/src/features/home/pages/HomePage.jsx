import EditorialSection from '../components/EditorialSection.jsx'
import ExperienceSection from '../components/ExperienceSection.jsx'
import ServicePreview from '../components/ServicePreview.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          id="home"
          aria-labelledby="home-title"
          className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-12 lg:pb-24 lg:pt-20"
        >
          <div>
            <p className="mb-4 text-[0.68rem] font-semibold tracking-[0.25em] text-terracotta uppercase sm:mb-5">
              Sol Hair Studio
            </p>
            <h1
              id="home-title"
              className="max-w-[670px] font-display text-[clamp(3.2rem,8vw,6.4rem)] leading-[0.91] tracking-[-0.035em] text-ink"
            >
              Một khoảng thời gian dành riêng cho mái tóc.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:mt-7 sm:text-base sm:leading-8">
              Khám phá những dịch vụ, phong cách và trải nghiệm được thiết kế để bạn cảm thấy tự tin theo cách của riêng mình.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <a
                href="#services"
                className="inline-flex items-center gap-3 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(161,79,61,0.18)] transition hover:-translate-y-0.5 hover:bg-terracotta-dark"
              >
                Khám phá dịch vụ <span aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                className="rounded-full border border-border bg-white/70 px-6 py-3.5 text-sm font-medium text-ink transition hover:border-terracotta/50 hover:text-terracotta"
              >
                Đặt lịch
              </a>
            </div>
            <div className="mt-8 border-t border-border pt-5 text-xs text-muted sm:mt-10 sm:pt-6">
              <span className="mr-3 font-display text-lg italic text-terracotta">01</span>
              Chăm chút vừa vặn với mái tóc và nhịp sống của bạn.
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[28px] bg-soft-surface shadow-[0_24px_70px_rgba(71,51,39,0.12)] sm:rounded-[36px]">
              <img
                src="/images/hero-model.png"
                alt="Mái tóc được tạo kiểu tự nhiên tại Sol Hair Studio"
                className="aspect-[1.06] w-full object-cover sm:aspect-[1.2] lg:aspect-[1.08]"
                fetchPriority="high"
              />
            </div>
            <div className="absolute bottom-4 left-4 max-w-[82%] rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6 sm:px-5 sm:py-4">
              <p className="text-[0.58rem] font-semibold tracking-[0.18em] text-terracotta uppercase">
                Beauty shines within
              </p>
              <p className="mt-1 font-display text-lg text-ink sm:text-xl">
                Chạm vào phiên bản tự tin hơn.
              </p>
            </div>
          </div>
        </section>

        <ServicePreview />
        <ExperienceSection />
        <EditorialSection />

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto flex max-w-[1310px] flex-col justify-between gap-7 rounded-[28px] bg-terracotta px-6 py-9 text-white shadow-[0_18px_55px_rgba(91,47,37,0.17)] sm:rounded-[34px] sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:px-14 lg:py-14">
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-white/75 uppercase">
                Your time at Sol
              </p>
              <h2 className="mt-3 max-w-[650px] font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
                Mái tóc mới bắt đầu từ một cuộc hẹn.
              </h2>
              <p className="mt-3 text-sm text-white/80 sm:text-base">
                Chọn dịch vụ phù hợp với bạn.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-canvas px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white lg:self-auto"
            >
              Đặt lịch tại Sol <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
