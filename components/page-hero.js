export function PageHero({ eyebrow, title, lede }) {
  return (
    <section className="bg-navy pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8 text-center">
        {eyebrow ? (
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
            <span className="inline-block h-[1px] w-10 bg-brand-red" />
            {eyebrow}
            <span className="inline-block h-[1px] w-10 bg-brand-red" />
          </span>
        ) : null}
        <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl mx-auto">
          {title}
        </h1>
        {lede ? (
          <p className="font-body text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto mt-6">
            {lede}
          </p>
        ) : null}
      </div>
    </section>
  )
}
