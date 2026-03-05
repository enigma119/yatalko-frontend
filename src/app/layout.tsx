import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yatalko - Plateforme d'entraide universitaire",
    template: "%s | Yatalko",
  },
  description:
    "Yatalko est la plateforme collaborative pour les etudiants universitaires au Senegal. Partage de documents, discussions et entraide academique.",
  keywords: [
    "Yatalko",
    "UCAD",
    "universite",
    "etudiant",
    "Senegal",
    "entraide",
    "academique",
    "documents",
    "examens",
  ],
  authors: [{ name: "Yatalko Team" }],
  creator: "Yatalko",
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://yatalko.com",
    siteName: "Yatalko",
    title: "Yatalko - Plateforme d'entraide universitaire",
    description:
      "La plateforme collaborative pour les etudiants universitaires au Senegal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yatalko",
    description: "Plateforme d'entraide universitaire au Senegal",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
