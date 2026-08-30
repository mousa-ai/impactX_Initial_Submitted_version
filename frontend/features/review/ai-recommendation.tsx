import { Badge } from "@frontend/components/ui/badge";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { aiActions, lookup, overlay } from "@backend/i18n/catalog";
import type { AiRecommendation } from "@backend/types";

const tone = {
  approve: "success" as const,
  review: "warning" as const,
  reject: "danger" as const,
};

export function AiRecommendationBox({ recommendation }: { recommendation: AiRecommendation | null }) {
  if (!recommendation) return null;
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>
            <Bi en="AI recommendation" ar="توصية الذكاء الاصطناعي" compact />
          </CardTitle>
          <CardDescription>
            <Bi en="Generated from the current packet, not a static label." ar="من الملف الحالي، وليست تسمية ثابتة." compact />
          </CardDescription>
        </div>
        <Badge tone={tone[recommendation.action]}>
          <BiInline pair={lookup(aiActions, recommendation.action)} />
        </Badge>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-sm leading-6">
          <Bi pair={overlay(recommendation.rationale)} compact />
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-control border border-gold/20 bg-navy px-4 py-3 text-cream">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-silver">
              <BiInline en="Confidence" ar="الثقة" />
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-gold">{Math.round(recommendation.confidence * 100)}%</p>
          </div>
          <div className="rounded-control border border-gold/20 bg-navy px-4 py-3 text-cream">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-silver">
              <BiInline en="Risk score" ar="درجة المخاطر" />
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-gold">{recommendation.risk_score}</p>
          </div>
        </div>
        <ul className="space-y-2">
          {recommendation.factors.map((factor) => (
            <li key={factor.code} className="text-sm text-ink-muted">
              <Bi pair={overlay(factor.label)} compact />
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
