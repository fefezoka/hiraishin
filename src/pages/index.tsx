import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Collapsible from '@radix-ui/react-collapsible';
import Typewritter from 'typewriter-effect';
import { trpc } from '../utils/trpc';
import { MatchHistory } from '@components';
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from 'react-icons/md';
import { mpengu } from '@assets';

export const playersInfo = [
  { title: 'Vagabundo', skin: 'Riven_5', name: 'KSCERATO' },
  { title: 'Reserva do Paulinho', skin: 'Thresh_1', name: 'Ghigho' },
  { title: 'Horrível', skin: 'Zed_1', name: 'dakarou' },
  { title: 'Gold mais forte', skin: 'Xayah_37', name: 'seyrin' },
  { title: 'Aposentado', skin: 'Darius_3', name: 'Ja Fui Bom 1 Dia' },
  { title: 'Soul silver', skin: 'Lillia_19', name: 'hicky1' },
  { title: 'Nordestino', skin: 'Fiora_31', name: 'bocchi the loser' },
  { title: 'Diferencial na rota superior', skin: 'Ornn_0', name: 'fastfortresz' },
  { title: 'Ex diamante 1', skin: 'Riven_16', name: 'thigu' },
  { title: 'Pereba', skin: 'Samira_20', name: 'mijo na cama' },
];

const tiers = [
  { en: 'GOLD', pt: 'OURO' },
  { en: 'PLATINUM', pt: 'PLATINA' },
  { en: 'DIAMOND', pt: 'DIAMANTE' },
];

export default function Home() {
  const [previousRanking, setPreviousRanking] = useState<Record<string, number>>();

  const { data: players, isLoading } = trpc.players.useQuery(undefined, {
    onSuccess: (data) => {
      window.localStorage.setItem(
        'hiraishin-players',
        JSON.stringify(
          data.reduce(
            (acc, curr, idx) => Object.assign(acc, { [curr.name]: idx + 1 }),
            {}
          )
        )
      );
    },
  });

  useEffect(() => {
    const previousRanking = window.localStorage.getItem('hiraishin-players');
    previousRanking && setPreviousRanking(JSON.parse(previousRanking));
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="max-w-[768px] m-auto pt-6">
          <h1 className="text-center text-6xl my-5 font-bold text-transparent w-fit m-auto bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
            <Typewritter
              options={{
                wrapperClassName: 'before:content-["HIRAISHIN,_"]',
              }}
              onInit={(typewritter) => {
                typewritter
                  .typeString('UM CLÃ')
                  .deleteAll()
                  .typeString('UMA GUILDA')
                  .deleteAll()
                  .typeString('UMA TRIBO')
                  .deleteAll()
                  .typeString('UMA FAMÍLIA.')
                  .start();
              }}
            />
          </h1>

          {players && (
            <div>
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
                        <div className="min-w-[26px] flex gap-2 items-center absolute top-3 left-1/2 md:relative md:top-auto md:left-auto">
                          <span>{index + 1} º</span>
                          {previousRanking?.[player.name] &&
                            index + 1 !== previousRanking[player.name] &&
                            (index + 1 < previousRanking[player.name] ? (
                              <MdOutlineKeyboardDoubleArrowUp
                                className="text-green-500"
                                size={22}
                              />
                            ) : (
                              <MdOutlineKeyboardDoubleArrowDown
                                className="text-red-500"
                                size={22}
                              />
                            ))}
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
                            <p className="text-yellow-400 font-bold text-xs">
                              {index === 0 ? 'Hokage' : player.title}
                            </p>
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
                            {player.league.wins}V {player.league.losses}D -{' '}
                            {(
                              (player.league.wins /
                                (player.league.wins + player.league.losses)) *
                              100
                            ).toFixed(0)}
                            % Winrate
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
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col h-screen">
          <div className="w-[360px] h-[360px] relative">
            <Image src={mpengu} alt="" fill />
          </div>
          <span className="text-2xl">Carregando...</span>
        </div>
      )}
    </>
  );
}
