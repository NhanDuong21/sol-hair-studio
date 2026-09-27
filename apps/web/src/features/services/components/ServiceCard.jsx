const serviceImages = {
  'cat-va-tao-kieu': '/images/service-cut-style.png',
  'nhuom-thoi-trang': '/images/service-color.png',
  'hair-spa-phuc-hoi': '/images/service-spa.png',
}

const currencyFormatter = new Intl.NumberFormat('vi-VN')

export default function ServiceCard({ service }) {
  const { min, max } = service.durationMinutes

  return (
    <article className="group rounded-[22px] border border-border/80 bg-white p-3 shadow-[0_10px_32px_rgba(71,51,39,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(71,51,39,0.12)] sm:p-4">
      <div className="overflow-hidden rounded-[16px] bg-soft-surface">
        <img
          src={service.imageUrl ?? serviceImages[service.slug] ?? '/images/service-cut-style.png'}
          alt={service.name}
          className="aspect-[1.55] w-full object-cover transition duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="flex items-start justify-between gap-3 px-1 pb-1 pt-4">
        <div>
          <h3 className="font-display text-[1.55rem] leading-tight text-ink sm:text-[1.7rem]">
            {service.name}
          </h3>
          <p className="mt-2 text-xs text-muted sm:text-sm">
            {min}–{max} phút
          </p>
          <p className="mt-1 font-semibold text-terracotta">
            {currencyFormatter.format(service.priceVnd)}đ
          </p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-terracotta transition group-hover:border-terracotta group-hover:bg-terracotta group-hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </article>
  )
}
