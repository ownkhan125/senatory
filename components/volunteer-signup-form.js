"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const counties = [
  "Select county",
  "Baker", "Benton", "Clackamas", "Clatsop", "Columbia", "Coos", "Crook", "Curry",
  "Deschutes", "Douglas", "Gilliam", "Grant", "Harney", "Hood River", "Jackson",
  "Jefferson", "Josephine", "Klamath", "Lake", "Lane", "Lincoln", "Linn", "Malheur",
  "Marion", "Morrow", "Multnomah", "Polk", "Sherman", "Tillamook", "Umatilla",
  "Union", "Wallowa", "Wasco", "Washington", "Wheeler", "Yamhill",
];

const regions = [
  "Select region",
  "Portland Metro",
  "Willamette Valley",
  "Oregon Coast",
  "Central Oregon",
  "Eastern Oregon",
  "Southern Oregon",
];

const voter_options = ["Select", "Yes", "No", "Not sure — help me register"];

const experience_options = [
  "Select",
  "None — this is my first campaign",
  "Yes, local (school board, county commissioner, etc.)",
  "Yes, state (House, Senate, State Assembly)",
  "Yes, statewide (AG, Governor)",
  "Yes, federal (Congressional)",
  "Yes, federal (Presidential)",
];

const availability_options = [
  "Select availability",
  "1-2 hours per week",
  "3-4 hours per week",
  "5+ hours per week",
  "Only evenings / weekends",
  "Intermittent days / times",
  "Remote only",
];

const skills = [
  "Door Knocking",
  "Phone Banking",
  "Digital / Social Media",
  "Event Planning",
  "Volunteer Coordination",
  "Media (Videographer, Photographer, etc.)",
  "Host a Meet & Greet",
  "Host a Fundraiser",
];

const initial_form = {
  first_name: "",
  last_name: "",
  email: "",
  zip_code: "",
  phone: "",
  county: counties[0],
  region: regions[0],
  voter: voter_options[0],
  experience: experience_options[0],
  skills: [],
  availability: availability_options[0],
  issues: "",
  anything_else: "",
  sms_updates: false,
  sms_promo: false,
};

export function VolunteerSignupForm() {
  const [form, set_form] = useState(initial_form);
  const [errors, set_errors] = useState({});
  const [submitted, set_submitted] = useState(false);

  const update = (k, v) => {
    set_form((p) => ({ ...p, [k]: v }));
    if (errors[k]) set_errors((p) => ({ ...p, [k]: null }));
  };

  const toggle_skill = (s) => {
    set_form((p) => ({
      ...p,
      skills: p.skills.includes(s) ? p.skills.filter((x) => x !== s) : [...p.skills, s],
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.first_name.trim()) next.first_name = "First name is required.";
    if (!form.last_name.trim()) next.last_name = "Last name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.region === regions[0]) next.region = "Please select your region.";
    if (form.voter === voter_options[0]) next.voter = "Please answer the voter-registration question.";
    if (form.experience === experience_options[0]) next.experience = "Please select your campaign experience.";
    if (form.availability === availability_options[0]) next.availability = "Please select your availability.";
    if (!form.issues.trim()) next.issues = "Tell us which issues matter most to you.";
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
      <div className="bg-white border border-gray-200 rounded-brand-lg p-10 text-center shadow-brand-md max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/15 text-success mb-5">
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 className="font-heading font-bold text-3xl text-ink mb-3">You&apos;re on the team.</h3>
        <p className="font-body text-base text-gray-700 leading-relaxed">
          Thanks, {form.first_name || "friend"} — a team coordinator will reach out within 48 hours with onboarding and your first shift options.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="bg-white border border-gray-200 rounded-brand-lg p-6 sm:p-8 md:p-10 shadow-brand-md flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vf_first" className="block text-sm font-semibold text-ink mb-2">First Name*</label>
          <input id="vf_first" type="text" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} placeholder="First" className={cls("first_name")} aria-invalid={Boolean(errors.first_name)} />
          {errors.first_name && <p className="mt-2 text-xs font-medium text-error">{errors.first_name}</p>}
        </div>
        <div>
          <label htmlFor="vf_last" className="block text-sm font-semibold text-ink mb-2">Last Name*</label>
          <input id="vf_last" type="text" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} placeholder="Last" className={cls("last_name")} aria-invalid={Boolean(errors.last_name)} />
          {errors.last_name && <p className="mt-2 text-xs font-medium text-error">{errors.last_name}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="vf_email" className="block text-sm font-semibold text-ink mb-2">Email*</label>
        <input id="vf_email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className={cls("email")} aria-invalid={Boolean(errors.email)} />
        {errors.email && <p className="mt-2 text-xs font-medium text-error">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vf_zip" className="block text-sm font-semibold text-ink mb-2">ZIP Code</label>
          <input id="vf_zip" type="text" inputMode="numeric" maxLength={10} value={form.zip_code} onChange={(e) => update("zip_code", e.target.value)} placeholder="97205" className={cls("zip_code")} />
        </div>
        <div>
          <label htmlFor="vf_phone" className="block text-sm font-semibold text-ink mb-2">Phone (Optional)</label>
          <input id="vf_phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(503) 555-0100" className={cls("phone")} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vf_county" className="block text-sm font-semibold text-ink mb-2">County</label>
          <select id="vf_county" value={form.county} onChange={(e) => update("county", e.target.value)} className={cls("county")}>
            {counties.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="vf_region" className="block text-sm font-semibold text-ink mb-2">Region*</label>
          <select id="vf_region" value={form.region} onChange={(e) => update("region", e.target.value)} className={cls("region")} aria-invalid={Boolean(errors.region)}>
            {regions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.region && <p className="mt-2 text-xs font-medium text-error">{errors.region}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="vf_voter" className="block text-sm font-semibold text-ink mb-2">Registered to Vote?*</label>
        <select id="vf_voter" value={form.voter} onChange={(e) => update("voter", e.target.value)} className={cls("voter")} aria-invalid={Boolean(errors.voter)}>
          {voter_options.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        {errors.voter && <p className="mt-2 text-xs font-medium text-error">{errors.voter}</p>}
      </div>

      <div>
        <label htmlFor="vf_exp" className="block text-sm font-semibold text-ink mb-2">Prior Campaign Experience?*</label>
        <select id="vf_exp" value={form.experience} onChange={(e) => update("experience", e.target.value)} className={cls("experience")} aria-invalid={Boolean(errors.experience)}>
          {experience_options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {errors.experience && <p className="mt-2 text-xs font-medium text-error">{errors.experience}</p>}
      </div>

      <div>
        <span className="block text-sm font-semibold text-ink mb-3">How would you like to help? (Select all that apply)</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {skills.map((s) => {
            const active = form.skills.includes(s);
            return (
              <label
                key={s}
                className={`flex items-center gap-3 px-4 py-3 rounded-brand-md border-[1.5px] cursor-pointer transition-all duration-200 ease-brand text-sm ${
                  active
                    ? "border-brand-red bg-brand-red/[0.06] text-ink font-semibold"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                }`}
              >
                <input type="checkbox" checked={active} onChange={() => toggle_skill(s)} className="h-4 w-4 rounded border-gray-400 text-brand-red focus:ring-brand-red/30" />
                {s}
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="vf_avail" className="block text-sm font-semibold text-ink mb-2">What&apos;s your availability?*</label>
        <select id="vf_avail" value={form.availability} onChange={(e) => update("availability", e.target.value)} className={cls("availability")} aria-invalid={Boolean(errors.availability)}>
          {availability_options.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        {errors.availability && <p className="mt-2 text-xs font-medium text-error">{errors.availability}</p>}
      </div>

      <div>
        <label htmlFor="vf_issues" className="block text-sm font-semibold text-ink mb-2">What issue(s) matter most to you?*</label>
        <textarea id="vf_issues" rows={3} value={form.issues} onChange={(e) => update("issues", e.target.value)} placeholder="Healthcare, education, environment…" className={cls("issues")} aria-invalid={Boolean(errors.issues)} />
        {errors.issues && <p className="mt-2 text-xs font-medium text-error">{errors.issues}</p>}
      </div>

      <div>
        <label htmlFor="vf_any" className="block text-sm font-semibold text-ink mb-2">Anything else to share?</label>
        <textarea id="vf_any" rows={3} value={form.anything_else} onChange={(e) => update("anything_else", e.target.value)} placeholder="Skills, availability notes, languages spoken…" className={cls("anything_else")} />
      </div>

      {form.phone ? (
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-5">
          <label className="flex items-start gap-3 text-[13px] text-gray-600 leading-relaxed cursor-pointer">
            <input type="checkbox" checked={form.sms_updates} onChange={(e) => update("sms_updates", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-400 text-brand-red focus:ring-brand-red/30" />
            <span>I agree to receive SMS updates from the campaign regarding shift reminders and volunteer coordination. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to unsubscribe.</span>
          </label>
          <label className="flex items-start gap-3 text-[13px] text-gray-600 leading-relaxed cursor-pointer">
            <input type="checkbox" checked={form.sms_promo} onChange={(e) => update("sms_promo", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-400 text-brand-red focus:ring-brand-red/30" />
            <span>I agree to receive promotional SMS messages, including fundraising asks. Reply STOP to unsubscribe or HELP for help.</span>
          </label>
        </div>
      ) : (
        <p className="text-[12px] text-gray-500 italic border-t border-gray-200 pt-5">
          Add a phone number above to enable SMS consent options.
        </p>
      )}

      <button
        type="submit"
        className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-base font-semibold px-7 py-4 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
      >
        Sign Up to Volunteer
      </button>

      <p className="text-[11px] text-gray-500 text-center leading-relaxed">
        By submitting, you agree to our <a href="/privacy-policy" className="underline hover:text-brand-red">Privacy Policy</a> and <a href="/terms-of-service" className="underline hover:text-brand-red">Terms of Service</a>.
      </p>
    </form>
  );
}
