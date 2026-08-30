import { Logo } from "@frontend/components/layout/logo";
import { BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { BehindTheShield } from "@frontend/features/shield/behind-the-shield";
import Link from "next/link";

export default function PublicShieldPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-navy/95 text-cream backdrop-blur">
        <div className="gold-rule" />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/">
            <Logo light />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitch light />
            <Link
              href="/login"
              className="rounded-full bg-gold-gradient px-4 py-2 text-sm font-semibold text-navy"
            >
              <BiInline en="Sign in" ar="تسجيل الدخول" />
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <BehindTheShield />
      </main>
    </div>
  );
}
