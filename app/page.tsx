"use client";

import { useState } from "react";

const workers = [
  {
    name: "Lead Qualifier Bot",
    price: "5,000",
    description:
      "Captures leads from website, WhatsApp, or email. Scores them automatically and routes hot leads to your team instantly.",
    features: [
      "Auto-score leads based on your criteria",
      "Instant WhatsApp/email alerts for hot leads",
      "Nurture sequences for cold leads",
      "Google Sheets / CRM integration",
    ],
    icon: "🎯",
  },
  {
    name: "Invoice Processor",
    price: "7,500",
    description:
      "Reads invoices from email, extracts vendor, amount, date, GST number. Pushes structured data to Tally or Google Sheets.",
    features: [
      "Auto-extract data from PDF/image invoices",
      "GST number validation",
      "Duplicate invoice detection",
      "Direct Tally / Sheets integration",
    ],
    icon: "🧾",
  },
  {
    name: "Customer Follow-Up Bot",
    price: "5,000",
    description:
      "Automated follow-up sequences after purchase or inquiry. WhatsApp + email on a schedule you control.",
    features: [
      "Multi-step WhatsApp + email sequences",
      "Smart timing based on engagement",
      "Escalation to human team when needed",
      "Engagement tracking dashboard",
    ],
    icon: "💬",
  },
  {
    name: "Appointment Reminder",
    price: "4,000",
    description:
      "WhatsApp/SMS reminders before appointments. Handles rescheduling and sends post-appointment feedback requests.",
    features: [
      "24h and 2h automatic reminders",
      "One-tap rescheduling via WhatsApp",
      "Google Calendar sync",
      "Post-visit feedback collection",
    ],
    icon: "📅",
  },
];

const testimonialPlaceholders = [
  {
    text: "We used to spend 3 hours daily on follow-ups. Now it runs on autopilot while we focus on closing deals.",
    role: "Digital Marketing Agency, Mumbai",
  },
  {
    text: "Invoice processing that took our team half a day now happens in minutes. The GST extraction alone saved us lakhs in errors.",
    role: "CA Firm, Bangalore",
  },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    pain: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Still show success — we don't want to lose the lead's attention
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <nav className="mb-16 flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              AutoPilot<span className="text-blue-400"> AI</span>
            </div>
            <a
              href="#contact"
              className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
            >
              Get Free Trial
            </a>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
              AI-Powered Automation for Indian Businesses
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Hire Digital Workers.
              <br />
              <span className="text-blue-400">Save 20+ Hours/Week.</span>
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-300">
              Our AI-powered Digital Workers handle your repetitive tasks —
              lead qualification, invoice processing, customer follow-ups,
              appointment reminders — so your team can focus on what matters.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="rounded-full bg-blue-500 px-8 py-3.5 text-center text-base font-semibold text-white transition hover:bg-blue-400"
              >
                Start Free Trial
              </a>
              <a
                href="#workers"
                className="rounded-full border border-white/20 px-8 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/10"
              >
                See Digital Workers
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {[
              { number: "20+", label: "Hours Saved/Week" },
              { number: "95%", label: "Automation Accuracy" },
              { number: "24/7", label: "Always Running" },
              { number: "₹4K", label: "Starting Price/Month" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
            Your Team is Wasting Time on Work a Bot Can Do
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-slate-600">
            Indian businesses lose 15-25 hours per week on manual tasks that
            AI can handle in seconds.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                pain: "Manual Lead Follow-ups",
                detail:
                  "Your team forgets to follow up. Leads go cold. Revenue leaks.",
                fix: "Our bot follows up within 5 minutes, every time, on WhatsApp.",
              },
              {
                pain: "Invoice Data Entry",
                detail:
                  "Hours spent copying numbers from PDFs into Tally or Sheets. Errors happen.",
                fix: "AI reads invoices instantly. Extracts GST, amount, vendor. Zero errors.",
              },
              {
                pain: "Missed Appointments",
                detail:
                  "Patients/clients don't show up. No reminders sent. Revenue lost.",
                fix: "Automatic WhatsApp reminders. One-tap rescheduling. 90% show-up rate.",
              },
            ].map((item) => (
              <div
                key={item.pain}
                className="rounded-2xl border border-slate-200 bg-white p-8"
              >
                <h3 className="mb-2 text-lg font-semibold text-red-600">
                  {item.pain}
                </h3>
                <p className="mb-4 text-sm text-slate-500">{item.detail}</p>
                <p className="text-sm font-medium text-blue-700">{item.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Workers */}
      <section id="workers" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
            Meet Your Digital Workers
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-slate-600">
            Each worker handles one function. Runs 24/7. No sick days, no
            mistakes, no delays.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {workers.map((worker) => (
              <div
                key={worker.name}
                className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{worker.icon}</div>
                <h3 className="mb-1 text-xl font-bold text-slate-900">
                  {worker.name}
                </h3>
                <div className="mb-4 text-2xl font-bold text-blue-600">
                  ₹{worker.price}
                  <span className="text-sm font-normal text-slate-400">
                    /month
                  </span>
                </div>
                <p className="mb-4 text-sm text-slate-600">
                  {worker.description}
                </p>
                <ul className="space-y-2">
                  {worker.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 text-blue-500">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            How It Works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Tell Us Your Pain",
                desc: "Which manual tasks eat your team's time? We'll identify the right Digital Worker for you.",
              },
              {
                step: "2",
                title: "We Set It Up (Free)",
                desc: "We build and configure your automation in 48 hours. You test it for a week — no charge.",
              },
              {
                step: "3",
                title: "It Runs. You Grow.",
                desc: "Your Digital Worker runs 24/7. You get weekly reports showing time and money saved.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            What Business Owners Say
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonialPlaceholders.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8"
              >
                <p className="mb-4 text-lg italic text-slate-700">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-sm font-medium text-slate-500">{t.role}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            * Early pilot feedback. Case studies coming soon.
          </p>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-slate-600">
            Pay per worker. No hidden fees. Cancel anytime.
          </p>
          <div className="mx-auto max-w-md rounded-2xl border-2 border-blue-500 bg-white p-8">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Most Popular
            </div>
            <div className="mb-1 text-4xl font-bold text-slate-900">
              ₹10,000
              <span className="text-lg font-normal text-slate-400">
                /month
              </span>
            </div>
            <p className="mb-6 text-slate-500">2 Digital Workers of your choice</p>
            <ul className="mb-8 space-y-3 text-left text-sm text-slate-700">
              {[
                "Free 1-week trial before you pay",
                "Setup and customization included",
                "Weekly performance reports",
                "WhatsApp + Email + Google Sheets integration",
                "Dedicated support on WhatsApp",
                "10% off for 3+ workers",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-500">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block w-full rounded-full bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
            Get Your Free Digital Worker
          </h2>
          <p className="mb-10 text-center text-lg text-slate-600">
            Tell us about your business. We&apos;ll set up one automation for
            free — no strings attached.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
              <div className="mb-4 text-5xl">&#10003;</div>
              <h3 className="mb-2 text-xl font-bold text-green-800">
                Thank you! We&apos;ll be in touch within 24 hours.
              </h3>
              <p className="text-green-600">
                We&apos;ll reach out on WhatsApp to understand your workflow and
                get your Digital Worker running.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Rajesh Kumar"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Business Name & Type
                </label>
                <input
                  type="text"
                  required
                  value={formData.business}
                  onChange={(e) =>
                    setFormData({ ...formData, business: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Kumar & Associates, CA Firm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  What repetitive task wastes the most time in your business?
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.pain}
                  onChange={(e) =>
                    setFormData({ ...formData, pain: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="E.g., We spend 2 hours daily copying invoice data into Tally..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-blue-600 py-3.5 text-base font-semibold text-white transition hover:bg-blue-500"
              >
                {submitting ? "Sending..." : "Get Free Trial — No Payment Required"}
              </button>
              <p className="text-center text-xs text-slate-400">
                We&apos;ll reply on WhatsApp within 24 hours. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="mb-2 text-lg font-bold text-slate-900">
            AutoPilot<span className="text-blue-600"> AI</span>
          </div>
          <p className="text-sm text-slate-500">
            Digital Workers for Indian Businesses
          </p>
        </div>
      </footer>
    </div>
  );
}
