"use client";

import { useState, useEffect } from "react";

/* ─── Workflow animation data ─── */
const workflowSteps = [
  { label: "Invoice arrives", sub: "via email" },
  { label: "AI reads it", sub: "extracts GST, amount, vendor" },
  { label: "Data verified", sub: "flags anomalies" },
  { label: "Pushed to Tally", sub: "zero manual entry" },
];

/* ─── Services ─── */
const services = [
  {
    id: "invoices",
    title: "Invoice Processing",
    price: "7,500",
    before: "Your staff spends 2-3 hours daily copying data from PDF invoices into Tally or Google Sheets. Errors cost you real money.",
    after: "AI reads every invoice the moment it hits your inbox. Extracts vendor, amount, date, GST number. Pushes clean data to Tally or Sheets. Flags duplicates.",
    metric: "3 hrs/day",
    metricLabel: "saved on data entry",
  },
  {
    id: "leads",
    title: "Lead Qualification",
    price: "5,000",
    before: "Leads from your website or ads sit in a spreadsheet. Your team calls them hours later — by then, they've moved on.",
    after: "Every new lead is scored instantly. Hot leads get a WhatsApp message within 60 seconds. Cold leads enter a nurture sequence. Nothing falls through.",
    metric: "60 sec",
    metricLabel: "response to hot leads",
  },
  {
    id: "followups",
    title: "Customer Follow-ups",
    price: "5,000",
    before: "Follow-up reminders get lost in someone's task list. Clients feel ignored. Repeat business drops.",
    after: "Automated WhatsApp + email sequences trigger after every interaction. Perfectly timed, always consistent, escalates to your team only when needed.",
    metric: "3x",
    metricLabel: "more repeat business",
  },
  {
    id: "appointments",
    title: "Appointment Reminders",
    price: "4,000",
    before: "15-30% of appointments are no-shows. Your team calls each person manually to remind them. Rescheduling is chaos.",
    after: "Automatic WhatsApp reminders at 24h and 2h. Patients reply to reschedule with one tap. Calendar updates itself.",
    metric: "90%",
    metricLabel: "show-up rate",
  },
];

/* ─── Workflow Animation Component ─── */
function WorkflowViz() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % workflowSteps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
      {workflowSteps.map((step, i) => {
        const isActive = i === activeStep;
        const isPast = i < activeStep;
        return (
          <div key={step.label} className="flex items-center gap-2 sm:gap-3">
            <div
              className="relative flex flex-col items-center transition-all duration-500"
              style={{ opacity: isPast ? 0.4 : isActive ? 1 : 0.25 }}
            >
              <div
                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 transition-all duration-500"
                style={{
                  borderColor: isActive ? "var(--amber)" : "var(--border)",
                  background: isActive ? "var(--amber-glow)" : "transparent",
                }}
              >
                <span
                  className="text-xs font-mono font-medium transition-colors duration-500"
                  style={{ color: isActive ? "var(--amber)" : "var(--ink-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <span
                className="mt-1.5 text-center text-[10px] sm:text-xs font-medium leading-tight whitespace-nowrap transition-colors duration-500"
                style={{ color: isActive ? "var(--ink)" : "var(--ink-muted)" }}
              >
                {step.label}
              </span>
              <span
                className="text-center text-[9px] sm:text-[10px] leading-tight transition-colors duration-500 hidden sm:block"
                style={{ color: isActive ? "var(--amber)" : "var(--ink-muted)" }}
              >
                {step.sub}
              </span>
            </div>
            {i < workflowSteps.length - 1 && (
              <div className="h-px w-4 sm:w-8" style={{ background: isPast ? "var(--amber)" : "var(--border)" }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    background: isPast || isActive ? "var(--amber)" : "transparent",
                    width: isPast ? "100%" : isActive ? "60%" : "0%",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      className={`fade-up fade-up-${index + 1} group relative`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "2px",
      }}
    >
      {/* Top accent */}
      <div className="h-[2px]" style={{ background: "var(--amber)" }} />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3
              className="text-lg sm:text-xl mb-0.5"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              {service.title}
            </h3>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold" style={{ color: "var(--ink)" }}>
                &#8377;{service.price}
              </span>
              <span className="text-sm" style={{ color: "var(--ink-muted)" }}>/month</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold" style={{ color: "var(--teal)" }}>
              {service.metric}
            </div>
            <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
              {service.metricLabel}
            </div>
          </div>
        </div>

        {/* Before / After toggle */}
        <div className="mb-5">
          <div className="flex gap-0 mb-3">
            <button
              onClick={() => setShowAfter(false)}
              className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all"
              style={{
                background: !showAfter ? "var(--ink)" : "transparent",
                color: !showAfter ? "var(--cream)" : "var(--ink-muted)",
                border: "1px solid var(--ink)",
                borderRight: "none",
              }}
            >
              The problem
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all"
              style={{
                background: showAfter ? "var(--teal)" : "transparent",
                color: showAfter ? "white" : "var(--ink-muted)",
                border: `1px solid ${showAfter ? "var(--teal)" : "var(--ink)"}`,
              }}
            >
              Our solution
            </button>
          </div>
          <p
            className="text-sm leading-relaxed min-h-[60px] transition-all duration-300"
            style={{ color: "var(--ink-light)" }}
          >
            {showAfter ? service.after : service.before}
          </p>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
          style={{ color: "var(--amber)" }}
        >
          Try it free for 7 days
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M1 7h12m0 0L8 2.5M13 7l-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
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
      // Still show success
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* ─── NAV ─── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(250, 248, 245, 0.9)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-5xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo mark */}
            <div
              className="h-7 w-7 flex items-center justify-center"
              style={{ background: "var(--ink)", borderRadius: "2px" }}
            >
              <span className="text-xs font-mono font-medium" style={{ color: "var(--amber)" }}>AP</span>
            </div>
            <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
              AutoPilot
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#services" className="hidden sm:block text-sm" style={{ color: "var(--ink-muted)" }}>
              Services
            </a>
            <a href="#how" className="hidden sm:block text-sm" style={{ color: "var(--ink-muted)" }}>
              How it works
            </a>
            <a href="/roi" className="hidden sm:block text-sm" style={{ color: "var(--ink-muted)" }}>
              ROI Calculator
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20AutoPilot%20AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all"
              style={{
                background: "var(--ink)",
                color: "var(--cream)",
                borderRadius: "2px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#25D366" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp us
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <header className="noise-bg relative overflow-hidden" style={{ background: "var(--cream)" }}>
        <div className="relative z-10 mx-auto max-w-5xl px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
          {/* Eyebrow */}
          <div className="fade-up fade-up-1 mb-6 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--amber)" }} />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--amber)", fontFamily: "var(--font-mono)" }}
            >
              AI Automation Agency
            </span>
          </div>

          {/* Headline — editorial style */}
          <div className="fade-up fade-up-2 max-w-3xl mb-8">
            <h1
              className="text-[clamp(2rem,5.5vw,3.8rem)] leading-[1.1] tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Your business runs on{" "}
              <span style={{ color: "var(--amber)" }}>repetitive work.</span>
              <br />
              It doesn&apos;t have to.
            </h1>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--ink-muted)", fontWeight: 300 }}
            >
              We build AI-powered workflows that handle your invoices, follow-ups,
              lead scoring, and appointment reminders. You focus on your clients.
              The automations handle the rest.
            </p>
          </div>

          {/* CTAs */}
          <div className="fade-up fade-up-3 flex flex-col sm:flex-row gap-3 mb-14">
            <a
              href="#contact"
              className="pulse-cta inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all"
              style={{
                background: "var(--amber)",
                color: "white",
                borderRadius: "2px",
              }}
            >
              Get a free automation — no payment needed
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all"
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
              }}
            >
              See what we automate
            </a>
            <a
              href="/roi"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all"
              style={{
                background: "transparent",
                color: "var(--ink-muted)",
                borderRadius: "2px",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Calculate your ROI
            </a>
          </div>

          {/* Workflow visualization */}
          <div className="fade-up fade-up-4">
            <div
              className="p-4 sm:p-6"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--teal)" }} />
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.15em]"
                  style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                >
                  Live workflow — Invoice Processing
                </span>
              </div>
              <WorkflowViz />
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-10">
            {[
              { value: "Built for", desc: "Indian businesses" },
              { value: "Works with", desc: "Tally, WhatsApp, Sheets" },
              { value: "Starts at", desc: "₹4,000/month" },
            ].map((item) => (
              <div key={item.desc} className="flex items-center gap-2">
                <div className="h-3 w-px" style={{ background: "var(--amber)" }} />
                <div>
                  <span className="text-[10px] uppercase tracking-wider block" style={{ color: "var(--ink-muted)" }}>
                    {item.value}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative side element */}
        <div
          className="hidden lg:block absolute top-24 right-0 w-px h-64"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--amber), transparent)",
            opacity: 0.3,
          }}
        />
      </header>

      {/* ─── THE NUMBER ─── */}
      <section
        className="relative py-14"
        style={{ background: "var(--ink)", color: "var(--cream)" }}
      >
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
            {[
              { number: "15–25 hrs", desc: "wasted per week on tasks AI can do" },
              { number: "₹0", desc: "to try your first Digital Worker" },
              { number: "48 hrs", desc: "from call to running automation" },
            ].map((stat) => (
              <div key={stat.desc} className="flex flex-col items-center">
                <span
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ color: "var(--amber-light)" }}
                >
                  {stat.number}
                </span>
                <span className="text-xs mt-1" style={{ color: "rgba(250,248,245,0.5)" }}>
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mb-12 sm:mb-16 max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "var(--amber)" }} />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: "var(--amber)", fontFamily: "var(--font-mono)" }}
              >
                What we automate
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Four automations that pay for themselves in week one.
            </h2>
            <p className="text-base" style={{ color: "var(--ink-muted)", fontWeight: 300 }}>
              Each one replaces hours of manual work. Toggle between the problem and our solution to see the difference.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        id="how"
        className="py-20 sm:py-28 noise-bg"
        style={{ background: "var(--cream-dark)" }}
      >
        <div className="relative z-10 mx-auto max-w-5xl px-5">
          <div className="mb-12 sm:mb-16 max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "var(--amber)" }} />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: "var(--amber)", fontFamily: "var(--font-mono)" }}
              >
                The process
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              From call to running automation in 48 hours.
            </h2>
          </div>

          <div className="grid gap-0 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "You tell us what hurts",
                body: "A 15-minute WhatsApp call. We ask what repetitive tasks drain your team's time. You talk, we listen.",
              },
              {
                num: "02",
                title: "We build it in 48 hours",
                body: "Our team configures a Digital Worker customized to your exact workflow, tools, and team. No generic templates.",
              },
              {
                num: "03",
                title: "Free trial for 7 days",
                body: "Your automation runs for a full week. We share a report showing hours saved and tasks completed. You decide if it's worth paying for.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="relative p-6 sm:p-8"
                style={{
                  background: "var(--surface)",
                  borderRight: i < 2 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                  borderTop: "1px solid var(--border)",
                  borderLeft: i === 0 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  className="block text-4xl font-semibold mb-4"
                  style={{ color: "var(--border)", fontFamily: "var(--font-mono)" }}
                >
                  {step.num}
                </span>
                <h3 className="text-base font-semibold mb-2" style={{ color: "var(--ink)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)", fontWeight: 300 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid sm:grid-cols-2 gap-10 sm:gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "var(--amber)" }} />
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: "var(--amber)", fontFamily: "var(--font-mono)" }}
                >
                  Why AutoPilot
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                Built specifically for how Indian businesses actually work.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--ink-muted)", fontWeight: 300 }}>
                We don&apos;t sell generic &quot;AI tools.&quot; We build workflows around the software you already use — Tally, WhatsApp, Google Sheets, your existing email.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--amber)" }}
              >
                Talk to us on WhatsApp
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12m0 0L8 2.5M13 7l-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "WhatsApp-native",
                  desc: "Your clients and your team live on WhatsApp. Our automations do too.",
                },
                {
                  title: "Tally & GST-ready",
                  desc: "Invoice extraction handles Indian GST formats, HSN codes, and Tally-compatible output.",
                },
                {
                  title: "No new software to learn",
                  desc: "We plug into your existing tools. Your team doesn't change how they work — the busywork just disappears.",
                },
                {
                  title: "You own everything",
                  desc: "No lock-in. Every workflow we build is documented and transferable. Leave anytime.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                  }}
                >
                  <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--ink)" }}>
                    {item.title}
                  </h4>
                  <p className="text-sm" style={{ color: "var(--ink-muted)", fontWeight: 300 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section
        className="py-20 sm:py-28"
        style={{ background: "var(--ink)" }}
      >
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl tracking-tight mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
            >
              Straightforward pricing.
            </h2>
            <p className="text-base" style={{ color: "rgba(250,248,245,0.5)" }}>
              Pay per worker. No hidden fees. Cancel anytime. Start with a free trial.
            </p>
          </div>

          <div className="grid sm:grid-cols-4 gap-0">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="p-6 text-center"
                style={{
                  border: "1px solid rgba(250,248,245,0.08)",
                  borderRight: i < services.length - 1 ? "none" : "1px solid rgba(250,248,245,0.08)",
                }}
              >
                <div className="text-sm mb-3" style={{ color: "rgba(250,248,245,0.5)" }}>
                  {s.title}
                </div>
                <div className="text-2xl font-semibold mb-1" style={{ color: "var(--amber-light)" }}>
                  &#8377;{s.price}
                </div>
                <div className="text-xs mb-4" style={{ color: "rgba(250,248,245,0.3)" }}>per month</div>
                <a
                  href="#contact"
                  className="inline-block w-full py-2 text-sm font-medium transition-all"
                  style={{
                    border: "1px solid var(--amber)",
                    color: "var(--amber-light)",
                    borderRadius: "2px",
                  }}
                >
                  Start free
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-xs" style={{ color: "rgba(250,248,245,0.3)" }}>
              Bundle 2 or more workers and save 10%. Setup and customization included in every plan.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
            {/* Left — message */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "var(--amber)" }} />
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: "var(--amber)", fontFamily: "var(--font-mono)" }}
                >
                  Get started
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl tracking-tight mb-5"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                Tell us what eats your team&apos;s time.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--ink-muted)", fontWeight: 300 }}>
                We&apos;ll build one automation for free. You test it for a week. If it saves you time, we talk pricing. If not — no hard feelings.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--teal)" }} />
                  <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>No payment required.</strong> We set up your first worker for free.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--teal)" }} />
                  <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>48-hour setup.</strong> From our first conversation to a running automation.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--teal)" }} />
                  <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                    <strong style={{ color: "var(--ink)" }}>WhatsApp support.</strong> Message us anytime. We respond within 2 hours.
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="mt-8 p-5" style={{ background: "var(--cream-dark)", borderRadius: "2px" }}>
                <p className="text-sm mb-3" style={{ color: "var(--ink)" }}>
                  Prefer to just message us directly?
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20automate%20a%20task%20in%20my%20business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition-all"
                  style={{ background: "#25D366", borderRadius: "2px" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message us on WhatsApp
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div
                  className="p-8"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--teal)",
                    borderRadius: "2px",
                  }}
                >
                  <div className="h-10 w-10 flex items-center justify-center mb-4" style={{ background: "var(--teal)", borderRadius: "2px" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3
                    className="text-xl mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                  >
                    We&apos;ll be in touch within 24 hours.
                  </h3>
                  <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                    Expect a WhatsApp message from our team to understand your workflow and get your Digital Worker started.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 space-y-4"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                  }}
                >
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--ink-muted)" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                      style={{
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        color: "var(--ink)",
                      }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--ink-muted)" }}>
                      Business
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                      style={{
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        color: "var(--ink)",
                      }}
                      placeholder="Company name & type (e.g. Kumar & Co, CA Firm)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--ink-muted)" }}>
                      WhatsApp number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                      style={{
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        color: "var(--ink)",
                      }}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--ink-muted)" }}>
                      What task wastes the most time?
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.pain}
                      onChange={(e) => setFormData({ ...formData, pain: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm outline-none transition-all resize-none"
                      style={{
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        color: "var(--ink)",
                      }}
                      placeholder="E.g. We spend 2 hours daily entering invoice data into Tally..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 text-sm font-medium transition-all"
                    style={{
                      background: "var(--ink)",
                      color: "var(--cream)",
                      borderRadius: "2px",
                      opacity: submitting ? 0.6 : 1,
                    }}
                  >
                    {submitting ? "Sending..." : "Get your free automation"}
                  </button>
                  <p className="text-[11px] text-center" style={{ color: "var(--ink-muted)" }}>
                    We reply within 24 hours on WhatsApp. No spam, no newsletters.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-5xl px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 flex items-center justify-center"
              style={{ background: "var(--ink)", borderRadius: "2px" }}
            >
              <span className="text-[9px] font-mono font-medium" style={{ color: "var(--amber)" }}>AP</span>
            </div>
            <span className="text-sm" style={{ color: "var(--ink-muted)" }}>
              AutoPilot AI
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ color: "var(--ink-muted)" }}
            >
              WhatsApp
            </a>
            <a href="mailto:hello@autopilotai.in" className="text-xs" style={{ color: "var(--ink-muted)" }}>
              Email
            </a>
            <span className="text-xs" style={{ color: "var(--border)" }}>
              &copy; 2026
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
