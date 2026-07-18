import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MatchCard } from "@/components/MatchCard";
import { matches } from "@/lib/mock-data";

export const Route = createFileRoute("/fixtures")({
  head: () => ({
    meta: [
      { title: "Fixtures — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "Full match schedule for the Phoenix Youth Development U23 Futsal Challenge 2026." },
    ],
  }),
  component: FixturesPage,
});

const ROUNDS = ["All", "Group Stage", "Quarter Finals", "Semi Finals", "Final"] as const;

function FixturesPage() {
  const [round, setRound] = useState<(typeof ROUNDS)[number]>("All");

  const filtered = useMemo(() => {
    let list = matches.filter((m) => m.status === "SCHEDULED" || m.status === "LIVE" || m.status === "HT");
    if (round === "Group Stage") list = list.filter((m) => m.round.startsWith("Group"));
    else if (round !== "All") list = list.filter((m) => m.round === round);
    return list.sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());
  }, [round]);

  // Group by date
  const byDay = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const m of filtered) {
      const key = new Date(m.kickoff).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">Fixtures</h1>
      <p className="mt-2 text-muted-foreground">Every match, every round.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {ROUNDS.map((r) => (
          <button
            key={r}
            onClick={() => setRound(r)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition-colors ${
              round === r ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-white/5"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {byDay.map(([day, list]) => (
          <section key={day}>
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{day}</div>
            <div className="grid gap-3 md:grid-cols-2">
              {list.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </section>
        ))}
        {byDay.length === 0 && <div className="card-premium p-10 text-center text-muted-foreground">No fixtures match this filter.</div>}
      </div>
    </div>
  );
}
