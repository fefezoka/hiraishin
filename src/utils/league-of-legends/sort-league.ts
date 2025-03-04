import { ranks, tiers } from '@/commons/lol-data';

interface SortPlayer extends Omit<Player, 'flex' | 'solo'> {
  flex: League;
  solo: League;
}

export const sortLeague = (a: SortPlayer, b: SortPlayer, queueType: 'solo' | 'flex') => {
  const higherElo =
    tiers.findIndex((tier) => tier.en === b[queueType].tier) -
    tiers.findIndex((tier) => tier.en === a[queueType].tier);

  if (higherElo !== 0) {
    return higherElo;
  }

  const higherRank =
    ranks.findIndex((rank) => rank === b[queueType].rank) -
    ranks.findIndex((rank) => rank === a[queueType].rank);

  if (higherRank !== 0) {
    return higherRank;
  }

  return b[queueType].leaguePoints - a[queueType].leaguePoints;
};
