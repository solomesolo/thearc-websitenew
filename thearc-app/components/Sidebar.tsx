"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const linkClass = (path: string) =>
    `block px-4 py-2.5 rounded-lg transition-colors ${
      pathname.startsWith(path)
        ? "bg-[#6FFFC3]/10 text-[#6FFFC3] border border-[#6FFFC3]/20"
        : "text-[#A3B3AA] hover:bg-white/5 hover:text-white"
    }`;

  async function handleLogout() {
    // In demo mode, just redirect to home
    router.push("/");
  }

  return (
    <div className="w-64 bg-[#0b0b0b] border-r border-white/5 p-6 space-y-3">
      <h2 className="text-xl font-semibold mb-6 text-white">The Arc</h2>

      <Link href="/dashboard" className={linkClass("/dashboard")}>
        Dashboard
      </Link>

      <Link href="/account" className={linkClass("/account")}>
        Account Settings
      </Link>

      <Link href="/privacy" className={linkClass("/privacy")}>
        Privacy & Permissions
      </Link>

      <Link href="/settings" className={linkClass("/settings")}>
        Portal Settings
      </Link>

      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2.5 text-[#A3B3AA] hover:bg-white/5 hover:text-white rounded-lg mt-6 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

