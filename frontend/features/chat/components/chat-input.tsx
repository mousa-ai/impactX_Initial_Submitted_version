"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const MAX_CHARACTERS = 1000;

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [text, setText] = useState("");
  const { isAr, t } = useLocale();
  const isRtl = isAr;

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isLoading || trimmed.length > MAX_CHARACTERS) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isOverLimit = text.length > MAX_CHARACTERS;
  const isSendDisabled = !text.trim() || isLoading || isOverLimit;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-navy-lighter/90 border-t border-gold/20 flex flex-col gap-1.5"
    >
      <div className="relative flex items-center gap-2">
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          maxLength={MAX_CHARACTERS + 50} // slight buffer so user sees warning if pasted
          placeholder={t(
            "Ask about loan requirements, documents...",
            "اسأل عن متطلبات التمويل، المستندات...",
          )}
          aria-label={t("Chat message input", "حقل إدخال الرسالة")}
          dir={isRtl ? "rtl" : "ltr"}
          className={cn(
            "w-full resize-none rounded-xl bg-navy/90 border border-gold/25 px-3.5 py-2.5 text-xs sm:text-sm text-cream placeholder-silver/60",
            "focus:outline-none focus:ring-1 focus:ring-gold/60 focus:border-gold",
            "disabled:opacity-50 disabled:cursor-not-allowed transition-all",
            isOverLimit && "border-red-500 focus:ring-red-500",
          )}
        />

        <button
          type="submit"
          disabled={isSendDisabled}
          aria-label={t("Send message", "إرسال الرسالة")}
          className={cn(
            "h-9 w-9 shrink-0 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md",
            isSendDisabled
              ? "bg-white/5 text-silver/40 cursor-not-allowed border border-white/10"
              : "bg-gold-gradient text-navy hover:scale-105 active:scale-95 shadow-gold/20",
          )}
        >
          <Send
            className={cn(
              "h-4 w-4",
              isRtl ? "rotate-180" : "",
            )}
          />
        </button>
      </div>

      <div className="flex items-center justify-between px-1 text-[10px] text-silver/60">
        <span>
          {t(
            "Elevation AI provides general guidance only.",
            "يقدم مساعد إليفيشن إرشادات عامة فقط.",
          )}
        </span>
        <span className={cn(isOverLimit && "text-red-400 font-semibold")}>
          {text.length}/{MAX_CHARACTERS}
        </span>
      </div>
    </form>
  );
}
