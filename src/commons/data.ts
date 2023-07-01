import { david } from '@assets';

export const playersInfo = [
  { title: 'Vagabundo', skin: 'Lux_7', name: 'KSCERATO' },
  { title: 'Reserva do Paulinho', skin: 'Thresh_1', name: 'Ghigho' },
  { title: 'Horrível', skin: david.src, name: 'dakarou' }, // Zed_1
  { title: 'Gold mais forte', skin: 'Xayah_37', name: 'seyrin' },
  { title: 'Aposentado', skin: 'Darius_3', name: 'Ja Fui Bom 1 Dia' },
  { title: 'Soul silver', skin: 'Lillia_19', name: 'hicky1' },
  { title: 'Nordestino', skin: 'Fiora_69', name: 'bocchi the loser' },
  { title: 'Diferencial na rota superior', skin: 'Sett_19', name: 'fastfortresz' },
  { title: 'Ex diamante 1', skin: 'Riven_16', name: 'thigu' },
  { title: 'Pereba', skin: 'Samira_20', name: 'mijo na cama' },
];

export const tiers = [
  { en: 'GOLD', pt: 'OURO' },
  { en: 'PLATINUM', pt: 'PLATINA' },
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
