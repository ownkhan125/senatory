import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, CalendarDays, ArrowRight, ArrowLeft, Tag } from "lucide-react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { EventRsvpForm } from "@/components/event-rsvp-form";
import { ShareStrip } from "@/components/share-strip";
import { events, getEventBySlug } from "@/lib/events-data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const evt = getEventBySlug(slug);
  if (!evt) return { title: "Event — Senator Campaign" };
  return {
    title: `${evt.title} — Senator Campaign`,
    description: evt.summary,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const evt = getEventBySlug(slug);
  if (!evt) notFound();

  const more = events.filter((e) => e.slug !== evt.slug);

  return (
    <>
      <Navbar />
      <main>
        {/* ── 1. HERO (dark) — date chip + tag + big title ── */}
        <section className="relative bg-navy pt-32 pb-14 md:pt-36 md:pb-20 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_20%,#dd131a_0%,transparent_45%)]"
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
                  {evt.day}
                </span>
                <span className="font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 mt-0.5">
                  {evt.month}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-2 bg-brand-red/15 border border-brand-red/40 text-brand-red text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full mb-4">
                  <Tag size={12} />
                  {evt.tag}
                </span>
                <h1 className="font-heading font-extrabold text-white text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
                  {evt.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. EVENT DETAILS (light) — What to Expect + Event Info sidebar ── */}
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
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-10">
                  {evt.summary}
                </p>

                <h3 className="font-heading font-bold text-ink text-xl md:text-2xl mb-5">
                  What to Expect
                </h3>
                <ul className="flex flex-col gap-3">
                  {evt.whatToExpect.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base text-gray-700">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-red text-white mt-0.5 text-[11px] font-bold">
                        ✓
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
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
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-brand-md bg-brand-red-soft text-brand-red">
                        <CalendarDays size={18} />
                      </span>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-0.5">Date</div>
                        <div className="text-sm text-ink font-medium">{evt.dateLong}</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-brand-md bg-brand-red-soft text-brand-red">
                        <Clock size={18} />
                      </span>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-0.5">Time</div>
                        <div className="text-sm text-ink font-medium">{evt.time}</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-brand-md bg-brand-red-soft text-brand-red">
                        <MapPin size={18} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-0.5">Location</div>
                        <div className="text-sm text-ink font-medium">{evt.location}</div>
                        <div className="text-sm text-gray-600 leading-snug mt-0.5">{evt.address}</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-brand-md bg-brand-red-soft text-brand-red">
                        <Tag size={18} />
                      </span>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-0.5">Type</div>
                        <div className="text-sm text-ink font-medium">{evt.tag}</div>
                      </div>
                    </li>
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

        {/* ── 3. RESERVE YOUR SPOT (dark) — RSVP form ── */}
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
                  <li className="flex items-start gap-3">
                    <CalendarDays size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                    <span>{evt.dateLong}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                    <span>{evt.time}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="block font-medium text-white">{evt.location}</span>
                      <span className="block text-white/60">{evt.address}</span>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-3">
                <EventRsvpForm eventTitle={evt.title} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. SPREAD THE WORD (red accent strip) ── */}
        <section className="bg-brand-red py-10 md:py-12">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8 text-center">
            <h2 className="font-heading font-bold text-white text-xl sm:text-2xl md:text-3xl mb-5 md:mb-6 tracking-wide uppercase">
              Spread the Word
            </h2>
            <ShareStrip title={evt.title} />
          </div>
        </section>

        {/* ── 5. MORE EVENTS (dark) ── */}
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
                    key={e.slug}
                    href={`/events/${e.slug}`}
                    className="group flex gap-5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 rounded-brand-lg p-5 transition-all duration-300 ease-brand"
                  >
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-brand-red rounded-brand-md">
                      <span className="font-heading font-extrabold text-white text-3xl leading-none">{e.day}</span>
                      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 mt-1">{e.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red mb-1">{e.tag}</span>
                      <h3 className="font-heading font-bold text-white text-lg mb-1 leading-tight">{e.title}</h3>
                      <p className="text-sm text-white/70 leading-snug mb-2">{e.location}</p>
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
  );
}
