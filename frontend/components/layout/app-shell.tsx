"use client";

import { Logo } from "@frontend/components/layout/logo";
import { BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { useLogout, useSession } from "@frontend/hooks/use-auth";
import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const rolesEn: Record<string, string> = {
  customer: "Customer",
  reviewer: "Reviewer",
  manager: "Manager",
};

const rolesAr: Record<string, string> = {
  customer: "عميل",
  reviewer: "مراجع",
  manager: "مدير",
};

function isNavActive(pathname: string, href: string) {
  if (href === "/app" || href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavItem {
  href: string;
  label: string;
  labelAr: string;
  roles?: Array<"customer" | "reviewer" | "manager">;
}

export function AppShell({
  items,
  children,
}: {
  items: NavItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { data } = useSession();
  const logout = useLogout();
  const { t } = useLocale();
  const user = data && "user" in data ? data.user : null;
  const visible = items.filter((item) => !item.roles || (user && item.roles.includes(user.role)));
  const roleLabel = user ? t(rolesEn[user.role] ?? user.role, rolesAr[user.role] ?? user.role) : "";

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-navy/95 text-cream backdrop-blur">
        <div className="gold-rule" />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href={user?.role === "customer" ? "/app" : "/admin"}>
            <Logo light />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {visible.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  isNavActive(pathname, item.href)
                    ? "bg-gold-gradient text-navy"
                    : "text-silver hover:text-cream",
                )}
              >
                <BiInline en={item.label} ar={item.labelAr} />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-cream">{user?.full_name}</p>
              <p className="text-xs capitalize text-silver">{roleLabel}</p>
            </div>
            <LanguageSwitch light />
            <button
              className="text-sm text-silver hover:text-gold"
              onClick={() => logout.mutate()}
            >
              <BiInline en="Sign out" ar="تسجيل الخروج" />
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden">
          {visible.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-sm",
                isNavActive(pathname, item.href) ? "bg-gold-gradient text-navy" : "text-silver",
              )}
            >
              <BiInline en={item.label} ar={item.labelAr} />
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
