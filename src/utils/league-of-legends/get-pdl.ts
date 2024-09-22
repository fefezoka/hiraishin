import { ranks } from '@/commons/lol-data';

const baseLeaguePoints = {
  SILVER: 0,
  GOLD: 400,
  PLATINUM: 800,
  EMERALD: 1200,
  DIAMOND: 1600,
  MASTER: 2000,
};

export const getPDL = (elo: Elo | null) => {
  if (!elo) {
    return 0;
  }

  if (!baseLeaguePoints.hasOwnProperty(elo.tier) || !ranks.includes(elo.rank)) {
    return 0;
  }

  const tierPDL = baseLeaguePoints[elo.tier];
  const rankIndex = ranks.indexOf(elo.rank);
  return tierPDL + rankIndex * 100 + elo.leaguePoints;
};