import { ReactNode } from "react";
import UserProvider from "@/components/UserProvider";
import Sidebar from "@/components/Sidebar";

export default function FullDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </UserProvider>
  );
}

