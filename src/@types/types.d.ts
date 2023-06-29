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
  queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_5x5';
  summonerId: string;
  leaguePoints: number;
}

interface Mastery {
  championName: string;
}

interface Match {
  info: {
    gameDuration: number;
    participants: {
      puuid: string;
      summonerName: string;
      champLevel: number;
      summoner1Id: number;
      summoner2Id: number;
      item0: number;
      item1: number;
      item2: number;
      item3: number;
      item4: number;
      item5: number;
      item6: number;
      win: boolean;
      gameEndedInEarlySurrender: boolean;
      kills: number;
      deaths: number;
      visionScore: number;
      assists: number;
      totalMinionsKilled: number;
      championName: string;
    }[];
  };
}
