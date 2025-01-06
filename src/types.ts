export type Match = {
  matchId: string; // Unique identifier for the match
  game: string; // Game name (e.g., 'cs2')
  gameMode: string; // Game mode (e.g., '5v5')
  competitionId: string; // Competition ID (e.g., 'f4148ddd-bce8-41b8-9131-ee83afcdd6dd')
  date: number; // Match date in Unix timestamp
  created_at: number; // Match creation timestamp
  updated_at: number; // Match last updated timestamp
  elo: string; // Player's Elo rating
  bestOf: string; // Best of series (e.g., '2')
  matchRound: string; // Round number
  status: string; // Match status (e.g., 'APPLIED')
  played: string; // Whether the match was played or not ('1' for played)
  premade: boolean; // Whether the player is part of a premade team
  teamId: string; // Team ID associated with the match
  nickname: string; // Player's nickname
  playerId: string; // Player's unique ID
  _id: { matchId: string }; // Internal match ID (e.g., '677005d538453900071b7533')
  i0?: string; // Extra match data (could be used to store region, map, etc.)
  i1?: string;
  i2?: string;
  i3?: string;
  i4?: string;
  i5?: string;
  i6?: string;
  i7?: string;
  i8?: string;
  i9?: string;
  i10?: string;
  i12?: string;
  i13?: string;
  i14?: string;
  i15?: string;
  i16?: string;
  i18?: string;
  i19?: string;
  i40?: string;
};
