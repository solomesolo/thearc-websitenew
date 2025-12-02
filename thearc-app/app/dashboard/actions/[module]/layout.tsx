import { ReactNode } from "react";
import UserProvider from "@/components/UserProvider";

export default function ActionModuleLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <div className="min-h-screen">
        {children}
      </div>
    </UserProvider>
  );
}

