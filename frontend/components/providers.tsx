"use client";

import { Toaster } from "@frontend/components/ui/toaster";
import { hydrateLocale, useUiStore } from "@frontend/store/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";

function LocaleSync() {
  const locale = useUiStore((state) => state.locale);

  useEffect(() => {
    hydrateLocale();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar" : "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.classList.toggle("font-arabic", locale === "ar");
  }, [locale]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 8_000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <LocaleSync />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
