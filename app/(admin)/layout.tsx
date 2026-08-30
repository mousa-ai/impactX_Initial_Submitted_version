import { AppShell } from "@frontend/components/layout/app-shell";
import { getSession } from "@backend/auth/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role === "customer") redirect("/app");

  return (
    <AppShell
      items={[
        { href: "/admin", label: "Dashboard", labelAr: "لوحة التحكم" },
        { href: "/admin/applications", label: "Applications", labelAr: "الطلبات" },
        { href: "/admin/flags", label: "Flags", labelAr: "الإشارات" },
        { href: "/admin/performance", label: "Performance", labelAr: "الأداء", roles: ["manager"] },
      ]}
    >
      {children}
    </AppShell>
  );
}
