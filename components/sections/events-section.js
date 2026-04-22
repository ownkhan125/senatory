import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { events } from "@/lib/events-data";

export function EventsSection() {
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
          {events.map((evt) => (
            <div
              key={evt.slug}
              className="group relative flex flex-col md:flex-row md:items-center gap-6 bg-white hover:bg-paper-alt border border-gray-200 hover:border-gray-300 rounded-brand-lg p-5 md:p-6 shadow-brand-sm hover:shadow-brand-md transition-all duration-300 ease-brand overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-brand"
              />

              <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 bg-navy rounded-brand-md">
                <span className="font-heading font-extrabold text-brand-red text-4xl leading-none">
                  {evt.day}
                </span>
                <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mt-1">
                  {evt.month}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-ink text-xl md:text-2xl leading-tight mb-3">
                  {evt.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-2 gap-x-5 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} className="text-brand-red flex-shrink-0" />
                    {evt.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} className="text-brand-red flex-shrink-0" />
                    {evt.time}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href={`/events/${evt.slug}`}
                  className="inline-flex items-center justify-center gap-2 border-[1.5px] border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-sm font-semibold px-5 py-2.5 rounded-brand-md transition-all duration-300 ease-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
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
  );
}
