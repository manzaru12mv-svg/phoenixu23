import { createFileRoute } from "@tanstack/react-router";
import { MatchCard } from "@/components/MatchCard";
import { matches } from "@/lib/mock-data";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results — PYD U23 Futsal Challenge 2026" },
      { name: "description", content: "All final results from the Phoenix Youth Development U23 Futsal Challenge 2026." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const results = matches
    .filter((m) => m.status === "FT")
    .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime());

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-black">Results</h1>
      <p className="mt-2 text-muted-foreground">Every finished match — scores, MVPs and summaries.</p>

      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {results.map((m) => <MatchCard key={m.id} match={m} />)}
      </div>
    </div>
  );
}
