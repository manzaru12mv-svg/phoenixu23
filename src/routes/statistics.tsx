import { createFileRoute, Link } from "@tanstack/react-router";
import { players, matches, teamById, playerById } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";

export const Route = createFileRoute("/statistics")({
  head: () => ({
    meta: [
      { title: "Statistics — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "Tournament statistics: top scorers, assists, clean sheets and more." },
    ],
  }),
  component: StatsPage,
});

function Leaderboard({ title, list, unit }: { title: string; list: { player: (typeof players)[number]; value: number }[]; unit: string }) {
  return (
    <div className="card-premium overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="font-display text-lg font-bold">{title}</h2>
      </div>
      {list.slice(0, 5).map((row, i) => {
        const team = teamById(row.player.teamId)!;
        return (
          <Link
            key={row.player.id}
            to="/players/$playerId"
            params={{ playerId: row.player.id }}
            className="flex items-center gap-3 p-4 border-b border-border last:border-b-0 hover:bg-white/5"
          >
            <div className="w-6 text-center font-display font-bold text-muted-foreground">{i + 1}</div>
            <TeamCrest team={team} size={32} />
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{row.player.name}</div>
              <div className="text-xs text-muted-foreground truncate">{team.name}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-xl font-black">{row.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{unit}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function StatsPage() {
  const scorers = [...players].sort((a, b) => b.goals - a.goals).map((p) => ({ player: p, value: p.goals }));
  const assists = [...players].sort((a, b) => b.assists - a.assists).map((p) => ({ player: p, value: p.assists }));
  const yellows = [...players].sort((a, b) => b.yellow - a.yellow).map((p) => ({ player: p, value: p.yellow }));
  const cleans = [...players].filter((p) => p.position === "GK").sort((a, b) => (b.cleanSheets ?? 0) - (a.cleanSheets ?? 0)).map((p) => ({ player: p, value: p.cleanSheets ?? 0 }));

  const ft = matches.filter((m) => m.status === "FT");
  const totalGoals = ft.reduce((a, m) => a + (m.homeScore ?? 0) + (m.awayScore ?? 0), 0);
  const avg = ft.length ? (totalGoals / ft.length).toFixed(2) : "0";
  const biggest = ft.reduce((best, m) => {
    const d = Math.abs((m.homeScore ?? 0) - (m.awayScore ?? 0));
    return d > best.d ? { d, m } : best;
  }, { d: 0, m: ft[0] });
  const highest = ft.reduce((best, m) => {
    const t = (m.homeScore ?? 0) + (m.awayScore ?? 0);
    return t > best.t ? { t, m } : best;
  }, { t: 0, m: ft[0] });

  const tournamentStats = [
    { l: "Matches played", v: ft.length },
    { l: "Total goals", v: totalGoals },
    { l: "Goals / match", v: avg },
    { l: "Yellow cards", v: players.reduce((a, p) => a + p.yellow, 0) },
    { l: "Red cards", v: players.reduce((a, p) => a + p.red, 0) },
    { l: "Clean sheets", v: players.reduce((a, p) => a + (p.cleanSheets ?? 0), 0) },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">Statistics</h1>
      <p className="mt-2 text-muted-foreground">The numbers behind the tournament.</p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tournamentStats.map((s) => (
          <div key={s.l} className="card-premium p-5 text-center">
            <div className="font-display text-2xl sm:text-3xl font-black">{s.v}</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Leaderboard title="Top scorers" list={scorers} unit="Goals" />
        <Leaderboard title="Most assists" list={assists} unit="Assists" />
        <Leaderboard title="Most clean sheets" list={cleans} unit="CS" />
        <Leaderboard title="Most yellow cards" list={yellows} unit="YC" />
      </div>

      {biggest.m && highest.m && (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="card-premium p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Biggest win</div>
            <div className="mt-2 font-display text-2xl font-bold">
              {teamById(biggest.m.homeId)?.name} {biggest.m.homeScore}–{biggest.m.awayScore} {teamById(biggest.m.awayId)?.name}
            </div>
          </div>
          <div className="card-premium p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Highest scoring</div>
            <div className="mt-2 font-display text-2xl font-bold">
              {teamById(highest.m.homeId)?.name} {highest.m.homeScore}–{highest.m.awayScore} {teamById(highest.m.awayId)?.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
