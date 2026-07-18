import { createFileRoute } from "@tanstack/react-router";
import { news } from "@/lib/mock-data";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "Announcements, updates and stories from the 2026 tournament." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">News</h1>
      <p className="mt-2 text-muted-foreground">Announcements and updates from the tournament.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {news.map((n, i) => (
          <article key={n.id} className="card-premium p-6 animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(n.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/15 text-[10px] uppercase tracking-widest text-primary-glow">{n.category}</span>
            </div>
            <h2 className="mt-3 font-display text-xl font-bold">{n.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
