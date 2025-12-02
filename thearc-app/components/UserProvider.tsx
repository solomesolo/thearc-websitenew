"use client";

import { createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  country?: string;
  timezone?: string;
}

const UserContext = createContext<User | null>(null);

export function useUser() {
  const user = useContext(UserContext);
  // Return dummy user if no user in context (for demo mode)
  return user || {
    id: "demo-user-123",
    firstName: "Demo",
    lastName: "User",
    email: "demo@thearc.com",
    emailVerified: true,
    country: "US",
    timezone: "America/New_York",
  };
}

export default function UserProvider({ children }: { children: ReactNode }) {
  // Use dummy user data for demo (no authentication required)
  const dummyUser: User = {
    id: "demo-user-123",
    firstName: "Demo",
    lastName: "User",
    email: "demo@thearc.com",
    emailVerified: true,
    country: "US",
    timezone: "America/New_York",
  };

  return <UserContext.Provider value={dummyUser}>{children}</UserContext.Provider>;
}

