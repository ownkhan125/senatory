import Link from 'next/link'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { PageHero } from '@/components/page-hero'
import { fetchGHLEvents } from '@/lib/ghl'

export const revalidate = 60

export const metadata = {
  title: 'Events — Senator Campaign',
  description: 'Town halls, community mics, and volunteer drives across Oregon. Meet us on the campaign trail.',
}

export default async function EventsPage() {
  const events = await fetchGHLEvents()

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Join Us"
          title="Upcoming Events"
          lede="Town halls, community mics, and volunteer drives across Oregon. Every event is open to the public — bring your neighbors and your questions."
        />

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="font-heading font-bold text-ink text-2xl mb-3">
                  No upcoming events scheduled
                </h3>
                <p className="font-body text-gray-600 max-w-xl mx-auto">
                  We&apos;re planning our next stops across Oregon. Check back soon or sign up to volunteer and we&apos;ll notify you when events are announced.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 md:gap-6">
                {events.map((evt) => {
                  const timeRange = evt.endTime ? `${evt.time} — ${evt.endTime}` : evt.time
                  return (
                    <Link
                      key={evt.id}
                      href={`/events/${evt.id}`}
                      className="group relative flex flex-col md:flex-row md:items-stretch gap-5 md:gap-6 bg-white hover:bg-paper-alt border border-gray-200 hover:border-brand-red/30 rounded-brand-lg p-5 md:p-6 shadow-brand-sm hover:shadow-brand-md transition-all duration-300 ease-brand overflow-hidden"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-brand"
                      />

                      <div className="relative flex-shrink-0 w-full md:w-60 h-44 md:h-auto md:self-stretch rounded-brand-md overflow-hidden bg-navy">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent"
                        />
                        <div className="absolute bottom-3 left-3 flex flex-col items-center justify-center w-16 h-16 bg-brand-red rounded-brand-sm shadow-brand-red-glow">
                          <span className="font-heading font-extrabold text-white text-2xl leading-none">
                            {evt.date.day}
                          </span>
                          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white mt-0.5">
                            {evt.date.month}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-heading font-bold text-ink text-xl md:text-2xl leading-tight mb-2">
                          {evt.title}
                        </h3>
                        {evt.description && (
                          <p className="font-body text-sm text-gray-600 leading-relaxed mb-3 max-w-2xl line-clamp-2">
                            {evt.description}
                          </p>
                        )}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-2 gap-x-5 text-sm text-gray-600">
                          {evt.location && (
                            <span className="inline-flex items-center gap-2">
                              <MapPin size={16} className="text-brand-red flex-shrink-0" />
                              {evt.location}
                            </span>
                          )}
                          {timeRange && (
                            <span className="inline-flex items-center gap-2">
                              <Clock size={16} className="text-brand-red flex-shrink-0" />
                              {timeRange}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-brand-red group-hover:gap-3 transition-all duration-300 ease-brand">
                        RSVP <ArrowRight size={16} />
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="bg-navy py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8 text-center">
            <h2 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight max-w-3xl mx-auto mb-6">
              Don&apos;t see an event near you?
            </h2>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              Sign up to volunteer and we&apos;ll keep you posted on events in your area — or host one yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow"
              >
                Volunteer
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border-[1.5px] border-white/60 hover:border-white bg-transparent hover:bg-white/10 text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5"
              >
                Host An Event
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
