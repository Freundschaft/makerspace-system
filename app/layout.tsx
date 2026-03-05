import type { Metadata } from "next";
import { Cabin, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { Layout } from "@/components/Layout";

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
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${cabin.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
