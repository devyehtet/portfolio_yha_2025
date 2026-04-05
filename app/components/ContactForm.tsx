"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

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

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const disabled =
    !form.name || !form.email || !form.message || status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 max-w-xl"
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
          Message sent successfully! I’ll get back to you soon.
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
  );
}
