import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AppShell from "@/components/layout/AppShell";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CareerPilot AI | Next-Gen Autonomous Career Intelligence",
  description: "AI-powered career mentor, neural skill roadmaps & future job intelligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full overflow-x-hidden scroll-smooth`} suppressHydrationWarning>
      <head />
      <body className="h-full min-h-screen bg-background text-foreground antialiased font-sans">
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
