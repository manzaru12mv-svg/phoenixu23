import { Link } from "@tanstack/react-router";
import logo from "@/assets/phoenix-logo.png";
import { TOURNAMENT } from "@/lib/tournament";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10" />
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phoenix Youth Dev.</div>
              <div className="font-display font-bold">U23 Futsal Challenge {TOURNAMENT.year}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            The official home for scores, fixtures, standings and stats.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Compete</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/fixtures" className="hover:text-foreground">Fixtures</Link></li>
            <li><Link to="/results" className="hover:text-foreground">Results</Link></li>
            <li><Link to="/standings" className="hover:text-foreground">Standings</Link></li>
            <li><Link to="/statistics" className="hover:text-foreground">Statistics</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Discover</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/teams" className="hover:text-foreground">Teams</Link></li>
            <li><Link to="/players" className="hover:text-foreground">Players</Link></li>
            <li><Link to="/news" className="hover:text-foreground">News</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>press@phoenixyouth.dev</li>
            <li>+27 (0) 21 000 0000</li>
            <li>Cape Town, South Africa</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {TOURNAMENT.year} Phoenix Youth Development. All rights reserved.</div>
          <div>Rise. Believe. Compete.</div>
        </div>
      </div>
    </footer>
  );
}
