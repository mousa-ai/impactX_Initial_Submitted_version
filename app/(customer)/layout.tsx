import { AppShell } from "@frontend/components/layout/app-shell";
import { getSession } from "@backend/auth/session";
import { redirect } from "next/navigation";
import { ChatWidget } from "@frontend/features/chat/components/chat-widget";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== "customer") redirect("/admin");

  return (
    <AppShell
      items={[
        { href: "/app", label: "Overview", labelAr: "نظرة عامة" },
        { href: "/app/apply", label: "New application", labelAr: "طلب جديد" },
        { href: "/app/shield", label: "Behind the Shield", labelAr: "خلف الدرع" },
      ]}
    >
      {children}
      <ChatWidget />
    </AppShell>
  );
}
