"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout(): Promise<void> {
    setLoading(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST"
      });
      router.replace("/admin-login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="neu-raised inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground transition-all disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" strokeWidth={1.8} />
      {loading ? "Signing out" : "Logout"}
    </button>
  );
}