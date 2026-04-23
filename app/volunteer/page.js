import Link from 'next/link'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { PageHero } from '@/components/page-hero'
import { VolunteerSignupForm } from '@/components/volunteer-signup-form'

export const metadata = {
  title: 'Volunteer — Senator Campaign',
  description: 'Your energy fuels this movement. Join the team: knock doors, make calls, host events, or lend your skills.',
}

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Volunteer"
          title="Your energy fuels this movement."
          lede="Whether you have five hours or fifty, your time makes a measurable difference in every community we serve."
        />

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-2">
                <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                  <span className="inline-block h-[1px] w-10 bg-brand-red" />
                  Every Door Knocked Matters
                </span>
                <h2 className="font-heading font-bold text-ink text-3xl md:text-4xl leading-tight mb-6">
                  Join the team.
                </h2>
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                  This campaign runs on people, not PAC money. Whether you have five hours or fifty, your time makes a measurable difference in every neighborhood we serve.
                </p>
                <blockquote className="border-l-[3px] border-brand-red pl-6 py-1 my-6">
                  <p className="font-heading italic text-lg md:text-xl text-ink leading-snug">
                    &ldquo;I knocked my first door at twenty-two. If I can do it, anyone can.&rdquo;
                  </p>
                </blockquote>
                <ul className="flex flex-col gap-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>On-site training — no experience required.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>Flexible shifts: one-off, weekly, or on-call.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>Remote options available — phone banking, digital, research.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-3">
                <VolunteerSignupForm />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8 text-center">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
              <span className="inline-block h-[1px] w-10 bg-brand-red" />
              Not Ready To Volunteer?
            </span>
            <h2 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight max-w-3xl mx-auto mb-6">
              Donate instead.
            </h2>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              Every dollar fuels grassroots organizing across the district. No corporate PAC money. No special-interest strings. Just neighbors backing a candidate who will answer to them.
            </p>
            <Link
              href="/#donate"
              className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-8 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow"
            >
              Donate Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
