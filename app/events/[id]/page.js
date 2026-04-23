import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Clock, CalendarDays, ArrowRight, ArrowLeft, Tag } from 'lucide-react'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { EventRsvpForm } from '@/components/event-rsvp-form'
import { ShareStrip } from '@/components/share-strip'
import { fetchGHLEvent, fetchGHLEvents } from '@/lib/ghl'

export const revalidate = 60

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const formatDateLong = (date) => {
  if (!date?.raw) return ''
  const d = new Date(`${date.raw}T00:00:00`)
  if (Number.isNaN(d.getTime())) return ''
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS_FULL[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

const formatTimeRange = (time, endTime) => {
  if (time && endTime) return `${time} — ${endTime} PT`
  if (time) return `${time} PT`
  return ''
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const evt = await fetchGHLEvent(id)
  if (!evt) return { title: 'Event — Senator Campaign' }
  return {
    title: `${evt.title} — Senator Campaign`,
    description: evt.description || `Join us for ${evt.title} in Oregon.`,
  }
}

export default async function EventDetailPage({ params }) {
  const { id } = await params
  const evt = await fetchGHLEvent(id)
  if (!evt) notFound()

  const all = await fetchGHLEvents()
  const more = all.filter((e) => e.id !== evt.id).slice(0, 4)

  const dateLong = formatDateLong(evt.date)
  const timeRange = formatTimeRange(evt.time, evt.endTime)

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-navy pt-32 pb-14 md:pt-40 md:pb-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${evt.image})` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-navy/80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/45"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_80%_20%,#dd131a_0%,transparent_45%)]"
          />
          <div className="relative mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={14} />
              All Events
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-brand-red rounded-brand-md shadow-brand-red-glow">
                <span className="font-heading font-extrabold text-white text-3xl sm:text-4xl leading-none">
                  {evt.date.day}
                </span>
                <span className="font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 mt-0.5">
                  {evt.date.month}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                {evt.type && (
                  <span className="inline-flex items-center gap-2 bg-brand-red/15 border border-brand-red/40 text-brand-red text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full mb-4">
                    <Tag size={12} />
                    {evt.type}
                  </span>
                )}
                <h1 className="font-heading font-extrabold text-white text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
                  {evt.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-3">
                <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-4">
                  <span className="inline-block h-[1px] w-10 bg-brand-red" />
                  About This Event
                </span>
                <h2 className="font-heading font-bold text-ink text-3xl md:text-4xl leading-tight mb-6">
                  Event <em className="text-brand-red not-italic">Details</em>
                </h2>
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {evt.description || 'More details coming soon. RSVP to reserve your spot and we\'ll send updates as they\'re finalized.'}
                </p>
              </div>

              <aside className="lg:col-span-2 lg:sticky lg:top-24">
                <div className="relative bg-white border border-gray-200 rounded-brand-lg p-6 md:p-7 shadow-brand-md">
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 -right-3 w-16 h-16 border-t-[3px] border-r-[3px] border-brand-red"
                  />
                  <h3 className="font-heading font-bold text-ink text-lg uppercase tracking-[0.14em] mb-5">
                    Event Info
                  </h3>
                  <ul className="flex flex-col gap-5 mb-6">
                    {dateLong && (
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-brand-md bg-brand-red-soft text-brand-red">
                          <CalendarDays size={18} />
                        </span>
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-0.5">Date</div>
                          <div className="text-sm text-ink font-medium">{dateLong}</div>
                        </div>
                      </li>
                    )}
                    {timeRange && (
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-brand-md bg-brand-red-soft text-brand-red">
                          <Clock size={18} />
                        </span>
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-0.5">Time</div>
                          <div className="text-sm text-ink font-medium">{timeRange}</div>
                        </div>
                      </li>
                    )}
                    {evt.location && (
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-brand-md bg-brand-red-soft text-brand-red">
                          <MapPin size={18} />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-0.5">Location</div>
                          <div className="text-sm text-ink font-medium">{evt.location}</div>
                        </div>
                      </li>
                    )}
                    {evt.type && (
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-brand-md bg-brand-red-soft text-brand-red">
                          <Tag size={18} />
                        </span>
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-0.5">Type</div>
                          <div className="text-sm text-ink font-medium">{evt.type}</div>
                        </div>
                      </li>
                    )}
                  </ul>
                  <a
                    href="#rsvp"
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold py-3 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow"
                  >
                    RSVP Now
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="rsvp" className="bg-navy py-20 md:py-28 scroll-mt-20">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-2">
                <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-4">
                  <span className="inline-block h-[1px] w-10 bg-brand-red" />
                  RSVP
                </span>
                <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-5">
                  Reserve Your <em className="text-brand-red not-italic">Spot</em>
                </h2>
                <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-8">
                  Fill in your details to confirm attendance. No tickets required — your RSVP helps us plan for the right number of attendees.
                </p>
                <ul className="flex flex-col gap-4 text-sm text-white/85">
                  {dateLong && (
                    <li className="flex items-start gap-3">
                      <CalendarDays size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                      <span>{dateLong}</span>
                    </li>
                  )}
                  {timeRange && (
                    <li className="flex items-start gap-3">
                      <Clock size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                      <span>{timeRange}</span>
                    </li>
                  )}
                  {evt.location && (
                    <li className="flex items-start gap-3">
                      <MapPin size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="block font-medium text-white">{evt.location}</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="lg:col-span-3">
                <EventRsvpForm
                  eventTitle={evt.title}
                  eventDate={dateLong}
                  eventTime={timeRange}
                  eventCategory={evt.type}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-red py-10 md:py-12">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8 text-center">
            <h2 className="font-heading font-bold text-white text-xl sm:text-2xl md:text-3xl mb-5 md:mb-6 tracking-wide uppercase">
              Spread the Word
            </h2>
            <ShareStrip title={evt.title} />
          </div>
        </section>

        {more.length > 0 && (
          <section className="bg-navy py-20 md:py-24">
            <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
              <div className="mb-10 md:mb-12">
                <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-3">
                  <span className="inline-block h-[1px] w-10 bg-brand-red" />
                  Don&apos;t Miss
                </span>
                <h2 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight">
                  More <em className="text-brand-red not-italic">Events</em>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {more.map((e) => (
                  <Link
                    key={e.id}
                    href={`/events/${e.id}`}
                    className="group flex gap-5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 rounded-brand-lg p-5 transition-all duration-300 ease-brand overflow-hidden"
                  >
                    <div className="relative flex-shrink-0 w-28 sm:w-32 h-28 sm:h-32 rounded-brand-md overflow-hidden bg-navy">
                      <img
                        src={e.image}
                        alt={e.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.05]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent"
                      />
                      <div className="absolute bottom-2 left-2 flex flex-col items-center justify-center w-12 h-12 bg-brand-red rounded-[6px] shadow-brand-red-glow">
                        <span className="font-heading font-extrabold text-white text-lg leading-none">{e.date.day}</span>
                        <span className="font-body text-[8px] font-semibold uppercase tracking-[0.18em] text-white mt-0.5">{e.date.month}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      {e.type && <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red mb-1">{e.type}</span>}
                      <h3 className="font-heading font-bold text-white text-lg mb-1 leading-tight">{e.title}</h3>
                      {e.location && <p className="text-sm text-white/70 leading-snug mb-2">{e.location}</p>}
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red group-hover:gap-2 transition-all duration-300 ease-brand">
                        RSVP <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
