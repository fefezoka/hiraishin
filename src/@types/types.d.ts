interface Player {
  id: string;
  summonerLevel: number;
  name: string;
  puuid: string;
  profileIconId: number;
  league: League;
  masteries: Mastery[];
  title: string;
  skin: string;
}

interface League {
  summonerName: string;
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  queueType: 'RANKED_SOLO_5x5';
  summonerId: string;
  leaguePoints: number;
}

interface Mastery {
  championName: string;
}
