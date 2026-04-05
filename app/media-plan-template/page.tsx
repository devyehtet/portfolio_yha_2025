import type { Metadata } from "next";
import Link from "next/link";
import MediaPlanRequestForm from "@/app/components/MediaPlanRequestForm";
import {
  mediaPlanBlocks,
  mediaPlanDemoMetrics,
  mediaPlanDemoRows,
  mediaPlanHighlights,
  mediaPlanWorkflow,
} from "@/lib/media-plan-template";

export const metadata: Metadata = {
  title: "Media Plan Template Request",
  description:
    "Request the Google Sheets media plan template and get a manual share follow-up from Ye Htet Aung.",
  alternates: {
    canonical: "/media-plan-template",
  },
};

const phaseStyles: Record<string, string> = {
  Awareness: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  Consideration: "border-violet-500/30 bg-violet-500/10 text-violet-200",
  Conversion: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
};

export default function MediaPlanTemplatePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.16),transparent_40%)]" />

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-sky-400 hover:text-sky-200"
            >
              Back to Home
            </Link>

            <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-200">
              {["Google Sheets format", "Manual share workflow", "Lead capture"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.26em] text-sky-300">
                Media Plan Template
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
                Request the Google Sheets media plan template and I&apos;ll share
                it manually after review
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                This page captures the request first, sends the details to my
                inbox, and lets me manually share the sheet with the right
                people. It is designed for launches, monthly planning, and
                client-facing media reviews.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {mediaPlanHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <MediaPlanRequestForm />
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-sky-300">
              What Happens Next
            </p>
            <div className="mt-4 space-y-4">
              {[
                "You fill in the request form with your planning context.",
                "The details land in my inbox for review.",
                "I manually share the Google Sheet if it is a fit.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                >
                  <p className="text-sm font-semibold text-slate-50">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-sky-300">
              Planning Principles
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {mediaPlanWorkflow.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-sky-300">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.26em] text-sky-300">
              Inside the Template
            </p>
            <h2 className="text-2xl font-semibold">What the sheet covers</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mediaPlanBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-50">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {block.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {block.fields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-xs text-slate-200"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.26em] text-sky-300">
              Demo Preview
            </p>
            <h2 className="text-2xl font-semibold">
              Example of the planning view
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-300">
              This preview shows the structure only. The actual Google Sheet is
              still shared manually after a request is reviewed.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white text-slate-900 shadow-2xl shadow-slate-950/30">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-5">
              <div className="grid gap-3 md:grid-cols-4">
                {mediaPlanDemoMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-xl font-bold">{metric.value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {metric.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[920px]">
                <div className="grid grid-cols-[0.8fr_1fr_1.3fr_1.2fr_0.8fr_0.8fr_0.9fr] border-b border-slate-200 bg-slate-100 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {["Phase", "Channel", "Objective", "Audience", "Budget", "Flight", "Target"].map(
                    (header) => (
                      <div key={header} className="px-4 py-3">
                        {header}
                      </div>
                    )
                  )}
                </div>

                {mediaPlanDemoRows.map((row) => (
                  <div
                    key={`${row.phase}-${row.channel}`}
                    className="grid grid-cols-[0.8fr_1fr_1.3fr_1.2fr_0.8fr_0.8fr_0.9fr] border-b border-slate-200 last:border-b-0"
                  >
                    <div className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${phaseStyles[row.phase] ?? "border-slate-200 bg-slate-100 text-slate-600"}`}
                      >
                        {row.phase}
                      </span>
                    </div>
                    <div className="px-4 py-4 text-sm font-semibold">
                      {row.channel}
                    </div>
                    <div className="px-4 py-4 text-sm leading-6 text-slate-700">
                      {row.objective}
                    </div>
                    <div className="px-4 py-4 text-sm leading-6 text-slate-700">
                      {row.audience}
                    </div>
                    <div className="px-4 py-4 text-sm font-semibold">
                      {row.budget}
                    </div>
                    <div className="px-4 py-4 text-sm">{row.flight}</div>
                    <div className="px-4 py-4 text-sm leading-6 text-slate-700">
                      {row.target}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
