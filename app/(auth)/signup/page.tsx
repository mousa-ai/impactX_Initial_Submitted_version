import { Logo } from "@frontend/components/layout/logo";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { SignupForm } from "@frontend/features/auth/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <PageTransition>
        <div className="w-full max-w-md overflow-hidden rounded-card border border-line bg-surface shadow-soft">
          <div className="gold-rule" />
          <div className="p-8">
          <div className="flex items-start justify-between gap-3">
            <Logo size="lockup" />
            <LanguageSwitch />
          </div>
          <h1 className="mt-8 font-display text-3xl font-bold tracking-tight">
            <Bi en="Create your workspace" ar="أنشئ مساحتك" compact />
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            <Bi
              en="Applicants start here. Staff accounts are provisioned separately."
              ar="المتقدمون يبدأون هنا. حسابات الموظفين تُنشأ بشكل منفصل."
              compact
            />
          </p>
          <div className="mt-6">
            <SignupForm />
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            <BiInline en="Already have access?" ar="لديك حساب؟" />{" "}
            <Link href="/login" className="text-navy underline-offset-4 hover:text-gold hover:underline">
              <BiInline en="Sign in" ar="تسجيل الدخول" />
            </Link>
          </p>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
