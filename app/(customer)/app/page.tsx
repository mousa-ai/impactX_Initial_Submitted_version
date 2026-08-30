import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Button } from "@frontend/components/ui/button";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { ApplicationList } from "@frontend/features/applications/application-list";
import { getSession } from "@backend/auth/session";
import Link from "next/link";

export default async function CustomerHomePage() {
  const session = await getSession();
  const first = session?.user.full_name.split(" ")[0] ?? "";
  return (
    <PageTransition>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink-muted">
            <BiInline en={`Good to see you, ${first}`} ar={`أهلاً ${first}`} />
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            <Bi en="Your applications" ar="طلباتك" compact />
          </h1>
        </div>
        <Link href="/app/apply">
          <Button>
            <BiInline en="Start application" ar="ابدأ طلباً" />
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <ApplicationList />
      </div>
      <Link href="/app/shield" className="mt-8 block">
        <div className="rounded-card border border-gold/25 bg-navy-gradient p-6 text-cream shadow-navy transition-transform hover:-translate-y-0.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            <BiInline en="Trust & security" ar="الثقة والأمان" />
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold">
            <Bi en="Behind the Shield" ar="خلف الدرع" compact />
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-silver">
            <Bi
              en="See how we protect your data, verify every transaction, and keep your account secure."
              ar="تعرّف كيف نحمي بياناتك ونتحقق من كل معاملة ونحافظ على أمان حسابك."
              compact
            />
          </p>
        </div>
      </Link>
    </PageTransition>
  );
}
