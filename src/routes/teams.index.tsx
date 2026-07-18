import { createFileRoute, Link } from "@tanstack/react-router";
import { teams } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";

export const Route = createFileRoute("/teams/")({
  head: () => ({
    meta: [
      { title: "Teams — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "All 32 teams competing in the Phoenix Youth Development U23 Futsal Challenge 2026." },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  const groups = Array.from(new Set(teams.map((t) => t.group))).sort();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">Teams</h1>
      <p className="mt-2 text-muted-foreground">32 teams. 8 groups. One title.</p>

      <div className="mt-10 space-y-10">
        {groups.map((g) => (
          <section key={g}>
            <h2 className="mb-4 font-display text-xl font-bold">Group {g}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {teams.filter((t) => t.group === g).map((t) => (
                <Link key={t.id} to="/teams/$teamId" params={{ teamId: t.id }} className="card-premium p-5 flex items-center gap-4">
                  <TeamCrest team={t} size={56} />
                  <div className="min-w-0">
                    <div className="font-display font-bold truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.city} · Est. {t.founded}</div>
                    <div className="mt-1 text-xs text-muted-foreground truncate">Coach: {t.coach}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
