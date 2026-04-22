"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const initial_form = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  sms_updates: false,
  sms_promo: false,
};

export function EventRsvpForm({ eventTitle }) {
  const [form, set_form] = useState(initial_form);
  const [errors, set_errors] = useState({});
  const [submitted, set_submitted] = useState(false);

  const update = (k, v) => {
    set_form((p) => ({ ...p, [k]: v }));
    if (errors[k]) set_errors((p) => ({ ...p, [k]: null }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.first_name.trim()) next.first_name = "First name is required.";
    if (!form.last_name.trim()) next.last_name = "Last name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (Object.keys(next).length) return set_errors(next);
    set_errors({});
    set_submitted(true);
  };

  const input_base =
    "w-full bg-white text-ink font-body text-[15px] px-3.5 py-3 rounded-brand-md border-[1.5px] transition-all duration-300 ease-brand placeholder:text-gray-400";
  const input_ok = "border-gray-300 hover:border-gray-500 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15";
  const input_err = "border-error focus:border-error focus:outline-none focus:ring-4 focus:ring-error/20";
  const cls = (f) => `${input_base} ${errors[f] ? input_err : input_ok}`;

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
    );
  }

  return (
    <form onSubmit={submit} noValidate className="bg-white border border-gray-200 rounded-brand-lg p-6 md:p-8 shadow-brand-md flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rsvp_first" className="block text-sm font-semibold text-ink mb-2">
            First Name*
          </label>
          <input id="rsvp_first" type="text" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} placeholder="First" className={cls("first_name")} aria-invalid={Boolean(errors.first_name)} />
          {errors.first_name && <p className="mt-2 text-xs font-medium text-error">{errors.first_name}</p>}
        </div>
        <div>
          <label htmlFor="rsvp_last" className="block text-sm font-semibold text-ink mb-2">
            Last Name*
          </label>
          <input id="rsvp_last" type="text" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} placeholder="Last" className={cls("last_name")} aria-invalid={Boolean(errors.last_name)} />
          {errors.last_name && <p className="mt-2 text-xs font-medium text-error">{errors.last_name}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="rsvp_email" className="block text-sm font-semibold text-ink mb-2">
          Email*
        </label>
        <input id="rsvp_email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className={cls("email")} aria-invalid={Boolean(errors.email)} />
        {errors.email && <p className="mt-2 text-xs font-medium text-error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="rsvp_phone" className="block text-sm font-semibold text-ink mb-2">
          Contact Number (Optional)
        </label>
        <input id="rsvp_phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(503) 555-0100" className={cls("phone")} />
      </div>

      {form.phone ? (
        <div className="flex flex-col gap-3 pt-1">
          <label className="flex items-start gap-3 text-[13px] text-gray-600 leading-relaxed cursor-pointer">
            <input type="checkbox" checked={form.sms_updates} onChange={(e) => update("sms_updates", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-400 text-brand-red focus:ring-brand-red/30" />
            <span>I agree to receive SMS updates from the campaign regarding event reminders and volunteer coordination. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to unsubscribe.</span>
          </label>
          <label className="flex items-start gap-3 text-[13px] text-gray-600 leading-relaxed cursor-pointer">
            <input type="checkbox" checked={form.sms_promo} onChange={(e) => update("sms_promo", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-400 text-brand-red focus:ring-brand-red/30" />
            <span>I agree to receive promotional SMS messages, including fundraising asks. Reply STOP to unsubscribe or HELP for help.</span>
          </label>
        </div>
      ) : (
        <p className="text-[12px] text-gray-500 italic">Add a contact number above to enable SMS consent options.</p>
      )}

      <button
        type="submit"
        className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
      >
        Confirm RSVP
      </button>

      <p className="text-[11px] text-gray-500 text-center leading-relaxed">
        By submitting, you agree to our <a href="/privacy-policy" className="underline hover:text-brand-red">Privacy Policy</a> and <a href="/terms-of-service" className="underline hover:text-brand-red">Terms of Service</a>.
      </p>
    </form>
  );
}
