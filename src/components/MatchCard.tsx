import { Link } from "@tanstack/react-router";
import { type Match, teamById, playerById } from "@/lib/mock-data";
import { TeamCrest } from "./TeamCrest";
import { MapPin, Clock, Whistle } from "lucide-react";

function StatusBadge({ m }: { m: Match }) {
  if (m.status === "LIVE")
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--live)]">
        <span className="relative inline-block h-2 w-2 rounded-full">
          <span className="live-dot" />
          <span className="absolute inset-0 rounded-full bg-[color:var(--live)]" />
        </span>
        Live · {m.minute}'
      </div>
    );
  if (m.status === "HT") return <span className="text-xs font-semibold uppercase text-warning">Half Time</span>;
  if (m.status === "FT") return <span className="text-xs font-semibold uppercase text-muted-foreground">Full Time</span>;
  if (m.status === "POSTPONED") return <span className="text-xs font-semibold uppercase text-warning">Postponed</span>;
  if (m.status === "CANCELLED") return <span className="text-xs font-semibold uppercase text-destructive">Cancelled</span>;
  const t = new Date(m.kickoff);
  return (
    <span className="text-xs font-semibold uppercase text-muted-foreground">
      {t.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })} · {t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

export function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const home = teamById(match.homeId)!;
  const away = teamById(match.awayId)!;
  const played = match.status === "FT" || match.status === "LIVE" || match.status === "HT";
  return (
    <Link
      to="/matches/$matchId"
      params={{ matchId: match.id }}
      className="card-premium block p-5 group animate-fade-up"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{match.round}</span>
        <StatusBadge m={match} />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <TeamCrest team={home} size={44} />
          <div className="min-w-0">
            <div className="truncate font-semibold">{home.name}</div>
            <div className="text-xs text-muted-foreground">Group {home.group}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {played ? (
            <>
              <span className="font-display text-3xl sm:text-4xl font-black tabular-nums">{match.homeScore}</span>
              <span className="text-muted-foreground">–</span>
              <span className="font-display text-3xl sm:text-4xl font-black tabular-nums">{match.awayScore}</span>
            </>
          ) : (
            <span className="text-muted-foreground text-sm">vs</span>
          )}
        </div>
        <div className="flex items-center gap-3 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <div className="truncate font-semibold">{away.name}</div>
            <div className="text-xs text-muted-foreground">Group {away.group}</div>
          </div>
          <TeamCrest team={away} size={44} />
        </div>
      </div>

      {!compact && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{match.venue}</span>
          <span className="inline-flex items-center gap-1"><Whistle className="h-3 w-3" />{match.referee}</span>
          {match.mvpId && (
            <span className="inline-flex items-center gap-1 text-[color:var(--gold)]">
              <Clock className="h-3 w-3" /> MVP: {playerById(match.mvpId)?.name}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
