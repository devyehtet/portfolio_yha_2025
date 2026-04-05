import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import {
  brandWordmarks,
  featuredBrandTicker,
  featuredBrands,
} from "@/lib/featured-brands";

type BrandShowcaseProps = {
  compact?: boolean;
  description?: string;
  id?: string;
  kicker?: string;
  title?: string;
};

export default function BrandShowcase({
  compact = false,
  description = "A focused snapshot of the brands and organizations represented across my track record, spanning regional agency leadership, in-house marketing, and performance media execution.",
  id,
  kicker = "Track Record",
  title = "Brands, teams, and organizations across my experience",
}: BrandShowcaseProps) {
  const accentClasses = {
    emerald:
      "border-slate-800 bg-[linear-gradient(180deg,rgba(9,30,28,0.92),rgba(15,23,42,0.92))]",
    indigo:
      "border-slate-800 bg-[linear-gradient(180deg,rgba(20,22,52,0.92),rgba(15,23,42,0.92))]",
    sky: "border-slate-800 bg-[linear-gradient(180deg,rgba(10,28,48,0.92),rgba(15,23,42,0.92))]",
    slate:
      "border-slate-800 bg-[linear-gradient(180deg,rgba(24,30,44,0.92),rgba(15,23,42,0.92))]",
  } as const;

  const plateClasses = {
    emerald:
      "border-emerald-100/60 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbf8_100%)]",
    indigo:
      "border-indigo-100/60 bg-[linear-gradient(180deg,#ffffff_0%,#f7f6ff_100%)]",
    sky: "border-sky-100/60 bg-[linear-gradient(180deg,#ffffff_0%,#f5f9ff_100%)]",
    slate:
      "border-slate-200/60 bg-[linear-gradient(180deg,#ffffff_0%,#fafbfd_100%)]",
  } as const;

  const sizeClasses = {
    lg: "text-[1.28rem] md:text-[1.55rem]",
    md: "text-[1.1rem] md:text-[1.28rem]",
    sm: "text-[0.98rem] md:text-[1.08rem]",
  } as const;

  return (
    <section id={id} className="section-shell space-y-6">
      <div className="section-intro gap-6">
        <Reveal className="max-w-3xl space-y-3">
          <p className="section-kicker text-xs uppercase tracking-[0.24em] text-sky-300">
            {kicker}
          </p>
          <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
          <p className="text-sm leading-7 text-slate-300 md:text-base">
            {description}
          </p>
        </Reveal>

        <Reveal className="section-note space-y-3" delay={80} variant="right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
            Exposure
          </p>
          <p className="text-sm leading-6 text-slate-300">
            Brand-facing work across consumer, banking, retail, and regional
            performance campaigns.
          </p>
        </Reveal>
      </div>

      <Reveal delay={60} variant="scale">
        <div className="brands-marquee rounded-[1.8rem] border border-slate-800/80 bg-slate-900/55 p-3 backdrop-blur-xl">
          <div className="brands-track">
            {featuredBrandTicker.map((item, index) => (
              <div key={`${item}-${index}`} className="brands-pill">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brandWordmarks.map((brand, index) => (
          <Reveal key={brand.name} delay={index * 65 + 90} variant="up">
            <article
              className={`motion-card motion-panel brand-logo-card story-card relative overflow-hidden rounded-[1.55rem] border p-3.5 md:p-4 ${accentClasses[brand.accent]}`}
            >
              <div className="relative flex min-h-[7.6rem] items-center justify-center">
                {brand.logoSrc ? (
                  <div
                    className={`brand-logo-frame flex w-full items-center justify-center rounded-[1.2rem] border px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_14px_28px_rgba(2,6,23,0.14)] ${plateClasses[brand.accent]}`}
                  >
                    <Image
                      src={brand.logoSrc}
                      alt={`${brand.name} logo`}
                      width={520}
                      height={240}
                      className="h-auto max-h-[2.5rem] w-full max-w-[10.5rem] object-contain md:max-h-[2.9rem] md:max-w-[11.5rem]"
                    />
                  </div>
                ) : (
                  <div
                    className={`brand-logo-frame flex w-full items-center justify-center rounded-[1.2rem] border px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_14px_28px_rgba(2,6,23,0.14)] ${plateClasses[brand.accent]}`}
                  >
                    <h3
                      className={`brand-wordmark whitespace-pre-line text-balance font-semibold tracking-[-0.02em] text-slate-900 ${sizeClasses[brand.size]}`}
                    >
                      {brand.cardDisplayName || brand.displayName}
                    </h3>
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} variant="left">
        <div className="max-w-3xl space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Experience Platforms
          </p>
          <p className="text-sm leading-7 text-slate-300">
            The brand work above has been built through leadership, planning,
            and media roles across the following organizations.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featuredBrands.map((brand, index) => (
          <Reveal key={brand.name} delay={index * 90 + 120} variant="up">
            <article
              className={`motion-card motion-panel story-card rounded-[1.75rem] ${
                compact ? "p-4" : "p-5"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
                {brand.category}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-slate-50">
                {brand.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {brand.summary}
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {brand.focus}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
