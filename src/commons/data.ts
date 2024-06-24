import { david } from '@assets';

export const players = [
  {
    title: 'Vagabundo',
    skin: 'Viktor_3',
    accountId: 'ovsOjxRte-djtQ8ySz5uIHsjRWiaydkzHmerVntxv_C4MgQ',
  },
  {
    title: 'Escravo',
    skin: 'Thresh_1',
    accountId: 'AXDxv0H6XL6pBxgut-TeGvE-Z3t6OqaZALlJ7tca-RxUIX8',
  },
  {
    title: 'Horrível',
    skin: david.src,
    accountId: 'ZeawlYZuKOUZdh4mxJqS2HAAr1qp9CNXDdpHvAzLnIcUr8I',
  }, // Zed_1
  {
    title: 'Gold mais forte',
    skin: 'Xayah_37',
    accountId: 'Qp-XkXVrAisdSU6FgC9nirEyjmM6YJisvLr-xnEfJufGwJU',
  },
  {
    title: 'Aposentado',
    skin: 'Darius_3',
    accountId: 'eKH48pVRyyWjGRbyK02riejBGVWxp0mh8dLItMuP4eS2BMI',
  },
  {
    title: 'Soul silver',
    skin: 'Lillia_19',
    accountId: '6gdO7gMq6fGUR2WRxXJPL1ykfGe1VMjhTqToT339NUMF0IQ',
  },
  {
    title: 'Superestimado',
    skin: 'Gwen_11',
    accountId: 'uHXnDgtj6_YFtY1xRMuAiKM3FHsJ7Cq965ZMIg9PUxC0xuw',
  },
  {
    title: 'Narigudo',
    skin: 'Lucian_9',
    accountId: 'ETllTUNpgyOh8mJaT5Pavlf12Sz2YmevLVlymqqD8Uvbweg',
  },
  {
    title: 'Ex diamante 1',
    skin: 'Riven_16',
    accountId: 'rJeuUzDYBSxjhVMmC2213xHcqdIf6tarmWGlubQna8N_2bY',
  },
  {
    title: 'Pereba',
    skin: 'Samira_20',
    accountId: 'YK9pet125SQXFCM-wys_zHWFQDfpCUaTxXuM0MZoopTx0lQ',
  },
  {
    title: 'Smurf do narigudo',
    skin: 'Ezreal_20',
    accountId: 'RfyLcrT3zFwOTAFY8eP8SheNgeuCVhIdwY1CLpuJeLzvyEYyf4jpy-Qr',
  },
  {
    title: 'Cheater',
    skin: 'Zed_1',
    accountId: 'ywU6fzcE3IGBX4IzdvlBkWuxFcwk0XS-NSE4lyAuAQW80Hk',
  },
  {
    title: 'Smurf do superestimado',
    skin: 'Fiora_0',
    accountId: 'OLjvMJi7mCegkfCyYGpVo0t99R3jKzYQnWNQ44NsAPQKl0s8ERuQTdeg',
  },
];

export const tiers: { en: Tier; pt: string }[] = [
  { en: 'SILVER', pt: 'PRATA' },
  { en: 'GOLD', pt: 'OURO' },
  { en: 'PLATINUM', pt: 'PLATINA' },
  { en: 'EMERALD', pt: 'ESMERALDA' },
  { en: 'DIAMOND', pt: 'DIAMANTE' },
  { en: 'MASTER', pt: 'MESTRE' },
];

export const ranks: Rank[] = ['IV', 'III', 'II', 'I'];

export const spells = {
  1: 'Boost',
  3: 'Exhaust',
  4: 'Flash',
  6: 'Haste',
  7: 'Heal',
  11: 'Smite',
  12: 'Teleport',
  14: 'Dot',
  21: 'Barrier',
  32: 'Snowball',
} as Record<number, string>;

const baseLeaguePoints = {
  SILVER: 0,
  GOLD: 400,
  PLATINUM: 800,
  EMERALD: 1200,
  DIAMOND: 1600,
  MASTER: 2000,
};

export const getPDL = (elo: Elo | null) => {
  if (!elo) {
    return 0;
  }

  if (!baseLeaguePoints.hasOwnProperty(elo.tier) || !ranks.includes(elo.rank)) {
    return 0;
  }

  const tierPDL = baseLeaguePoints[elo.tier];
  const rankIndex = ranks.indexOf(elo.rank);
  return tierPDL + rankIndex * 100 + elo.leaguePoints;
};
