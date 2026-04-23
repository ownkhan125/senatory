'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="flex flex-col gap-3 max-w-3xl mx-auto">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div
            key={it.q}
            className={`bg-white border rounded-brand-lg transition-all duration-300 ease-brand ${
              isOpen ? 'border-brand-red/40 shadow-brand-md' : 'border-gray-200 shadow-brand-sm'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
            >
              <span className="font-heading font-semibold text-ink text-base sm:text-lg leading-snug">
                {it.q}
              </span>
              <ChevronDown
                size={22}
                className={`flex-shrink-0 text-brand-red transition-transform duration-300 ease-brand ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-brand ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-5 font-body text-sm sm:text-base text-gray-700 leading-relaxed">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
