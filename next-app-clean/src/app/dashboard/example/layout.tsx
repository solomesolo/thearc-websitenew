import { ReactNode } from "react";

export default function ExampleDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen overflow-y-auto bg-[#0D0F0E]">
      {children}
    </main>
  );
}

