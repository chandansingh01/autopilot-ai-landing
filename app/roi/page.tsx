"use client";

import { useState } from "react";
import Link from "next/link";

type TaskType = "invoice" | "leads" | "followups" | "appointments";

const taskProfiles: Record<TaskType, {
  label: string;
  avgMinutesPerTask: number;
  workerPrice: number;
  description: string;
}> = {
  invoice: {
    label: "Invoice / data entry",
    avgMinutesPerTask: 8,
    workerPrice: 7500,
    description: "Copying invoice data into Tally, Sheets, or accounting software",
  },
  leads: {
    label: "Lead follow-up & scoring",
    avgMinutesPerTask: 12,
    workerPrice: 5000,
    description: "Reviewing leads, scoring them, sending first response",
  },
  followups: {
    label: "Customer follow-ups",
    avgMinutesPerTask: 5,
    workerPrice: 5000,
    description: "Sending check-in messages, reminders, nurture emails",
  },
  appointments: {
    label: "Appointment reminders",
    avgMinutesPerTask: 4,
    workerPrice: 4000,
    description: "Calling or messaging to remind about upcoming appointments",
  },
};

export default function ROICalculator() {
  const [taskType, setTaskType] = useState<TaskType>("invoice");
  const [tasksPerDay, setTasksPerDay] = useState(15);
  const [staffCostPerMonth, setStaffCostPerMonth] = useState(20000);
  const [workingDays, setWorkingDays] = useState(25);

  const profile = taskProfiles[taskType];
  const minutesPerDay = tasksPerDay * profile.avgMinutesPerTask;
  const hoursPerDay = minutesPerDay / 60;
  const hoursPerMonth = hoursPerDay * workingDays;
  const staffHourlyRate = staffCostPerMonth / (workingDays * 8);
  const manualCostPerMonth = hoursPerMonth * staffHourlyRate;
  const savings = manualCostPerMonth - profile.workerPrice;
  const savingsPercent = manualCostPerMonth > 0
    ? Math.round((savings / manualCostPerMonth) * 100)
    : 0;
  const roi = profile.workerPrice > 0
    ? Math.round((savings / profile.workerPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(250, 248, 245, 0.9)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-5xl px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="h-7 w-7 flex items-center justify-center"
              style={{ background: "var(--ink)", borderRadius: "2px" }}
            >
              <span className="text-xs font-mono font-medium" style={{ color: "var(--amber)" }}>AP</span>
            </div>
            <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
              AutoPilot
            </span>
          </Link>
          <a
            href="https://wa.me/919876543210?text=I%20used%20your%20ROI%20calculator%20and%20I%27m%20interested"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium"
            style={{ background: "var(--ink)", color: "var(--cream)", borderRadius: "2px" }}
          >
            WhatsApp us
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <div className="mb-12 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "var(--amber)" }} />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--amber)", fontFamily: "var(--font-mono)" }}
            >
              ROI Calculator
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            How much is manual work costing your business?
          </h1>
          <p className="text-base" style={{ color: "var(--ink-muted)", fontWeight: 300 }}>
            Adjust the numbers below to match your business. See exactly what automation would save you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
          {/* Inputs */}
          <div className="space-y-6">
            {/* Task Type */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--ink-muted)" }}>
                What task are you automating?
              </label>
              <div className="space-y-2">
                {(Object.entries(taskProfiles) as [TaskType, typeof taskProfiles[TaskType]][]).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setTaskType(key)}
                    className="w-full text-left p-3 transition-all"
                    style={{
                      background: taskType === key ? "var(--surface)" : "transparent",
                      border: `1px solid ${taskType === key ? "var(--amber)" : "var(--border)"}`,
                      borderRadius: "2px",
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: "var(--ink)" }}>{val.label}</div>
                    <div className="text-xs" style={{ color: "var(--ink-muted)" }}>{val.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tasks per day */}
            <div>
              <label className="flex items-center justify-between text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--ink-muted)" }}>
                <span>Tasks per day</span>
                <span className="text-base font-semibold" style={{ color: "var(--ink)" }}>{tasksPerDay}</span>
              </label>
              <input
                type="range"
                min={1}
                max={100}
                value={tasksPerDay}
                onChange={(e) => setTasksPerDay(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--ink-muted)" }}>
                <span>1</span><span>100</span>
              </div>
            </div>

            {/* Staff cost */}
            <div>
              <label className="flex items-center justify-between text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--ink-muted)" }}>
                <span>Staff salary (monthly)</span>
                <span className="text-base font-semibold" style={{ color: "var(--ink)" }}>&#8377;{staffCostPerMonth.toLocaleString("en-IN")}</span>
              </label>
              <input
                type="range"
                min={8000}
                max={80000}
                step={2000}
                value={staffCostPerMonth}
                onChange={(e) => setStaffCostPerMonth(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--ink-muted)" }}>
                <span>&#8377;8,000</span><span>&#8377;80,000</span>
              </div>
            </div>

            {/* Working days */}
            <div>
              <label className="flex items-center justify-between text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--ink-muted)" }}>
                <span>Working days per month</span>
                <span className="text-base font-semibold" style={{ color: "var(--ink)" }}>{workingDays}</span>
              </label>
              <input
                type="range"
                min={15}
                max={30}
                value={workingDays}
                onChange={(e) => setWorkingDays(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          {/* Results */}
          <div>
            <div
              className="p-6 sm:p-8 sticky top-20"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
              }}
            >
              <div className="text-xs font-medium uppercase tracking-wider mb-6" style={{ color: "var(--ink-muted)" }}>
                Your savings
              </div>

              {/* Key metric */}
              <div className="mb-8">
                <div
                  className="text-4xl sm:text-5xl font-semibold tracking-tight"
                  style={{ color: savings > 0 ? "var(--teal)" : "var(--ink)" }}
                >
                  &#8377;{Math.round(savings).toLocaleString("en-IN")}
                </div>
                <div className="text-sm mt-1" style={{ color: "var(--ink-muted)" }}>
                  saved per month {savingsPercent > 0 && `(${savingsPercent}% reduction)`}
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 mb-8" style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm" style={{ color: "var(--ink-muted)" }}>Time spent manually</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                    {hoursPerDay.toFixed(1)} hrs/day ({Math.round(hoursPerMonth)} hrs/month)
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm" style={{ color: "var(--ink-muted)" }}>Manual cost</span>
                  <span className="text-sm font-semibold" style={{ color: "#c44" }}>
                    &#8377;{Math.round(manualCostPerMonth).toLocaleString("en-IN")}/month
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm" style={{ color: "var(--ink-muted)" }}>Digital Worker cost</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--teal)" }}>
                    &#8377;{profile.workerPrice.toLocaleString("en-IN")}/month
                  </span>
                </div>
                <div
                  className="flex justify-between items-baseline pt-3"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>ROI</span>
                  <span className="text-lg font-semibold" style={{ color: "var(--teal)" }}>
                    {roi > 0 ? `${roi}%` : "—"}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <a
                href="/#contact"
                className="block w-full py-3 text-sm font-medium text-center transition-all"
                style={{
                  background: "var(--ink)",
                  color: "var(--cream)",
                  borderRadius: "2px",
                }}
              >
                Get this automation — free for 7 days
              </a>
              <p className="text-[11px] text-center mt-2" style={{ color: "var(--ink-muted)" }}>
                No payment required. We build it, you test it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
