import { type Team } from "@/lib/mock-data";

// A stylish placeholder crest generated from the team's color + initials.
export function TeamCrest({ team, size = 40 }: { team: Team; size?: number }) {
  const initials = team.shortName;
  return (
    <div
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 20%, ${team.color}dd, ${team.color}55 60%, #0b0b0b 100%)`,
        borderColor: `${team.color}66`,
      }}
      className="shrink-0 rounded-xl border flex items-center justify-center shadow-inner"
    >
      <span
        className="font-display font-black tracking-tight text-white"
        style={{ fontSize: size * 0.32, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
      >
        {initials}
      </span>
    </div>
  );
}
