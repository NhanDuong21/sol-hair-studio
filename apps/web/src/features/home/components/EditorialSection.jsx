import RevealOnScroll from './RevealOnScroll.jsx'

const stories = [
  {
    image: '/images/editorial-milktea.jpg',
    title: 'Sắc nâu ấm trở lại với vẻ đẹp tự nhiên, dễ chăm sóc',
    description:
      'Những sắc nâu dịu và giàu chiều sâu mang đến thay đổi vừa đủ, tôn làn da mà vẫn giữ nét riêng.',
  },
  {
    image: '/images/experience-cut.jpg',
    title: 'Layer mềm và chuyển động nhẹ cho mái tóc hàng ngày',
    description:
      'Một phom cắt được cân chỉnh theo gương mặt giúp tóc vào nếp tự nhiên, không cần tạo kiểu cầu kỳ.',
  },
  {
    image: '/images/editorial-color.jpg',
    title: 'Chăm sóc mái tóc sau nhuộm để màu luôn mềm bóng',
    description:
      'Từ cách gội đến dưỡng ẩm, vài thói quen nhỏ sẽ giúp màu tóc bền đẹp và bề mặt tóc óng khỏe hơn.',
  },
]

export default function EditorialSection() {
  return (
    <section
      id="stories"
      aria-labelledby="stories-title"
      className="scroll-mt-24 bg-white/70 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="mb-8 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.24em] text-terracotta uppercase">
              Góc Sol
            </p>
            <h2
              id="stories-title"
              className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              Xu hướng & cảm hứng.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Những câu chuyện, kiểu tóc và xu hướng đang được quan tâm.
            </p>
          </div>
          <span className="mb-1 hidden text-xs text-muted sm:block">Gợi ý biên tập mẫu</span>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {stories.map((story, index) => (
            <RevealOnScroll key={story.title} delay={index * 80}>
              <article>
                <div className="group overflow-hidden rounded-[20px] bg-soft-surface">
                  <img
                    src={story.image}
                    alt=""
                    className="aspect-[1.6] w-full object-cover transition duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-[0.62rem] font-semibold tracking-[0.19em] text-muted uppercase">
                  Nội dung mẫu · Góc Sol
                </p>
                <h3 className="mt-2 font-display text-xl leading-tight text-ink sm:text-2xl">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{story.description}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
