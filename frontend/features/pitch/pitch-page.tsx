"use client";

import { Logo } from "@frontend/components/layout/logo";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { useLocale } from "@frontend/hooks/use-locale";
import { Eyebrow, Reveal } from "@frontend/features/pitch/reveal";
import { cn } from "@frontend/utils/cn";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  EyeOff,
  FileSearch,
  Flag,
  Gauge,
  LayoutDashboard,
  ListChecks,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const problems = [
  {
    icon: EyeOff,
    title: { en: "Zero visibility", ar: "صفر شفافية" },
    body: {
      en: "Unclear requirements, leading to wrong, expired, or low-quality uploads.",
      ar: "متطلبات غير واضحة تؤدي إلى رفع ملفات خاطئة أو منتهية أو ضعيفة الجودة.",
    },
  },
  {
    icon: FileSearch,
    title: { en: "Vague rejections", ar: "رفض غامض" },
    body: {
      en: 'Generic "incomplete document" notices without clear fix instructions.',
      ar: "إشعارات عامة مثل «مستند ناقص» بلا تعليمات واضحة للإصلاح.",
    },
  },
  {
    icon: SlidersHorizontal,
    title: { en: "Branch dependency", ar: "الاعتماد على الفرع" },
    body: {
      en: "Manual in-person re-submissions and restarting from scratch for every loan.",
      ar: "إعادة تقديم حضورية يدوية والبدء من الصفر مع كل قرض.",
    },
  },
];

const roles = [
  {
    title: { en: "60–70% manual drag", ar: "٦٠–٧٠٪ عبء يدوي" },
    line: {
      en: "Employees sift through PDFs and chase applicants for missing files.",
      ar: "الموظف يفرز ملفات PDF ويلاحق المتقدمين للمستندات الناقصة.",
    },
  },
  {
    title: { en: "5-tab system switching", ar: "التنقل بين خمس أنظمة" },
    line: {
      en: "Manually checking Absher, GOSI, Zakat, Sijil, and Simah.",
      ar: "فحص يدوي في أبشر والتأمينات والزكاة والسجل وسمة.",
    },
  },
  {
    title: { en: "Human-eye fraud risk", ar: "مخاطر احتيال بالعين المجردة" },
    line: {
      en: "Undetected tampering, inconsistent decisions, and systemic backlog.",
      ar: "تلاعب غير مكتشف وقرارات غير متسقة وتراكم منهجي.",
    },
  },
  {
    title: { en: "Two products, one AI core", ar: "منتجان وقلب ذكاء واحد" },
    line: {
      en: "A customer assistant and an employee copilot, sharing one verification engine.",
      ar: "مساعد للعميل ومساعد للموظف على محرك تحقق واحد.",
    },
  },
];

const features = [
  {
    icon: ListChecks,
    title: { en: "Dynamic document checklist", ar: "قائمة مستندات ديناميكية" },
    body: {
      en: "Personalized, exact list by loan type.",
      ar: "قائمة دقيقة ومخصصة حسب نوع القرض.",
    },
  },
  {
    icon: ScanSearch,
    title: { en: "Real-time validator", ar: "تحقق فوري" },
    body: {
      en: "Catches blur, expiry, name/ID mismatch before submit.",
      ar: "يلتقط الضباب وانتهاء الصلاحية وعدم تطابق الاسم أو الهوية قبل الإرسال.",
    },
  },
  {
    icon: BadgeCheck,
    title: { en: "Live tracker + rejection explainer", ar: "متتبع حي وشرح للرفض" },
    body: {
      en: "Status in the open. Fixes in plain Arabic.",
      ar: "الحالة ظاهرة. والإصلاح بلغة عربية واضحة.",
    },
  },
  {
    icon: Flag,
    title: { en: "Fraud detection engine", ar: "محرك كشف الاحتيال" },
    body: {
      en: "Metadata checks, duplicate IPs/phones, and tamper flags.",
      ar: "فحص البيانات الوصفية والأرقام المكررة وإشارات التلاعب.",
    },
  },
  {
    icon: Gauge,
    title: { en: "AI confidence + policy checker", ar: "درجة الثقة وفحص السياسة" },
    body: {
      en: "Score the file. Flag compliance gaps automatically.",
      ar: "تقييم الملف وكشف فجوات الامتثال تلقائياً.",
    },
  },
];

const journey = [
  { step: "01", en: "Absher — ID & biometric", ar: "أبشر — الهوية والبصمة" },
  { step: "02", en: "GOSI — employment & salary", ar: "التأمينات — العمل والراتب" },
  { step: "03", en: "Zakat — revenue & tax", ar: "الزكاة — الإيراد والضريبة" },
  { step: "04", en: "Sijil — commercial status", ar: "السجل — الحالة التجارية" },
  { step: "05", en: "Simah — credit & risk", ar: "سمة — الائتمان والمخاطر" },
  { step: "06", en: "Secure approval", ar: "اعتماد آمن" },
];

const guardrails = [
  {
    icon: ShieldCheck,
    title: { en: "In-browser client redaction", ar: "إخفاء من المتصفح" },
    body: {
      en: "PII, national ID numbers, and sensitive fields are blurred/masked on the client side before display.",
      ar: "تُموَّه الهوية الوطنية والحقول الحساسة في المتصفح قبل العرض.",
    },
  },
  {
    icon: LayoutDashboard,
    title: { en: "Metadata tamper detection", ar: "كشف تلاعب البيانات الوصفية" },
    body: {
      en: "Instant local analysis flagging altered PDF timestamps, cloned layers, and suspicious editing software tags.",
      ar: "تحليل محلي فوري يشير إلى تعديل الوقت أو الطبقات المنسوخة أو برامج التحرير المشبوهة.",
    },
  },
  {
    icon: Users,
    title: { en: "Zero-retention client mock", ar: "بدون احتفاظ بالملفات" },
    body: {
      en: "Session-only memory simulation — no sensitive files persisted to a live database.",
      ar: "ذاكرة للجلسة فقط — بلا حفظ ملفات حساسة في قاعدة بيانات حية.",
    },
  },
];

const audit = [
  { who: "Avg. loan processing", whoAr: "متوسط معالجة القرض", en: "2–3 weeks → 2–3 days", ar: "٢–٣ أسابيع ← ٢–٣ أيام", time: "ROI", timeAr: "الأثر" },
  { who: "Employee review time", whoAr: "وقت مراجعة الموظف", en: "~45 min → ~8 min", ar: "~٤٥ د ← ~٨ د", time: "ROI", timeAr: "الأثر" },
  { who: "Incomplete submissions", whoAr: "الطلبات الناقصة", en: "~60% → ~10%", ar: "~٦٠٪ ← ~١٠٪", time: "ROI", timeAr: "الأثر" },
  { who: "Employee capacity", whoAr: "طاقة الموظف", en: "1x baseline → 5x throughput", ar: "١× ← ٥×", time: "ROI", timeAr: "الأثر" },
];

export function PitchPage() {
  const { isAr, t } = useLocale();

  return (
    <div className="bg-canvas text-ink">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/20 bg-navy/80 backdrop-blur-md">
        <div className="gold-rule" />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo light size="md" />
          <div className="flex items-center gap-3">
            <Link href="/shield" className="hidden text-sm text-silver hover:text-gold sm:inline">
              <BiInline en="Behind the Shield" ar="خلف الدرع" />
            </Link>
            <LanguageSwitch light />
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-sm font-semibold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
            >
              <BiInline en="Launch Live Demo" ar="افتح التجربة الحية" />
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="ink-panel relative flex min-h-screen flex-col justify-center px-6 pb-16 pt-28 text-white">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Reveal>
            <Logo light size="lg" />
          </Reveal>
          <Reveal delay={0.04}>
            <div className="mt-8">
              <Eyebrow en="AI Document Intelligence Platform" ar="منصة ذكاء المستندات" light />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-[84px]"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {isAr ? (
                <>
                  الإقراض يستغرق أسابيع.
                  <br />
                  <span className="gold-text">اختصرناه إلى دقائق.</span>
                </>
              ) : (
                <>
                  Loan processing takes weeks.
                  <br />
                  <span className="gold-text">We cut it to minutes.</span>
                </>
              )}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className="mt-8 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {t(
                "A unified, two-sided AI engine that validates customer documents instantly and gives employees an auto-verified copilot with direct simulated government integrations. 2–3 weeks → 2–3 days processing · 45 min → 8 min review · 5× reviewer capacity.",
                "محرك ذكاء اصطناعي موحّد للطرفين يتحقق من مستندات العميل فوراً ويمنح الموظف مساعداً موثّقاً تلقائياً مع تكامل حكومي محاكى. ٢–٣ أسابيع ← ٢–٣ أيام · ٤٥ د ← ٨ د للمراجعة · ٥× طاقة المراجع.",
              )}
            </p>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            {t("Scroll to explore pitch", "مرّر لاستكشاف العرض")}
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="// The pain points" ar="// نقاط الألم" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="The customer friction" ar="احتكاك العميل" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.1}>
              <Card>
                <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-xl font-bold">
                  <Bi pair={item.title} compact />
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-muted">
                  <Bi pair={item.body} compact />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="// The architecture" ar="// البنية" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="The employee bottleneck" ar="اختناق الموظف" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {roles.map((role, index) => (
            <Reveal key={role.title.en} delay={index * 0.08}>
              <Card className="min-h-[180px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">0{index + 1}</p>
                <h3 className="mt-4 font-display text-2xl font-bold">
                  <Bi pair={role.title} compact />
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-muted">
                  <Bi pair={role.line} compact />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="// Two connected products" ar="// منتجان متصلان" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="One AI core" ar="قلب ذكاء واحد" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title.en} delay={index * 0.08}>
              <Card>
                <feature.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-lg font-bold">
                  <Bi pair={feature.title} compact />
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  <Bi pair={feature.body} compact />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="// Automated cross-checking (simulated MVP)" ar="// فحص حكومي محاكى" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="Simulated government integration" ar="تكامل حكومي محاكى" />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-[24px] border border-line bg-white px-6 py-10 shadow-soft">
            <ol className="flex min-w-[860px] items-start">
              {journey.map((item, index) => (
                <li key={item.step} className="flex flex-1 items-start">
                  <div className="flex min-w-0 flex-col items-center text-center">
                    <span className="font-mono text-[11px] text-ink-faint">{item.step}</span>
                    <span className="mt-3 h-2.5 w-2.5 rounded-full bg-gold shadow-gold" />
                    <span className="mt-3 max-w-[130px] text-sm font-medium leading-5">
                      <Bi en={item.en} ar={item.ar} compact />
                    </span>
                  </div>
                  {index < journey.length - 1 ? <div className="mx-2 mt-8 h-px flex-1 bg-line" /> : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="// Zero-data risk architecture" ar="// بدون مخاطر بيانات" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="Security, privacy & trust" ar="الأمان والخصوصية والثقة" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {guardrails.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.1}>
              <Card>
                <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-xl font-bold">
                  <Bi pair={item.title} compact />
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-muted">
                  <Bi pair={item.body} compact />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="// Tangible ROI" ar="// أثر ملموس" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="Before vs. after" ar="قبل وبعد" />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 divide-y divide-line overflow-hidden rounded-[24px] border border-line bg-white shadow-soft">
            {audit.map((row) => (
              <div key={row.en} className="flex flex-wrap items-baseline justify-between gap-3 px-6 py-5">
                <p className="text-[15px]">
                  <span className="font-semibold">{isAr ? row.whoAr : row.who}</span>{" "}
                  <span className="text-ink-muted">{isAr ? row.ar : row.en}</span>
                </p>
                <p className="font-mono text-xs text-ink-faint">{isAr ? row.timeAr : row.time}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-6 pb-16">
        <div className="ink-panel relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-8 py-20 text-white sm:px-16 sm:py-24">
          <div className="relative z-10">
          <Reveal>
            <Eyebrow en="The handoff" ar="التسليم" light />
            <h2
              className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {isAr ? (
                <>
                  بُني للهاكاثون.
                  <br />
                  جاهز للتجربة.
                </>
              ) : (
                <>
                  Built for the Hackathon.
                  <br />
                  Ready to Test.
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/65" dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>
              {t(
                "Experience real-time document validation, metadata fraud flags, and instant employee summary profiles.",
                "جرّب التحقق الفوري من المستندات وإشارات الاحتيال وملخص الموظف الفوري.",
              )}
            </p>
            <Link
              href="/login"
              className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-gold-gradient px-7 text-base font-semibold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
            >
              <BiInline en="Launch Live Demo" ar="افتح التجربة الحية" />
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article className={cn("h-full rounded-[24px] border border-line bg-surface p-7 shadow-soft", className)}>
      {children}
    </article>
  );
}
