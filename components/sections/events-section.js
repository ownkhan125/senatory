import Link from 'next/link'
import { MapPin, Clock } from 'lucide-react'
import { fetchGHLEvents } from '@/lib/ghl'

export async function EventsSection() {
  const all = await fetchGHLEvents()
  const events = all.slice(0, 3)

  if (events.length === 0) {
    return (
      <section id="events" className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-brand-container px-6 md:px-8 text-center">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
            <span className="inline-block h-[1px] w-10 bg-brand-red" />
            Join Us
          </span>
          <h2 className="font-heading font-bold text-ink text-4xl md:text-5xl leading-tight mb-6">
            Upcoming Events
          </h2>
          <p className="font-body text-gray-600 max-w-xl mx-auto mb-8">
            New events across Oregon are being scheduled. Sign up to volunteer and we&apos;ll let you know as soon as they&apos;re announced.
          </p>
          <Link
            href="/volunteer"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow"
          >
            Volunteer
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-brand-container px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
            <span className="inline-block h-[1px] w-10 bg-brand-red" />
            Join Us
          </span>
          <h2 className="font-heading font-bold text-ink text-4xl md:text-5xl leading-tight">
            Upcoming Events
          </h2>
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          {events.map((evt) => {
            const timeRange = evt.endTime ? `${evt.time} — ${evt.endTime}` : evt.time
            return (
              <div
                key={evt.id}
                className="group relative flex flex-col md:flex-row md:items-stretch gap-5 md:gap-6 bg-white hover:bg-paper-alt border border-gray-200 hover:border-gray-300 rounded-brand-lg p-5 md:p-6 shadow-brand-sm hover:shadow-brand-md transition-all duration-300 ease-brand overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-brand"
                />

                <div className="relative flex-shrink-0 w-full md:w-56 h-40 md:h-36 rounded-brand-md overflow-hidden bg-navy">
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
                  <div className="absolute bottom-3 left-3 flex flex-col items-center justify-center w-14 h-14 bg-brand-red rounded-brand-sm shadow-brand-red-glow">
                    <span className="font-heading font-extrabold text-white text-xl leading-none">
                      {evt.date.day}
                    </span>
                    <span className="font-body text-[9px] font-semibold uppercase tracking-[0.18em] text-white mt-0.5">
                      {evt.date.month}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-heading font-bold text-ink text-xl md:text-2xl leading-tight mb-3">
                    {evt.title}
                  </h3>
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

                <div className="flex-shrink-0">
                  <Link
                    href={`/events/${evt.id}`}
                    className="inline-flex items-center justify-center gap-2 border-[1.5px] border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-sm font-semibold px-5 py-2.5 rounded-brand-md transition-all duration-300 ease-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}
