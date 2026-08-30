import { Bi } from "@frontend/components/ui/bilingual";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { ApplyWizard } from "@frontend/features/checklist/apply-wizard";

export default function ApplyPage() {
  return (
    <PageTransition>
      <h1 className="text-3xl font-semibold tracking-tight">
        <Bi en="New application" ar="طلب جديد" compact />
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        <Bi
          en="Product type and answers determine the required documents. The checklist is computed by the requirement engine."
          ar="نوع المنتج والإجابات يحددان المستندات المطلوبة. القائمة تُحسب عبر محرك القواعد."
          compact
        />
      </p>
      <div className="mt-8">
        <ApplyWizard />
      </div>
    </PageTransition>
  );
}
