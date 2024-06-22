import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Tabs from '@radix-ui/react-tabs';
import Typewritter from 'typewriter-effect';
import { trpc } from '../utils/trpc';
import { ranks, tiers } from '../commons/data';
import { IoMdRefresh } from 'react-icons/io';
import { MatchHistory } from '@components';
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from 'react-icons/md';
import { mpengu } from '@assets';
import { getCookie, setCookie } from 'cookies-next';

type LeagueState = Record<
  string,
  {
    index: number;
    elo: Elo;
  }
>;

type Elo = {
  tier: Tier;
  rank: Rank;
  leaguePoints: number;
};

export default function Home() {
  const [queueType, setQueueType] = useState<Queue>('RANKED_SOLO_5x5');
  const [previousRanking, setPreviousRanking] = useState<LeagueState[]>();

  const lpDiffBetween2Elos = (elo1: Elo, elo2: Elo) => {
    const baseLeaguePoints = {
      SILVER: 0,
      GOLD: 400,
      PLATINUM: 800,
      EMERALD: 1200,
      DIAMOND: 1600,
      MASTER: 2000,
    };

    const getPDL = (tier: Tier, rank: Rank, leaguePoints: number) => {
      if (!baseLeaguePoints.hasOwnProperty(tier) || !ranks.includes(rank)) {
        return 0;
      }

      const tierPDL = baseLeaguePoints[tier];
      const rankIndex = ranks.indexOf(rank);
      return tierPDL + rankIndex * 100 + leaguePoints;
    };

    return (
      getPDL(elo1.tier, elo1.rank, elo1.leaguePoints) -
      getPDL(elo2.tier, elo2.rank, elo2.leaguePoints)
    );
  };

  const {
    data: players,
    isLoading,
    isRefetching,
    refetch,
  } = trpc.players.useQuery(undefined, {
    onSuccess: (data) => {
      Array<Queue>('RANKED_SOLO_5x5', 'RANKED_FLEX_SR').map((queueType, index) => {
        setCookie(
          `hiraishin-${queueType}`,
          JSON.stringify(
            data.reduce(
              (acc, curr) =>
                Object.assign(
                  acc,
                  curr.leagues[index] && {
                    [curr.gameName]: {
                      index: curr.leagues[index].index,
                      elo: {
                        tier: curr.leagues[index].tier,
                        rank: curr.leagues[index].rank,
                        leaguePoints: curr.leagues[index].leaguePoints,
                      },
                    },
                  }
                ),
              {}
            ) as LeagueState
          ),
          { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) }
        );
      });
    },
  });

  useEffect(() => {
    const previousSolo = JSON.parse(getCookie('hiraishin-RANKED_SOLO_5x5') || '{}');
    const previousFlex = JSON.parse(getCookie('hiraishin-RANKED_FLEX_SR') || '{}');

    previousSolo && previousFlex && setPreviousRanking([previousSolo, previousFlex]);
  }, []);

  return (
    <>
      {!isLoading && !isRefetching ? (
        <div className="max-w-[768px] font-medium m-auto px-3 py-6">
          <div className="relative">
            <h1 className="text-center text-5xl md:text-6xl mt-5 mb-4 font-bold text-transparent w-fit m-auto bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
              HIRAISHIN
              <Typewritter
                onInit={(typewritter) => {
                  typewritter
                    .typeString('UM CLÃ')
                    .deleteAll()
                    .typeString('UMA TRIBO')
                    .deleteAll()
                    .typeString('UMA NAÇÃO')
                    .deleteAll()
                    .typeString('UMA FAMÍLIA.')
                    .start();
                }}
              />
            </h1>

            <Tabs.Root
              onValueChange={(value) => setQueueType(value as Queue)}
              defaultValue={queueType}
            >
              <Tabs.List className="flex mb-2 items-center gap-3 justify-center">
                <Tabs.Trigger value="RANKED_SOLO_5x5" asChild>
                  <button
                    data-selected={queueType === 'RANKED_SOLO_5x5'}
                    className="py-2 text-sm px-2 text-slate-300 border-b-2 border-slate-500 data-[selected=true]:font-bold data-[selected=true]:border-slate-300 transition-all w-[140px]"
                  >
                    Ranqueada Solo
                  </button>
                </Tabs.Trigger>
                <Tabs.Trigger value="RANKED_FLEX_SR" asChild>
                  <button
                    data-selected={queueType === 'RANKED_FLEX_SR'}
                    className="py-2 text-sm px-2 text-slate-300 border-b-2 border-slate-500 data-[selected=true]:font-bold data-[selected=true]:border-slate-300 transition-all w-[140px]"
                  >
                    Ranqueada Flex
                  </button>
                </Tabs.Trigger>
                <IoMdRefresh
                  size={24}
                  className="cursor-pointer text-slate-300 absolute right-0"
                  onClick={() => refetch()}
                />
              </Tabs.List>
              {players && (
                <div className="border-slate-300 divide-slate-300">
                  {['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'].map((type, typeIndex) => (
                    <Tabs.Content value={type} key={type}>
                      {players
                        .sort((a, b) => {
                          const leagueA = a.leagues.find(
                            (league) => league.queueType === type
                          );
                          const leagueB = b.leagues.find(
                            (league) => league.queueType === type
                          );

                          if (!leagueA) {
                            return 1;
                          }

                          if (!leagueB) {
                            return -1;
                          }

                          return leagueA.index - leagueB.index;
                        })
                        .map((player, index) => {
                          const league = player.leagues.find(
                            (league) => league.queueType === type
                          )!;

                          if (!league) {
                            return null;
                          }

                          const lpDiff =
                            previousRanking?.[typeIndex]?.[player.gameName] &&
                            lpDiffBetween2Elos(
                              { ...player.leagues[typeIndex] },
                              {
                                ...previousRanking?.[typeIndex]?.[player.gameName].elo,
                              }
                            );

                          const winrate = Math.ceil(
                            (league.wins / (league.wins + league.losses)) * 100
                          );

                          return (
                            <Collapsible.Root key={player.id}>
                              <Collapsible.CollapsibleTrigger asChild>
                                <div className="md:px-[64px] mb-2 rounded-2xl px-3 py-6 cursor-pointer flex items-center overflow-hidden justify-between text-sm md:text-base relative z-10">
                                  <div className="absolute top-0 md:-top-12 left-0 right-0 bottom-0 bg-black opacity-[40%] -z-10 overflow-hidden">
                                    <Image
                                      draggable={false}
                                      src={
                                        player.skin.startsWith('/_next')
                                          ? player.skin
                                          : `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.skin}.jpg`
                                      }
                                      alt=""
                                      width={1215}
                                      height={717}
                                    />
                                  </div>
                                  <div className="min-w-[26px] flex gap-2 items-center absolute top-3 left-1/2 md:relative md:top-auto md:left-auto">
                                    <span className="font-semibold text-yellow-400">
                                      #{index + 1}
                                    </span>
                                    <div className="md:absolute md:top-0 md:-right-7">
                                      {previousRanking?.[typeIndex]?.[player.gameName] &&
                                        index + 1 !==
                                          previousRanking[typeIndex][player.gameName]
                                            .index &&
                                        (index + 1 <
                                        previousRanking[typeIndex][player.gameName]
                                          .index ? (
                                          <MdOutlineKeyboardDoubleArrowUp
                                            className="text-green-500"
                                            size={'1.5em'}
                                          />
                                        ) : (
                                          <MdOutlineKeyboardDoubleArrowDown
                                            className="text-red-500"
                                            size={'1.5em'}
                                          />
                                        ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 md:gap-4 w-[284px]">
                                    <div className="border-2 border-orange-400 relative">
                                      <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px]">
                                        <Image
                                          src={`http://ddragon.leagueoflegends.com/cdn/14.12.1/img/profileicon/${player.profileIconId}.png`}
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
                                        className="hover:underline"
                                        href={`https://u.gg/lol/profile/br1/${player.gameName}-${player.tagLine}/overview`}
                                        target="_blank"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <div className="flex gap-1 items-baseline">
                                          <h1 className="w-fit shrink-0">
                                            {player.gameName}
                                          </h1>
                                          <h2 className="text-yellow-400 text-xs sm:text-base">
                                            #{player.tagLine}
                                          </h2>
                                        </div>
                                      </Link>
                                      <p className="text-yellow-400 font-semibold text-xs">
                                        {index === 0 ? 'Hokage' : player.title}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex relative flex-col justify-center items-center md:min-w-[172px] shrink-0">
                                    <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] relative">
                                      <Image
                                        src={`https://opgg-static.akamaized.net/images/medals_new/${league.tier.toLowerCase()}.png?image=q_auto,f_webp,w_144&v=1687738763941`}
                                        alt=""
                                        fill
                                      />
                                    </div>
                                    <span>
                                      {tiers.find((tier) => tier.en === league.tier)?.pt}{' '}
                                      {league.rank} {league.leaguePoints} PDL
                                      {lpDiff !== 0 && lpDiff !== undefined && (
                                        <span className="absolute font-semibold flex text-sm -top-2 right-0">
                                          {lpDiff > 0 ? (
                                            <>
                                              +{lpDiff} PDL
                                              <MdOutlineKeyboardDoubleArrowUp
                                                className="text-green-500"
                                                size={'1.25rem'}
                                              />
                                            </>
                                          ) : (
                                            <>
                                              {lpDiff} PDL
                                              <MdOutlineKeyboardDoubleArrowDown
                                                className="text-red-500"
                                                size={'1.5em'}
                                              />
                                            </>
                                          )}
                                        </span>
                                      )}
                                    </span>
                                    <p className="text-xxs  md:text-xs">
                                      {league.wins}V {league.losses}D -{' '}
                                      <span
                                        className={`data-[winrate-above-50='false']:text-red-500 ${
                                          winrate > 50 && 'text-green-500'
                                        } ${winrate < 50 && 'text-red-500'}`}
                                      >
                                        {winrate.toFixed(0)}% Winrate
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </Collapsible.CollapsibleTrigger>
                              <Collapsible.CollapsibleContent>
                                <MatchHistory
                                  player={player}
                                  queue={queueType === 'RANKED_SOLO_5x5' ? '420' : '440'}
                                />
                              </Collapsible.CollapsibleContent>
                            </Collapsible.Root>
                          );
                        })}
                    </Tabs.Content>
                  ))}
                </div>
              )}
            </Tabs.Root>
          </div>
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
