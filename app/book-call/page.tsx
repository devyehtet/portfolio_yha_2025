import type { Metadata } from "next";
import Link from "next/link";
import BookCallForm from "@/app/components/BookCallForm";
import Reveal from "@/app/components/Reveal";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Share your project goals, training needs, or campaign challenges and send a direct booking request to Ye Htet Aung.",
};

const bookingBenefits = [
  "Training support for in-house marketing teams",
  "Strategic consulting for growth and positioning",
  "Freelance media buying across Meta and Google Ads",
];

const bookingExpectations = [
  "Brief replies with a recommended next step",
  "Clear fit on whether training, consulting, or execution is best",
  "Useful context for follow-up before any call is scheduled",
];

export default function BookCallPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="site-bg-grid" />
      <div className="site-orb site-orb--cyan" />
      <div className="site-orb site-orb--violet" />

      <section className="page-shell">
        <div className="section-intro gap-6">
          <Reveal className="editorial-panel hero-panel space-y-5">
            <Link
              href="/"
              className="motion-button inline-flex w-fit rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
            >
              Back to Home
            </Link>

            <div className="space-y-4">
              <p className="section-kicker text-xs uppercase tracking-[0.24em] text-sky-300">
                Book a Call
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Start with a focused booking request
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                Instead of sending visitors into a generic contact flow, this
                page gives them a cleaner way to explain their business,
                campaign goals, and what kind of help they need.
              </p>
            </div>
          </Reveal>

          <Reveal className="section-note space-y-4" delay={120} variant="right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
              Booking Flow
            </p>
            <div className="space-y-3 text-sm leading-6 text-slate-300">
              <p>I review fit first, then reply with the clearest next step.</p>
              <p>
                This keeps the experience lightweight, practical, and easy to
                act on.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              {["Brief first", "Clear recommendation", "Email follow-up"].map(
                (item) => (
                  <div key={item} className="metric-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>

        <div className="section-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4" variant="left">
            <div className="story-card motion-card motion-panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Best For
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {bookingBenefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-sky-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="story-card motion-card motion-panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                What To Include
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 text-sky-300">•</span>
                  <span>Your business or brand context</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-sky-300">•</span>
                  <span>The challenge or goal you want help with</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-sky-300">•</span>
                  <span>The type of support you are looking for</span>
                </li>
              </ul>
            </div>

            <div className="story-card motion-card motion-panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                What Happens Next
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {bookingExpectations.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-sky-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <BookCallForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
