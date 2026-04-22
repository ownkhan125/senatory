import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHero } from "@/components/page-hero";
import { events } from "@/lib/events-data";

export const metadata = {
  title: "Events — Senator Campaign",
  description: "Town halls, community mics, and volunteer drives. Meet us on the campaign trail.",
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Join Us"
          title="Upcoming Events"
          lede="Town halls, community mics, and volunteer drives across the district. Every event is open to the public — bring your neighbors and your questions."
        />

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="flex flex-col gap-5 md:gap-6">
              {events.map((evt) => (
                <Link
                  key={evt.slug}
                  href={`/events/${evt.slug}`}
                  className="group relative flex flex-col md:flex-row md:items-center gap-6 bg-white hover:bg-paper-alt border border-gray-200 hover:border-brand-red/30 rounded-brand-lg p-5 md:p-6 shadow-brand-sm hover:shadow-brand-md transition-all duration-300 ease-brand overflow-hidden"
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
                    <h3 className="font-heading font-bold text-ink text-xl md:text-2xl leading-tight mb-2">
                      {evt.title}
                    </h3>
                    <p className="font-body text-sm text-gray-600 leading-relaxed mb-3 max-w-2xl">
                      {evt.summary}
                    </p>
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

                  <div className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-brand-red group-hover:gap-3 transition-all duration-300 ease-brand">
                    RSVP <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
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
  );
}
