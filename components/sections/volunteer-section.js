'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const helpOptions = [
  'Canvassing',
  'Social Media',
  'Event Support',
  'Donations',
  'Other',
]

const reasons = [
  'Change starts with people, not promises — every hour counts.',
  "You'll be part of a transparent, measured campaign.",
  'Training, community, and real impact in every district.',
]

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  helpType: '',
}

export function VolunteerSection() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const onChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.'
    if (!form.city.trim()) nextErrors.city = 'City and state are required.'
    if (!form.helpType) nextErrors.helpType = "Please select how you'd like to help."

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  const inputBase =
    'w-full bg-white text-ink font-body text-[15px] px-3.5 py-3 rounded-brand-md border-[1.5px] transition-all duration-300 ease-brand placeholder:text-gray-400'
  const inputOk =
    'border-gray-300 hover:border-gray-500 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15'
  const inputErr =
    'border-error focus:border-error focus:outline-none focus:ring-4 focus:ring-error/20'

  const fieldClass = (field) =>
    `${inputBase} ${errors[field] ? inputErr : inputOk}`

  return (
    <section id="volunteer" className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-brand-container px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
              <span className="inline-block h-[1px] w-10 bg-brand-red" />
              Get Involved
            </span>
            <h2 className="font-heading font-bold text-white text-4xl md:text-5xl leading-tight mb-6">
              Volunteer.
            </h2>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-8">
              Change starts with people, not promises. Whatever your skill, schedule, or city &mdash; there is a role here for you. Add your name and we will match you with a team this week.
            </p>
            <ul className="flex flex-col gap-4">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-red text-white flex-shrink-0 mt-1">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="font-body text-base text-white/85 leading-relaxed">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-brand-lg p-6 md:p-8 shadow-brand-md border border-gray-200">
            {submitted ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-success/15 text-success mb-5">
                  <Check size={28} strokeWidth={3} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-ink mb-2">
                  You&apos;re in.
                </h3>
                <p className="font-body text-base text-gray-700">
                  A team coordinator will contact you within 48 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-semibold text-ink mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="full_name"
                    type="text"
                    value={form.fullName}
                    onChange={onChange('fullName')}
                    placeholder="As on your voter registration"
                    className={fieldClass('fullName')}
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-xs font-medium text-error">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-ink mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={onChange('email')}
                    placeholder="name@example.com"
                    className={fieldClass('email')}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs font-medium text-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-ink mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange('phone')}
                    placeholder="(503) 555-0100"
                    className={fieldClass('phone')}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-xs font-medium text-error">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-ink mb-2"
                  >
                    City, State
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={onChange('city')}
                    placeholder="Portland, OR"
                    className={fieldClass('city')}
                    aria-invalid={Boolean(errors.city)}
                  />
                  {errors.city && (
                    <p className="mt-2 text-xs font-medium text-error">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="help_type"
                    className="block text-sm font-semibold text-ink mb-2"
                  >
                    How do you want to help?
                  </label>
                  <select
                    id="help_type"
                    value={form.helpType}
                    onChange={onChange('helpType')}
                    className={fieldClass('helpType')}
                    aria-invalid={Boolean(errors.helpType)}
                  >
                    <option value="">Select a role</option>
                    {helpOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {errors.helpType && (
                    <p className="mt-2 text-xs font-medium text-error">
                      {errors.helpType}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark active:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
                >
                  Volunteer
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
