"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function OrdersAutoRefresh({ intervalMs = 8000 }: { intervalMs?: number }) {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const refreshOrders = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
        setLastUpdated(new Date());
      }
    };

    const intervalId = window.setInterval(refreshOrders, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [intervalMs, router]);

  return (
    <div className="rounded-full bg-[#FFFDFB] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4A342A]/55 shadow-[0_12px_40px_rgba(43,30,24,0.05)]">
      Auto-refresh {Math.round(intervalMs / 1000)}s
      {lastUpdated ? ` · ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}
    </div>
  );
}
