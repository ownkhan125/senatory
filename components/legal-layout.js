import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHero } from "@/components/page-hero";

export function LegalLayout({ eyebrow, title, lastUpdated, children }) {
  return (
    <>
      <Navbar />
      <main>
        <PageHero eyebrow={eyebrow} title={title} />
        <section className="bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
            <p className="text-sm text-gray-500 mb-10 font-medium">
              Last updated: {lastUpdated}
            </p>
            <article className="legal-prose">
              {children}
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .legal-prose h2 {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          color: var(--color-ink, #232323);
          font-size: 1.75rem;
          line-height: 1.2;
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
        .legal-prose h2:first-child { margin-top: 0; }
        .legal-prose h3 {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          color: var(--color-ink, #232323);
          font-size: 1.25rem;
          line-height: 1.3;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .legal-prose p {
          font-size: 1rem;
          line-height: 1.7;
          color: #404040;
          margin-bottom: 1rem;
        }
        .legal-prose ul {
          padding-left: 1.25rem;
          margin-bottom: 1rem;
          list-style: disc;
        }
        .legal-prose li {
          font-size: 1rem;
          line-height: 1.7;
          color: #404040;
          margin-bottom: 0.5rem;
        }
        .legal-prose a {
          color: #dd131a;
          text-decoration: underline;
        }
        .legal-prose strong { color: #232323; }
      `}</style>
    </>
  );
}
