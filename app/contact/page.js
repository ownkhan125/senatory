import { Mail, Phone, MapPin } from 'lucide-react'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { PageHero } from '@/components/page-hero'
import { ContactForm } from '@/components/contact-form'
import { FaqAccordion } from '@/components/faq-accordion'

export const metadata = {
  title: 'Contact — Senator Campaign',
  description: 'Get in touch with the campaign. Media inquiries, volunteer questions, and speaking requests welcome.',
}

const faq = [
  {
    q: 'How can I volunteer for the campaign?',
    a: 'Visit our volunteer page to sign up for door knocking, phone banking, event help, and more. We welcome all skill levels and availability — on-site training is provided.',
  },
  {
    q: 'How do I request a yard sign?',
    a: 'Yard signs are available at any campaign event or by request via the form above. We deliver within the district for orders of five or more.',
  },
  {
    q: 'Can I schedule the candidate for a speaking engagement?',
    a: 'For media inquiries and speaking requests, please use the contact form above or email press@senatorycampaign.com with your event details, expected audience, and proposed dates.',
  },
  {
    q: 'Where does campaign funding go?',
    a: '100% of contributions fund grassroots organizing — staff, travel, digital, canvassing supplies, and venue costs. We accept no corporate PAC money. Quarterly financial reports are filed with the FEC and posted publicly.',
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Contact"
          title="We want to hear from you."
          lede="Questions, story tips, media inquiries, or just want to say hello — we read everything."
        />

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              <aside className="lg:col-span-2 lg:sticky lg:top-24 flex flex-col gap-5">
                <div className="bg-white border border-gray-200 rounded-brand-lg p-6 shadow-brand-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-brand-md bg-brand-red-soft text-brand-red">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-ink text-lg mb-1">Call Us</h3>
                      <a href="tel:+15035550100" className="text-sm text-gray-700 hover:text-brand-red">
                        +1 (503) 555-0100
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Mon–Fri, 9 AM – 5 PM PT</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-brand-lg p-6 shadow-brand-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-brand-md bg-brand-red-soft text-brand-red">
                      <Mail size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-ink text-lg mb-1">Email Us</h3>
                      <a href="mailto:contact@senatorycampaign.com" className="text-sm text-gray-700 hover:text-brand-red break-all">
                        contact@senatorycampaign.com
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Press: press@senatorycampaign.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-brand-lg p-6 shadow-brand-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-brand-md bg-brand-red-soft text-brand-red">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-ink text-lg mb-1">Location</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Senator Campaign Committee<br />
                        Campaign HQ<br />
                        1200 SW Main St<br />
                        Portland, OR 97205
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                <span className="inline-block h-[1px] w-10 bg-brand-red" />
                Frequently Asked
              </span>
              <h2 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight">
                Answers to the questions we hear most.
              </h2>
            </div>
            <div className="rounded-brand-lg">
              <FaqAccordion items={faq} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
