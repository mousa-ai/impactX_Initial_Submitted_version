import { create } from "zustand";

export type Locale = "en" | "ar";

const STORAGE_KEY = "elevation_locale";

interface Toast {
  id: string;
  title: string;
  message?: string;
  tone: "neutral" | "success" | "danger";
}

interface UiState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export const useUiStore = create<UiState>((set) => ({
  locale: "en",
  setLocale: (locale) => {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, locale);
    set({ locale });
  },
  toasts: [],
  pushToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }].slice(-4),
    })),
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) })),
}));

export function hydrateLocale() {
  useUiStore.getState().setLocale(readStoredLocale());
}
