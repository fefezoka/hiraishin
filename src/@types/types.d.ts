interface Player {
  id: string;
  summonerLevel: number;
  gameName: string;
  tagLine: string;
  puuid: string;
  profileIconId: number;
  leagues: League[];
  title: string;
  skin: string;
}

interface SummonerDto {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  id: string;
  puuid: string;
  summonerLevel: number;
}

interface AccountDto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

type Queue = 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR' | 'RANKED_TFT_DOUBLE_UP';

interface League {
  summonerName: string;
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  queueType: Queue;
  summonerId: string;
  leaguePoints: number;
  index: number;
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
