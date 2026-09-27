import RevealOnScroll from './RevealOnScroll.jsx'

const studioPromises = [
  'Stylist lắng nghe mong muốn của bạn',
  'Tư vấn dựa trên chất tóc thực tế',
  'Không gian thư thái, nhịp hẹn vừa vặn',
]

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-24 py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <RevealOnScroll className="relative min-h-[330px] sm:min-h-[440px]">
          <div className="group absolute left-0 top-0 h-[85%] w-[82%] overflow-hidden rounded-[2rem_6rem_2rem_2rem] bg-soft-surface shadow-[0_10px_32px_rgba(71,51,39,0.06)]">
            <img
              src="/images/experience-spa.jpg"
              alt="Khoảnh khắc thư giãn trong liệu trình chăm sóc tóc"
              className="h-full w-full object-cover transition duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <div className="group absolute bottom-0 right-0 h-[48%] w-[43%] overflow-hidden rounded-3xl border-[6px] border-canvas bg-soft-surface shadow-[0_18px_38px_rgba(71,51,39,0.12)]">
            <img
              src="/images/experience-cut.jpg"
              alt="Stylist chăm chút từng đường cắt"
              className="h-full w-full object-cover transition duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <p className="absolute bottom-[15%] left-4 rounded-full bg-white/95 px-4 py-2 text-xs text-ink shadow-sm sm:left-5">
            Một nghi thức nhỏ, dành cho bạn
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="pt-5 lg:pt-0" delay={80}>
          <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.24em] text-terracotta uppercase">
            Trải nghiệm Sol
          </p>
          <h2
            id="experience-title"
          className="mt-3 max-w-xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Chăm chút trong từng điểm chạm.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Từ cuộc trò chuyện đầu tiên đến cách chăm sóc sau buổi hẹn, Sol dành thời gian để hiểu chất tóc và điều bạn mong muốn.
          </p>
          <ul className="mt-6 space-y-3 border-y border-border/70 py-5 text-sm text-muted">
            {studioPromises.map((promise) => (
              <li key={promise} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta/10 text-terracotta" aria-hidden="true">✓</span>
                {promise}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-terracotta transition hover:gap-3"
          >
            Khám phá Sol <span aria-hidden="true">→</span>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  )
}
