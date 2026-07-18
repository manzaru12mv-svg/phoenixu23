import { createFileRoute } from "@tanstack/react-router";
import { sponsors } from "@/lib/mock-data";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "The partners powering the tournament." },
    ],
  }),
  component: SponsorsPage,
});

function SponsorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">Sponsors</h1>
      <p className="mt-2 text-muted-foreground">Made possible by our partners.</p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sponsors.map((s, i) => (
          <div key={s} className="card-premium p-8 flex items-center justify-center animate-fade-up" style={{ animationDelay: `${i * 30}ms` }}>
            <div className="text-center">
              <div className="font-display text-xl font-black tracking-tight">{s}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">Official Partner</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
