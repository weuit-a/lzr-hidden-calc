import { runes } from "./runes.js";

const suffixesArr = [
  { suffix: "TgCe", power: 1e393 },
  { suffix: "Ce", power: 1e303},
  { suffix: "NoQg", power: 1e180 },
  { suffix: "OcQg", power: 1e177 },
  { suffix: "SpQg", power: 1e174 },
  { suffix: "SxQg", power: 1e171 },
  { suffix: "QnQg", power: 1e168 },
  { suffix: "QdQg", power: 1e165 },
  { suffix: "TQg", power: 1e162 },
  { suffix: "DQg", power: 1e159 },
  { suffix: "UQg", power: 1e156 },
  { suffix: "Qg", power: 1e153 },
  { suffix: "Noqg", power: 1e150 },
  { suffix: "Ocqg", power: 1e147 },
  { suffix: "Spqg", power: 1e144 },
  { suffix: "Sxqg", power: 1e141 },
  { suffix: "Qnqg", power: 1e138 },
  { suffix: "Qdqg", power: 1e135 },
  { suffix: "Tqg", power: 1e132 },
  { suffix: "Dqg", power: 1e129 },
  { suffix: "Uqg", power: 1e126 },
  { suffix: "qg", power: 1e123 },
  { suffix: "NoTg", power: 1e120 },
  { suffix: "OcTg", power: 1e117 },
  { suffix: "SpTg", power: 1e114 },
  { suffix: "SxTg", power: 1e111 },
  { suffix: "QnTg", power: 1e108 },
  { suffix: "QdTg", power: 1e105 },
  { suffix: "TTg", power: 1e102 },
  { suffix: "DTg", power: 1e99 },
  { suffix: "UTg", power: 1e96 },
  { suffix: "Tg", power: 1e93 },
  { suffix: "NoVt", power: 1e90 },
  { suffix: "OcVt", power: 1e87 },
  { suffix: "SpVt", power: 1e84 },
  { suffix: "SxVt", power: 1e81 },
  { suffix: "QnVt", power: 1e78 },
  { suffix: "QdVt", power: 1e75 },
  { suffix: "TVt", power: 1e72 },
  { suffix: "DVt", power: 1e69 },
  { suffix: "UVt", power: 1e66 },
  { suffix: "Vt", power: 1e63 },
  { suffix: "NoDe", power: 1e60 },
  { suffix: "OcDe", power: 1e57 },
  { suffix: "SpDe", power: 1e54 },
  { suffix: "SxDe", power: 1e51 },
  { suffix: "QnDe", power: 1e48 },
  { suffix: "QdDe", power: 1e45 },
  { suffix: "TDe", power: 1e42 },
  { suffix: "DDe", power: 1e39 },
  { suffix: "UDe", power: 1e36 },
  { suffix: "No", power: 1e30 },
  { suffix: "Oc", power: 1e27 },
  { suffix: "Sp", power: 1e24 },
  { suffix: "Sx", power: 1e21 },
  { suffix: "Qn", power: 1e18 },
  { suffix: "Qd", power: 1e15 },
  { suffix: "T", power: 1e12 },
  { suffix: "B", power: 1e9 },
  { suffix: "M", power: 1e6 },
  { suffix: "K", power: 1e3 },
];

function formatWithSuffix(num) {
  if (!isFinite(num)) return "∞";
  if (num === 0) return "0";

  for (const { suffix, power } of suffixesArr) {
    if (num >= power) {
      const val = num / power;
      const valStr = val.toFixed(2).replace(/\.?0+$/, "");
      return `${valStr}${suffix}`;
    }
  }
  return num.toString();
}

function parseRPSInput(input) {
  input = input.trim();
  let num = Number(input);
  if (!isNaN(num)) return num;

  const regex = /^([\d.]+)\s*([a-zA-Z]+)$/;
  const match = input.match(regex);
  if (!match) return NaN;

  const [, numberPart, suffixPart] = match;
  const baseNum = Number(numberPart);
  if (isNaN(baseNum)) return NaN;

  const sufObj = suffixesArr.find(s => s.suffix.toLowerCase() === suffixPart.toLowerCase());
  if (!sufObj) return NaN;

  return baseNum * sufObj.power;
}

function formatTime(seconds) {
  if (seconds < 1) return "Instant";

  const days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (mins) parts.push(`${mins}m`);
  if (seconds || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(", ");
}

const runesGrid = document.getElementById("runesGrid");
const rpsInput = document.getElementById("rpsInput");
const currentRateDisplay = document.getElementById("currentRate");
const parsedRateDisplay = document.getElementById("parsedRate");
const filterInput = document.getElementById("filterInput");
const hideInstantCheckbox = document.getElementById("hideInstant");

let currentRPS = "";
let currentFilter = "";
let hideInstant = true;

function renderRunes() {
  runesGrid.innerHTML = "";

  const filteredRunes = runes.filter(rune => {
    // Фильтр по названию (без учёта регистра)
    if (!rune.name.toLowerCase().includes(currentFilter.toLowerCase())) return false;

    // Рассчёт времени до получения руны
    const timeSeconds = rune.chance / currentRPS;

    // Если скрываем инстанты — пропускаем их
    if (hideInstant && timeSeconds < 1) return false;

    return true;
  });

  filteredRunes.forEach(rune => {
    const timeSeconds = rune.chance / currentRPS;
    const timeStr = formatTime(timeSeconds);
    const chanceStr = formatWithSuffix(rune.chance);
    const boostsStr = rune.boosts.map(b =>
      `${b.name} (Max: ${formatWithSuffix(b.max)})`
    ).join(", ");

    const prefixStr = rune.prefix ? `<span class="rune-prefix">${rune.prefix}</span>` : "";

    const cardHTML = `
      <article class="rune-card">
        <h3>${prefixStr}${rune.name}</h3>
        <p><em>${rune.type}</em></p>
        <p>Chance: ${chanceStr}</p>
        <p>Boosts: ${boostsStr}</p>
        <p>Time to get: <strong>${timeStr}</strong></p>
      </article>
    `;

    runesGrid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function updateRPS() {
  const val = rpsInput.value;
  const parsed = parseRPSInput(val);

  if (!isNaN(parsed) && parsed > 0) {
    currentRPS = parsed;
    currentRateDisplay.textContent = `My Current Rate: ${val}`;
    parsedRateDisplay.textContent = `Parsed Rate: ${formatWithSuffix(parsed)} RPS`;
  } else {
    currentRateDisplay.textContent = "My Current Rate: Invalid input";
    parsedRateDisplay.textContent = "";
  }

  renderRunes();
}

function updateFilter() {
  currentFilter = filterInput.value.trim();
  renderRunes();
}

function updateHideInstant() {
  hideInstant = hideInstantCheckbox.checked;
  renderRunes();
}

rpsInput.addEventListener("input", updateRPS);
filterInput.addEventListener("input", updateFilter);
hideInstantCheckbox.addEventListener("change", updateHideInstant);

// Инициализация страницы
updateRPS();
