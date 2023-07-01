import { ranks, tiers } from '../commons/data';

interface SortPlayer extends Omit<Player, 'flex' | 'solo'> {
  flex: League;
  solo: League;
}

export const sortLeague = (a: SortPlayer, b: SortPlayer, queueType: 'solo' | 'flex') => {
  const higherElo =
    tiers.findIndex((tier) => tier.en === b[queueType].tier) -
    tiers.findIndex((tier) => tier.en === a[queueType].tier);

  const higherRank =
    ranks.findIndex((rank) => rank === b[queueType].rank) -
    ranks.findIndex((rank) => rank === a[queueType].rank);

  if (higherElo !== 0) {
    return higherElo;
  }

  if (higherRank !== 0) {
    return higherRank;
  }

  return b[queueType].leaguePoints - a[queueType].leaguePoints;
};
