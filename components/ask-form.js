'use client'

import { useEffect, useState } from 'react'
import { Check, Send } from 'lucide-react'
import { formatPhoneInput } from '@/lib/phone'

const categories = [
  'State Spending & Taxes',
  'Housing & Permitting',
  'Public Safety',
  'Roads & Infrastructure',
  'Small Business & Red Tape',
  'Parks & Recreation',
  'Neighborhood Concerns',
  'Government Transparency',
  'Other',
]

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  category: '',
  location: '',
  subject: '',
  description: '',
  smsUpdates: false,
  smsPromo: false,
}

export function AskForm() {
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
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address.'
    if (!form.category) next.category = 'Please choose a category.'
    if (!form.subject.trim()) next.subject = 'Subject is required.'
    if (!form.description.trim()) next.description = 'Please share more detail.'
    else if (form.description.trim().length < 10)
      next.description = 'Please provide at least 10 characters.'
    if (Object.keys(next).length) return setErrors(next)
    setErrors({})
    setSubmitError('')
    setSubmitting(true)
    try {
      const payload = {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        category: form.category,
        location: form.location,
        subject: form.subject,
        description: form.description,
        smsUpdates: form.smsUpdates,
        smsPromo: form.smsPromo,
      }
      const response = await fetch('/api/issues', {
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
      console.error('[AskForm]:', error)
      setSubmitError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase =
    'w-full bg-white text-ink font-body text-[15px] px-3.5 py-3 rounded-brand-md border-[1.5px] transition-all duration-300 ease-brand placeholder:text-gray-400'
  const inputOk =
    'border-gray-300 hover:border-gray-500 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15'
  const inputErr =
    'border-error focus:border-error focus:outline-none focus:ring-4 focus:ring-error/20'
  const cls = (f) => `${inputBase} ${errors[f] ? inputErr : inputOk}`

  const labelCls =
    'block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink mb-2'

  if (submitted) {
    return (
      <div className="bg-white border border-gray-200 rounded-brand-lg p-8 sm:p-10 text-center shadow-brand-md">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-success/15 text-success mb-5">
          <Check size={28} strokeWidth={3} />
        </div>
        <h3 className="font-heading font-bold text-ink text-2xl mb-2">
          Thank you — your question has been received.
        </h3>
        <p className="font-body text-base text-gray-700 leading-relaxed max-w-md mx-auto">
          Every submission is read personally. We&apos;ll follow up within 3 business days.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="bg-white border border-gray-200 rounded-brand-lg p-6 sm:p-8 md:p-10 shadow-brand-md flex flex-col gap-5"
    >
      <div className="mb-2">
        <h3 className="font-heading font-bold text-ink text-2xl sm:text-3xl mb-2">
          Submit Your Question or Concern
        </h3>
        <p className="font-body text-sm sm:text-base text-gray-600 leading-relaxed">
          Tell the Senator what matters to you. Every submission is read and taken seriously.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="af_name" className={labelCls}>
            Full Name*
          </label>
          <input
            id="af_name"
            type="text"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Your full name"
            className={cls('fullName')}
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName && (
            <p className="mt-2 text-xs font-medium text-error">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label htmlFor="af_email" className={labelCls}>
            Email*
          </label>
          <input
            id="af_email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@email.com"
            className={cls('email')}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="mt-2 text-xs font-medium text-error">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="af_phone" className={labelCls}>
            Phone
          </label>
          <input
            id="af_phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', formatPhoneInput(e.target.value))}
            placeholder="+1 (xxx) xxx-xxxx"
            className={cls('phone')}
          />
        </div>
        <div>
          <label htmlFor="af_category" className={labelCls}>
            Category*
          </label>
          <select
            id="af_category"
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className={cls('category')}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-2 text-xs font-medium text-error">{errors.category}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="af_location" className={labelCls}>
          Location
        </label>
        <input
          id="af_location"
          type="text"
          value={form.location}
          onChange={(e) => update('location', e.target.value)}
          placeholder="Street address or neighborhood"
          className={cls('location')}
        />
      </div>

      <div>
        <label htmlFor="af_subject" className={labelCls}>
          Subject*
        </label>
        <input
          id="af_subject"
          type="text"
          value={form.subject}
          onChange={(e) => update('subject', e.target.value)}
          placeholder="Brief summary of your question or concern"
          className={cls('subject')}
          aria-invalid={Boolean(errors.subject)}
        />
        {errors.subject && (
          <p className="mt-2 text-xs font-medium text-error">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="af_description" className={labelCls}>
          Description*
        </label>
        <textarea
          id="af_description"
          rows={6}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Describe your question, concern, or issue in detail..."
          className={cls('description')}
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && (
          <p className="mt-2 text-xs font-medium text-error">{errors.description}</p>
        )}
      </div>

      {!hasPhone && (
        <p className="text-[12px] text-gray-500 italic">
          Enter a phone number above to opt in to SMS messages.
        </p>
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
          <span>
            I agree to receive SMS updates from Senator Campaign Committee regarding campaign
            updates, event reminders, and responses to my inquiry. Message frequency varies. Message
            &amp; data rates may apply. Reply STOP to unsubscribe or HELP for help.
          </span>
        </label>
        <label className={`flex items-start gap-3 text-[13px] leading-relaxed ${hasPhone ? 'text-gray-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}>
          <input
            type="checkbox"
            checked={form.smsPromo}
            onChange={(e) => update('smsPromo', e.target.checked)}
            disabled={!hasPhone}
            className="mt-0.5 h-4 w-4 rounded border-gray-400 text-brand-red focus:ring-brand-red/30 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <span>
            I agree to receive promotional SMS messages from Senator Campaign Committee, including
            fundraising requests and donation drives. Message frequency varies. Message &amp; data
            rates may apply. Reply STOP to unsubscribe or HELP for help.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={18} />
        {submitting ? 'Sending…' : 'Send to the Senator'}
      </button>

      {submitError && (
        <p className="text-sm font-medium text-error text-center">{submitError}</p>
      )}

      <p className="text-[11px] text-gray-500 text-center leading-relaxed">
        By submitting, you agree to our{' '}
        <a href="/privacy-policy" className="underline hover:text-brand-red">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms-of-service" className="underline hover:text-brand-red">
          Terms of Service
        </a>
        .
      </p>
    </form>
  )
}
