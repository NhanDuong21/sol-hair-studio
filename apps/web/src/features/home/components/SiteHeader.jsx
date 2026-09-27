const links = [
  { href: '#services', label: 'Dịch vụ' },
  { href: '#experience', label: 'Trải nghiệm' },
  { href: '#stories', label: 'Góc Sol' },
]

function Brand() {
  return (
    <a href="#home" className="flex items-center gap-3" aria-label="Sol Hair Studio — Trang chủ">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-terracotta/20 bg-white/70 font-display text-2xl italic text-terracotta">
        S
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.2rem] font-semibold tracking-[0.2em] text-ink sm:text-[1.35rem]">
          SOL HAIR STUDIO
        </span>
        <span className="mt-1 block text-[0.55rem] font-medium tracking-[0.32em] text-muted">
          BEAUTY SHINES WITHIN
        </span>
      </span>
    </a>
  )
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Brand />
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/75 transition hover:text-terracotta"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white transition hover:bg-terracotta-dark"
          >
            Đặt lịch
          </a>
        </nav>
        <details className="group relative lg:hidden">
          <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-border text-ink [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Mở điều hướng</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <nav
            aria-label="Điều hướng chính trên điện thoại"
            className="absolute right-0 top-12 grid min-w-52 gap-1 rounded-2xl border border-border bg-white p-2 shadow-xl"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-sm text-ink transition hover:bg-soft-surface"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-terracotta transition hover:bg-soft-surface"
            >
              Đặt lịch
            </a>
          </nav>
        </details>
      </div>
    </header>
  )
}
