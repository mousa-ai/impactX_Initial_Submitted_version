import { PageTransition } from "@frontend/components/ui/page-transition";
import { BehindTheShield } from "@frontend/features/shield/behind-the-shield";

export default function CustomerShieldPage() {
  return (
    <PageTransition>
      <BehindTheShield />
    </PageTransition>
  );
}
