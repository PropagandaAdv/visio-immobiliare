import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const siteUrl = "https://visioimmobiliare.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Visio Immobiliare — Consulenza per Investimenti Immobiliari a Ferrara",
    template: "%s | Visio Immobiliare",
  },
  description:
    "Visio Immobiliare affianca privati e investitori nella gestione di operazioni immobiliari: vendita, acquisto e investimento con metodo, trasparenza e un ROI superiore alla media. Prenota una consulenza gratuita a Ferrara.",
  keywords: [
    "consulenza immobiliare Ferrara",
    "investimenti immobiliari Italia",
    "vendere casa Ferrara",
    "consulente investimenti immobiliari",
    "Visio Immobiliare",
    "gestione patrimonio immobiliare",
    "ROI investimenti immobiliari",
  ],
  authors: [{ name: "Visio S.r.l." }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "Visio Immobiliare",
    title: "Visio Immobiliare — Consulenza per Investimenti Immobiliari",
    description:
      "La vostra visione, la nostra missione immobiliare. Consulenza rigorosa per vendere, acquistare e investire con sicurezza, innovazione e trasparenza.",
    images: [{ url: "/generated/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visio Immobiliare — Consulenza per Investimenti Immobiliari",
    description: "La vostra visione, la nostra missione immobiliare.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1E4E5B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={montserrat.variable}>
      <body className="font-sans antialiased bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Vai al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}
