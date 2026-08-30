"use client";

import { Bi } from "@frontend/components/ui/bilingual";
import { useLocale } from "@frontend/hooks/use-locale";
import { Card, CardBody, CardHeader, CardTitle } from "@frontend/components/ui/card";
import type { PerformanceMetrics } from "@backend/types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PerformanceCharts({ data }: { data: PerformanceMetrics }) {
  const { t } = useLocale();
  return (
    <Card tone="navy">
      <CardHeader>
        <CardTitle className="text-cream">
          <Bi en="Volume and outcomes" ar="الحجم والنتائج" compact />
        </CardTitle>
      </CardHeader>
      <CardBody className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.series}>
            <CartesianGrid stroke="rgba(205,205,205,0.16)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#CDCDCD" }} tickFormatter={(v) => v.slice(5)} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#CDCDCD" }} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgba(212,175,55,0.35)",
                background: "#0B1A43",
                color: "#FFFFF0",
                boxShadow: "0 12px 32px rgba(11,26,67,0.35)",
              }}
            />
            <Area type="monotone" dataKey="submitted" stroke="#D4AF37" fill="rgba(212,175,55,0.22)" name={t("Submitted", "مقدَّم")} />
            <Area type="monotone" dataKey="approved" stroke="#4BADA6" fill="rgba(75,173,166,0.18)" name={t("Approved", "مقبول")} />
            <Area type="monotone" dataKey="rejected" stroke="#A85A44" fill="rgba(168,90,68,0.16)" name={t("Rejected", "مرفوض")} />
            <Area type="monotone" dataKey="flagged" stroke="#DAFF57" fill="rgba(218,255,87,0.12)" name={t("Flagged", "مؤشَّر")} />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
