import Image from 'next/image';
import { GetStaticProps } from 'next';
import axios from '../service/axios';
import * as Collapsible from '@radix-ui/react-collapsible';
import { MatchHistory } from '@components';
import Link from 'next/link';
import Typewritter from 'typewriter-effect';

const tiers = [
  { en: 'GOLD', pt: 'OURO' },
  { en: 'PLATINUM', pt: 'PLATINA' },
  { en: 'DIAMOND', pt: 'DIAMANTE' },
];
const ranks = ['IV', 'III', 'II', 'I'];

const playersInfo = [
  { title: 'Vagabundo', skin: 'Riven_5', name: 'KSCERATO' },
  { title: 'Reserva do Paulinho', skin: 'Thresh_1', name: 'Ghigho' },
  { title: 'Hokage', skin: 'Zed_1', name: 'dakarou' },
  { title: 'Gold mais forte', skin: 'Xayah_37', name: 'seyrin' },
  { title: 'Aposentado', skin: 'Darius_3', name: 'Ja Fui Bom 1 Dia' },
  { title: 'Soul silver', skin: 'Lillia_19', name: 'hicky1' },
  { title: 'Nordestino', skin: 'Fiora_31', name: 'bocchi the loser' },
  { title: 'Diferencial na rota superior', skin: 'Ornn_0', name: 'fastfortresz' },
  { title: 'Ex diamante 1', skin: 'Riven_16', name: 'thigu' },
  { title: 'Pereba', skin: 'Samira_20', name: 'mijo na cama' },
];

export const getStaticProps: GetStaticProps = async () => {
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

      return { ...info, ...player, league };
    })
  ).then((response) =>
    response.sort((a, b) => {
      const higherElo =
        tiers.findIndex((tier) => tier.en === b.league.tier) -
        tiers.findIndex((tier) => tier.en === a.league.tier);

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
    revalidate: 600,
  };
};

export default function Home({ players }: { players: Player[] }) {
  if (!players) {
    return <></>;
  }

  return (
    <main className="bg-gradient-to-br from-indigo-950 to-slate-950">
      <div className="max-w-[768px] m-auto pt-6">
        <h1 className="text-center text-6xl my-3 font-bold text-transparent w-fit m-auto bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
          <Typewritter
            options={{
              wrapperClassName: 'before:content-["HIRAISHIN,_"]',
            }}
            onInit={(typewritter) => {
              typewritter
                .typeString('UM CLÃ.')
                .pauseFor(400)
                .deleteAll()
                .typeString('UMA GUILDA.')
                .pauseFor(400)
                .deleteAll()
                .typeString('UMA TRIBO.')
                .pauseFor(400)
                .deleteAll()
                .typeString('UMA FAMÍLIA.')
                .start();
            }}
          />
        </h1>
        <div className="md:grid md:grid-cols-[.9fr_1.3fr_.8fr] md:px-[64px] py-2 px-5 text-sm md:text-lg">
          <div className="hidden md:block">Posição</div>
          <div>Nome</div>
          <div>Elo atual</div>
        </div>
        <div className="border-white border-[1px] divide-y bg-indigo-950">
          {players.map((player, index) => (
            <Collapsible.Root key={player.id}>
              <Collapsible.CollapsibleTrigger asChild>
                <div className="md:px-[64px] px-5 py-4 cursor-pointer flex items-center overflow-hidden justify-between text-sm md:text-lg relative z-10">
                  <div className="absolute -top-14 left-0 right-0 bottom-0 bg-black opacity-40 -z-10 overflow-hidden">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.skin}.jpg`}
                      alt=""
                      width={1215}
                      height={717}
                    />
                  </div>
                  <div className="min-w-[26px] absolute top-3 left-1/2 md:relative md:top-auto md:left-auto">
                    {index + 1} º
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="border-2 border-orange-400 relative">
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/${player.profileIconId}.png`}
                        alt=""
                        height={72}
                        width={72}
                      />
                      <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-xxs bg-black  py-0.5 px-1.5 rounded-md">
                        {player.summonerLevel}
                      </span>
                    </div>
                    <div>
                      <Link
                        href={`https://u.gg/lol/profile/br1/${player.name}/overview`}
                        target="_blank"
                      >
                        <h1 className="md:min-w-[192px] hover:underline">
                          {player.name}
                        </h1>
                      </Link>
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
                    <span>
                      {tiers.find((tier) => tier.en === player.league.tier)?.pt}{' '}
                      {player.league.rank} {player.league.leaguePoints} PDL
                    </span>
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
