import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { teamById, playersByTeam, matches, computeStandings } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";
import { MatchCard } from "@/components/MatchCard";

export const Route = createFileRoute("/teams/$teamId")({
  loader: ({ params }) => {
    const team = teamById(params.teamId);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.team.name} — PYD U23 Futsal 2026` : "Team — PYD U23 Futsal 2026" },
      { name: "description", content: loaderData ? `${loaderData.team.name} squad, fixtures, results and statistics.` : "Team profile." },
    ],
  }),
  component: TeamPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-black">Team not found</h1>
      <Link to="/teams" className="mt-4 inline-block text-muted-foreground hover:text-foreground">← Back to teams</Link>
    </div>
  ),
});

function TeamPage() {
  const { team } = Route.useLoaderData();
  const roster = playersByTeam(team.id);
  const teamMatches = matches.filter((m) => m.homeId === team.id || m.awayId === team.id);
  const results = teamMatches.filter((m) => m.status === "FT");
  const fixtures = teamMatches.filter((m) => m.status === "SCHEDULED");

  const stats = results.reduce(
    (acc, m) => {
      const isHome = m.homeId === team.id;
      const gf = (isHome ? m.homeScore : m.awayScore)!;
      const ga = (isHome ? m.awayScore : m.homeScore)!;
      acc.gf += gf; acc.ga += ga;
      if (gf > ga) acc.wins++;
      else if (gf < ga) acc.losses++;
      else acc.draws++;
      return acc;
    },
    { wins: 0, draws: 0, losses: 0, gf: 0, ga: 0 },
  );

  const standings = computeStandings();
  const groupRow = standings[team.group]?.find((r) => r.teamId === team.id);
  const position = standings[team.group]?.findIndex((r) => r.teamId === team.id) ?? -1;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] items-center">
        <TeamCrest team={team} size={140} />
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Group {team.group}</div>
          <h1 className="mt-2 font-display text-4xl sm:text-6xl font-black">{team.name}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Coach: <span className="text-foreground font-semibold">{team.coach}</span></span>
            <span>Captain: <span className="text-foreground font-semibold">{team.captain}</span></span>
            <span>City: <span className="text-foreground font-semibold">{team.city}</span></span>
            <span>Est. <span className="text-foreground font-semibold">{team.founded}</span></span>
          </div>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { l: "Position", v: position >= 0 ? `${position + 1}${["st","nd","rd","th"][Math.min(position,3)]}` : "—" },
          { l: "Points", v: groupRow?.points ?? 0 },
          { l: "Wins", v: stats.wins },
          { l: "Draws", v: stats.draws },
          { l: "Losses", v: stats.losses },
          { l: "GD", v: stats.gf - stats.ga },
        ].map((s) => (
          <div key={s.l} className="card-premium p-4 text-center">
            <div className="font-display text-2xl font-black">{s.v}</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Squad */}
      <h2 className="mt-14 mb-4 font-display text-2xl font-bold">Squad</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {roster.map((p) => (
          <Link key={p.id} to="/players/$playerId" params={{ playerId: p.id }} className="card-premium p-4 flex items-center gap-3">
            <div className="h-11 w-11 shrink-0 rounded-full bg-white/5 flex items-center justify-center font-display font-black text-lg">
              {p.number}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.position} · Age {p.age}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-lg font-black">{p.goals}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">G</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          <h2 className="mt-14 mb-4 font-display text-2xl font-bold">Results</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {results.map((m) => <MatchCard key={m.id} match={m} compact />)}
          </div>
        </>
      )}

      {/* Fixtures */}
      {fixtures.length > 0 && (
        <>
          <h2 className="mt-14 mb-4 font-display text-2xl font-bold">Upcoming fixtures</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {fixtures.map((m) => <MatchCard key={m.id} match={m} compact />)}
          </div>
        </>
      )}
    </div>
  );
}
