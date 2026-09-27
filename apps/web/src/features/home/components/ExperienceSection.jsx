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
      className="scroll-mt-24 py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="overflow-hidden rounded-[34%_34%_24px_24px] bg-soft-surface">
            <img
              src="/images/experience-spa.jpg"
              alt="Khoảnh khắc thư giãn trong liệu trình chăm sóc tóc"
              className="aspect-[0.92] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 right-0 w-[43%] overflow-hidden rounded-[22px] border-[7px] border-canvas shadow-xl sm:-right-5">
            <img
              src="/images/experience-cut.jpg"
              alt="Stylist chăm chút từng đường cắt"
              className="aspect-[0.9] w-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="absolute bottom-3 left-3 rounded-full bg-white/95 px-4 py-2 text-xs text-ink shadow-sm sm:bottom-5 sm:left-5">
            Một nghi thức nhỏ, dành cho bạn
          </p>
        </div>

        <div className="pt-5 lg:pt-0">
          <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.24em] text-terracotta uppercase">
            Trải nghiệm Sol
          </p>
          <h2
            id="experience-title"
            className="max-w-[620px] font-display text-4xl leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Chăm chút trong từng điểm chạm.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            Từ cuộc trò chuyện đầu tiên đến cách chăm sóc sau buổi hẹn, Sol dành thời gian để hiểu chất tóc và điều bạn mong muốn.
          </p>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {studioPromises.map((promise) => (
              <li key={promise} className="flex items-center gap-3 py-4 text-sm text-ink/80">
                <span className="text-terracotta" aria-hidden="true">✓</span>
                {promise}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-terracotta transition hover:gap-3"
          >
            Khám phá Sol <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
