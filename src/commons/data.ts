import { david } from '@assets';

export const playersInfo = [
  {
    title: 'Vagabundo',
    skin: 'Viktor_3',
    accountId: 'ovsOjxRte-djtQ8ySz5uIHsjRWiaydkzHmerVntxv_C4MgQ',
    stats: {
      macro: 99,
      micro: 99,
      positioning: 99,
      psycho: 99,
      leadership: 99,
      farm: 99,
    },
  },
  {
    title: 'Escravo',
    skin: 'Thresh_1',
    accountId: 'AXDxv0H6XL6pBxgut-TeGvE-Z3t6OqaZALlJ7tca-RxUIX8',
    stats: {
      macro: 88,
      micro: 88,
      positioning: 91,
      psycho: 84,
      leadership: 77,
      farm: 35,
    },
  },
  {
    title: 'Horrível',
    skin: david.src,
    accountId: 'ZeawlYZuKOUZdh4mxJqS2HAAr1qp9CNXDdpHvAzLnIcUr8I',
    stats: {
      macro: 88,
      micro: 96,
      positioning: 93,
      psycho: 80,
      leadership: 89,
      farm: 79,
    },
  }, // Zed_1
  {
    title: 'Gold mais forte',
    skin: 'Xayah_37',
    accountId: 'Qp-XkXVrAisdSU6FgC9nirEyjmM6YJisvLr-xnEfJufGwJU',
    stats: {
      macro: 98,
      micro: 66,
      positioning: 97,
      psycho: 99,
      leadership: 99,
      farm: 86,
    },
  },
  {
    title: 'Aposentado',
    skin: 'Darius_3',
    accountId: 'eKH48pVRyyWjGRbyK02riejBGVWxp0mh8dLItMuP4eS2BMI',
    stats: {
      macro: 69,
      micro: 92,
      positioning: 91,
      psycho: 90,
      leadership: 60,
      farm: 90,
    },
  },
  {
    title: 'Soul silver',
    skin: 'Lillia_19',
    accountId: '6gdO7gMq6fGUR2WRxXJPL1ykfGe1VMjhTqToT339NUMF0IQ',
    stats: {
      macro: 84,
      micro: 90,
      positioning: 89,
      psycho: 24,
      leadership: 60,
      farm: 91,
    },
  },
  {
    title: 'Nordestino',
    skin: 'Gwen_11',
    accountId: 'uHXnDgtj6_YFtY1xRMuAiKM3FHsJ7Cq965ZMIg9PUxC0xuw',
    stats: {
      macro: 94,
      micro: 92,
      positioning: 92,
      psycho: 40,
      leadership: 88,
      farm: 89,
    },
  },
  {
    title: 'asd',
    skin: 'Ezreal_0',
    accountId: 'ETllTUNpgyOh8mJaT5Pavlf12Sz2YmevLVlymqqD8Uvbweg',
    stats: {
      macro: 94,
      micro: 92,
      positioning: 92,
      psycho: 90,
      leadership: 50,
      farm: 90,
    },
  },
  {
    title: 'Ex diamante 1',
    skin: 'Riven_16',
    accountId: 'rJeuUzDYBSxjhVMmC2213xHcqdIf6tarmWGlubQna8N_2bY',
    stats: {
      macro: 80,
      micro: 88,
      positioning: 77,
      psycho: 84,
      leadership: 30,
      farm: 85,
    },
  },
  {
    title: 'Pereba',
    skin: 'Samira_20',
    accountId: 'YK9pet125SQXFCM-wys_zHWFQDfpCUaTxXuM0MZoopTx0lQ',
    stats: {
      macro: 68,
      micro: 96,
      positioning: 94,
      psycho: 90,
      leadership: 60,
      farm: 90,
    },
  },
];

export const tiers = [
  { en: 'SILVER', pt: 'PRATA' },
  { en: 'GOLD', pt: 'OURO' },
  { en: 'PLATINUM', pt: 'PLATINA' },
  { en: 'EMERALD', pt: 'ESMERALDA' },
  { en: 'DIAMOND', pt: 'DIAMANTE' },
  { en: 'MASTER', pt: 'MESTRE' },
];

export const ranks = ['IV', 'III', 'II', 'I'];

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
