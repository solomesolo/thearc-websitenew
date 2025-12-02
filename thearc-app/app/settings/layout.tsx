import { ReactNode } from "react";
import UserProvider from "@/components/UserProvider";
import Sidebar from "@/components/Sidebar";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </UserProvider>
  );
}

