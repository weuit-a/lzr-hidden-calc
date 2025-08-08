// Данные по рунам
// Для каждой руны:
// id, name, prefix (если есть), subtitle, baseAmountScientific (шанс или базовое значение в научной нотации),
// rating (число), boosts — массив объектов { text, maxBoost (число или null) }

const runes = [
  {
    id: "vanta",
    name: "Vanta",
    prefix: "LIMITED",
    subtitle: "Color Rune",
    baseAmountScientific: 7e95,
    rating: 700,
    boosts: [
      { text: "x2 Rune Speed", maxBoost: 3000000 },
      { text: "x1 Rune Bulk", maxBoost: 3 },
      { text: "x2 Tickets", maxBoost: 1 }
    ],
  },
  {
    id: "frostbite",
    name: "Frostbite",
    subtitle: "Arctic Rune",
    baseAmountScientific: 3e103,
    rating: 30,
    boosts: [
      { text: "x1.01 Rune Speed", maxBoost: 100000 }
    ],
  },
  {
    id: "odyssey",
    name: "Odyssey",
    prefix: "LIMITED",
    subtitle: "5M Royal",
    baseAmountScientific: 2e109,
    rating: 15,
    boosts: [
      { text: "x1 Rune Bulk", maxBoost: 10000 },
      { text: "x1 Rune Bulk", maxBoost: 50 },
      { text: "x1 Rune Speed", maxBoost: 50 },
    ],
  },
  {
    id: "earth",
    name: "Earth",
    subtitle: "Exponential Rune",
    baseAmountScientific: 1e100,
    rating: 50,
    boosts: [
      { text: "x1.0000025^Earth", maxBoost: null },
    ],
  },
  {
    id: "instantRune",
    name: "Flash",
    prefix: "INSTANT",
    subtitle: "Instant Rune",
    baseAmountScientific: 1e50,
    rating: 5,
    boosts: [
      { text: "Instant effect", maxBoost: null },
    ],
  },
  // Добавляйте другие руны по необходимости...
];
