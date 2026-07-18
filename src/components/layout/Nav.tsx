import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/phoenix-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/live", label: "Live" },
  { to: "/fixtures", label: "Fixtures" },
  { to: "/results", label: "Results" },
  { to: "/standings", label: "Standings" },
  { to: "/teams", label: "Teams" },
  { to: "/players", label: "Players" },
  { to: "/statistics", label: "Stats" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/sponsors", label: "Sponsors" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <img src={logo} alt="Phoenix" className="h-9 w-9 object-contain drop-shadow" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Phoenix U23</span>
            <span className="text-sm font-bold">Futsal Challenge '26</span>
          </div>
        </Link>

        <nav className="ml-4 hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/15 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="hidden sm:flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs">Search teams, players…</span>
          </button>
          <button
            className="lg:hidden p-2 rounded-full hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border animate-fade-up">
          <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium ${
                    active ? "bg-primary/15" : "hover:bg-white/5 text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
