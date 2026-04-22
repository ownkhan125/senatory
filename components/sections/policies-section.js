import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Heart,
  Leaf,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react";

const policies = [
  {
    Icon: Briefcase,
    title: "Jobs & Economy",
    description:
      "Rebuild American manufacturing, expand small-business lending, and deliver real wage growth in every district.",
    href: "#policy-economy",
  },
  {
    Icon: GraduationCap,
    title: "Education",
    description:
      "Trust parents, free teachers from red tape, and connect every student to a real path — college or trade.",
    href: "#policy-education",
  },
  {
    Icon: Heart,
    title: "Healthcare",
    description:
      "Lower prescription costs, protect pre-existing conditions, and expand access in rural and underserved communities.",
    href: "#policy-healthcare",
  },
  {
    Icon: Shield,
    title: "Safe Communities",
    description:
      "Back local law enforcement with accountability, invest in mental-health response, and secure the border humanely.",
    href: "#policy-security",
  },
  {
    Icon: Leaf,
    title: "Clean Environment",
    description:
      "Clean water guarantees, wildfire resilience, and a credible plan to cut emissions without raising household bills.",
    href: "#policy-climate",
  },
  {
    Icon: Users,
    title: "Opportunity For All",
    description:
      "Apprenticeships, veteran support, and pathways for the next generation of American leaders.",
    href: "#policy-youth",
  },
];

export function PoliciesSection() {
  return (
    <section id="policies" className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-brand-container px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
            <span className="inline-block h-[1px] w-10 bg-brand-red" />
            Our Platform
          </span>
          <h2 className="font-heading font-bold text-white text-4xl md:text-5xl leading-tight max-w-3xl mx-auto">
            A plan built for every community.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {policies.map(({ Icon, title, description, href }) => (
            <div
              key={title}
              className="group bg-white/[0.04] backdrop-blur-sm rounded-brand-lg p-8 border border-white/10 hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 ease-brand"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-brand-md bg-brand-red/15 text-brand-red mb-6 transition-colors duration-300 ease-brand group-hover:bg-brand-red group-hover:text-white">
                <Icon size={26} strokeWidth={2} />
              </div>
              <h3 className="font-heading font-bold text-white text-2xl mb-3 leading-tight">
                {title}
              </h3>
              <p className="font-body text-base text-white/75 leading-relaxed mb-5">
                {description}
              </p>
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-white transition-all duration-300 ease-brand group-hover:gap-3"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
