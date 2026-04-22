"use client";

import { useState } from "react";
import { Heart, Shield } from "lucide-react";

const preset_amounts = [25, 50, 100, 250, 500, 1000];

export function DonationSection() {
  const [selected, set_selected] = useState(100);
  const [custom, set_custom] = useState("");

  const on_preset = (value) => {
    set_selected(value);
    set_custom("");
  };

  const on_custom = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, "");
    set_custom(v);
    set_selected(null);
  };

  const amount = custom !== "" ? Number(custom) : selected;
  const amount_valid = Number.isFinite(amount) && amount >= 5;

  const handle_donate = (e) => {
    e.preventDefault();
    if (!amount_valid) return;
    // Payment gateway integration goes here.
    // For now, surface the selected amount in an alert hook.
    alert(`Thank you — redirecting to secure checkout for $${amount.toLocaleString()}`);
  };

  return (
    <section id="donate" className="relative bg-paper py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,#dd131a_0%,transparent_45%),radial-gradient(circle_at_80%_80%,#0e2a47_0%,transparent_45%)]"
      />

      <div className="relative mx-auto max-w-brand-container px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red mb-5">
              <span className="inline-block h-[1px] w-10 bg-brand-red" />
              Fund The Campaign
            </span>
            <h2 className="font-heading font-bold text-ink text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              America can&apos;t <em className="text-brand-red not-italic">afford</em> to wait.
            </h2>
            <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-8 max-w-xl">
              Grassroots donations keep this campaign honest and accountable to the people, not special interests. Every rupee is tracked, audited, and reported.
            </p>
            <ul className="flex flex-col gap-3 mb-2">
              <li className="flex items-start gap-3 text-sm md:text-base text-gray-700">
                <Shield size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>Secure, encrypted checkout &mdash; FEC-compliant reporting.</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-gray-700">
                <Heart size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>100% of your contribution funds organizing, ads, and travel.</span>
              </li>
            </ul>
          </div>

          <form
            onSubmit={handle_donate}
            className="bg-white border border-gray-200 rounded-brand-lg p-5 sm:p-6 md:p-8 shadow-brand-lg"
          >
            <p className="font-heading font-semibold text-ink text-lg mb-4">
              Choose an amount (USD)
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
              {preset_amounts.map((v) => {
                const active = selected === v && custom === "";
                return (
                  <button
                    type="button"
                    key={v}
                    onClick={() => on_preset(v)}
                    className={`py-3 sm:py-3.5 rounded-brand-md font-heading font-bold text-base sm:text-lg tabular-nums transition-all duration-200 ease-brand border-[1.5px] ${
                      active
                        ? "bg-brand-red border-brand-red text-white shadow-brand-red-glow"
                        : "bg-white border-gray-300 text-ink hover:border-brand-red hover:text-brand-red"
                    }`}
                  >
                    {v.toLocaleString()}
                  </button>
                );
              })}
            </div>

            <label className="block mb-5">
              <span className="block text-sm font-semibold text-ink mb-2">
                Or enter a custom amount
              </span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm pointer-events-none">
                  $
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={custom}
                  onChange={on_custom}
                  placeholder="0"
                  className="w-full bg-white text-ink font-body text-base pl-8 pr-4 py-3 rounded-brand-md border-[1.5px] border-gray-300 placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15 transition-all duration-300 ease-brand tabular-nums"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={!amount_valid}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark active:bg-brand-red-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-red text-white text-base font-semibold px-7 py-3.5 rounded-brand-md transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-brand-red-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30"
            >
              <Heart size={18} />
              Donate {amount_valid ? `$${amount.toLocaleString()}` : "Now"}
            </button>

            <p className="mt-4 text-[11px] leading-relaxed text-gray-500 text-center">
              By donating you confirm you are a U.S. citizen or lawful permanent resident and the contribution is your own funds. Minimum $5.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
