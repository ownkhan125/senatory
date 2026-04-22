import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="about" className="bg-paper py-20 md:py-32">
      <div className="mx-auto max-w-brand-container px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
              <span className="inline-block h-[1px] w-10 bg-brand-red" />
              About The Candidate
            </span>
            <h2 className="font-heading font-bold text-ink text-4xl md:text-5xl leading-tight mb-6">
              A career built on service, evidence, and results.
            </h2>
            <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              From county council to the national stage, our senator has championed transparent governance, pragmatic economic policy, and direct investment in communities across every district. Fifteen years of public service and a record you can audit line by line.
            </p>
            <blockquote className="border-l-[3px] border-brand-red pl-6 py-1 my-8">
              <p className="font-heading italic text-xl md:text-2xl text-ink leading-snug">
                &ldquo;Governance is not a promise. It is a contract &mdash; measured, public, and kept.&rdquo;
              </p>
            </blockquote>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-[1.5px] border-gray-300 hover:border-ink bg-transparent hover:bg-paper-alt text-ink text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/20"
            >
              Read Full Biography
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -top-4 -left-4 w-24 h-24 border-t-[3px] border-l-[3px] border-brand-red"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 w-24 h-24 border-b-[3px] border-r-[3px] border-brand-red"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-brand-lg shadow-brand-lg">
              <Image
                src="https://picsum.photos/800/1000"
                alt="Candidate portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
