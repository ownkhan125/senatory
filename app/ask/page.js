import { DollarSign, Shield, Home, Briefcase, Mail, Phone, CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { PageHero } from '@/components/page-hero'
import { AskForm } from '@/components/ask-form'

export const metadata = {
  title: 'Ask — Senator Campaign',
  description:
    'Have a question, concern, or idea? Submit it directly to the Senator. Every message is read and taken seriously.',
}

const topics = [
  {
    icon: DollarSign,
    title: 'State Spending',
    body: 'Where are your tax dollars going? Ask about budgets, audits, and financial accountability.',
  },
  {
    icon: Shield,
    title: 'Public Safety',
    body: 'Concerns about policing, first responders, transient housing, or neighborhood safety.',
  },
  {
    icon: Home,
    title: 'Housing & Permitting',
    body: 'Delays, fees, regulations — anything blocking housing or driving up costs.',
  },
  {
    icon: Briefcase,
    title: 'Small Business',
    body: 'Red tape, permitting headaches, or state policies that hurt small business.',
  },
]

const promises = [
  'Every message is read — not filtered, not ignored.',
  'We respond within three business days to every submission.',
  'Your information is never sold, shared, or rented. Period.',
  'Follow-up questions and real policy answers — not canned replies.',
]

export default function AskPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Ask the Senator"
          title="Your Voice Matters — Ask Away."
          lede="Have a question, concern, or idea? The Senator wants to hear from you."
        />

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                <span className="inline-block h-[1px] w-10 bg-brand-red" />
                Common Topics
                <span className="inline-block h-[1px] w-10 bg-brand-red" />
              </span>
              <h2 className="font-heading font-bold text-ink text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
                Not sure where to start?
              </h2>
              <p className="font-body text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-5 leading-relaxed">
                Here are some of the issues people ask about most. You are welcome to write about
                anything — this is just a starting point.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {topics.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="bg-white border border-gray-200 rounded-brand-lg p-6 md:p-7 shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-300 ease-brand"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-brand-md bg-brand-red-soft text-brand-red mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-ink text-xl md:text-2xl mb-2">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-3">
                <AskForm />
              </div>

              <aside className="lg:col-span-2 lg:sticky lg:top-24 flex flex-col gap-6">
                <div>
                  <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff6a6f] mb-5">
                    <span className="inline-block h-[1px] w-10 bg-[#ff6a6f]" />
                    The Promise
                  </span>
                  <h2 className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-5">
                    The Senator&apos;s Promise to You.
                  </h2>
                  <p className="font-body text-base text-white/75 leading-relaxed">
                    This isn&apos;t a suggestion box. It&apos;s a commitment to listen — to every
                    voter, in every neighborhood.
                  </p>
                </div>

                <ul className="flex flex-col gap-4">
                  {promises.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-white/85">
                      <CheckCircle2
                        size={20}
                        className="text-brand-red flex-shrink-0 mt-0.5"
                      />
                      <span className="font-body text-sm sm:text-base leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                <span className="inline-block h-[1px] w-10 bg-brand-red" />
                Prefer to Call or Email?
                <span className="inline-block h-[1px] w-10 bg-brand-red" />
              </span>
              <h2 className="font-heading font-bold text-ink text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
                We answer every line, too.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto">
              <a
                href="mailto:contact@senatorycampaign.com"
                className="group bg-white border border-gray-200 rounded-brand-lg p-7 shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-300 ease-brand"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-brand-md bg-brand-red-soft text-brand-red mb-5">
                  <Mail size={22} />
                </div>
                <h3 className="font-heading font-bold text-ink text-xl mb-1">Email Us</h3>
                <p className="font-body text-sm text-gray-700 group-hover:text-brand-red transition-colors duration-300 ease-brand break-all">
                  contact@senatorycampaign.com
                </p>
                <p className="text-xs text-gray-500 mt-2">Replies within 2 business days</p>
              </a>

              <a
                href="tel:+15035550100"
                className="group bg-white border border-gray-200 rounded-brand-lg p-7 shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-300 ease-brand"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-brand-md bg-brand-red-soft text-brand-red mb-5">
                  <Phone size={22} />
                </div>
                <h3 className="font-heading font-bold text-ink text-xl mb-1">Call Us</h3>
                <p className="font-body text-sm text-gray-700 group-hover:text-brand-red transition-colors duration-300 ease-brand">
                  +1 (503) 555-0100
                </p>
                <p className="text-xs text-gray-500 mt-2">Mon–Fri, 9 AM – 5 PM PT</p>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
