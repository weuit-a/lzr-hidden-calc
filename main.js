const searchInput = document.getElementById("searchInput");
const hideInstantCheckbox = document.getElementById("hideInstant");
const sortSelect = document.getElementById("sortSelect");
const runesGrid = document.getElementById("runesGrid");
const topStats = document.getElementById("topStats");
const userRPSInput = document.getElementById("userRPS");

// Форматируем большие числа с приставками
function formatLargeNumber(amount, unit, sci) {
  return `${amount} ${unit} (${sci.toExponential(2)})`;
}

// Форматирование времени в читаемый вид
function formatLongTime(seconds) {
  if (seconds === null) return "-";
  if (!isFinite(seconds)) return "∞";
  let s = Math.floor(seconds);
  const years = Math.floor(s / (3600 * 24 * 365));
  s -= years * 3600 * 24 * 365;
  const days = Math.floor(s / (3600 * 24));
  s -= days * 3600 * 24;
  const hours = Math.floor(s / 3600);
  s -= hours * 3600;
  const minutes = Math.floor(s / 60);
  s -= minutes * 60;
  let result = "";
  if (years > 0) result += years + " years, ";
  if (days > 0) result += days + " days, ";
  if (hours > 0) result += hours + " hours, ";
  if (minutes > 0) result += minutes + " minutes, ";
  result += s + " seconds";
  return result;
}

// Парсер max строк ("3 M" -> 3000000)
function parseMaxString(str) {
  if (!str) return null;
  const units = {
    K: 1e3,
    M: 1e6,
    B: 1e9,
    T: 1e12,
    Qa: 1e15,
    Qi: 1e18,
    Sx: 1e21,
    Sp: 1e24,
    Oc: 1e27,
    No: 1e30,
    DDe: 1e33,
  };
  const parts = str.split(" ");
  let num = parseFloat(parts[0]);
  if (isNaN(num)) return null;
  if (parts.length > 1) {
    let unit = parts[1];
    if (units[unit]) num *= units[unit];
  }
  return num;
}

// Рассчёт времени получения 1 руны: time = 1 / (RPS * baseAmountScientific)
function calcRuneTime(rune, userRPS) {
  if (userRPS <= 0) return Infinity;
  if (!rune.baseAmountScientific || rune.baseAmountScientific <= 0) return Infinity;
  return 1 / (userRPS * rune.baseAmountScientific);
}

// Рассчёт времени до максимума буста (только для EXPONENTIAL бонусов)
function calcMaxBoostTime(bonus, runeTime) {
  if (!runeTime || !isFinite(runeTime)) return null;
  if (bonus.type !== "EXPONENTIAL") return null;
  let maxNum = parseMaxString(bonus.max);
  if (!maxNum) return null;
  return runeTime * maxNum;
}

function renderBonuses(bonuses, runeTime) {
  if (!bonuses || bonuses.length === 0) return "<div>Bonuses: -</div>";
  return `<div class="bonuses" aria-label="Bonuses">
    <strong>Bonuses:</strong><br>
    ${bonuses
      .map((b) => {
        const maxBoostTime = calcMaxBoostTime(b, runeTime);
        const timeStr = maxBoostTime !== null ? formatLongTime(maxBoostTime) : "-";
        return `<div class="bonus-item">
          <span class="bonus-multiplier">x${b.multiplier}</span>
          ${b.name}
          <span class="bonus-max">(Max: ${b.max})</span>
          <span class="bonus-type">${b.type}</span>
          <br>
          <small>Time to max boost: ${timeStr}</small>
        </div>`;
      })
      .join("")}
  </div>`;
}

function renderRuneCard(rune, userRPS) {
  const runeTime = calcRuneTime(rune, userRPS);
  const runeTimeStr = formatLongTime(runeTime);

  return `
    <article class="rune-card" tabindex="0" aria-label="${rune.name} rune card">
      <div class="rune-title">${rune.name}</div>
      <div class="rune-subtitle">${rune.subtitle || ""}</div>
      <div class="rune-large-num" aria-label="Base amount">
        1 / ${formatLargeNumber(rune.baseAmount, rune.baseUnit, rune.baseAmountScientific)}
      </div>
      <div class="time-info" aria-label="Time to get one rune">
        <strong>Time to get 1 rune:</strong> ${runeTimeStr}
      </div>
      ${renderBonuses(rune.bonuses, runeTime)}
    </article>
  `;
}

// Пример расчёта и форматирования общего рейтинга (сумма baseAmountScientific)
function calcCurrentRate() {
  let sum = runes.reduce((acc, r) => acc + r.baseAmountScientific, 0);
  return sum;
}
function formatCurrentRate(value) {
  if (!value || value === 0) return "0";
  const exp = Math.floor(Math.log10(value));
  const base = value / Math.pow(10, exp);
  return `${base.toFixed(2)}e${exp} Tg`;
}

function renderAll() {
  const filter = searchInput.value.trim().toLowerCase();
  const hideInstant = hideInstantCheckbox.checked;
  const sortBy = sortSelect.value;
  const userRPS = parseFloat(userRPSInput.value) || 0.01;

  let filtered = runes.filter((r) => r.name.toLowerCase().includes(filter));

  // TODO: Hide instant руны, если добавим поле instant

  switch (sortBy) {
    case "easiest":
      filtered.sort((a, b) => {
        const aTime = calcRuneTime(a, userRPS);
        const bTime = calcRuneTime(b, userRPS);
        return aTime - bTime;
      });
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "time":
      filtered.sort((a, b) => {
        const aTime = calcRuneTime(a, userRPS);
        const bTime = calcRuneTime(b, userRPS);
        return aTime - bTime;
      });
      break;
    case "rating":
      // Нет рейтинга, пропускаем
      break;
  }

  runesGrid.innerHTML = filtered.map((r) => renderRuneCard(r, userRPS)).join("");

  const currentRateVal = calcCurrentRate();
  topStats.textContent = `My Current Rate: ${formatCurrentRate(currentRateVal)} | Parsed Rate: ${userRPS.toFixed(4)} RPS`;
}

searchInput.addEventListener("input", renderAll);
hideInstantCheckbox.addEventListener("change", renderAll);
sortSelect.addEventListener("change", renderAll);
userRPSInput.addEventListener("input", () => {
  let val = parseFloat(userRPSInput.value);
  if (val < 0.0001 || isNaN(val)) userRPSInput.value = "0.0001";
  renderAll();
});

renderAll();
