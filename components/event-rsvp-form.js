'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { formatPhoneInput } from '@/lib/phone'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  smsUpdates: false,
  smsPromo: false,
}

export function EventRsvpForm({ eventTitle, eventDate, eventTime, eventCategory }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const hasPhone = form.phone.trim().length > 0

  useEffect(() => {
    if (!hasPhone) {
      setForm((p) => ({ ...p, smsUpdates: false, smsPromo: false }))
    }
  }, [hasPhone])

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: null }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required.'
    if (!form.lastName.trim()) next.lastName = 'Last name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (Object.keys(next).length) return setErrors(next)
    setErrors({})
    setSubmitError('')
    setSubmitting(true)
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        smsUpdates: form.smsUpdates,
        smsPromo: form.smsPromo,
        eventName: eventTitle,
        eventDate,
        eventTime,
        eventCategory,
      }
      const response = await fetch('/api/events/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        setSubmitError('Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch (error) {
      console.error('[EventRsvpForm]:', error)
      setSubmitError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase =
    'w-full bg-white text-ink font-body text-[15px] px-3.5 py-3 rounded-brand-md border-[1.5px] transition-all duration-300 ease-brand placeholder:text-gray-400'
  const inputOk = 'border-gray-300 hover:border-gray-500 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15'
  const inputErr = 'border-error focus:border-error focus:outline-none focus:ring-4 focus:ring-error/20'
  const cls = (f) => `${inputBase} ${errors[f] ? inputErr : inputOk}`

  if (submitted) {
    return (
      <div className="bg-white border border-gray-200 rounded-brand-lg p-8 text-center shadow-brand-md">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-success/15 text-success mb-5">
          <Check size={28} strokeWidth={3} />
        </div>
        <h3 className="font-heading font-bold text-2xl text-ink mb-2">You&apos;re confirmed.</h3>
        <p className="font-body text-base text-gray-700">
          See you at {eventTitle}. A reminder email is on the way.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="bg-white border border-gray-200 rounded-brand-lg p-6 md:p-8 shadow-brand-md flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rsvp_first" className="block text-sm font-semibold text-ink mb-2">
            First Name*
          </label>
          <input id="rsvp_first" type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First" className={cls('firstName')} aria-invalid={Boolean(errors.firstName)} />
          {errors.firstName && <p className="mt-2 text-xs font-medium text-error">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="rsvp_last" className="block text-sm font-semibold text-ink mb-2">
            Last Name*
          </label>
          <input id="rsvp_last" type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last" className={cls('lastName')} aria-invalid={Boolean(errors.lastName)} />
          {errors.lastName && <p className="mt-2 text-xs font-medium text-error">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="rsvp_email" className="block text-sm font-semibold text-ink mb-2">
          Email*
        </label>
        <input id="rsvp_email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" className={cls('email')} aria-invalid={Boolean(errors.email)} />
        {errors.email && <p className="mt-2 text-xs font-medium text-error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="rsvp_phone" className="block text-sm font-semibold text-ink mb-2">
          Contact Number (Optional)
        </label>
        <input
          id="rsvp_phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update('phone', formatPhoneInput(e.target.value))}
          placeholder="+1 (xxx) xxx-xxxx"
          className={cls('phone')}
        />
      </div>

      {!hasPhone && (
        <p className="text-[12px] text-gray-500 italic">Enter a phone number above to opt in to SMS messages.</p>
      )}

      <div className="flex flex-col gap-3 pt-1">
        <label className={`flex items-start gap-3 text-[13px] leading-relaxed ${hasPhone ? 'text-gray-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}>
          <input
            type="checkbox"
            checked={form.smsUpdates}
            onChange={(e) => update('smsUpdates', e.target.checked)}
            disabled={!hasPhone}
            className="mt-0.5 h-4 w-4 rounded border-gray-400 text-brand-red focus:ring-brand-red/30 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <span>I agree to receive SMS updates from Senator Campaign Committee regarding event reminders and volunteer coordination. Message frequency varies. Message &amp; data rates may apply. Reply STOP to unsubscribe or HELP for help.</span>
        </label>
        <label className={`flex items-start gap-3 text-[13px] leading-relaxed ${hasPhone ? 'text-gray-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}>
          <input
            type="checkbox"
            checked={form.smsPromo}
            onChange={(e) => update('smsPromo', e.target.checked)}
            disabled={!hasPhone}
            className="mt-0.5 h-4 w-4 rounded border-gray-400 text-brand-red focus:ring-brand-red/30 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <span>I agree to receive promotional SMS messages from Senator Campaign Committee, including fundraising requests and donation drives. Message frequency varies. Message &amp; data rates may apply. Reply STOP to unsubscribe or HELP for help.</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting…' : 'Confirm RSVP'}
      </button>

      {submitError && (
        <p className="text-sm font-medium text-error text-center">{submitError}</p>
      )}

      <p className="text-[11px] text-gray-500 text-center leading-relaxed">
        By submitting, you agree to our <a href="/privacy-policy" className="underline hover:text-brand-red">Privacy Policy</a> and <a href="/terms-of-service" className="underline hover:text-brand-red">Terms of Service</a>.
      </p>
    </form>
  )
}
