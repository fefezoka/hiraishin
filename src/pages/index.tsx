import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Collapsible from '@radix-ui/react-collapsible';
import Typewritter from 'typewriter-effect';
import { trpc } from '../utils/trpc';
import { tiers } from '../commons/data';
import { MatchHistory } from '@components';
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from 'react-icons/md';
import { mpengu } from '@assets';

export default function Home() {
  const [previousRanking, setPreviousRanking] = useState<Record<string, number>>();

  const {
    data: players,
    isLoading,
    isRefetching,
    refetch,
  } = trpc.players.useQuery(undefined, {
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
      {!isLoading && !isRefetching ? (
        <div className="max-w-[768px] m-auto px-3 py-6">
          <h1 className="text-center text-5xl md:text-6xl mt-5 mb-6 font-bold text-transparent w-fit m-auto bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
            HIRAISHIN
            <Typewritter
              onInit={(typewritter) => {
                typewritter
                  .typeString('UM CLÃ')
                  .deleteAll()
                  .typeString('UMA TRIBO')
                  .deleteAll()
                  .typeString('UMA FAMÍLIA.')
                  .start();
              }}
            />
          </h1>

          <div className="flex justify-end mb-2">
            <button
              className="px-4 py-2 border-b-2 text-slate-300 border-slate-300 font-bold bg-transparent transition-all"
              onClick={() => refetch()}
            >
              Atualizar
            </button>
          </div>

          {players && (
            <div className="border-slate-300 divide-slate-300 border-[1px] divide-y bg-indigo-950">
              {players.map((player, index) => (
                <Collapsible.Root key={player.id}>
                  <Collapsible.CollapsibleTrigger asChild>
                    <div className="md:px-[64px] px-3 py-5 cursor-pointer flex items-center overflow-hidden justify-between text-sm md:text-lg relative z-10">
                      <div className="absolute top-0 md:-top-12 left-0 right-0 bottom-0 bg-black opacity-40 -z-10 overflow-hidden">
                        <Image
                          draggable={false}
                          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.skin}.jpg`}
                          alt=""
                          width={1215}
                          height={717}
                        />
                      </div>
                      <div className="min-w-[26px] flex gap-2 items-center absolute top-3 left-1/2 md:relative md:top-auto md:left-auto">
                        <span className="font-bold">{index + 1} º</span>
                        {previousRanking?.[player.name] &&
                          index + 1 !== previousRanking[player.name] &&
                          (index + 1 < previousRanking[player.name] ? (
                            <MdOutlineKeyboardDoubleArrowUp
                              className="text-green-500"
                              size={24}
                            />
                          ) : (
                            <MdOutlineKeyboardDoubleArrowDown
                              className="text-red-500"
                              size={24}
                            />
                          ))}
                      </div>
                      <div className="flex items-center gap-2 md:gap-4 w-[284px]">
                        <div className="border-2 border-orange-400 relative">
                          <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px]">
                            <Image
                              src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/${player.profileIconId}.png`}
                              alt=""
                              fill
                            />
                          </div>
                          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-xxs bg-black  py-0.5 px-1.5 rounded-md">
                            {player.summonerLevel}
                          </span>
                        </div>
                        <div>
                          <Link
                            href={`https://u.gg/lol/profile/br1/${player.name}/overview`}
                            target="_blank"
                          >
                            <h1 className="w-fit hover:underline">{player.name}</h1>
                          </Link>
                          <p className="text-yellow-400 font-bold text-xs">
                            {index === 0 ? 'Hokage' : player.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center items-center md:min-w-[172px] shrink-0">
                        <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] relative">
                          <Image
                            src={`https://opgg-static.akamaized.net/images/medals_new/${player.league.tier.toLowerCase()}.png?image=q_auto,f_webp,w_144&v=1687738763941`}
                            alt=""
                            fill
                          />
                        </div>
                        <span>
                          {tiers.find((tier) => tier.en === player.league.tier)?.pt}{' '}
                          {player.league.rank} {player.league.leaguePoints} PDL
                        </span>
                        <p className="text-xxs md:text-xs">
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
