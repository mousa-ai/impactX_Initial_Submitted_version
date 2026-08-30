"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Button } from "@frontend/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { Eyebrow, Reveal } from "@frontend/features/pitch/reveal";
import { useLocale } from "@frontend/hooks/use-locale";
import { useUiStore } from "@frontend/store/ui";
import { cn } from "@frontend/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  Eye,
  Fingerprint,
  IdCard,
  KeyRound,
  Lock,
  Receipt,
  Server,
  ShieldAlert,
  ShieldCheck,
  UserRoundCog,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const dataTypes = [
  {
    icon: IdCard,
    title: { en: "Identity information", ar: "معلومات الهوية" },
    body: {
      en: "Your name and the details you share so we know the request belongs to you.",
      ar: "اسمك والبيانات التي تشاركها حتى نتأكد أن الطلب يخصك.",
    },
  },
  {
    icon: CreditCard,
    title: { en: "Account information", ar: "معلومات الحساب" },
    body: {
      en: "The account involved in the request, so the right file is updated.",
      ar: "الحساب المرتبط بالطلب حتى يُحدَّث الملف الصحيح.",
    },
  },
  {
    icon: Receipt,
    title: { en: "Transaction details", ar: "تفاصيل المعاملة" },
    body: {
      en: "What you asked for, when it happened, and the amount or documents attached.",
      ar: "ما طلبته ومتى حدث والمبلغ أو المستندات المرفقة.",
    },
  },
  {
    icon: BadgeCheck,
    title: { en: "Verification information", ar: "معلومات التحقق" },
    body: {
      en: "Checks that confirm the request is complete and matches what you provided.",
      ar: "فحوصات تؤكد أن الطلب مكتمل ويتوافق مع ما قدمته.",
    },
  },
];

const accessRoles = [
  {
    icon: Users,
    title: { en: "You", ar: "أنت" },
    access: { en: "Always", ar: "دائماً" },
    body: {
      en: "You can view your own applications and documents at any time.",
      ar: "يمكنك عرض طلباتك ومستنداتك في أي وقت.",
    },
  },
  {
    icon: Server,
    title: { en: "Approved systems", ar: "أنظمة معتمدة" },
    access: { en: "When needed", ar: "عند الحاجة" },
    body: {
      en: "Secure systems check files and status so the process can move forward.",
      ar: "أنظمة آمنة تفحص الملفات والحالة حتى تتقدم العملية.",
    },
  },
  {
    icon: UserRoundCog,
    title: { en: "Authorized staff", ar: "موظفون مخولون" },
    access: { en: "When reviewing", ar: "أثناء المراجعة" },
    body: {
      en: "Only assigned reviewers see your file while they make a decision.",
      ar: "المراجع المعيَّن فقط يرى ملفك أثناء اتخاذ القرار.",
    },
  },
];

const verifySteps = [
  {
    icon: Fingerprint,
    title: { en: "Identity verification", ar: "التحقق من الهوية" },
    body: {
      en: "We confirm you are the person making the request.",
      ar: "نتأكد أنك صاحب الطلب.",
    },
  },
  {
    icon: BadgeCheck,
    title: { en: "Data validation", ar: "التحقق من البيانات" },
    body: {
      en: "We check that the details and documents are complete and readable.",
      ar: "نتحقق من اكتمال البيانات والمستندات ووضوحها.",
    },
  },
  {
    icon: Receipt,
    title: { en: "Transaction verification", ar: "التحقق من المعاملة" },
    body: {
      en: "We match the request to your account and the required checklist.",
      ar: "نطابق الطلب مع حسابك والقائمة المطلوبة.",
    },
  },
  {
    icon: ShieldCheck,
    title: { en: "Secure approval", ar: "اعتماد آمن" },
    body: {
      en: "A recorded decision is posted only after the checks above pass.",
      ar: "يُسجَّل القرار بعد اجتياز الفحوصات أعلاه فقط.",
    },
  },
];

const protections = [
  {
    icon: Lock,
    title: { en: "Encryption", ar: "التشفير" },
    body: {
      en: "Information is encoded while it moves and while it is stored.",
      ar: "تُشفَّر المعلومات أثناء النقل وأثناء التخزين.",
    },
  },
  {
    icon: KeyRound,
    title: { en: "Secure authentication", ar: "توثيق آمن" },
    body: {
      en: "You sign in before anyone can open your workspace.",
      ar: "تسجّل الدخول قبل أن يُفتح أي جزء من مساحتك.",
    },
  },
  {
    icon: UserRoundCog,
    title: { en: "Access controls", ar: "ضوابط الوصول" },
    body: {
      en: "Staff only see what their role allows, and only when they need it.",
      ar: "يرى الموظف ما يسمح به دوره فقط وعند الحاجة.",
    },
  },
  {
    icon: Eye,
    title: { en: "Continuous monitoring", ar: "مراقبة مستمرة" },
    body: {
      en: "Activity on a file is watched so unusual patterns can be spotted.",
      ar: "يُراقب النشاط على الملف لاكتشاف الأنماط غير المعتادة.",
    },
  },
  {
    icon: ShieldAlert,
    title: { en: "Fraud detection", ar: "كشف الاحتيال" },
    body: {
      en: "Flags are raised when a document or request looks incomplete or inconsistent.",
      ar: "تظهر إشارة عندما يبدو المستند أو الطلب ناقصاً أو غير متسق.",
    },
  },
];

const demoActivity = [
  {
    en: "A sign-in was attempted from a new device.",
    ar: "محاولة دخول من جهاز جديد.",
    time: { en: "Today, 09:14", ar: "اليوم، 09:14" },
  },
  {
    en: "A document was uploaded outside your usual hours.",
    ar: "رُفع مستند خارج ساعاتك المعتادة.",
    time: { en: "Yesterday, 22:41", ar: "أمس، 22:41" },
  },
];

export function BehindTheShield() {
  const { t } = useLocale();
  const pushToast = useUiStore((state) => state.pushToast);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setStep((current) => {
        if (current >= verifySteps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  function playWalkthrough() {
    setStep(0);
    setPlaying(true);
  }

  function reviewActivity() {
    setShowActivity(true);
    pushToast({
      tone: "neutral",
      title: t("This is a demonstration", "هذا عرض توضيحي"),
      message: t("No live account was opened.", "لم يُفتح أي حساب فعلي."),
    });
  }

  function secureAccount() {
    pushToast({
      tone: "success",
      title: t("No change was made", "لم يُجرَ أي تغيير"),
      message: t(
        "In a live account, this would lock new activity until you confirm.",
        "في حساب حقيقي، سيُوقف النشاط الجديد حتى تؤكد.",
      ),
    });
  }

  return (
    <div className="space-y-16 pb-8">
      <Reveal>
        <Eyebrow en="Trust & security" ar="الثقة والأمان" />
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          <Bi en="Behind the Shield" ar="خلف الدرع" compact />
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
          <Bi
            en="See how we protect your data, verify every transaction, and keep your account secure."
            ar="تعرّف كيف نحمي بياناتك ونتحقق من كل معاملة ونحافظ على أمان حسابك."
            compact
          />
        </p>
      </Reveal>

      <section>
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight">
            <Bi en="What data is used?" ar="ما البيانات المستخدمة؟" compact />
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            <Bi
              en="A request only uses the information needed to complete that step — nothing extra."
              ar="يستخدم الطلب المعلومات اللازمة لإتمام تلك الخطوة فقط — بلا زيادة."
              compact
            />
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {dataTypes.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.06}>
              <Card className="h-full">
                <CardHeader>
                  <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <CardTitle className="mt-4">
                    <Bi pair={item.title} compact />
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p className="text-sm leading-6 text-ink-muted">
                    <Bi pair={item.body} compact />
                  </p>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight">
            <Bi en="Who can access it?" ar="من يمكنه الوصول إليها؟" compact />
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            <Bi
              en="Your data is available only to you, approved systems, and authorized staff — and only when it is needed."
              ar="بياناتك متاحة لك وللأنظمة المعتمدة وللموظفين المخولين فقط — وعند الحاجة."
              compact
            />
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {accessRoles.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.08}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                    <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
                      <BiInline pair={item.access} />
                    </span>
                  </div>
                  <CardTitle className="mt-4">
                    <Bi pair={item.title} compact />
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p className="text-sm leading-6 text-ink-muted">
                    <Bi pair={item.body} compact />
                  </p>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">
                <Bi en="How we verify your transaction" ar="كيف نتحقق من معاملتك" compact />
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-ink-muted">
                <Bi
                  en="Follow the four checks that run before a decision is recorded."
                  ar="تابع الفحوصات الأربعة التي تجري قبل تسجيل أي قرار."
                  compact
                />
              </p>
            </div>
            <Button variant="secondary" onClick={playWalkthrough}>
              <BiInline en={playing ? "Playing…" : "Play walkthrough"} ar={playing ? "جارٍ العرض…" : "عرض الخطوات"} />
            </Button>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {verifySteps.map((item, index) => {
            const active = step === index;
            const done = step > index;
            return (
              <button
                key={item.title.en}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep(index);
                }}
                className="text-start"
              >
                <motion.div
                  layout
                  className={cn(
                    "h-full rounded-card border p-5 shadow-soft transition-colors",
                    active && "border-gold bg-navy-gradient text-cream shadow-navy",
                    done && !active && "border-gold/40 bg-gold-soft",
                    !active && !done && "border-line bg-surface",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <item.icon
                      className={cn("h-5 w-5", active ? "text-gold" : "text-gold")}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        "font-display text-lg font-bold",
                        active ? "text-gold" : "text-ink-faint",
                      )}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className={cn("mt-4 font-display text-lg font-bold", active && "text-cream")}>
                    <Bi pair={item.title} compact />
                  </h3>
                  <p className={cn("mt-2 text-sm leading-6", active ? "text-silver" : "text-ink-muted")}>
                    <Bi pair={item.body} compact />
                  </p>
                </motion.div>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight">
            <Bi en="How we protect your data" ar="كيف نحمي بياناتك" compact />
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            <Bi
              en="These are the everyday safeguards around your file — explained in plain language."
              ar="هذه الحماية اليومية حول ملفك — بلغة واضحة."
              compact
            />
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {protections.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <CardTitle className="mt-4">
                    <Bi pair={item.title} compact />
                  </CardTitle>
                  <CardDescription>
                    <Bi pair={item.body} compact />
                  </CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight">
            <Bi en="If something looks unusual" ar="إذا بدا أمر غير معتاد" compact />
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            <Bi
              en="You are notified when we notice activity that does not match your usual pattern. The example below is a demonstration only."
              ar="نُخطرك عندما نلاحظ نشاطاً لا يشبه نمطك المعتاد. المثال أدناه للعرض فقط."
              compact
            />
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Card tone="navy" className="mt-8 overflow-hidden">
            <div className="gold-rule" />
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <Bell className="mt-1 h-5 w-5 text-gold" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                    <BiInline en="Security notice" ar="تنبيه أمني" />
                  </p>
                  <CardTitle className="mt-2 text-cream">
                    <Bi en="We noticed unusual activity on your account." ar="لاحظنا نشاطاً غير معتاد على حسابك." compact />
                  </CardTitle>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-silver">
                    <Bi
                      en="If this were a live alert, you could review the activity or pause new actions until you confirm it was you."
                      ar="لو كان تنبيهاً حقيقياً، يمكنك مراجعة النشاط أو إيقاف الإجراءات الجديدة حتى تؤكد أنه أنت."
                      compact
                    />
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button onClick={reviewActivity}>
                  <BiInline en="Review activity" ar="مراجعة النشاط" />
                </Button>
                <Button variant="outline" onClick={secureAccount}>
                  <BiInline en="Secure account" ar="تأمين الحساب" />
                </Button>
              </div>
              <AnimatePresence>
                {showActivity ? (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="divide-y divide-gold/15 overflow-hidden rounded-control border border-gold/20 bg-navy-deep/50"
                  >
                    {demoActivity.map((row) => (
                      <li key={row.en} className="flex flex-wrap items-baseline justify-between gap-3 px-4 py-3">
                        <p className="text-sm text-cream">
                          <Bi pair={{ en: row.en, ar: row.ar }} compact />
                        </p>
                        <p className="text-xs text-silver">
                          <BiInline pair={row.time} />
                        </p>
                      </li>
                    ))}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </CardBody>
          </Card>
        </Reveal>
      </section>

      <Reveal>
        <div className="ink-panel relative overflow-hidden rounded-[28px] px-8 py-14 text-white sm:px-14">
          <div className="relative z-10 max-w-2xl">
            <ShieldCheck className="h-8 w-8 text-gold" strokeWidth={1.5} />
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              <Bi en="Your data is protected at every step." ar="بياناتك محمية في كل خطوة." compact />
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              <Bi
                en="We show what is used, who can see it, how it is checked, and how it is watched — so you never have to guess."
                ar="نوضح ما يُستخدم ومن يراه وكيف يُفحص وكيف يُراقَب — حتى لا تضطر للتخمين."
                compact
              />
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
