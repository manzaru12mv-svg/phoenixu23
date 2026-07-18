import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { playerById, teamById } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";

export const Route = createFileRoute("/players/$playerId")({
  loader: ({ params }) => {
    const player = playerById(params.playerId);
    if (!player) throw notFound();
    return { player, team: teamById(player.teamId)! };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.player.name} — PYD U23 Futsal 2026` : "Player" },
      { name: "description", content: loaderData ? `${loaderData.player.name} profile, stats and awards.` : "Player profile." },
    ],
  }),
  component: PlayerPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-black">Player not found</h1>
      <Link to="/players" className="mt-4 inline-block text-muted-foreground hover:text-foreground">← Back to players</Link>
    </div>
  ),
});

function PlayerPage() {
  const { player, team } = Route.useLoaderData();

  const stats = [
    { l: "Goals", v: player.goals },
    { l: "Assists", v: player.assists },
    { l: "Yellow", v: player.yellow },
    { l: "Red", v: player.red },
    { l: "Minutes", v: player.minutes },
    { l: "MVP", v: player.mvp },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="card-premium p-8 sm:p-10 grid gap-8 sm:grid-cols-[auto_1fr] items-center">
        <div className="h-36 w-36 rounded-3xl bg-gradient-to-br from-primary/40 to-black flex items-center justify-center font-display text-6xl font-black">
          {player.number}
        </div>
        <div>
          <Link to="/teams/$teamId" params={{ teamId: team.id }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <TeamCrest team={team} size={20} />
            {team.name}
          </Link>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-black">{player.name}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Position: <span className="text-foreground font-semibold">{player.position}</span></span>
            <span>Age: <span className="text-foreground font-semibold">{player.age}</span></span>
            <span>Number: <span className="text-foreground font-semibold">#{player.number}</span></span>
            <span>Group: <span className="text-foreground font-semibold">{team.group}</span></span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div key={s.l} className="card-premium p-5 text-center">
            <div className="font-display text-3xl font-black">{s.v}</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
