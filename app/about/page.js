import Image from 'next/image'
import Link from 'next/link'
import { Award, Briefcase, GraduationCap, Scale, Heart, Users, ShieldCheck, Lightbulb, Home } from 'lucide-react'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { PageHero } from '@/components/page-hero'

export const metadata = {
  title: 'About — Senator Campaign',
  description: 'Meet the candidate. A career built on service, evidence, and real results for every community.',
}

const expertise = [
  {
    Icon: Award,
    title: 'Public Service Award',
    body: 'Recognized for a decade of community service — funding local clinics, schools, and small-business grants in underserved districts.',
  },
  {
    Icon: Scale,
    title: 'State Legislature Testimony',
    body: 'Testified before the state legislature on fiscal policy, election integrity, and public-health reform. Record available on request.',
  },
  {
    Icon: GraduationCap,
    title: 'Professional Credentials',
    body: 'J.D., magna cum laude. Fifteen years counseling small businesses and nonprofits on transparent governance and regulatory compliance.',
  },
]

const career = [
  { year: '2003', title: 'Bachelor of Public Affairs', body: "Public policy with a minor in economics. Dean's List, student government president." },
  { year: '2007', title: 'Juris Doctor', body: 'Specialization in constitutional law and administrative procedure. Graduated magna cum laude.' },
  { year: '2009', title: 'Small Business Counsel', body: 'Advised over 200 local businesses on contracts, permitting, and tax compliance.' },
  { year: '2014', title: 'County Commissioner', body: 'Elected to two consecutive terms. Led transparent-budget reform and opened public records to full online access.' },
  { year: '2019', title: 'Community Foundation Board', body: 'Chaired a regional foundation distributing $12M in grants to after-school programs, food security, and veterans services.' },
  { year: '2024', title: 'Running for Congress', body: 'Launched a grassroots campaign for the U.S. House, built on accountability, evidence, and community-first policy.' },
]

const values = [
  {
    Icon: ShieldCheck,
    title: 'Accountability',
    body: 'Every dollar spent, every vote cast — transparent and accountable to the people who sent me.',
  },
  {
    Icon: Lightbulb,
    title: 'Evidence Over Ideology',
    body: 'Policy grounded in data, science, and real-world outcomes — not partisan talking points or donor scripts.',
  },
  {
    Icon: Home,
    title: 'Community First',
    body: 'Decisions made for the families of this district, not Washington lobbyists or corporate donors.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="About"
          title="A career built on service, evidence, and results."
          lede='"Governance is not a promise. It is a contract — measured, public, and kept."'
        />

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-2">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute -top-4 -left-4 w-24 h-24 border-t-[3px] border-l-[3px] border-brand-red"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-4 -right-4 w-24 h-24 border-b-[3px] border-r-[3px] border-brand-red"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-brand-lg shadow-brand-lg">
                    <Image
                      src="https://picsum.photos/800/1000"
                      alt="Candidate portrait"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                  <span className="inline-block h-[1px] w-10 bg-brand-red" />
                  Meet The Candidate
                </span>
                <h2 className="font-heading font-bold text-ink text-3xl md:text-4xl leading-tight mb-6">
                  A lifetime rooted in community, service, and accountability.
                </h2>
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                  Born and raised in the Pacific Northwest, our candidate grew up in a family of public-school teachers and small-business owners. That upbringing shaped a career defined by one rule: government should work for the people who pay for it.
                </p>
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                  Over fifteen years on county council and the state policy stage, they&apos;ve delivered transparent-budget reform, expanded small-business lending, and opened public records to full online access. No career politician playbook — just community meetings, line-by-line audits, and results you can verify.
                </p>
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed">
                  Now running for the U.S. House of Representatives, the mission is the same: deliver measurable results for every community in the district, and hold Washington to the same standard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                <span className="inline-block h-[1px] w-10 bg-brand-red" />
                Proven Expertise
              </span>
              <h2 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight">
                A record you can audit line by line.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {expertise.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-white/[0.04] backdrop-blur-sm rounded-brand-lg p-8 border border-white/10 hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 ease-brand"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-brand-md bg-brand-red/15 text-brand-red mb-5">
                    <Icon size={26} strokeWidth={2} />
                  </div>
                  <h3 className="font-heading font-bold text-white text-2xl mb-3 leading-tight">{title}</h3>
                  <p className="font-body text-base text-white/75 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                <span className="inline-block h-[1px] w-10 bg-brand-red" />
                Career Of Service
              </span>
              <h2 className="font-heading font-bold text-ink text-3xl md:text-5xl leading-tight">
                A timeline, not a talking point.
              </h2>
            </div>

            <ol className="relative border-l-[3px] border-brand-red/30 ml-3 md:ml-6 space-y-10">
              {career.map((item) => (
                <li key={item.year} className="ml-6 md:ml-8 relative">
                  <span className="absolute -left-[38px] md:-left-[44px] top-1 flex items-center justify-center w-7 h-7 rounded-full bg-brand-red text-white font-heading font-bold text-[11px] tabular-nums shadow-brand-md">
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-white" />
                  </span>
                  <div className="font-heading font-bold text-brand-red text-sm tracking-wider uppercase mb-1">
                    {item.year}
                  </div>
                  <h3 className="font-heading font-bold text-ink text-xl md:text-2xl mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-base text-gray-700 leading-relaxed max-w-2xl">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-navy py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                <span className="inline-block h-[1px] w-10 bg-brand-red" />
                What Drives Us
              </span>
              <h2 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
                Three values. No shortcuts.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {values.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/15 text-brand-red mb-5">
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="font-heading font-bold text-white text-2xl mb-3">{title}</h3>
                  <p className="font-body text-base text-white/75 leading-relaxed max-w-sm mx-auto">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
                  <span className="inline-block h-[1px] w-10 bg-brand-red" />
                  Signature Policy
                </span>
                <h2 className="font-heading font-bold text-ink text-3xl md:text-5xl leading-tight mb-6">
                  Trust parents. Free teachers.
                </h2>
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                  As your U.S. Representative, I will champion federal policy that empowers families — regardless of zip code — with real choices, strong public schools, and curriculum decided locally, not in Washington.
                </p>
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                  Teachers deserve to teach without coercion, and parents deserve transparency about what and how their children are learning. Those two things are not in tension — they are the same promise.
                </p>
                <Link
                  href="/#policies"
                  className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow"
                >
                  Read The Full Platform
                </Link>
              </div>
              <div className="space-y-5">
                {[
                  { Icon: Users, title: 'Parental Authority', body: 'Communities, not bureaucrats, decide what students are taught.' },
                  { Icon: Briefcase, title: 'Teacher Freedom', body: 'Protect First Amendment rights in every classroom.' },
                  { Icon: Heart, title: 'Equal Funding, Real Reform', body: 'Funding that follows the student — to public, charter, or vocational paths.' },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="flex gap-4 items-start bg-white border border-gray-200 rounded-brand-lg p-5 shadow-brand-sm">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-brand-md bg-brand-red-soft text-brand-red">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-ink text-lg mb-1">{title}</h3>
                      <p className="font-body text-sm text-gray-700 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 md:py-28">
          <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8 text-center">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
              <span className="inline-block h-[1px] w-10 bg-brand-red" />
              Join The Campaign
            </span>
            <h2 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight max-w-3xl mx-auto mb-6">
              Meet us on the campaign trail.
            </h2>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              Whether you can knock on doors, make calls, or chip in a few dollars — every action moves our communities forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow"
              >
                Volunteer
              </Link>
              <Link
                href="/#donate"
                className="inline-flex items-center justify-center border-[1.5px] border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5"
              >
                Donate
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
