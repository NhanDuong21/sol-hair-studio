const footerLinks = [
  { href: '#services', label: 'Dịch vụ tạo kiểu & chăm sóc' },
  { href: '#contact', label: 'Đặt lịch cùng stylist' },
]

export default function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border bg-soft-surface/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.4fr_1fr_0.8fr] lg:px-8 lg:py-20">
        <div>
          <p className="font-display text-2xl font-semibold tracking-[0.2em] text-ink">
            SOL HAIR STUDIO
          </p>
          <p className="mt-1 text-[0.6rem] font-medium tracking-[0.3em] text-muted">
            BEAUTY SHINES WITHIN
          </p>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            Không gian chăm sóc tóc thư thái, chuẩn mực nghệ thuật và tôn vinh cá tính tự nhiên. Mỗi trải nghiệm tại Sol là một cuộc hẹn với sự tự tin của chính bạn.
          </p>
          <p className="mt-4 font-display text-lg italic text-terracotta">
            More than a haircut — it’s your ritual.
          </p>
        </div>

        <div>
          <h2 className="text-[0.68rem] font-semibold tracking-[0.2em] text-ink uppercase">
            Salon & giờ mở cửa
          </h2>
          <address className="mt-5 space-y-4 text-sm not-italic leading-6 text-muted">
            <p>128 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</p>
            <p>Thứ 2 – Chủ Nhật: 09:00 – 20:30</p>
            <p>
              Hotline: <a href="tel:0908123456" className="text-ink transition hover:text-terracotta">0908 123 456</a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-[0.68rem] font-semibold tracking-[0.2em] text-ink uppercase">
            Điều hướng
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-terracotta">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/80 px-5 py-5 text-center text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} Sol Hair Studio. Beauty Shines Within.
      </div>
    </footer>
  )
}
