// --- Словарь суффиксов для степеней e ---
const suffixes = {
  "": 0,
  K: 3,
  M: 6,
  B: 9,
  T: 12,
  Qa: 15,
  Qi: 18,
  Sx: 21,
  Sp: 24,
  Oc: 27,
  No: 30,
  DDe: 33,
  TDe: 42,
  QdDe: 45,
  QnDe: 48,
  SxDe: 51,
  SpDe: 54,
  OcDe: 57,
  NoDe: 60,
  Vt: 63,
  UVt: 66,
  DVt: 69,
  TVt: 72,
  QdVt: 75,
  QnVt: 78,
  SxVt: 81,
  SpVt: 84,
  OcVt: 87,
  NoVt: 90,
  Tg: 93,
  UTg: 96,
  DTg: 99,
  TTg: 102,
  QdTg: 105,
  QnTg: 108,
  SxTg: 111,
  SpTg: 114,
  OcTg: 117,
  NoTg: 120,
  qg: 123,
  Uqg: 126,
  Dqg: 129,
  Tqg: 132,
  Qdqg: 135,
  Qnqg: 138,
  Sxqg: 141,
  Spqg: 144,
  Ocqg: 147,
  Noqg: 150,
  Qg: 153,
  UQg: 156,
  DQg: 159,
  TQg: 162,
  QdQg: 165,
  QnQg: 168,
  SxQg: 171,
  SpQg: 174,
  OcQg: 177,
  NoQg: 180,
  sg: 183,
  Usg: 186,
  Dsg: 189,
  Tsg: 192,
  Qdsg: 195,
  Qnsg: 198,
  Sxsg: 201,
  Spsg: 204,
  Ocsg: 207,
  Nosg: 210,
  Sg: 213,
  USg: 216,
  DSg: 219,
  TSg: 222,
  QdSg: 225,
  QnSg: 228,
  SxSg: 231,
  SpSg: 234,
  OcSg: 237,
  NoSg: 240,
  Og: 243,
  UOg: 246,
  DOg: 249,
  TOg: 252,
  QdOg: 255,
  QnOg: 258,
  SxOg: 261,
  SpOg: 264,
  OcOg: 267,
  NoOg: 270,
  Ng: 273,
  UNg: 276,
  DNg: 279,
  TNg: 282,
  QdNg: 285,
  QnNg: 288,
  SxNg: 291,
  SpNg: 294,
  OcNg: 297,
  NoNg: 300,
  Ce: 303,
  UCe: 306,
  DCe: 309,
  TCe: 312,
  QdCe: 315,
  QnCe: 318,
  SxCe: 321,
  SpCe: 324,
  OcCe: 327,
  NoCe: 330,
  DeCe: 333,
  UDeCe: 336,
  DDeCe: 339,
  TDeCe: 342,
  QdDeCe: 345,
  QnDeCe: 348,
  SxDeCe: 351,
  SpDeCe: 354,
  OcDeCe: 357,
  NoDeCe: 360,
  VtCe: 363,
  UVtCe: 366,
  DVtCe: 369,
  TVtCe: 372,
  QdVtCe: 375,
  QnVtCe: 378,
  SxVtCe: 381,
  SpVtCe: 384,
  OcVtCe: 387,
  NoVtCe: 390,
  TgCe: 393,
  UTgCe: 396,
  DTgCe: 399,
  TTgCe: 402,
  QdTgCe: 405,
  QnTgCe: 408,
  SxTgCe: 411,
  SpTgCe: 414,
  OcTgCe: 417,
  NoTgCe: 420,
  qgCe: 423,
  UqgCe: 426,
  DqgCe: 429,
  TqgCe: 432,
  QdqgCe: 435,
  QnqgCe: 438,
  SxqgCe: 441,
  SpqgCe: 444,
  OcqgCe: 447,
  NoqgCe: 450,
  QgCe: 453,
  UQgCe: 456,
  DQgCe: 459,
  TQgCe: 462,
  QdQgCe: 465,
  QnQgCe: 468,
  SxQgCe: 471,
  SpQgCe: 474,
  OcQgCe: 477,
  NoQgCe: 480,
  sgCe: 483,
  UsgCe: 486,
  DsgCe: 489,
  TsgCe: 492,
  QdsgCe: 495,
  QnsgCe: 498,
  SxsgCe: 501,
  SpsgCe: 504,
  OcsgCe: 507,
  NosgCe: 510,
  SgCe: 513,
  USgCe: 516,
  DSgCe: 519,
  TSgCe: 522,
  QdSgCe: 525,
  QnSgCe: 528,
  SxSgCe: 531,
  SpSgCe: 534,
  OcSgCe: 537,
  NoSgCe: 540,
  OgCe: 543,
  UOgCe: 546,
  DOgCe: 549,
  TOgCe: 552,
  QdOgCe: 555,
  QnOgCe: 558,
  SxOgCe: 561,
  SpOgCe: 564,
  OcOgCe: 567,
  NoOgCe: 570,
  NgCe: 573,
  UNgCe: 576,
  DNgCe: 579,
  TNgCe: 582,
  QdNgCe: 585,
  QnNgCe: 588,
  SxNgCe: 591,
  SpNgCe: 594,
  OcNgCe: 597,
  NoNgCe: 600,
  Du: 603,
  Tr: 903,
  Qa: 1203,
  Qi: 1503,
  Se: 1803,
  Si: 2103,
  Ot: 2403,
  Ni: 2703,
  Mi: 3003,
  Mc: 3000003,
  Na: 3000000003,
  Pi: 3000000000003,
  Fm: 3000000000000003,
  At: 3000000000000000003,
  Zp: 3000000000000000000003,
  Yc: 3000000000000000000000003,
  Xo: 3000000000000000000000000003,
};

// --- Функция парсинга RPS с суффиксами ---
function parseRPS(input) {
  input = input.trim();

  // Пробуем напрямую число с экспонентой (1e5, 2.3e10)
  let direct = Number(input);
  if (!isNaN(direct)) return direct;

  // Разбор вида "число + суффикс"
  // Схема: "123.45TTg", "1.5M", "100Tg"
  const regex = /^([\d.]+)\s*([a-zA-Z]+)$/;
  const match = input.match(regex);
  if (!match) return NaN;

  const numPart = parseFloat(match[1]);
  const suffixPart = match[2];

  if (isNaN(numPart)) return NaN;

  // Сортируем ключи по длине убыванию для приоритетного сопоставления
  const keys = Object.keys(suffixes).sort((a, b) => b.length - a.length);

  let power = null;
  for (const key of keys) {
    if (suffixPart.startsWith(key)) {
      power = suffixes[key];
      break;
    }
  }
  if (power === null) return NaN;

  return numPart * Math.pow(10, power);
}

// --- Форматирование времени в читаемый вид ---
function formatTime(seconds) {
  if (seconds === Infinity) return "∞";

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  let remaining = seconds;
  const parts = [];

  for (const unit of units) {
    const value = Math.floor(remaining / unit.seconds);
    if (value > 0) {
      parts.push(`${value} ${unit.label}${value > 1 ? "s" : ""}`);
      remaining -= value * unit.seconds;
    }
    if (parts.length >= 3) break; // Максимум 3 части
  }

  if (parts.length === 0) return "0 seconds";
  return parts.join(", ");
}

// --- Функция рендеринга бонуса ---
function renderBonus(bonus) {
  return `
    <div class="bonus-item">
      <span class="bonus-multiplier">x${bonus.multiplier}</span>
      ${bonus.name}
      ${bonus.max ? `<span class="bonus-max">(Max: ${bonus.max})</span>` : ""}
      ${bonus.type === "EXPONENTIAL" ? `<span class="bonus-type">EXPONENTIAL</span>` : ""}
    </div>
  `;
}

// --- Главная функция рендеринга ---
function renderAll() {
  const topStats = document.getElementById("topStats");
  const runesGrid = document.getElementById("runesGrid");
  const searchInput = document.getElementById("searchInput");
  const hideInstant = document.getElementById("hideInstant");
  const sortSelect = document.getElementById("sortSelect");
  const userRPSInput = document.getElementById("userRPS");

  const rawRPS = userRPSInput.value.trim();
  const userRPS = parseRPS(rawRPS);

  if (isNaN(userRPS) || userRPS <= 0) {
    topStats.textContent = "Please enter a valid RPS (e.g. 1e5, 100Tg)";
    runesGrid.innerHTML = "";
    return;
  }

  topStats.textContent = `My Current Rate: ${rawRPS} RPS (${userRPS.toExponential(3)})`;

  const filterText = searchInput.value.trim().toLowerCase();
  const hideInstantChecked = hideInstant.checked;
  const sortMode = sortSelect.value;

  // Фильтрация
  let filtered = runes.filter((r) => {
    if (hideInstantChecked && r.bonuses.some(b => b.type === "INSTANT")) return false;
    if (!r.name.toLowerCase().includes(filterText)) return false;
    return true;
  });

  // Сортировка
  switch (sortMode) {
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "time":
      filtered.sort((a, b) => {
        return calcBaseTime(a, userRPS) - calcBaseTime(b, userRPS);
      });
      break;
    case "rating":
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "easiest":
    default:
      filtered.sort((a, b) => {
        // например по baseAmount, меньше — проще
        return a.baseAmount - b.baseAmount;
      });
      break;
  }

  // Рендерим карточки
  runesGrid.innerHTML = filtered
    .map((r) => renderRuneCard(r, userRPS))
    .join("");
}

// --- Вычисление базового времени (без бонусов) ---
function calcBaseTime(rune, rps) {
  if (rps <= 0) return Infinity;

  // Время = baseAmountScientific / (rps * шанс)
  // Шанс = baseAmountScientific — тут считаем как 1 (если надо, можно поправить)
  // Но по условию: время = baseAmountScientific / RPS (просто делим)
  // Если надо учитывать шанс (например, baseAmount), надо уточнить
  // Для упрощения возьмем baseAmountScientific / rps

  return rune.baseAmountScientific / rps;
}

// --- Вычисление времени до максимума для экспоненциальных бонусов ---
function calcExpMaxTime(rune, rps) {
  // Ищем бонус с типом EXPONENTIAL
  const expBonus = rune.bonuses.find((b) => b.type === "EXPONENTIAL");
  if (!expBonus) return null;

  // По условию: время = ln(max)/ln(multiplier) / rps (приблизительно)
  // Но max может быть вида "3 M" — надо парсить max

  // Попробуем парсить max как число с суффиксом
  const maxStr = expBonus.max || "";
  const maxNum = parseRPS(maxStr);
  if (isNaN(maxNum) || maxNum <= 1) return null;

  const mult = expBonus.multiplier;
  if (mult <= 1) return null;

  // Логарифмическая формула:
  // время = ln(max) / ln(mult) / rps
  const timeSeconds = Math.log(maxNum) / Math.log(mult) / rps;

  return timeSeconds;
}

// --- Функция рендеринга одной руны ---
function renderRuneCard(rune, rps) {
  const baseTimeSec = calcBaseTime(rune, rps);
  const expMaxTime = calcExpMaxTime(rune, rps);

  return `
  <article tabindex="0" class="rune-card" aria-label="Rune ${rune.name}">
    <h2 class="rune-title">${rune.name}</h2>
    <div class="rune-subtitle">${rune.subtitle}</div>
    <div class="rune-large-num">
      1 / ${formatScientific(rune.baseAmountScientific)} (${rune.baseUnit})
    </div>
    <div class="bonuses">
      ${rune.bonuses.map(renderBonus).join("")}
    </div>
    <div class="time-info">Time for 1 rune: <strong>${formatTime(baseTimeSec)}</strong></div>
    ${
      expMaxTime !== null
        ? `<div class="time-info">Time to max exponential bonus: <strong>${formatTime(
            expMaxTime
          )}</strong></div>`
        : ""
    }
  </article>
  `;
}

// --- Форматируем научную нотацию красиво ---
function formatScientific(num) {
  if (num === Infinity) return "∞";
  if (num === 0) return "0";

  const exp = Math.floor(Math.log10(num));
  const mant = num / Math.pow(10, exp);

  // Округлим мантиссу до 2 знаков
  const mantStr = mant.toFixed(2).replace(/\.?0+$/, "");

  return `${mantStr}e${exp}`;
}

// --- Инициализация и слушатели ---
window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const hideInstant = document.getElementById("hideInstant");
  const sortSelect = document.getElementById("sortSelect");
  const userRPSInput = document.getElementById("userRPS");

  [searchInput, hideInstant, sortSelect, userRPSInput].forEach((el) => {
    el.addEventListener("input", renderAll);
    el.addEventListener("change", renderAll);
  });

  renderAll();
});
