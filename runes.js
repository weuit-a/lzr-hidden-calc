export const runes = [
  {
    id: 1,
    name: "Vanta",
    type: "Color Rune",
    baseAmountScientific: 1e95,
    chance: 1e95,
    boosts: [
      { name: "Rune Speed", multiplier: 2, max: 3 },
      { name: "Rune Bulk", multiplier: 1, max: 3 },
      { name: "Tickets", multiplier: 2, max: 1 },
    ],
    exponential: false,
    prefix: "",
  },
  {
    id: 2,
    name: "Frostbite",
    type: "Arctic Rune",
    baseAmountScientific: 1e103,
    chance: 1e103,
    boosts: [
      { name: "Rune Speed", multiplier: 1.01, max: 100000 },
    ],
    exponential: true,
    exponentialBase: 1.0000025,
    exponentialAmount: 1e6,
    prefix: "LIMITED",
  },
  // добавляй остальные руны сюда
];
