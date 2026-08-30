import { motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock3,
  EyeOff,
  FileSearch,
  Fingerprint,
  Flag,
  Gauge,
  IdCard,
  Landmark,
  Layers,
  ListChecks,
  ScanSearch,
  ShieldAlert,
  Sparkles,
  Users,
  Workflow,
  XCircle,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

function Item({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300/80">
      {children}
    </p>
  );
}

function Glass({
  children,
  className = "",
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border shadow-card",
        light
          ? "border-slate-200 bg-white text-slate-900"
          : "border-white/10 bg-white/[0.035] text-white backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

const customerPain = [
  {
    icon: EyeOff,
    title: "Zero Visibility",
    body: "Unclear requirements, leading to wrong, expired, or low-quality uploads.",
  },
  {
    icon: Flag,
    title: "Vague Rejections",
    body: 'Generic "incomplete document" notices without clear fix instructions.',
  },
  {
    icon: Building2,
    title: "Branch Dependency",
    body: "Manual in-person re-submissions and restarting from scratch for every loan.",
  },
];

const employeePain = [
  {
    icon: Layers,
    title: "60–70% Manual Drag",
    body: "Sifting through PDFs and chasing applicants for missing files.",
  },
  {
    icon: Workflow,
    title: "5-Tab System Switching",
    body: "Manually checking Absher, GOSI, Zakat, Sijil, and Simah.",
  },
  {
    icon: ShieldAlert,
    title: "Human-Eye Fraud Risk",
    body: "Undetected tampering, inconsistent decisions, and systemic backlog.",
  },
];

const customerProduct = [
  {
    icon: ListChecks,
    title: "Dynamic Document Checklist",
    body: "Personalized, exact list by loan type.",
  },
  {
    icon: ScanSearch,
    title: "Real-Time Validator",
    body: "Catches blur, expiry, name/ID mismatch before submit.",
  },
  {
    icon: FileSearch,
    title: "Live Tracker + Rejection Explainer",
    body: "Status in the open. Fixes in plain Arabic.",
  },
  {
    icon: Clock3,
    title: "Returning Customer Memory",
    body: "Drops repeat applications from 30m to 5m.",
  },
];

const employeeProduct = [
  {
    icon: IdCard,
    title: "Auto-Extracted Summary Card",
    body: "All core applicant metrics in 1 clean view.",
  },
  {
    icon: Landmark,
    title: "Auto-Verification · 5 Gov Systems",
    body: "Absher, GOSI, Zakat, Sijil, and Simah.",
  },
  {
    icon: ShieldAlert,
    title: "Fraud Detection Engine",
    body: "Metadata checks, duplicate IPs/phones.",
  },
  {
    icon: Gauge,
    title: "AI Confidence + Policy Checker",
    body: "Score the file. Flag compliance gaps automatically.",
  },
];

const govSystems = [
  { name: "Absher", detail: "Simulated ID & biometric validation" },
  { name: "GOSI", detail: "Employment history & salary confirmation" },
  { name: "Zakat Authority", detail: "Revenue & tax compliance" },
  { name: "Sijil", detail: "Commercial registration status" },
  { name: "Simah", detail: "Credit score & risk assessment" },
];

const impact = [
  { label: "Avg. Loan Processing", before: "2–3 Weeks", after: "2–3 Days" },
  { label: "Employee Review Time", before: "~45 min", after: "~8 min" },
  { label: "Incomplete Submission Rate", before: "~60%", after: "~10%" },
  { label: "Customer Branch Visits", before: "Often required", after: "Near zero" },
  { label: "Employee Capacity", before: "1x baseline", after: "5x throughput" },
];

function SecurityMocks() {
  const [masked, setMasked] = useState(true);
  const [tamper, setTamper] = useState(false);
  const [seconds, setSeconds] = useState(48);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((value) => (value <= 1 ? 48 : value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-3">
      <Item>
        <Glass className="h-full p-7">
          <EyeOff className="h-5 w-5 text-emerald-400" />
          <h3 className="mt-5 font-display text-xl font-bold">1. In-Browser Client Redaction</h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            PII, national ID numbers, and sensitive fields are blurred/masked on the client side before display.
          </p>
          <button
            type="button"
            onClick={() => setMasked((value) => !value)}
            className="mt-6 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-left"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Session preview</p>
            <p className={`mt-2 font-mono text-sm ${masked ? "blur-sm" : ""}`}>
              1***********2 · Sara Al-Harbi
            </p>
            <p className="mt-3 text-xs text-cyan-300">{masked ? "Masked on client" : "Revealed locally only"}</p>
          </button>
        </Glass>
      </Item>
      <Item>
        <Glass className="h-full p-7">
          <ScanSearch className="h-5 w-5 text-emerald-400" />
          <h3 className="mt-5 font-display text-xl font-bold">2. Metadata Tamper Detection</h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Instant local analysis flagging altered PDF timestamps, cloned layers, and suspicious editing software tags.
          </p>
          <button
            type="button"
            onClick={() => setTamper(true)}
            className="mt-6 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-left"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">id_scan.pdf</p>
            <p className="mt-2 text-sm text-white/80">
              {tamper ? "Flag: timestamp rewritten · editor tag present" : "Click to run local metadata check"}
            </p>
            {tamper ? (
              <p className="mt-3 text-xs text-amber-300">Flagged in-browser. No file uploaded.</p>
            ) : null}
          </button>
        </Glass>
      </Item>
      <Item>
        <Glass className="h-full p-7">
          <Fingerprint className="h-5 w-5 text-emerald-400" />
          <h3 className="mt-5 font-display text-xl font-bold">3. Zero-Retention Client Mock</h3>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Session-only memory simulation demonstrating compliance with local banking data retention standards without persisting sensitive files.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Session memory</p>
            <p className="mt-2 font-display text-3xl font-bold text-emerald-300">00:{String(seconds).padStart(2, "0")}</p>
            <p className="mt-2 text-xs text-white/50">Clears when the tab closes. Nothing written to disk.</p>
          </div>
        </Glass>
      </Item>
    </div>
  );
}

export default function App() {
  function launchDemo() {
    window.location.assign("http://localhost:5173/demo");
  }

  return (
    <div className="ambient min-h-screen">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#030712]/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-slate-950">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-sm font-bold tracking-wide">ENHANCED</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">AI Document Intelligence</p>
            </div>
          </div>
          <button
            type="button"
            onClick={launchDemo}
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow sm:inline-flex"
          >
            Launch Live Demo
          </button>
        </div>
      </header>

      <section className="relative flex min-h-screen flex-col justify-center px-6 pb-16 pt-28">
        <Reveal className="mx-auto w-full max-w-6xl">
          <Item>
            <Eyebrow>AI DOCUMENT INTELLIGENCE PLATFORM</Eyebrow>
          </Item>
          <Item>
            <h1 className="mt-6 max-w-5xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
              Loan processing takes weeks.
              <br />
              <span className="bg-brand bg-clip-text text-transparent">We cut it to minutes.</span>
            </h1>
          </Item>
          <Item>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
              A unified, two-sided AI engine that validates customer documents instantly and gives employees an
              auto-verified copilot with direct simulated government integrations.
            </p>
          </Item>
          <Item>
            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {[
                "2-3 Weeks ➔ 2-3 Days Processing",
                "45 min ➔ 8 min Review",
                "5X Reviewer Capacity",
              ].map((stat) => (
                <div
                  key={stat}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-mono text-xs uppercase tracking-[0.12em] text-emerald-200 sm:text-[13px]"
                >
                  {stat}
                </div>
              ))}
            </div>
          </Item>
        </Reveal>
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Scroll to explore pitch
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Item>
            <Eyebrow>// THE PAIN POINTS</Eyebrow>
          </Item>
          <Item>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">The Problem</h2>
          </Item>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Item>
              <p className="mb-4 font-display text-xl font-bold text-rose-300">The Customer Friction</p>
            </Item>
            <div className="grid gap-4">
              {customerPain.map((item) => (
                <Item key={item.title}>
                  <Glass className="p-6">
                    <div className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                      <div>
                        <h3 className="font-display text-lg font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/65">{item.body}</p>
                      </div>
                    </div>
                  </Glass>
                </Item>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <Item>
              <p className="mb-4 font-display text-xl font-bold text-amber-300">The Employee Bottleneck</p>
            </Item>
            <div className="grid gap-4">
              {employeePain.map((item) => (
                <Item key={item.title}>
                  <Glass light className="p-6">
                    <div className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                      <div>
                        <h3 className="font-display text-lg font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                      </div>
                    </div>
                  </Glass>
                </Item>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Item>
            <Eyebrow>// THE ARCHITECTURE</Eyebrow>
          </Item>
          <Item>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Two connected products. One AI core.
            </h2>
          </Item>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Item>
              <Glass className="h-full p-8">
                <Users className="h-5 w-5 text-emerald-400" />
                <h3 className="mt-4 font-display text-2xl font-bold">Smart Application Assistant</h3>
                <p className="mt-1 text-sm text-white/50">Customer-facing</p>
                <div className="mt-8 space-y-5">
                  {customerProduct.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-white/60">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </Item>
          </Reveal>
          <Reveal>
            <Item>
              <Glass light className="h-full p-8">
                <BadgeCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-4 font-display text-2xl font-bold">AI Review Copilot</h3>
                <p className="mt-1 text-sm text-slate-500">Employee-facing</p>
                <div className="mt-8 space-y-5">
                  {employeeProduct.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </Item>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Item>
            <Eyebrow>// AUTOMATED CROSS-CHECKING (SIMULATED MVP)</Eyebrow>
          </Item>
          <Item>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Simulated government integration
            </h2>
          </Item>
          <Item>
            <p className="mt-4 max-w-2xl text-white/60">Instant cross-checks. Zero manual tab switching.</p>
          </Item>
        </Reveal>
        <Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {govSystems.map((system) => (
              <Item key={system.name}>
                <Glass className="h-full p-5">
                  <Landmark className="h-4 w-4 text-cyan-300" />
                  <p className="mt-4 font-display text-lg font-bold">{system.name}</p>
                  <p className="mt-2 text-xs leading-5 text-white/55">{system.detail}</p>
                </Glass>
              </Item>
            ))}
          </div>
          <Item>
            <p className="mt-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-200">
              Mocked API logic ready for production endpoint mapping.
            </p>
          </Item>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Item>
            <Eyebrow>// ZERO-DATA RISK ARCHITECTURE</Eyebrow>
          </Item>
          <Item>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Security, privacy & trust
            </h2>
          </Item>
          <Item>
            <p className="mt-4 max-w-2xl text-white/60">
              Frontend MVP ready — no live backend or database connection required.
            </p>
          </Item>
        </Reveal>
        <SecurityMocks />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Item>
            <Eyebrow>// TANGIBLE ROI</Eyebrow>
          </Item>
          <Item>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">Impact matrix</h2>
          </Item>
        </Reveal>
        <Reveal>
          <Item>
            <Glass className="mt-12 overflow-hidden">
              <div className="grid grid-cols-[1.3fr_1fr_1fr] border-b border-white/10 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                <span>Metric</span>
                <span>Before</span>
                <span className="text-emerald-300">After</span>
              </div>
              {impact.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1.3fr_1fr_1fr] items-center border-b border-white/5 px-6 py-5 last:border-b-0"
                >
                  <p className="text-sm font-medium text-white/80">{row.label}</p>
                  <p className="text-sm text-white/40 line-through decoration-white/20">{row.before}</p>
                  <p className="font-display text-lg font-bold text-emerald-300">{row.after}</p>
                </div>
              ))}
            </Glass>
          </Item>
        </Reveal>
      </section>

      <section className="px-6 pb-28">
        <Reveal>
          <Item>
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-emerald-400/30 bg-[#05080f] px-8 py-20 shadow-glow sm:px-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_300px_at_20%_0%,rgba(16,185,129,0.18),transparent_60%)]" />
              <div className="relative">
                <Eyebrow>// LIVE HANDOFF</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                  Built for the Hackathon.
                  <br />
                  Ready to Test.
                </h2>
                <p className="mt-6 max-w-2xl text-lg text-white/60">
                  Experience real-time document validation, metadata fraud flags, and instant employee summary profiles.
                </p>
                <button
                  type="button"
                  onClick={launchDemo}
                  className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-brand px-8 text-base font-bold text-slate-950 shadow-glow transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(6,182,212,0.35)]"
                >
                  Launch Live Demo
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Item>
        </Reveal>
      </section>
    </div>
  );
}
