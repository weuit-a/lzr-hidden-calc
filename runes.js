// Массив рун
const runes = [
  {
    id: 1,
    name: "Vanta",
    subtitle: "Color Rune",
    baseAmount: 700, // для отображения
    baseAmountScientific: 7e+95, // коэффициент "шанс"
    baseUnit: "Tg",
    bonuses: [
      { multiplier: 2, name: "Rune Speed", max: "3 M", type: "EXPONENTIAL" },
      { multiplier: 1, name: "Rune Bulk", max: "3", type: "EXP" },
      { multiplier: 2, name: "Tickets", max: "1 DDe", type: "EXP" },
    ],
  },
  {
    id: 2,
    name: "Frostbite",
    subtitle: "Arctic Rune",
    baseAmount: 30,
    baseAmountScientific: 3e+103,
    baseUnit: "TTg",
    bonuses: [
      { multiplier: 1.01, name: "Rune Speed", max: "100 K", type: "EXPONENTIAL" },
    ],
  },
  {
    id: 3,
    name: "Odyssey",
    subtitle: "limited 5M Royal",
    baseAmount: 15,
    baseAmountScientific: 2e+109,
    baseUnit: "QnTg",
    bonuses: [
      { multiplier: 1, name: "Rune Bulk", max: "10 K", type: "EXP" },
      { multiplier: 1, name: "Rune Bulk", max: "50", type: "EXP" },
      { multiplier: 1, name: "Rune Speed", max: "50", type: "EXP" },
    ],
  },
];
