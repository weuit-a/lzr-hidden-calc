// === Суффиксы и их степени для парсинга RPS ===
const suffixes = {
  "Mc": 3000003,
  "Na": 3000000003,
  "Pi": 3000000000003,
  "Fm": 3000000000000003,
  "At": 3000000000000000003,
  "Zp": 3000000000000000000003,
  "Yc": 3000000000000000000000003,
  "Xo": 3000000000000000000000000003,

  "Tr": 903,
  "Qa": 1203,
  "Qi": 1503,
  "Se": 1803,
  "Si": 2103,
  "Ot": 2403,
  "Ni": 2703,
  "Mi": 3003,

  "Du": 603,
  "Ng": 573,
  "Og": 543,
  "Sg": 513,
  "Nosg": 510,
  "Ocsg": 507,
  "Spsg": 504,
  "Sxsg": 501,
  "Qnsg": 498,
  "Qdsg": 495,
  "Tsg": 492,
  "Dsg": 489,
  "Usg": 486,

  "Tg": 93,
  "NoTg": 120,
  "OcTg": 117,
  "SpTg": 114,
  "SxTg": 111,
  "QnTg": 108,
  "QdTg": 105,
  "TTg": 102,
  "DTg": 99,
  "UTg": 96,

  "TDe": 42,
  "DDe": 39,
  "UDe": 36,

  "K": 3,
  "M": 6,
  "B": 9,
  "T": 12,
  "Qa": 15,
  "Qi": 18,
  "Sx": 21,
  "Sp": 24,
  "Oc": 27,
  "No": 30,
  "Ce": 303,
};

// Сортируем ключи по длине, чтобы сначала проверять более длинные
const suffixKeysSorted = Object.keys(suffixes).sort((a,b)=>b.length - a.length);

// Парсим RPS строку, поддерживая числовые суффиксы (1e5, 100Tg и т.д.)
function parseRPS(input) {
  input = input.trim();
  if (!input) return NaN;

  // Если напрямую число (в т.ч. научная нотация)
  const directNum = Number(input);
  if (!isNaN(directNum)) return directNum;

  // Формат: число + суффикс
  const regex = /^([\d.]+)\s*([a-zA-Z]+)$/;
  const m = input.match(regex);
  if (!m) return NaN;

  const num = parseFloat(m[1]);
  if (isNaN(num)) return NaN;

  const suffix = m[2];

  for (const key of suffixKeysSorted) {
    if (suffix.startsWith(key)) {
      return num * Math.pow(10, suffixes[key]);
    }
  }

  return NaN;
}

// Форматируем число в научную нотацию с двумя знаками после запятой
function formatScientific(num) {
  if (!isFinite(num)) return "∞";
  if (num === 0) return "0";

  const exp = Math.floor(Math.log10(num));
  const mant = num / Math.pow(10, exp);
  const mantStr = mant.toFixed(2).replace(/\.?0+$/, "");
  return `${mantStr}e${exp}`;
}

// Форматируем секунды в удобочитаемый вид (год, дни, часы и т.д.)
function formatTime(seconds) {
  if (!isFinite(seconds)) return "∞";
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  let remaining = seconds;
  const parts = [];

  for (const u of units) {
    const val = Math.floor(remaining / u.seconds);
    if (val > 0) {
      parts.push(`${val} ${u.label}${val > 1 ? "s" : ""}`);
      remaining -= val * u.seconds;
    }
    if (parts.length >= 3) break;
  }

  if (parts.length === 0) return "0 seconds";
  return parts.join(", ");
}

// Рассчёт базового времени руны: baseAmount / RPS
function calcBaseTime(rune, rps) {
  if (rps <= 0) return Infinity;
  return rune.baseAmountScientific / rps;
}

// --- DOM ---
const rpsInput = document.getElementById("userRPSInput");
const currentRateParsed = document.getElementById("currentRateParsed");
const searchInput = document.getElementById("searchInput");
const hideInstantCheckbox = document.getElementById("hideInstantCheckbox");
const sortSelect = document.getElementById("sortSelect");
const runesGrid = document.getElementById("runesGrid");
const themeToggle = document.getElementById("themeToggle");

let currentRPS = parseRPS(rpsInput.value);

// Отрисовка рун
function renderRunes() {
  let filtered = runes.slice();

  // Фильтр по названию
  const filterText = searchInput.value.toLowerCase();
  if (filterText) {
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(filterText)
    );
  }

  // Фильтр скрытия мгновенных (по префиксу INSTANT)
  if (hideInstantCheckbox.checked) {
    filtered = filtered.filter(r => !(r.prefix && r.prefix.toUpperCase() === "INSTANT"));
  }

  // Сортировка
  switch (sortSelect.value) {
    case "easiest":
      // сортируем по времени базовому (по возрастанию)
      filtered.sort((a,b) => calcBaseTime(a, currentRPS) - calcBaseTime(b, currentRPS));
      break;
    case "name":
      filtered.sort((a,b) => a.name.localeCompare(b.name));
      break;
    case "time":
      filtered.sort((a,b) => calcBaseTime(a, currentRPS) - calcBaseTime(b, currentRPS));
      break;
    case "rating":
      filtered.sort((a,b) => b.rating - a.rating);
      break;
  }

  runesGrid.innerHTML = "";

  for (const rune of filtered) {
    const card = document.createElement("article");
    card.className = "rune-card";
    card.tabIndex = 0;

    // Заголовок с префиксом
    const header = document.createElement("div");
    header.className = "rune-header";

    const title = document.createElement("h2");
    title.className = "rune-title";
    title.textContent = rune.name;
    header.appendChild(title);

    if (rune.prefix) {
      const prefixSpan = document.createElement("span");
      prefixSpan.className = "rune-prefix";
      prefixSpan.textContent = rune.prefix;
      header.appendChild(prefixSpan);
    }

    card.appendChild(header);

    // Подзаголовок
    if (rune.subtitle) {
      const subtitle = document.createElement("div");
      subtitle.className = "rune-subtitle";
      subtitle.textContent = rune.subtitle;
      card.appendChild(subtitle);
    }

    // Базовое число (шанс/кол-во)
    const baseNum = document.createElement("div");
    baseNum.className = "rune-large-num";
    baseNum.textContent = "Base Amount: " + formatScientific(rune.baseAmountScientific);
    card.appendChild(baseNum);

    // Время до получения (baseAmount / RPS)
    const baseTimeSec = calcBaseTime(rune, currentRPS);
    const timeInfo = document.createElement("div");
    timeInfo.className = "time-info";
    timeInfo.textContent = "Base Time: " + formatTime(baseTimeSec);
    card.appendChild(timeInfo);

    // Бонусы (boosts)
    if (rune.boosts && rune.boosts.length) {
      const boostsDiv = document.createElement("div");
      boostsDiv.className = "boosts";

      for (const boost of rune.boosts) {
        const boostItem = document.createElement("div");
        boostItem.className = "boost-item";

        const boostText = document.createElement("span");
        boostText.textContent = boost.text;
        boostItem.appendChild(boostText);

        if (boost.maxBoost !== null && boost.maxBoost !== undefined) {
          const boostMax = document.createElement("span");
          boostMax.className = "boost-max";
          boostMax.textContent = ` (Max: ${formatScientific(boost.maxBoost)})`;
          boostItem.appendChild(boostMax);
        }

        boostsDiv.appendChild(boostItem);
      }

      card.appendChild(boostsDiv);
    }

    runesGrid.appendChild(card);
  }
}

// Обновление текста над input
function updateRPSDisplay() {
  const inputVal = rpsInput.value.trim();
  const parsed = parseRPS(inputVal);
  currentRPS = parsed;

  if (isNaN(parsed)) {
    currentRateParsed.textContent = `Invalid RPS input`;
  } else {
    currentRateParsed.textContent = `My Current Rate: ${inputVal} | Parsed Rate: ${formatScientific(parsed)}`;
  }
}

// События
rpsInput.addEventListener("input", () => {
  updateRPSDisplay();
  renderRunes();
});
searchInput.addEventListener("input", renderRunes);
hideInstantCheckbox.addEventListener("change", renderRunes);
sortSelect.addEventListener("change", renderRunes);

// Тема
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    themeToggle.textContent = "Dark Theme";
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    themeToggle.textContent = "Light Theme";
  }
}

themeToggle.addEventListener("click", toggleTheme);

// Инициализация
updateRPSDisplay();
renderRunes();
