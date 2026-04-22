import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";

const quick_links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

const legal_links = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

const social_links = [
  { href: "#facebook", label: "Facebook", Icon: Facebook },
  { href: "#twitter", label: "Twitter", Icon: Twitter },
  { href: "#instagram", label: "Instagram", Icon: Instagram },
  { href: "#youtube", label: "YouTube", Icon: Youtube },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white/80">
      <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block transition-opacity duration-300 ease-brand hover:opacity-80"
              aria-label="Senator home"
            >
              <Image
                src="/Group-343-white.svg"
                alt="Senator logo"
                width={240}
                height={48}
                className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto"
              />
            </Link>
            <p className="font-body text-sm text-white/70 mt-4 sm:mt-5 mb-5 sm:mb-6 leading-relaxed max-w-sm">
              One Nation. One Voice. One Future. A transparent, measurable campaign for every community in America.
            </p>
            <div className="flex flex-wrap gap-2">
              {social_links.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-brand-md border border-white/15 text-white/80 hover:bg-brand-red hover:border-brand-red hover:text-white hover:-translate-y-0.5 transition-all duration-300 ease-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg sm:text-xl mb-4 sm:mb-5">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {quick_links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/75 hover:text-brand-red transition-colors duration-300 ease-brand"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg sm:text-xl mb-4 sm:mb-5">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                <MapPin size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>Campaign HQ, 1200 SW Main St, Portland, OR 97205</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/75">
                <Mail size={18} className="text-brand-red flex-shrink-0" />
                <a
                  href="mailto:contact@senatorycampaign.com"
                  className="hover:text-white transition-colors duration-300 ease-brand break-all"
                >
                  contact@senatorycampaign.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/75">
                <Phone size={18} className="text-brand-red flex-shrink-0" />
                <a
                  href="tel:+15035550100"
                  className="hover:text-white transition-colors duration-300 ease-brand"
                >
                  +1 (503) 555-0100
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.14em]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-2">
            <p className="text-[#94a3b8]">&copy; 2026 Senator Campaign Committee. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {legal_links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[#94a3b8] hover:text-white transition-colors duration-300 ease-brand"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-[#94a3b8]">Paid for by the Senator Campaign Committee</p>
        </div>
      </div>
    </footer>
  );
}
