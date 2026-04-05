import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import { blogPreviews } from "@/lib/blog-preview";

export const metadata: Metadata = {
  title: "Blog | Myanmar Digital Marketing Insights",
  description:
    "Articles on Myanmar digital marketing, SEO, consulting, training, and freelance media buying by Ye Htet Aung.",
  keywords: [
    "Myanmar digital marketing blog",
    "digital marketing consultant Myanmar",
    "digital marketing trainer Myanmar",
    "freelance media buyer Myanmar",
  ],
};

export default function BlogIndexPage() {
  const [featuredPost, ...otherPosts] = blogPreviews;

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
              className="motion-button inline-flex rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
            >
              Back to Home
            </Link>

            <div className="space-y-4">
              <p className="section-kicker text-xs uppercase tracking-[0.28em] text-sky-300">
                Blog & Insights
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Myanmar digital marketing insights for brands, teams, and founders
              </h1>
              <p className="max-w-2xl text-sm text-slate-300 md:text-base">
                I write about SEO, paid media, digital strategy, team training,
                and freelance campaign execution for businesses that want
                clearer growth systems in Myanmar and across the region.
              </p>
            </div>
          </Reveal>

          <Reveal className="section-note space-y-4" delay={100} variant="right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
              What You&apos;ll Find
            </p>
            <div className="space-y-3 text-sm leading-6 text-slate-300">
              <p>SEO thinking, paid-media systems, and practical growth notes.</p>
              <p>Written for teams, founders, and brands that need clarity.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              {["Strategy", "Training", "Execution"].map((item) => (
                <div key={item} className="metric-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="section-shell grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Trainer",
              body: "Workshops and practical learning for teams that need better execution, clearer reporting, and stronger campaign thinking.",
            },
            {
              title: "Consultant",
              body: "Strategy support for brands that need sharper positioning, channel planning, and conversion-focused decision making.",
            },
            {
              title: "Freelance Media Buyer",
              body: "Hands-on paid media execution across Meta and Google Ads with testing, optimization, and budget discipline.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 100} variant="up">
              <div className="story-card motion-card motion-panel rounded-2xl p-5">
                <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                <p className="mt-2 text-xs leading-6 text-slate-400">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} variant="scale">
          <article className="editorial-panel motion-card motion-panel grid gap-6 rounded-[2rem] p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-sky-300">
                <span>Featured Insight</span>
                <span className="rounded-full border border-sky-500/30 px-2 py-1 text-slate-200">
                  {featuredPost.category}
                </span>
                <span className="text-slate-500">{featuredPost.readTime}</span>
              </div>

              <h2 className="max-w-3xl text-2xl font-semibold leading-tight text-slate-50 md:text-3xl">
                {featuredPost.title}
              </h2>

              <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                {featuredPost.description}
              </p>

              <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                <span>{featuredPost.roleFocus}</span>
                <span>{featuredPost.publishedAt}</span>
              </div>
            </div>

            <div className="section-note flex flex-col justify-between gap-4 rounded-[1.5rem] p-5">
              <p className="text-sm leading-7 text-slate-300">
                {featuredPost.excerpt}
              </p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="motion-button inline-flex w-fit rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-sky-400"
              >
                Read Featured Article
              </Link>
            </div>
          </article>
        </Reveal>

        <div className="section-shell grid gap-5 md:grid-cols-2">
          {otherPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 110 + 120} variant="scale">
              <article className="story-card motion-card motion-panel group flex h-full flex-col rounded-3xl p-6 transition hover:border-sky-500/60 hover:bg-slate-900/80">
                <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-sky-300">
                  <span>{post.category}</span>
                  <span className="text-slate-500">{post.readTime}</span>
                </div>

                <h2 className="mt-4 text-xl font-semibold leading-snug text-slate-50">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                  <span>{post.roleFocus}</span>
                  <span>{post.publishedAt}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="motion-button mt-6 inline-flex w-fit rounded-full border border-sky-500/50 px-4 py-2 text-xs font-semibold text-sky-300 transition group-hover:border-sky-400 group-hover:text-sky-200"
                >
                  Read article
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} variant="up">
          <div className="section-shell rounded-3xl p-6 text-sm text-slate-300">
          Looking for a trainer, consultant, or freelance digital media buyer
          for Myanmar-focused growth?{" "}
          <Link
            href="/#contact"
            className="motion-button rounded-full px-1 text-sky-300 hover:text-sky-200"
          >
            Let&apos;s talk
          </Link>
          .
          </div>
        </Reveal>
      </section>
    </main>
  );
}
