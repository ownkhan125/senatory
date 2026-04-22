import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      <Image
        src="https://picsum.photos/1920/1080"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top -z-20"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/40" />

      <div className="relative mx-auto w-full max-w-brand-container px-6 md:px-8 pt-32 pb-28 md:pt-40 md:pb-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-6">
            <span className="inline-block h-[1px] w-10 bg-brand-red" />
            Senator &mdash; U.S. Congress
          </span>

          <h1 className="font-heading font-extrabold text-white leading-[1.02] text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] tracking-tight mb-6">
            No more waiting.
            <br />
            <em className="text-brand-red">Real action.</em>
          </h1>

          <p className="font-body text-base md:text-lg text-white/80 max-w-xl leading-relaxed mb-10">
            A stronger economy. Transparent governance. Opportunity in every district. Read the plan, volunteer with the campaign, and help us deliver results communities can measure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark active:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
            >
              Volunteer
            </Link>
            <Link
              href="#policies"
              className="inline-flex items-center justify-center gap-2 border-[1.5px] border-white/60 hover:border-white bg-transparent hover:bg-white/10 text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              Read The Plan
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300 ease-brand"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </a>
    </section>
  );
}
