import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/app/components/Reveal";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function toSectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    keywords: post.seoPhrases,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Ye Htet Aung",
    },
    keywords: post.seoPhrases.join(", "),
    articleSection: post.category,
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="site-bg-grid" />
      <div className="site-orb site-orb--cyan" />
      <div className="site-orb site-orb--violet" />

      <article className="page-shell max-w-5xl">
        <div className="section-intro gap-6">
          <Reveal className="editorial-panel hero-panel space-y-5">
            <Link
              href="/blog"
              className="motion-button inline-flex w-fit rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
            >
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-sky-300">
              <span>{post.category}</span>
              <span className="text-slate-500">{post.readTime}</span>
              <span className="text-slate-500">{post.publishedAt}</span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              {post.title}
            </h1>

            <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.seoPhrases.map((phrase) => (
                <span
                  key={phrase}
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300"
                >
                  {phrase}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="section-note space-y-4" delay={120} variant="right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
              Reading Lens
            </p>
            <div className="space-y-3 text-sm leading-6 text-slate-300">
              <p>This article is written for teams that need practical clarity.</p>
              <p>Use the section list to jump straight to the most useful part.</p>
            </div>
          </Reveal>
        </div>

        <div className="section-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal delay={100} variant="scale">
            <div className="story-card motion-card motion-panel rounded-3xl p-6 text-base leading-8 text-slate-200">
              {post.intro}
            </div>
          </Reveal>

          <Reveal delay={140} variant="right">
            <aside className="story-card motion-card motion-panel rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                In This Article
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {post.sections.map((section) => (
                  <li key={section.title}>
                    <a
                      href={`#${toSectionId(section.title)}`}
                      className="transition hover:text-sky-200"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>

        <div className="section-shell space-y-8">
          {post.sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 110 + 80} variant="up">
              <section
                id={toSectionId(section.title)}
                className="story-card motion-card motion-panel scroll-mt-28 rounded-3xl p-6"
              >
                <h2 className="text-2xl font-semibold text-slate-50">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300 md:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-5 space-y-2 text-sm text-slate-300">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-1 text-sky-300">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} variant="scale">
          <div className="editorial-panel motion-card motion-panel rounded-3xl p-6">
          <p className="text-sm font-semibold text-slate-50">
            Need support for Myanmar digital marketing?
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            I help with consulting, team training, and freelance media buying
            for brands that want stronger strategy and cleaner execution.
          </p>
          <Link
            href="/#contact"
            className="motion-button mt-4 inline-flex rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-sky-400"
          >
            Contact Me
          </Link>
          </div>
        </Reveal>
      </article>
    </main>
  );
}
