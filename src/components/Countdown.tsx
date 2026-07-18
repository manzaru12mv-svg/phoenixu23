import { useEffect, useState } from "react";
import { TOURNAMENT } from "@/lib/tournament";

export function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(TOURNAMENT.startDate).getTime();
  const diff = target - now;
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  const items = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Minutes" },
    { v: seconds, l: "Seconds" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {items.map((i) => (
        <div key={i.l} className="glass rounded-2xl p-3 sm:p-4 text-center">
          <div className="font-display text-2xl sm:text-4xl font-black tabular-nums text-gradient">
            {String(i.v).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">{i.l}</div>
        </div>
      ))}
    </div>
  );
}
