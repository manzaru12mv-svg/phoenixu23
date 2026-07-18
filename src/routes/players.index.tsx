import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { players, teamById } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";

export const Route = createFileRoute("/players/")({
  head: () => ({
    meta: [
      { title: "Players — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "All players in the Phoenix Youth Development U23 Futsal Challenge 2026." },
    ],
  }),
  component: PlayersPage,
});

const POSITIONS = ["All", "GK", "DEF", "MID", "FWD"] as const;

function PlayersPage() {
  const [pos, setPos] = useState<(typeof POSITIONS)[number]>("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    let l = players;
    if (pos !== "All") l = l.filter((p) => p.position === pos);
    if (q.trim()) {
      const t = q.toLowerCase();
      l = l.filter((p) => p.name.toLowerCase().includes(t));
    }
    return l.sort((a, b) => b.goals - a.goals).slice(0, 60);
  }, [pos, q]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">Players</h1>
      <p className="mt-2 text-muted-foreground">Search and browse every player in the tournament.</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search player…"
          className="rounded-full bg-card border border-border px-4 py-2 text-sm w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex flex-wrap gap-2">
          {POSITIONS.map((p) => (
            <button
              key={p}
              onClick={() => setPos(p)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition-colors ${
                pos === p ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-white/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => {
          const team = teamById(p.teamId)!;
          return (
            <Link key={p.id} to="/players/$playerId" params={{ playerId: p.id }} className="card-premium p-4 flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center font-display font-black">
                {p.number}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <TeamCrest team={team} size={14} />
                  <span className="truncate">{team.name}</span> · {p.position}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-xl font-black">{p.goals}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Goals</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
