"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { sendLeadEvent } from "@/app/components/MetaLeadTracker";

type MediaPlanRequestResponse = {
  error?: string;
  ok?: boolean;
};

const useCases = [
  "Launch planning",
  "Monthly media planning",
  "Client review",
  "Internal team planning",
  "Workshop or training",
];

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000+",
  "Not decided yet",
];

export default function MediaPlanRequestForm() {
  const [form, setForm] = useState({
    budgetRange: "",
    company: "",
    email: "",
    name: "",
    notes: "",
    role: "",
    useCase: useCases[0],
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

    if (
      !form.name ||
      !form.email ||
      !form.company ||
      !form.role ||
      !form.useCase ||
      !form.notes
    ) {
      setError("Please complete the required fields.");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const submittedForm = { ...form };
      const response = await fetch("/api/media-plan-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedForm),
      });

      let data: MediaPlanRequestResponse | null = null;

      try {
        data = (await response.json()) as MediaPlanRequestResponse;
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
        budgetRange: "",
        company: "",
        email: "",
        name: "",
        notes: "",
        role: "",
        useCase: useCases[0],
      });

      void sendLeadEvent({
        email: submittedForm.email,
        url: window.location.href,
        contentName: "Media Plan Template Request",
      }).catch((trackingError) => {
        console.error("Media plan request lead tracking error:", trackingError);
      });
    } catch (submitError) {
      console.error("Media plan request form error:", submitError);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const isDisabled =
    status === "submitting" ||
    !form.name ||
    !form.email ||
    !form.company ||
    !form.role ||
    !form.useCase ||
    !form.notes;

  return (
    <form
      id="request-form"
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-sky-950/20 backdrop-blur"
    >
      <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
        {["Google Sheet", "Manual Share", "Email Delivery"].map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <h2 className="text-xl font-semibold text-slate-50">
          Request the media plan template
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          Fill in a few details and I&apos;ll receive your request by email.
          After I review it, I&apos;ll manually share the Google Sheet with you.
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
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-slate-300">Work Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
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
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-slate-300">Role</span>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-slate-300">
            Primary Use Case
          </span>
          <select
            name="useCase"
            value={form.useCase}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
          >
            {useCases.map((useCase) => (
              <option key={useCase} value={useCase}>
                {useCase}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-slate-300">Budget Range</span>
          <select
            name="budgetRange"
            value={form.budgetRange}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
          >
            <option value="">Select budget range</option>
            {budgetRanges.map((budgetRange) => (
              <option key={budgetRange} value={budgetRange}>
                {budgetRange}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-xs text-slate-300">
          What are you planning right now?
        </span>
        <textarea
          name="notes"
          rows={6}
          value={form.notes}
          onChange={handleChange}
          required
          className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
        />
      </label>

      {error && (
        <p className="mt-4 text-sm text-red-400" aria-live="polite">
          {error}
        </p>
      )}

      {status === "success" && (
        <p className="mt-4 text-sm text-emerald-400" aria-live="polite">
          Your request has been sent. I&apos;ll review it and manually share the
          Google Sheet by email.
        </p>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={`mt-6 rounded-full px-6 py-3 text-sm font-semibold transition ${
          isDisabled
            ? "cursor-not-allowed bg-sky-500/40 text-slate-700"
            : "bg-sky-500 text-slate-900 hover:bg-sky-400"
        }`}
      >
        {status === "submitting" ? "Sending..." : "Request Access"}
      </button>

      <p className="mt-4 text-xs leading-6 text-slate-400">
        This does not trigger an instant download. The request goes to my inbox
        first, then I manually share the Google Sheet.
      </p>
    </form>
  );
}
