"use client";

import { useEffect, useState } from "react";
import { Facebook, Twitter, Mail, Link as LinkIcon, Check, Share2 } from "lucide-react";

export function ShareStrip({ title }) {
  const [url, set_url] = useState("");
  const [copied, set_copied] = useState(false);

  useEffect(() => {
    set_url(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  const encoded_url = encodeURIComponent(url);
  const encoded_text = encodeURIComponent(`Join me at ${title}`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      set_copied(true);
      setTimeout(() => set_copied(false), 2000);
    } catch {
      // ignore
    }
  };

  const native_share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      copy();
    }
  };

  const btn_class =
    "inline-flex items-center justify-center gap-2 h-11 px-4 sm:px-5 rounded-brand-md border-[1.5px] border-white/40 text-white hover:bg-white hover:text-brand-red hover:border-white transition-all duration-300 ease-brand text-sm font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={native_share}
        className={btn_class}
        aria-label="Share event"
      >
        <Share2 size={16} />
        Share Event
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded_url}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn_class}
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded_url}&text=${encoded_text}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn_class}
        aria-label="Share on X (Twitter)"
      >
        <Twitter size={16} />
        X / Twitter
      </a>
      <a
        href={`mailto:?subject=${encoded_text}&body=${encoded_url}`}
        className={btn_class}
        aria-label="Share by email"
      >
        <Mail size={16} />
        Email
      </a>
      <button
        type="button"
        onClick={copy}
        className={btn_class}
        aria-label="Copy link"
      >
        {copied ? <Check size={16} /> : <LinkIcon size={16} />}
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
