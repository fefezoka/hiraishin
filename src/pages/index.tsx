import Image from 'next/image';
import { GetStaticProps } from 'next';
import { Poppins } from 'next/font/google';
import axios from '../service/axios';
import * as Collapsible from '@radix-ui/react-collapsible';
import { MatchHistory } from '@components';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });
const elos = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
const ranks = ['IV', 'III', 'II', 'I'];

const playersInfo = [
  { title: 'GOAT', skin: 'Riven_5', name: 'KSCERATO' },
  { title: '', skin: 'Thresh_1', name: 'Ghigho' },
  { title: 'Horrível', skin: 'Zed_1', name: 'dakarou' },
  { title: 'Gold mais forte', skin: 'Irelia_5', name: 'seyrin' },
  { title: 'Aposentado', skin: 'Darius_3', name: 'Ja Fui Bom 1 Dia' },
  { title: 'Soul silver', skin: 'Lillia_19', name: 'hicky1' },
  { title: 'Nordestino', skin: 'Fiora_50', name: 'bocchi the loser' },
  { title: '', skin: 'Ornn_0', name: 'fastfortresz' },
  { title: '', skin: 'Nasus_5', name: 'thigu' },
  { title: '', skin: 'Samira_20', name: 'mijo na cama' },
];

export const getStaticProps: GetStaticProps = async () => {
  const champions = await axios
    .get('http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json')
    .then(
      (response) => Object.values(response.data.data) as { key: string; name: string }[]
    );

  const players = await Promise.all<Player>(
    playersInfo.map(async (info) => {
      const player = await axios
        .get(
          `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${info.name}`
        )
        .then((response) => response.data);

      const league = await axios
        .get(
          `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.id}`
        )
        .then((response: any) =>
          response.data.find((league: League) => league.queueType === 'RANKED_SOLO_5x5')
        );

      const masteries = await axios
        .get(
          `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${player.id}/top?count=3`
        )
        .then(async (response) => {
          return response.data.map((mastery: any) => {
            return {
              ...mastery,
              championName: champions.find(
                (champion: any) => champion.key == mastery.championId
              )?.name,
            };
          });
        });

      return { ...info, ...player, league, masteries };
    })
  ).then((response) =>
    response.sort((a, b) => {
      const higherElo =
        elos.findIndex((elo) => elo === b.league.tier) -
        elos.findIndex((elo) => elo === a.league.tier);

      const higherRank =
        ranks.findIndex((rank) => rank === b.league.rank) -
        ranks.findIndex((rank) => rank === a.league.rank);

      if (higherElo !== 0) {
        return higherElo;
      }

      if (higherRank !== 0) {
        return higherRank;
      }

      return b.league.leaguePoints - a.league.leaguePoints;
    })
  );

  return {
    props: {
      players,
    },
    revalidate: 2400,
  };
};

export default function Home({ players }: { players: Player[] }) {
  if (!players) {
    return <></>;
  }

  return (
    <main className={`${poppins.className} bg-indigo-950`}>
      <div className="max-w-[768px] m-auto pt-6">
        <h1 className="text-center text-5xl my-3 font-bold">TRIBO HIRAISHIN</h1>
        <div className="grid grid-cols-[.9fr_1.3fr_.8fr] md:px-[64px] py-2 px-5 text-sm md:text-lg">
          <div>Posição</div>
          <div>Nome</div>
          <div>Elo atual</div>
        </div>
        <div className="border-white border-[1px]">
          {players.map((player, index) => (
            <Collapsible.Root key={player.id}>
              <Collapsible.CollapsibleTrigger asChild>
                <div className="md:px-[64px] px-5 py-4 border-b-[1px] cursor-pointer md:flex items-center overflow-hidden justify-between grid grid-cols-[.55fr_1fr_1fr] text-sm md:text-lg relative z-10">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.skin}.jpg`}
                    alt=""
                    width={1215}
                    height={717}
                    className="absolute -top-14 left-0 right-0 bottom-0 bg-black opacity-40 -z-10 overflow-hidden"
                  />
                  <div className="min-w-[26px]">{index + 1} º</div>
                  <div className="flex items-center gap-4">
                    <div className="border-2 border-orange-400 relative">
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/${player.profileIconId}.png`}
                        alt=""
                        height={72}
                        width={72}
                      />
                      <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-xxs bg-black bg-opacity-50 py-0.5 px-1.5 rounded-md">
                        {player.summonerLevel}
                      </span>
                    </div>
                    <div>
                      <h1 className="md:min-w-[192px]">{player.name}</h1>
                      <p className="text-yellow-400 font-bold text-xs">{player.title}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center md:min-w-[172px]">
                    <Image
                      src={`https://opgg-static.akamaized.net/images/medals_new/${player.league.tier.toLowerCase()}.png?image=q_auto,f_webp,w_144&v=1687738763941`}
                      alt=""
                      height={72}
                      width={72}
                    />
                    <div>
                      {player.league.tier} {player.league.rank}{' '}
                      {player.league.leaguePoints} PDL
                    </div>
                    <p className="text-xs">
                      {player.league.wins} vitórias - {player.league.losses} derrotas
                    </p>
                  </div>
                </div>
              </Collapsible.CollapsibleTrigger>
              <Collapsible.CollapsibleContent>
                <MatchHistory player={player} />
              </Collapsible.CollapsibleContent>
            </Collapsible.Root>
          ))}
        </div>
      </div>
    </main>
  );
}
