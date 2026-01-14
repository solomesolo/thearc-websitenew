import { ReactNode } from "react";
import UserProvider from "@/components/UserProvider";

export default function ExampleDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <main className="min-h-screen overflow-y-auto bg-[#0D0F0E]">
        {children}
      </main>
    </UserProvider>
  );
}

