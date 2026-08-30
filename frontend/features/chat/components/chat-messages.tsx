"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, Bot, Sparkles, User, RefreshCw } from "lucide-react";
import { useLocale } from "@frontend/hooks/use-locale";
import { BiInline } from "@frontend/components/ui/bilingual";
import { cn } from "@frontend/utils/cn";
import type { ChatMessage, QuickSuggestion } from "@frontend/features/chat/types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onSelectSuggestion: (text: string) => void;
  onRetry: () => void;
}

const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: "docs",
    en: "What documents do I need to prepare?",
    ar: "ما هي المستندات المطلوبة للتقديم؟",
  },
  {
    id: "process",
    en: "How does the loan application process work?",
    ar: "كيف تسير مراحل طلب التمويل؟",
  },
  {
    id: "statuses",
    en: "What do the application statuses mean?",
    ar: "ماذا تعني حالات الطلب المختلفة؟",
  },
  {
    id: "terms",
    en: "What is the difference between principal and interest?",
    ar: "ما الفرق بين أصل المبلغ والفائدة؟",
  },
];

export function ChatMessages({
  messages,
  isLoading,
  error,
  onSelectSuggestion,
  onRetry,
}: ChatMessagesProps) {
  const { locale, isAr, t } = useLocale();
  const isRtl = isAr;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto p-4 space-y-4 text-sm",
        isRtl ? "text-right" : "text-left",
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Empty State / Welcome Screen */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 text-gold shadow-md">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-cream text-base">
              <BiInline
                en="Elevation Support Assistant"
                ar="المساعد الذكي لمنصة إليفيشن"
              />
            </h4>
            <p className="text-silver text-xs mt-1 max-w-xs leading-relaxed">
              <BiInline
                en="Ask me general questions about loan types, required documents, or application stages."
                ar="اسألني عن متطلبات التقديم، المستندات، أو مراحل متابعة الطلب."
              />
            </p>
          </div>

          <div className="w-full pt-2 space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gold/80 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              <BiInline en="Suggested Questions" ar="أسئلة مقترحة" />
            </p>
            <div className="flex flex-col gap-1.5 w-full">
              {QUICK_SUGGESTIONS.map((s) => {
                const text = locale === "ar" ? s.ar : s.en;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectSuggestion(text)}
                    className="text-xs text-silver/90 bg-white/5 hover:bg-gold/15 hover:text-cream border border-gold/15 rounded-lg px-3 py-2 text-start transition-all hover:border-gold/30"
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Message Bubbles */}
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={msg.id}
            className={cn(
              "flex items-start gap-2.5 max-w-[88%]",
              isUser
                ? isRtl
                  ? "mr-auto flex-row-reverse"
                  : "ml-auto flex-row-reverse"
                : isRtl
                  ? "ml-auto"
                  : "mr-auto",
            )}
          >
            <div
              className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs border shadow-sm",
                isUser
                  ? "bg-gold-gradient text-navy border-gold"
                  : "bg-navy-lighter text-gold border-gold/30",
              )}
            >
              {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </div>

            <div
              className={cn(
                "rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap break-words",
                isUser
                  ? "bg-gold/90 text-navy font-medium rounded-tr-none"
                  : "bg-navy-lighter/90 text-cream border border-gold/15 rounded-tl-none shadow-sm",
              )}
            >
              {msg.content}
            </div>
          </div>
        );
      })}

      {/* Loading Indicator */}
      {isLoading && (
        <div
          className={cn(
            "flex items-start gap-2.5 max-w-[88%]",
            isRtl ? "ml-auto" : "mr-auto",
          )}
        >
          <div className="h-7 w-7 rounded-full bg-navy-lighter text-gold border border-gold/30 flex items-center justify-center shrink-0">
            <Bot className="h-3.5 w-3.5 animate-pulse" />
          </div>
          <div className="bg-navy-lighter/90 border border-gold/15 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce" />
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg bg-red-950/40 border border-red-500/30 p-3 text-red-200 text-xs flex items-start gap-2.5 shadow-sm">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1.5">
            <p className="leading-snug">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold hover:text-gold-light transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>{t("Try Again", "إعادة المحاولة")}</span>
            </button>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
