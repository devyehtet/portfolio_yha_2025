"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { sendLeadEvent } from "@/app/components/MetaLeadTracker";

type BookingResponse = {
  error?: string;
  ok?: boolean;
};

const services = [
  "Team Training",
  "Growth Consulting",
  "Freelance Media Buying",
  "SEO Strategy",
  "Performance Audit",
];

export default function BookCallForm() {
  const [form, setForm] = useState({
    company: "",
    email: "",
    message: "",
    name: "",
    service: services[0],
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.service || !form.message) {
      setError("Please complete the required fields.");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const submittedForm = { ...form };
      const response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedForm),
      });

      let data: BookingResponse | null = null;

      try {
        data = (await response.json()) as BookingResponse;
      } catch {
        // ignore json parse errors
      }

      if (!response.ok) {
        setStatus("error");
        setError(data?.error ?? "Unable to send your request right now.");
        return;
      }

      setStatus("success");
      setForm({
        company: "",
        email: "",
        message: "",
        name: "",
        service: services[0],
      });

      void sendLeadEvent({
        email: submittedForm.email,
        url: window.location.href,
        contentName: "Book a Call Form",
      }).catch((trackingError) => {
        console.error("Book a call lead tracking error:", trackingError);
      });
    } catch (submitError) {
      console.error("Book call form error:", submitError);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const isDisabled =
    status === "submitting" ||
    !form.name ||
    !form.email ||
    !form.service ||
    !form.message;

  return (
    <form
      onSubmit={handleSubmit}
      className="form-surface motion-card motion-panel"
    >
      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap gap-2">
          {["Fast Brief", "Focused Fit", "Clear Next Step"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="text-sm font-semibold text-slate-50">
          Tell me what you want to discuss
        </p>
        <p className="text-xs leading-6 text-slate-400">
          Share your goals, the kind of support you need, and any context that
          will help me prepare a useful reply.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs text-slate-300">Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="field-control text-sm"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-slate-300">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="field-control text-sm"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-slate-300">
            Company or Brand
          </span>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="field-control text-sm"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-slate-300">
            Interested In
          </span>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="field-control text-sm"
          >
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-xs text-slate-300">
          What would you like to talk about?
        </span>
        <textarea
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          required
          className="field-control rounded-[1.35rem] text-sm"
          placeholder="Tell me about your business, goals, current challenge, and what kind of support you are looking for."
        />
      </label>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {status === "success" && (
        <p className="mt-4 text-sm text-emerald-400">
          Your request has been sent. I&apos;ll get back to you soon.
        </p>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={`motion-button relative z-10 mt-6 inline-flex rounded-full px-5 py-3 text-sm font-semibold transition ${
          isDisabled
            ? "cursor-not-allowed bg-sky-500/40 text-slate-700"
            : "bg-sky-500 text-slate-900 hover:bg-sky-400"
        }`}
      >
        {status === "submitting" ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
