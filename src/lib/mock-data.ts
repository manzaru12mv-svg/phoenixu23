// Rich mock data for the tournament. Replace with Supabase queries later.

export type Team = {
  id: string;
  name: string;
  shortName: string;
  group: string;
  coach: string;
  captain: string;
  color: string;
  founded: number;
  city: string;
};

export type Player = {
  id: string;
  name: string;
  teamId: string;
  number: number;
  position: "GK" | "DEF" | "MID" | "FWD";
  age: number;
  goals: number;
  assists: number;
  yellow: number;
  red: number;
  minutes: number;
  mvp: number;
  cleanSheets?: number;
};

export type MatchStatus = "SCHEDULED" | "LIVE" | "HT" | "FT" | "POSTPONED" | "CANCELLED";

export type Match = {
  id: string;
  round: string;
  homeId: string;
  awayId: string;
  homeScore: number | null;
  awayScore: number | null;
  kickoff: string; // ISO
  minute?: number;
  half?: 1 | 2;
  status: MatchStatus;
  venue: string;
  referee: string;
  possession?: { home: number; away: number };
  scorers?: { playerId: string; minute: number; teamId: string }[];
  cards?: { playerId: string; minute: number; type: "Y" | "R"; teamId: string }[];
  mvpId?: string;
  stats?: {
    shots: [number, number];
    shotsOnTarget: [number, number];
    corners: [number, number];
    fouls: [number, number];
    saves: [number, number];
  };
};

// 32 teams across 8 groups of 4 (A–H)
const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
const clubNames = [
  ["Phoenix Rising", "Ember FC", "Crimson Wolves", "Ashborne United"],
  ["Titan Strikers", "Meridian FC", "Northgate Athletic", "Aurora Blues"],
  ["Ironclad Youth", "Volt City", "Stellar Kickers", "Ridgeback FC"],
  ["Cobalt Comets", "Vanguard 09", "Skyline Union", "Riverside Kings"],
  ["Ember Falcons", "Delta Storm", "Highland Aces", "Bayline United"],
  ["Fortress FC", "Nova Blaze", "Redwood Riders", "Halcyon Youth"],
  ["Emerald Sabres", "Torrent SC", "Meridian Rovers", "Blackline Athletic"],
  ["Sovereign FC", "Copper Kings", "Union Prowlers", "Zenith Youth"],
];
const cities = [
  "Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein",
  "Nelspruit", "Kimberley", "Polokwane", "East London", "Rustenburg", "Stellenbosch",
];
const coaches = [
  "M. Ndlovu", "T. Okafor", "R. Silva", "K. van der Merwe", "S. Adeoye", "L. Botha",
  "D. Chikondi", "F. Mahlangu", "J. Zulu", "A. Petrov", "N. Osei", "H. Kruger",
];

export const teams: Team[] = clubNames.flatMap((grp, gi) =>
  grp.map((name, ti) => {
    const id = `t-${groupLetters[gi]}${ti + 1}`;
    return {
      id,
      name,
      shortName: name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 3)
        .toUpperCase(),
      group: groupLetters[gi],
      coach: coaches[(gi * 4 + ti) % coaches.length],
      captain: `#${(ti + 1) * 3 + gi}`,
      color: [
        "#A3122F", "#0EA5E9", "#22C55E", "#F59E0B",
        "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
      ][gi],
      founded: 1978 + gi * 3 + ti,
      city: cities[(gi + ti) % cities.length],
    };
  }),
);

// Players: 8 per team
const firstNames = ["Jomo", "Sipho", "Kagiso", "Thabo", "Lerato", "Mandla", "Bongani", "Andile", "Kabelo", "Tshepo", "Neo", "Musa", "Sizwe", "Bandile", "Kwame", "Zola"];
const lastNames = ["Ndlovu", "Molefe", "Dlamini", "Khumalo", "Mahlangu", "Zulu", "Nkosi", "Sithole", "Mbatha", "Radebe", "Mokoena", "Nxumalo"];

export const players: Player[] = teams.flatMap((team, ti) => {
  const positions: Player["position"][] = ["GK", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD"];
  return positions.map((pos, pi) => {
    const seed = ti * 8 + pi;
    const goals = pos === "FWD" ? 3 + (seed % 9) : pos === "MID" ? 1 + (seed % 5) : pos === "DEF" ? seed % 3 : 0;
    const assists = pos === "MID" ? 2 + (seed % 6) : pos === "FWD" ? 1 + (seed % 5) : seed % 2;
    return {
      id: `p-${team.id}-${pi + 1}`,
      name: `${firstNames[(seed * 7) % firstNames.length]} ${lastNames[(seed * 3) % lastNames.length]}`,
      teamId: team.id,
      number: pi + 1,
      position: pos,
      age: 19 + (seed % 5),
      goals,
      assists,
      yellow: seed % 4,
      red: seed % 13 === 0 ? 1 : 0,
      minutes: 90 + (seed % 5) * 40,
      mvp: pos === "FWD" && seed % 5 === 0 ? 1 : 0,
      cleanSheets: pos === "GK" ? seed % 4 : undefined,
    };
  });
});

// Build fixtures: group stage round-robin (3 rounds × 8 groups × 2 matches = 48) + 8 QF + 4 SF + 1 Final
const start = new Date("2026-08-06T14:00:00Z").getTime();
const HOUR = 3600_000;

function makeMatch(
  id: string,
  round: string,
  homeId: string,
  awayId: string,
  kickoff: number,
  venue: string,
  referee: string,
  status: MatchStatus = "SCHEDULED",
  homeScore: number | null = null,
  awayScore: number | null = null,
  minute?: number,
): Match {
  return {
    id, round, homeId, awayId,
    homeScore, awayScore,
    kickoff: new Date(kickoff).toISOString(),
    minute, half: minute && minute > 20 ? 2 : 1,
    status, venue, referee,
    possession: status === "LIVE" || status === "HT" || status === "FT"
      ? { home: 45 + ((homeId.charCodeAt(3) + awayId.charCodeAt(3)) % 11), away: 0 }
      : undefined,
  };
});
// fix possession away = 100 - home
export const _placeholder = null;

const refs = ["A. Mokoena", "L. van Zyl", "T. Chikwanda", "R. Osei", "B. Molefe", "D. Naidoo"];
const venues = ["Phoenix Sports Arena", "Legacy Indoor Court", "Central Futsal Hall"];

const fixtures: Match[] = [];
let mid = 1;

// Group stage: for each group, 3 rounds of 2 matches (round-robin among 4 teams).
groupLetters.forEach((g, gi) => {
  const grp = teams.filter((t) => t.group === g);
  const [t1, t2, t3, t4] = grp;
  const roundPairs: [Team, Team, Team, Team][] = [
    [t1, t2, t3, t4],
    [t1, t3, t2, t4],
    [t1, t4, t2, t3],
  ];
  roundPairs.forEach((rp, ri) => {
    const [a, b, c, d] = rp;
    const base = start + (gi * 6 + ri * 2) * HOUR;
    fixtures.push(
      makeMatch(`m-${mid++}`, `Group ${g} · MD${ri + 1}`, a.id, b.id, base, venues[gi % 3], refs[(gi + ri) % refs.length]),
      makeMatch(`m-${mid++}`, `Group ${g} · MD${ri + 1}`, c.id, d.id, base + HOUR, venues[(gi + 1) % 3], refs[(gi + ri + 1) % refs.length]),
    );
  });
});

// Knockouts
const koStart = start + 60 * HOUR;
for (let i = 0; i < 8; i++) {
  fixtures.push(
    makeMatch(`m-${mid++}`, "Quarter Finals", teams[i * 2].id, teams[i * 2 + 1].id, koStart + i * HOUR, venues[i % 3], refs[i % refs.length]),
  );
}
for (let i = 0; i < 4; i++) {
  fixtures.push(
    makeMatch(`m-${mid++}`, "Semi Finals", teams[i * 4].id, teams[i * 4 + 2].id, koStart + (12 + i) * HOUR, venues[i % 3], refs[(i + 2) % refs.length]),
  );
}
fixtures.push(
  makeMatch(`m-${mid++}`, "Final", teams[0].id, teams[8].id, koStart + 40 * HOUR, "Phoenix Sports Arena", "A. Mokoena"),
);

// Simulate current state: first 20 matches finished, next 2 live, next 2 half-time
const now = Date.now();
fixtures.forEach((m, i) => {
  if (i < 20) {
    m.status = "FT";
    const seed = i * 13 + 3;
    m.homeScore = (seed % 6);
    m.awayScore = ((seed * 7) % 5);
    if (m.homeScore === m.awayScore && seed % 3 === 0) m.awayScore += 1;
    m.possession = { home: 45 + (seed % 15), away: 0 };
    m.possession.away = 100 - m.possession.home;
    m.mvpId = players.find((p) => p.teamId === (m.homeScore! > m.awayScore! ? m.homeId : m.awayId))?.id;
    m.stats = {
      shots: [8 + (seed % 6), 5 + (seed % 8)],
      shotsOnTarget: [3 + (seed % 4), 2 + (seed % 3)],
      corners: [2 + (seed % 5), 1 + (seed % 4)],
      fouls: [5 + (seed % 4), 6 + (seed % 5)],
      saves: [2 + (seed % 3), 3 + (seed % 4)],
    };
  } else if (i < 22) {
    m.status = "LIVE";
    m.homeScore = (i * 2) % 4;
    m.awayScore = (i * 3) % 3;
    m.minute = 12 + (i % 15);
    m.half = 1;
    m.possession = { home: 55, away: 45 };
    m.kickoff = new Date(now - m.minute * 60_000).toISOString();
  } else if (i < 24) {
    m.status = "HT";
    m.homeScore = 2;
    m.awayScore = 1;
    m.minute = 20;
    m.possession = { home: 52, away: 48 };
    m.kickoff = new Date(now - 30 * 60_000).toISOString();
  } else if (i < 30) {
    // upcoming today
    m.kickoff = new Date(now + (i - 23) * 30 * 60_000).toISOString();
  } else {
    m.kickoff = new Date(now + (i - 22) * HOUR).toISOString();
  }
});

export const matches = fixtures;

// Standings computed from FT matches
export type StandingRow = {
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
};

export function computeStandings(): Record<string, StandingRow[]> {
  const table: Record<string, StandingRow> = {};
  for (const t of teams) {
    table[t.id] = { teamId: t.id, played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 };
  }
  for (const m of matches) {
    if (m.status !== "FT" || m.homeScore == null || m.awayScore == null) continue;
    if (!m.round.startsWith("Group")) continue;
    const h = table[m.homeId], a = table[m.awayId];
    h.played++; a.played++;
    h.gf += m.homeScore; h.ga += m.awayScore;
    a.gf += m.awayScore; a.ga += m.homeScore;
    if (m.homeScore > m.awayScore) { h.wins++; a.losses++; h.points += 3; }
    else if (m.homeScore < m.awayScore) { a.wins++; h.losses++; a.points += 3; }
    else { h.draws++; a.draws++; h.points += 1; a.points += 1; }
  }
  for (const row of Object.values(table)) row.gd = row.gf - row.ga;
  const byGroup: Record<string, StandingRow[]> = {};
  for (const t of teams) {
    (byGroup[t.group] ||= []).push(table[t.id]);
  }
  for (const g of Object.keys(byGroup)) {
    byGroup[g].sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);
  }
  return byGroup;
}

export function teamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}
export function playerById(id: string): Player | undefined {
  return players.find((p) => p.id === id);
}
export function matchById(id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}
export function playersByTeam(teamId: string): Player[] {
  return players.filter((p) => p.teamId === teamId);
}

export const news = [
  { id: "n1", title: "Fixtures released for PYD U23 Futsal Challenge 2026", date: "2026-07-01", category: "Announcements", excerpt: "The official schedule is here — 63 matches across 11 days at three venues." },
  { id: "n2", title: "Phoenix Rising unveil 2026 squad", date: "2026-07-14", category: "Transfers", excerpt: "The hosts announce their 12-man roster with three exciting new additions." },
  { id: "n3", title: "Group stage draw completed", date: "2026-06-20", category: "Tournament Updates", excerpt: "32 teams have been drawn into 8 groups of 4. See who plays who." },
  { id: "n4", title: "Ticket applications open", date: "2026-07-05", category: "Announcements", excerpt: "Fans can now register for the ticket ballot. Priority to season members." },
  { id: "n5", title: "Referee panel confirmed", date: "2026-07-22", category: "Announcements", excerpt: "Six FIFA-accredited referees will officiate the tournament." },
  { id: "n6", title: "MVP watch: five names to know", date: "2026-07-28", category: "Tournament Updates", excerpt: "The players who could steal the show at PYD 2026." },
];

export const sponsors = [
  "Aurora Bank", "Zenith Motors", "Kinetic Sports", "Halo Media", "Northline Energy",
  "Copper State", "Vantage Air", "Riverstone Health", "Meridian Tech", "Fortress Gear",
  "Skyline Hotels", "Delta Beverages",
];
