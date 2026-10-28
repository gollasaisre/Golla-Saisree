"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Standalone full-screen pages that shouldn't have the dashboard sidebar and header
  const isAuthOrStandalone =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/onboarding";

  if (isAuthOrStandalone) {
    return <main className="min-h-screen w-full">{children}</main>;
  }

  return (
    <div className="flex h-full min-h-screen w-full bg-background text-foreground">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-grid relative">
          {/* Ambient glow orbs for dark mode depth */}
          <div className="fixed top-20 right-10 w-[500px] h-[500px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
          <div className="fixed bottom-10 left-[300px] w-[400px] h-[400px] bg-violet-500/[0.02] dark:bg-violet-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
