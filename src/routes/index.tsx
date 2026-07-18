import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, Trophy, Radio } from "lucide-react";
import logo from "@/assets/phoenix-logo.png";
import { TOURNAMENT } from "@/lib/tournament";
import { Countdown } from "@/components/Countdown";
import { MatchCard } from "@/components/MatchCard";
import { matches, computeStandings, teamById, players, teams } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const live = matches.filter((m) => m.status === "LIVE" || m.status === "HT").slice(0, 3);
  const upcoming = matches.filter((m) => m.status === "SCHEDULED").slice(0, 3);
  const recent = matches.filter((m) => m.status === "FT").slice(-3).reverse();
  const standings = computeStandings();
  const topScorers = [...players].sort((a, b) => b.goals - a.goals).slice(0, 5);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--live)]">
                  <span className="live-dot" />
                </span>
                Season {TOURNAMENT.year}
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.02]">
                <span className="text-gradient">Phoenix Youth</span>
                <br />
                <span className="text-maroon-gradient">Development U23</span>
                <br />
                <span className="text-gradient">Futsal Challenge</span>
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
                {TOURNAMENT.tagline}. Follow every kick, every goal, every moment as {TOURNAMENT.numTeams} teams
                compete for the crown.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/live" className="btn-hero inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold">
                  <PlayCircle className="h-4 w-4" /> Live Matches
                </Link>
                <Link to="/results" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold hover:bg-white/5">
                  <Trophy className="h-4 w-4" /> Latest Results
                </Link>
                <Link to="/standings" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold hover:bg-white/5">
                  Standings <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-up [animation-delay:100ms]">
              <div className="glass rounded-3xl p-8 sm:p-10">
                <img src={logo} alt="Phoenix crest" className="mx-auto h-40 sm:h-56 w-auto object-contain drop-shadow-[0_10px_40px_rgba(163,18,47,0.5)]" />
                <div className="mt-6 text-center">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Kick-off in</div>
                </div>
                <div className="mt-3">
                  <Countdown />
                </div>
                <div className="mt-6 text-center text-xs text-muted-foreground">
                  6 August 2026 · {TOURNAMENT.venues[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STRIP */}
      {live.length > 0 && (
        <section className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <Radio className="h-5 w-5 text-[color:var(--live)]" /> Live now
            </h2>
            <Link to="/live" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {live.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {/* UPCOMING + RESULTS */}
      <section className="mx-auto max-w-7xl px-6 mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold">Upcoming</h2>
            <Link to="/fixtures" className="text-sm text-muted-foreground hover:text-foreground">All fixtures →</Link>
          </div>
          <div className="space-y-3">
            {upcoming.map((m) => <MatchCard key={m.id} match={m} compact />)}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold">Latest results</h2>
            <Link to="/results" className="text-sm text-muted-foreground hover:text-foreground">All results →</Link>
          </div>
          <div className="space-y-3">
            {recent.map((m) => <MatchCard key={m.id} match={m} compact />)}
          </div>
        </div>
      </section>

      {/* TOP SCORERS + GROUP PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-xl font-bold mb-4">Top scorers</h2>
          <div className="card-premium overflow-hidden">
            {topScorers.map((p, i) => {
              const team = teamById(p.teamId)!;
              return (
                <Link
                  key={p.id}
                  to="/players/$playerId"
                  params={{ playerId: p.id }}
                  className="flex items-center gap-3 p-4 border-b border-border last:border-b-0 hover:bg-white/5"
                >
                  <div className="w-6 text-center font-display text-lg font-bold text-muted-foreground">{i + 1}</div>
                  <TeamCrest team={team} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{team.name} · {p.position}</div>
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

        <div>
          <h2 className="font-display text-xl font-bold mb-4">Group A snapshot</h2>
          <div className="card-premium overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_repeat(3,auto)] items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
              <div className="w-4">#</div>
              <div>Team</div>
              <div className="w-8 text-center">P</div>
              <div className="w-8 text-center">GD</div>
              <div className="w-8 text-center">Pts</div>
            </div>
            {standings.A?.map((row, i) => {
              const team = teamById(row.teamId)!;
              return (
                <Link key={row.teamId} to="/teams/$teamId" params={{ teamId: team.id }} className="grid grid-cols-[auto_1fr_repeat(3,auto)] items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 hover:bg-white/5">
                  <div className={`w-4 text-center text-sm font-bold ${i < 2 ? "text-success" : ""}`}>{i + 1}</div>
                  <div className="flex items-center gap-3 min-w-0">
                    <TeamCrest team={team} size={32} />
                    <span className="truncate font-semibold">{team.name}</span>
                  </div>
                  <div className="w-8 text-center text-sm tabular-nums">{row.played}</div>
                  <div className="w-8 text-center text-sm tabular-nums">{row.gd > 0 ? `+${row.gd}` : row.gd}</div>
                  <div className="w-8 text-center font-display text-lg font-black">{row.points}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAMS PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 mt-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">All 32 teams</h2>
          <Link to="/teams" className="text-sm text-muted-foreground hover:text-foreground">Full directory →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {teams.map((t) => (
            <Link key={t.id} to="/teams/$teamId" params={{ teamId: t.id }} className="card-premium flex flex-col items-center gap-2 p-3 text-center">
              <TeamCrest team={t} size={44} />
              <div className="text-xs font-semibold truncate w-full">{t.shortName}</div>
              <div className="text-[10px] text-muted-foreground">Grp {t.group}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
