import { Card, CardBody } from "@frontend/components/ui/card";

export function KpiCards({
  items,
}: {
  items: Array<{ label: string; value: string; hint?: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} tone="navy">
          <CardBody className="pt-6">
            <div className="mb-4 h-0.5 w-10 bg-gold-metallic" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-silver">{item.label}</p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-gold">{item.value}</p>
            {item.hint ? <p className="mt-1 text-xs text-silver/80">{item.hint}</p> : null}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
