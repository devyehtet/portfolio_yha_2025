"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

/* ---------------------------------------
   NAVIGATION ITEMS
--------------------------------------- */
const navItems = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

/* ---------------------------------------
   SERVICES
--------------------------------------- */
const services = [
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Increase organic traffic and search visibility with technical SEO, on-page optimization, and high-intent content.",
    tools: [
      "Google Analytics",
      "SEMrush",
      "Ahrefs",
      "Moz",
      "Screaming Frog",
      "Google Search Console",
    ],
  },
  {
    title: "Pay-Per-Click (PPC) Advertising",
    description:
      "Performance-focused PPC campaigns across Google Ads & social platforms to hit CPA/ROAS targets.",
    tools: [
      "Google Ads",
      "Meta Ads Manager",
      "Bing Ads",
      "Google Tag Manager",
      "Google Analytics",
    ],
  },
  {
    title: "Social Media Marketing & Management",
    description:
      "Platform-native content, community building, and always-on paid support to grow brand and demand.",
    tools: [
      "Hootsuite",
      "Buffer",
      "Sprout Social",
      "Canva",
      "Meta Business Suite",
    ],
  },
  {
    title: "Content Marketing",
    description:
      "Full-funnel content execution to drive meaningful search, social and retention results.",
    tools: ["WordPress", "Google Docs", "Buzzsumo", "Canva", "YouTube"],
  },
  {
    title: "Email & CRM Automation",
    description:
      "Lifecycle automation & segmentation to convert leads into customers with predictable uplift.",
    tools: ["Mailchimp", "Klaviyo", "HubSpot", "ActiveCampaign"],
  },
  {
    title: "Conversion Rate Optimization (CRO)",
    description:
      "Landing page and funnel experiments to improve conversion without increasing ad spend.",
    tools: ["Hotjar", "Google Optimize", "VWO", "Unbounce"],
  },
];

const skills = [
  { name: "Digital Marketing Strategy", level: 95 },
  { name: "Performance Marketing", level: 93 },
  { name: "Paid Advertising (PPC)", level: 90 },
  { name: "Analytics & Reporting", level: 90 },
  { name: "SEM / Google Ads", level: 88 },
  { name: "Social Media Strategy", level: 86 },
  { name: "Campaign Optimization", level: 92 },
  { name: "Budget Management", level: 95 },
];

/* ---------------------------------------
   REAL WORK EXPERIENCE
--------------------------------------- */
const experiences = [
  {
    role: "Regional Digital Manager",
    company: "MCIX Thailand Agency",
    period: "Feb 2025 – Dec 2025",
    description:
      "Overseeing digital strategy, campaign execution, and performance optimization across multiple markets. Leading cross-functional teams to drive innovation and achieve business objectives.",
    achievements: [
      "Developed and executed high-impact digital marketing strategies",
      "Managed multi-million-dollar budgets across various digital platforms",
      "Implemented advanced analytics to improve campaign tracking and ROI measurement",
      "Led a team of digital marketing professionals to deliver exceptional results",
    ],
  },
  {
    role: "Senior Operation Manager",
    company: "Humology",
    period: "Nov 2019 – Mar 2022",
    description:
      "Managed team deliverables, established optimization approaches, and ensured high standards of campaign performance. Oversaw daily operations and team coordination.",
    achievements: [
      "Streamlined operational processes reducing turnaround time by 30%",
      "Developed and implemented new campaign strategies",
      "Improved client satisfaction scores by 40%",
      "Successfully managed 20+ concurrent projects",
    ],
  },
  {
    role: "Senior Digital Media Buyer / Planner",
    company: "Passion Point Media Ltd",
    period: "Jul 2017 – Apr 2019",
    description:
      "Developed media strategies, managed client relationships, and executed multi-platform advertising campaigns with a strong focus on ROI.",
    achievements: [
      "Achieved 150% ROI improvement for key clients",
      "Managed digital media budgets of $300,000+",
      "Introduced new audience and bidding strategies to scale efficiently",
      "Developed automated reporting systems for faster decision-making",
    ],
  },
  {
    role: "Digital Marketing Specialist",
    company: "City Mart Holding Ltd",
    period: "Feb 2016 – May 2017",
    description:
      "Managed digital marketing initiatives to enhance brand visibility, optimize campaigns, and grow audience engagement across multiple online platforms.",
    achievements: [
      "Increased social media engagement by 200%",
      "Implemented successful email marketing campaigns",
      "Improved website traffic by 75%",
      "Established digital marketing best practices within the team",
    ],
  },
];

const education = {
  degree: "B.Sc in Physics",
  university: "Dagon University",
  graduationYear: 2012,
  achievements: [
    "Graduated with strong analytical foundation.",
    "Active in Physics Society and academic groups.",
  ],
};

const certifications = [
  {
    name: "Google Ads - Measurement Certification",
    issuer: "Google",
    year: 2024,
    description: "Advanced measurement & optimization frameworks.",
  },
  {
    name: "Google Ads Apps Certification",
    issuer: "Google",
    year: 2024,
    description: "App acquisition strategy and optimization.",
  },
  {
    name: "Display & Video 360 Certification",
    issuer: "Google",
    year: 2024,
    description: "Programmatic media planning & activation.",
  },
];

/* ---------------------------------------
   PAGE COMPONENT
--------------------------------------- */
export default function HomePage() {
  // Smooth scroll
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* CONTACT FORM STATE */
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const disabled =
    status === "submitting" || !form.name || !form.email || !form.message;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),transparent_60%)]" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => scrollTo("top")}
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            {/* Logo */}
            <Image
              src="/logo.png"
              alt="Ye Htet Aung Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="hidden text-sm text-slate-100 sm:inline">
              Ye Htet Aung
            </span>
          </button>

          <nav className="hidden gap-5 text-xs md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="rounded-full px-3 py-1 text-slate-300 hover:bg-slate-800/70 hover:text-sky-300 transition"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contact")}
            className="rounded-full bg-sky-500 px-4 py-1 text-xs font-semibold text-slate-900 hover:bg-sky-400 transition"
          >
            Contact
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main
        id="top"
        className="relative z-10 mx-auto max-w-6xl flex flex-col gap-16 px-4 py-12"
      >
        {/* ABOUT */}
        <section id="about" className="pt-4">
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
            {/* LEFT: TEXT */}
            <div className="flex-1 space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-sky-300">
                Digital Marketing Manager • Performance Marketing
              </p>

              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Ye Htet Aung
              </h1>

              <p className="text-sm text-slate-200 md:text-base max-w-2xl">
                Digital Marketing Expert with extensive experience in crafting
                and executing data-driven strategies across Meta, Google Ads,
                TikTok, Programmatic, and SEO. Specialized in multi-channel
                performance architecture, creative optimization, and business
                growth frameworks.
              </p>

              <p className="text-sm text-slate-300 md:text-base max-w-2xl">
                I help brands grow with a performance-first mindset — combining
                channel strategy, creative testing, analytics, and continuous
                optimization to hit business goals efficiently.
              </p>

              <div className="flex flex-wrap gap-2 text-xs text-slate-100">
                {[
                  "Performance Marketing",
                  "Multi-Channel Strategy",
                  "Data-Driven Decisions",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-sky-500/40 bg-slate-900/60 px-3 py-1 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: PHOTO CARD */}
            <div className="w-full max-w-xs self-stretch md:self-auto flex justify-center md:justify-end">
              <div className="relative w-full rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-xl shadow-blue-900/40 p-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative h-44 w-44 rounded-full overflow-hidden border-4 border-sky-400 shadow-lg shadow-sky-900/60">
                    <Image
                      src="/yehtet.jpg"
                      alt="Ye Htet Aung"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-semibold">
                      Based in Chiang Mai, Thailand
                    </p>
                    <p className="mt-1 text-xs text-slate-300 max-w-[220px] mx-auto">
                      Open to remote, hybrid & regional leadership roles across
                      SEA & global markets.
                    </p>
                    <div className="mt-4 flex justify-center gap-2 text-[11px]">
                      <span className="rounded-full bg-slate-800/70 px-3 py-1 border border-slate-700 text-sky-300">
                        12+ years experience
                      </span>
                      <span className="rounded-full bg-slate-800/70 px-3 py-1 border border-slate-700 text-sky-300">
                        SEA & Global Markets
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="space-y-6">
          <h2 className="text-xl font-semibold">Digital Marketing Services</h2>
          <p className="text-sm text-slate-300 max-w-3xl">
            End-to-end digital strategy execution across SEO, PPC, Social, CRO,
            Analytics, and full-funnel optimization.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-sky-500/60 transition"
              >
                <h3 className="text-sm font-semibold">{service.title}</h3>
                <p className="mt-2 text-xs text-slate-300">
                  {service.description}
                </p>
                <p className="mt-3 text-[11px] uppercase text-sky-300">
                  Tools & Technologies
                </p>
                <p className="text-[11px] text-slate-400">
                  {service.tools.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="space-y-6">
          <h2 className="text-xl font-semibold">Skills & Expertise</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs">
                  <span>{skill.name}</span>
                  <span className="text-sky-300">{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.role}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <div className="flex justify-between text-xs">
                  <div>
                    <h3 className="font-semibold text-slate-100">
                      {exp.role}
                    </h3>
                    <p className="text-slate-400">{exp.company}</p>
                  </div>
                  <p className="text-slate-400">{exp.period}</p>
                </div>

                <p className="mt-3 text-sm text-slate-300">
                  {exp.description}
                </p>

                <p className="mt-3 text-xs font-semibold text-emerald-300">
                  Key Achievements:
                </p>
                <ul className="mt-1 space-y-1 text-xs text-slate-400">
                  {exp.achievements.map((a) => (
                    <li key={a}>• {a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="space-y-6">
          <h2 className="text-xl font-semibold">Education & Certifications</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold">{education.degree}</h3>
              <p className="text-xs text-slate-400">{education.university}</p>
              <p className="text-[11px] text-slate-500">
                Graduation Year: {education.graduationYear}
              </p>

              <ul className="mt-3 text-xs text-slate-300 space-y-1">
                {education.achievements.map((e) => (
                  <li key={e}>• {e}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <h3 className="text-sm font-semibold">{cert.name}</h3>
                  <p className="text-[11px] text-slate-400">
                    {cert.issuer} • {cert.year}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="space-y-6">
          <h2 className="text-xl font-semibold">Get In Touch</h2>

          <p className="text-sm text-slate-300 max-w-2xl">
            Based in Chiang Mai, Thailand. Open to full-time, contract, and
            consulting roles in digital marketing & performance.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* LEFT SIDE INFO */}
            <div className="text-sm text-slate-200 space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Location
                </p>
                <p>Chiang Mai, Thailand</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Email
                </p>
                <p>info@yehtet.com</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Phone
                </p>
                <p>+66 (0) 941-567-809</p>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4"
            >
              {/* NAME */}
              <div>
                <label className="text-xs mb-1 block">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs outline-none focus:border-sky-500"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs mb-1 block">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs outline-none focus:border-sky-500"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-xs mb-1 block">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs outline-none focus:border-sky-500"
                ></textarea>
              </div>

              {/* ERRORS */}
              {error && <p className="text-xs text-red-400">{error}</p>}

              {/* SUCCESS */}
              {status === "success" && (
                <p className="text-xs text-emerald-400">
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={disabled}
                className={`w-full py-2 rounded-full text-xs font-semibold transition 
                  ${
                    disabled
                      ? "bg-sky-500/40 text-slate-700 cursor-not-allowed"
                      : "bg-sky-500 text-slate-900 hover:bg-sky-400"
                  }
                `}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-xs text-slate-500 border-t border-slate-800 py-6 mt-10">
          © {new Date().getFullYear()} Ye Htet Aung. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
