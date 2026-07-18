import { createFileRoute } from "@tanstack/react-router";
import { MatchCard } from "@/components/MatchCard";
import { matches } from "@/lib/mock-data";
import { Radio } from "lucide-react";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live Scores — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "Follow every match live at the Phoenix Youth Development U23 Futsal Challenge 2026." },
    ],
  }),
  component: LivePage,
});

function LivePage() {
  const live = matches.filter((m) => m.status === "LIVE" || m.status === "HT");
  const upcoming = matches.filter((m) => m.status === "SCHEDULED").slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-[color:var(--live)]">
          <Radio className="h-3 w-3" /> Live
        </div>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-black">Live scores</h1>
        <p className="mt-2 text-muted-foreground">Real-time scores across every venue.</p>
      </div>

      {live.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <div className="text-muted-foreground">No matches are live right now. Check back at kick-off.</div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {live.map((m) => <MatchCard key={m.id} match={m} />)}
        </div>
      )}

      <h2 className="mt-14 mb-4 font-display text-xl font-bold">Coming up next</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((m) => <MatchCard key={m.id} match={m} compact />)}
      </div>
    </div>
  );
}
