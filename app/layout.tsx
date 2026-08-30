import { Providers } from "@frontend/components/providers";
import type { Metadata } from "next";
import { Cormorant, Montserrat, Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google";
import "@frontend/styles/globals.css";

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const display = Cormorant({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const displayAr = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["600", "700"],
  variable: "--font-display-ar",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elevation / إليفيشن — AI-Driven Loan Platform",
  description:
    "AI-powered document intelligence for lending. One system for applicants and reviewers. · ذكاء مستندات للإقراض. نظام واحد للمتقدمين والمراجعين.",
  icons: {
    icon: "/brand/logo-mark.png",
    apple: "/brand/logo-mark.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:wght@600;700&family=Montserrat:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${sans.variable} ${display.variable} ${displayAr.variable} ${arabic.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
