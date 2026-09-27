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
      className="scroll-mt-24 bg-white/70 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-9 flex items-end justify-between gap-6 sm:mb-12">
          <div>
            <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.24em] text-terracotta uppercase">
              Góc Sol
            </p>
            <h2
              id="stories-title"
              className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Xu hướng & cảm hứng.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Những câu chuyện, kiểu tóc và xu hướng đang được quan tâm.
            </p>
          </div>
          <span className="mb-1 hidden text-xs text-muted sm:block">Gợi ý biên tập mẫu</span>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <article key={story.title}>
              <div className="overflow-hidden rounded-[20px] bg-soft-surface">
                <img
                  src={story.image}
                  alt=""
                  className="aspect-[1.34] w-full object-cover transition duration-500 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-[0.62rem] font-semibold tracking-[0.19em] text-muted uppercase">
                Nội dung mẫu · Góc Sol
              </p>
              <h3 className="mt-2 font-display text-[1.7rem] leading-tight text-ink sm:text-[1.9rem]">
                {story.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{story.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
