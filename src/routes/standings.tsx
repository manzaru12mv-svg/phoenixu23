import { createFileRoute, Link } from "@tanstack/react-router";
import { computeStandings, teamById } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "Standings — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "Group standings for the Phoenix Youth Development U23 Futsal Challenge 2026." },
    ],
  }),
  component: StandingsPage,
});

function StandingsPage() {
  const standings = computeStandings();
  const groups = Object.keys(standings).sort();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">Standings</h1>
      <p className="mt-2 text-muted-foreground">Top two from each group advance to the knockout stage.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {groups.map((g) => (
          <div key={g} className="card-premium overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Group {g}</h2>
              <span className="text-xs text-muted-foreground">4 teams</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="text-left py-2 pl-5 w-8">#</th>
                    <th className="text-left py-2">Team</th>
                    <th className="text-center py-2 w-8">P</th>
                    <th className="text-center py-2 w-8">W</th>
                    <th className="text-center py-2 w-8">D</th>
                    <th className="text-center py-2 w-8">L</th>
                    <th className="text-center py-2 w-10">GF</th>
                    <th className="text-center py-2 w-10">GA</th>
                    <th className="text-center py-2 w-10">GD</th>
                    <th className="text-center py-2 w-10 pr-5">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings[g].map((row, i) => {
                    const team = teamById(row.teamId)!;
                    const qualifies = i < 2;
                    const eliminated = i === 3;
                    return (
                      <tr key={row.teamId} className="border-t border-border hover:bg-white/5 transition-colors">
                        <td className="pl-5 py-3">
                          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                            qualifies ? "bg-success/20 text-success" : eliminated ? "bg-destructive/15 text-destructive" : "bg-white/5"
                          }`}>{i + 1}</span>
                        </td>
                        <td className="py-3">
                          <Link to="/teams/$teamId" params={{ teamId: team.id }} className="flex items-center gap-3 hover:text-foreground">
                            <TeamCrest team={team} size={28} />
                            <span className="font-semibold truncate max-w-[10rem]">{team.name}</span>
                          </Link>
                        </td>
                        <td className="text-center tabular-nums">{row.played}</td>
                        <td className="text-center tabular-nums">{row.wins}</td>
                        <td className="text-center tabular-nums">{row.draws}</td>
                        <td className="text-center tabular-nums">{row.losses}</td>
                        <td className="text-center tabular-nums">{row.gf}</td>
                        <td className="text-center tabular-nums">{row.ga}</td>
                        <td className="text-center tabular-nums">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                        <td className="pr-5 text-center font-display text-lg font-black">{row.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-success/40" /> Qualified for knockouts</div>
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-destructive/30" /> Eliminated</div>
      </div>
    </div>
  );
}
