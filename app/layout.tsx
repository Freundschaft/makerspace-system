import type { Metadata, Viewport } from "next";
import { Cabin, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { Layout } from "@/components/Layout";
import { authOptions } from "@/lib/auth-options";
import { getServerI18n } from "@/lib/i18n/server";
import { I18nProvider } from "./components/I18nProvider";
import { PwaRegistration } from "./components/PwaRegistration";

const cabin = Cabin({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Makerspace System",
  description: "A modern makerspace management system",
  manifest: "/manifest.webmanifest",
  applicationName: "Makerspace System",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Makerspace System",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#84b279",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const { locale, messages } = await getServerI18n();
  const dir = locale === "ar" || locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${cabin.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <I18nProvider locale={locale} messages={messages}>
          <SessionProvider session={session}>
            <PwaRegistration />
            <Layout>{children}</Layout>
          </SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
