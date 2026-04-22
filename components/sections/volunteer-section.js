"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const help_options = [
  "Canvassing",
  "Social Media",
  "Event Support",
  "Donations",
  "Other",
];

const reasons = [
  "Change starts with people, not promises — every hour counts.",
  "You'll be part of a transparent, measured campaign.",
  "Training, community, and real impact in every district.",
];

const initial_form = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  help_type: "",
};

export function VolunteerSection() {
  const [form, set_form] = useState(initial_form);
  const [errors, set_errors] = useState({});
  const [submitted, set_submitted] = useState(false);

  const on_change = (field) => (e) => {
    set_form((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      set_errors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handle_submit = (e) => {
    e.preventDefault();
    const next_errors = {};
    if (!form.full_name.trim()) next_errors.full_name = "Full name is required.";
    if (!form.email.trim()) {
      next_errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next_errors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) next_errors.phone = "Phone number is required.";
    if (!form.city.trim()) next_errors.city = "City and state are required.";
    if (!form.help_type) next_errors.help_type = "Please select how you'd like to help.";

    if (Object.keys(next_errors).length > 0) {
      set_errors(next_errors);
      return;
    }
    set_errors({});
    set_submitted(true);
  };

  const input_base =
    "w-full bg-white text-ink font-body text-[15px] px-3.5 py-3 rounded-brand-md border-[1.5px] transition-all duration-300 ease-brand placeholder:text-gray-400";
  const input_ok =
    "border-gray-300 hover:border-gray-500 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15";
  const input_err =
    "border-error focus:border-error focus:outline-none focus:ring-4 focus:ring-error/20";

  const field_class = (field) =>
    `${input_base} ${errors[field] ? input_err : input_ok}`;

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
                onSubmit={handle_submit}
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
                    value={form.full_name}
                    onChange={on_change("full_name")}
                    placeholder="As on your voter registration"
                    className={field_class("full_name")}
                    aria-invalid={Boolean(errors.full_name)}
                  />
                  {errors.full_name && (
                    <p className="mt-2 text-xs font-medium text-error">
                      {errors.full_name}
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
                    onChange={on_change("email")}
                    placeholder="name@example.com"
                    className={field_class("email")}
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
                    onChange={on_change("phone")}
                    placeholder="(503) 555-0100"
                    className={field_class("phone")}
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
                    onChange={on_change("city")}
                    placeholder="Portland, OR"
                    className={field_class("city")}
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
                    value={form.help_type}
                    onChange={on_change("help_type")}
                    className={field_class("help_type")}
                    aria-invalid={Boolean(errors.help_type)}
                  >
                    <option value="">Select a role</option>
                    {help_options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {errors.help_type && (
                    <p className="mt-2 text-xs font-medium text-error">
                      {errors.help_type}
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
  );
}
