import { createFileRoute } from "@tanstack/react-router";
import { teams } from "@/lib/mock-data";
import { TeamCrest } from "@/components/TeamCrest";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "Photo and video highlights from the tournament." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  // Masonry placeholders using team colors — swap for real photos via admin later.
  const tiles = teams.slice(0, 12).map((t, i) => ({
    id: t.id,
    team: t,
    caption: [
      "Match day",
      "Training",
      "Fans in the stands",
      "Behind the scenes",
      "Trophy hopes",
      "The moment",
    ][i % 6],
    span: (i % 5 === 0 ? "row-span-2" : "row-span-1"),
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">Gallery</h1>
      <p className="mt-2 text-muted-foreground">Tournament photos, videos and highlights.</p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[160px]">
        {tiles.map((tile, i) => (
          <div
            key={tile.id}
            className={`relative overflow-hidden rounded-2xl border border-border ${tile.span} animate-fade-up`}
            style={{
              animationDelay: `${i * 30}ms`,
              background: `linear-gradient(135deg, ${tile.team.color}55, #0a0a0a 70%)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <TeamCrest team={tile.team} size={80} />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{tile.team.name}</div>
              <div className="text-sm font-semibold">{tile.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
