const searchInput = document.getElementById("searchInput");
const hideInstantCheckbox = document.getElementById("hideInstant");
const sortSelect = document.getElementById("sortSelect");
const runesGrid = document.getElementById("runesGrid");
const statsSection = document.getElementById("statsSection");
const userRPSInput = document.getElementById("userRPS");

function formatTime(seconds) {
  if (seconds === Infinity) return "∞";
  if (seconds === null || seconds === undefined) return "-";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

// Рассчитываем время до максимума бустов ТОЛЬКО для экспоненты
function calcMaxBoostTime(rune, userRPS) {
  if (userRPS <= 0) return Infinity;

  if (rune.boostType === "exponential") {
    return (rune.time * rune.maxBoostAmount) / userRPS;
  }

  return null;
}

function renderRunes() {
  const filterText = searchInput.value.toLowerCase();
  const hideInstant = hideInstantCheckbox.checked;
  const sortBy = sortSelect.value;
  const userRPS = parseFloat(userRPSInput.value) || 0.01;

  let filteredRunes = runes.filter(rune => {
    const matchName = rune.name.toLowerCase().includes(filterText);
    const matchInstant = hideInstant ? !rune.instant : true;
    return matchName && matchInstant;
  });

  filteredRunes.sort((a, b) => {
    switch (sortBy) {
      case "easiest":
        return a.time - b.time;
      case "name":
        return a.name.localeCompare(b.name);
      case "time":
        return a.time - b.time;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  runesGrid.innerHTML = "";

  if (filteredRunes.length === 0) {
    runesGrid.innerHTML = `<p>No runes found.</p>`;
    statsSection.textContent = "";
    return;
  }

  filteredRunes.forEach(rune => {
    const timeToGetOneRune = rune.time / userRPS;
    const maxBoostTime = calcMaxBoostTime(rune, userRPS);
    const maxBoostTimeStr = formatTime(maxBoostTime);

    const card = document.createElement("article");
    card.className = "rune-card";
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <div class="rune-icon" aria-hidden="true">${rune.icon}</div>
      <h3 class="rune-name">${rune.name}</h3>
      <div class="rune-info"><strong>Base time for 1 rune:</strong> ${formatTime(rune.time)}</div>
      <div class="rune-info"><strong>Chance:</strong> ${(rune.chance * 100).toFixed(1)}%</div>
      <div class="rune-info"><strong>Boost type:</strong> ${rune.boostType.charAt(0).toUpperCase() + rune.boostType.slice(1)}</div>
      <div class="rune-info"><strong>Boost value:</strong> ${rune.boost}</div>
      <div class="rune-info"><strong>Max boost amount:</strong> ${rune.maxBoostAmount.toLocaleString()}</div>
      <div class="rune-info"><strong>Time to get 1 rune at your RPS:</strong> ${formatTime(timeToGetOneRune)}</div>
      <div class="rune-info"><strong>Time to max boost at your RPS:</strong> ${maxBoostTimeStr}</div>
      <div class="rune-rating">Rating: ${rune.rating.toFixed(1)}</div>
    `;

    runesGrid.appendChild(card);
  });

  updateStats(filteredRunes, userRPS);
}

function updateStats(runesArray, userRPS) {
  const totalTime = runesArray.reduce((sum, r) => sum + r.time, 0);
  const avgRating =
    runesArray.reduce((sum, r) => sum + r.rating, 0) / runesArray.length;
  const rps = userRPS.toFixed(4);

  statsSection.innerHTML = `
    <strong>Current Stats:</strong><br/>
    Total Runes: ${runesArray.length} <br/>
    Total Base Time: ${formatTime(totalTime)} <br/>
    Average Rating: ${avgRating.toFixed(2)} <br/>
    Your RPS (Runes per second): ${rps}
  `;
}

searchInput.addEventListener("input", renderRunes);
hideInstantCheckbox.addEventListener("change", renderRunes);
sortSelect.addEventListener("change", renderRunes);
userRPSInput.addEventListener("input", () => {
  let val = parseFloat(userRPSInput.value);
  if (val < 0.0001 || isNaN(val)) userRPSInput.value = "0.0001";
  renderRunes();
});

// Инициализация
renderRunes();
