import { david } from '@assets';

export const playersInfo = [
  {
    title: 'Vagabundo',
    skin: 'Lux_7',
    accountId: 'ovsOjxRte-djtQ8ySz5uIHsjRWiaydkzHmerVntxv_C4MgQ',
  },
  {
    title: 'Reserva do Paulinho',
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
    title: 'Nordestino',
    skin: 'Gwen_11',
    accountId: 'uHXnDgtj6_YFtY1xRMuAiKM3FHsJ7Cq965ZMIg9PUxC0xuw',
  },
  {
    title: 'Heart gold',
    skin: 'Sett_45',
    accountId: '9kf4-Y7z_ni7Zy7kD0vfi31kYlJ9tJJiTu0dNDlDrIeIn9Y',
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
];

export const tiers = [
  { en: 'GOLD', pt: 'OURO' },
  { en: 'PLATINUM', pt: 'PLATINA' },
  { en: 'EMERALD', pt: 'ESMERALDA' },
  { en: 'DIAMOND', pt: 'DIAMANTE' },
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
