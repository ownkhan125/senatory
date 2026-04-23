'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/ask', label: 'Ask' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-brand ${
          isScrolled ? 'bg-navy shadow-brand-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-brand-container px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center transition-opacity duration-300 ease-brand hover:opacity-80 shrink-0"
            onClick={closeMobile}
          >
            <Image
              src="/Group-343-white.svg"
              alt="Senator logo"
              width={240}
              height={48}
              priority
              className="h-8 sm:h-10 md:h-11 lg:h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] xl:text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 px-3 xl:px-4 py-2 rounded-brand-sm transition-all duration-300 ease-brand"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#donate"
              className="ml-2 xl:ml-3 inline-flex items-center border-[1.5px] border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-[13px] xl:text-sm font-semibold px-4 xl:px-5 py-[7px] xl:py-[9px] rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30 whitespace-nowrap"
            >
              Donate
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
            className="lg:hidden p-1.5 sm:p-2 rounded-brand-sm text-white hover:bg-white/10 transition-colors duration-300 ease-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
          >
            <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-navy transition-all duration-300 ease-brand ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        <div className="h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between">
          <Image
            src="/Group-343-white.svg"
            alt="Senator logo"
            width={240}
            height={48}
            className="h-8 sm:h-10 md:h-11 lg:h-12 w-auto"
          />
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="p-1.5 sm:p-2 rounded-brand-sm text-white hover:bg-white/10 transition-colors duration-300 ease-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-start px-6 pt-4 sm:pt-8 gap-3 sm:gap-5 md:gap-6 overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="font-heading font-bold text-lg sm:text-2xl md:text-3xl text-white hover:text-brand-red transition-colors duration-300 ease-brand"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#donate"
            onClick={closeMobile}
            className="mt-3 sm:mt-5 inline-flex items-center justify-center border-[1.5px] border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-sm sm:text-base font-semibold px-10 py-2.5 sm:py-3 rounded-brand-md transition-all duration-300 ease-brand"
          >
            Donate
          </Link>
        </nav>
      </div>
    </>
  )
}
