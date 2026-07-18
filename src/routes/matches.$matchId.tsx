import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { matchById, teamById, playerById } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";
import { MapPin, Shield, Trophy } from "lucide-react";

export const Route = createFileRoute("/matches/$matchId")({
  loader: ({ params }) => {
    const match = matchById(params.matchId);
    if (!match) throw notFound();
    return { match };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Match" }] };
    const { match } = loaderData;
    const home = teamById(match.homeId)!;
    const away = teamById(match.awayId)!;
    return {
      meta: [
        { title: `${home.name} vs ${away.name} — PYD U23 Futsal 2026` },
        { name: "description", content: `${match.round}: ${home.name} vs ${away.name} at ${match.venue}.` },
      ],
    };
  },
  component: MatchPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-black">Match not found</h1>
      <Link to="/fixtures" className="mt-4 inline-block text-muted-foreground hover:text-foreground">← Back to fixtures</Link>
    </div>
  ),
});

function StatBar({ label, home, away }: { label: string; home: number; away: number }) {
  const total = Math.max(home + away, 1);
  const hp = (home / total) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-semibold tabular-nums">{home}</span>
        <span className="uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">{away}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden flex">
        <div className="h-full bg-primary" style={{ width: `${hp}%` }} />
        <div className="h-full bg-accent" style={{ width: `${100 - hp}%` }} />
      </div>
    </div>
  );
}

function MatchPage() {
  const { match } = Route.useLoaderData();
  const home = teamById(match.homeId)!;
  const away = teamById(match.awayId)!;
  const played = match.status === "FT" || match.status === "LIVE" || match.status === "HT";
  const t = new Date(match.kickoff);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{match.round}</div>

      {/* Banner */}
      <div className="mt-4 card-premium p-8 sm:p-12">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
          <Link to="/teams/$teamId" params={{ teamId: home.id }} className="flex flex-col items-center gap-3 min-w-0">
            <TeamCrest team={home} size={100} />
            <div className="text-center font-display text-lg sm:text-2xl font-bold truncate">{home.name}</div>
          </Link>
          <div className="text-center shrink-0">
            {played ? (
              <div className="flex items-center gap-3">
                <span className="font-display text-5xl sm:text-7xl font-black tabular-nums">{match.homeScore}</span>
                <span className="text-muted-foreground text-3xl">–</span>
                <span className="font-display text-5xl sm:text-7xl font-black tabular-nums">{match.awayScore}</span>
              </div>
            ) : (
              <div className="font-display text-3xl sm:text-5xl font-black text-muted-foreground">VS</div>
            )}
            <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
              {match.status === "LIVE" ? `Live · ${match.minute}'` : match.status === "HT" ? "Half Time" : match.status === "FT" ? "Full Time" : t.toLocaleString()}
            </div>
          </div>
          <Link to="/teams/$teamId" params={{ teamId: away.id }} className="flex flex-col items-center gap-3 min-w-0">
            <TeamCrest team={away} size={100} />
            <div className="text-center font-display text-lg sm:text-2xl font-bold truncate">{away.name}</div>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{match.venue}</span>
          <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />{match.referee}</span>
          {match.mvpId && (
            <span className="inline-flex items-center gap-1.5 text-[color:var(--gold)]">
              <Trophy className="h-4 w-4" /> MVP: {playerById(match.mvpId)?.name}
            </span>
          )}
        </div>
      </div>

      {/* Possession */}
      {match.possession && (
        <div className="mt-8 card-premium p-6">
          <h2 className="font-display text-lg font-bold mb-4">Possession</h2>
          <StatBar label="Possession" home={match.possession.home} away={match.possession.away} />
        </div>
      )}

      {/* Stats */}
      {match.stats && (
        <div className="mt-6 card-premium p-6 space-y-5">
          <h2 className="font-display text-lg font-bold">Match statistics</h2>
          <StatBar label="Shots" home={match.stats.shots[0]} away={match.stats.shots[1]} />
          <StatBar label="On Target" home={match.stats.shotsOnTarget[0]} away={match.stats.shotsOnTarget[1]} />
          <StatBar label="Corners" home={match.stats.corners[0]} away={match.stats.corners[1]} />
          <StatBar label="Fouls" home={match.stats.fouls[0]} away={match.stats.fouls[1]} />
          <StatBar label="Saves" home={match.stats.saves[0]} away={match.stats.saves[1]} />
        </div>
      )}
    </div>
  );
}
