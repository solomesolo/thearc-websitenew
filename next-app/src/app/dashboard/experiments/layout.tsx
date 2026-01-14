import { ReactNode } from "react";
import UserProvider from "@/components/UserProvider";

export default function ExperimentsDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <main className="min-h-screen overflow-y-auto">
        {children}
      </main>
    </UserProvider>
  );
}


