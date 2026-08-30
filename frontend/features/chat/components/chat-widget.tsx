"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquare, Trash2, X } from "lucide-react";
import { BiInline } from "@frontend/components/ui/bilingual";
import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";
import { useChat } from "@frontend/features/chat/hooks/use-chat";
import { ChatMessages } from "@frontend/features/chat/components/chat-messages";
import { ChatInput } from "@frontend/features/chat/components/chat-input";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAr, t } = useLocale();
  const isRtl = isAr;
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLastMessage,
    clearMessages,
  } = useChat();

  return (
    <div
      className={cn(
        "fixed bottom-5 z-50 flex flex-col items-end",
        isRtl ? "left-5" : "right-5",
      )}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "mb-4 flex flex-col overflow-hidden rounded-2xl border border-gold/30 bg-navy/95 text-cream backdrop-blur-xl shadow-2xl",
              "w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[80vh]",
            )}
            role="dialog"
            aria-label={t("Customer Support Chat", "محادثة الدعم الفني")}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gold/20 bg-navy-lighter/80">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-gold-gradient text-navy flex items-center justify-center font-bold shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-cream leading-tight">
                    <BiInline
                      en="Elevation Assistant"
                      ar="مساعد إليفيشن"
                    />
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-silver/80">
                      <BiInline en="Online" ar="متصل" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearMessages}
                    title={t("Clear conversation", "مسح المحادثة")}
                    aria-label={t("Clear conversation", "مسح المحادثة")}
                    className="p-1.5 text-silver/70 hover:text-cream hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title={t("Close chat", "إغلاق المحادثة")}
                  aria-label={t("Close chat", "إغلاق المحادثة")}
                  className="p-1.5 text-silver/70 hover:text-cream hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Gold highlight line */}
            <div className="h-[2px] w-full bg-gold-gradient opacity-60" />

            {/* Messages Body */}
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              error={error}
              onSelectSuggestion={(txt) => sendMessage(txt)}
              onRetry={retryLastMessage}
            />

            {/* Input Box */}
            <ChatInput onSend={sendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={
          isOpen
            ? t("Close chat assistant", "إغلاق المساعد الذكي")
            : t("Open chat assistant", "فتح المساعد الذكي")
        }
        className={cn(
          "relative flex items-center justify-center rounded-full p-3.5 shadow-2xl transition-all duration-300",
          "border border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:ring-offset-2 focus:ring-offset-navy",
          isOpen
            ? "bg-navy text-gold hover:bg-navy-lighter"
            : "bg-gold-gradient text-navy hover:shadow-gold/30",
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-navy" />
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}
