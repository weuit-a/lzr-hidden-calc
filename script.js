// ==== Данные о рунах ====
const runes = [
    {
        name: "Vanta",
        type: "Color Rune",
        needed: 700,          // сколько нужно
        chance: 7e95,         // шанс выпадения 1 из ...
        bonuses: [
            { mult: "x2", desc: "Rune Speed (Max: 3M)" },
            { mult: "x1", desc: "Rune Bulk (Max: 3)" },
            { mult: "x2", desc: "Tickets (Max: 1 DDe)" }
        ]
    },
    {
        name: "Frostbite",
        type: "Arctic Rune",
        needed: 30,
        chance: 3e103,
        bonuses: [
            { mult: "x1.01", desc: "Rune Speed (Max: 100k)" }
        ]
    }
];

// ==== Преобразование значений с суффиксами ====
const suffixes = {
    k: 1e3, m: 1e6, b: 1e9, t: 1e12,
    q: 1e15, Q: 1e18, s: 1e21, S: 1e24,
    o: 1e27, n: 1e30, d: 1e33,
    U: 1e36, D: 1e39, td: 1e42, Td: 1e45,
    qd: 1e48, Qd: 1e51, sd: 1e54, Sd: 1e57,
    O: 1e60, N: 1e63, v: 1e66, V: 1e69,
    tg: 1e72, Tg: 1e75
};

function parseNumber(str) {
    const match = str.match(/^([\d.]+)\s*([a-zA-Z]+)?$/);
    if (!match) return NaN;
    const num = parseFloat(match[1]);
    const suf = match[2];
    return suf && suffixes[suf] ? num * suffixes[suf] : num;
}

// ==== Формат времени ====
function formatTime(seconds) {
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    let m = seconds / 60;
    if (m < 60) return `${Math.round(m)} minutes`;
    let h = m / 60;
    if (h < 24) return `${Math.round(h)} hours`;
    let d = h / 24;
    if (d < 365) return `${Math.round(d)} days`;
    let y = d / 365;
    return `${Math.floor(y)} years, ${Math.floor(d % 365)} days`;
}

// ==== Рендер списка рун ====
function renderRunes(rps) {
    const container = document.getElementById("runeList");
    container.innerHTML = "";

    runes.forEach(rune => {
        const totalAttempts = rune.needed * rune.chance;
        const seconds = totalAttempts / rps;

        if (document.getElementById("hideInstant").checked && seconds < 1) return;

        const card = document.createElement("div");
        card.className = "rune-card fade-in";
        card.innerHTML = `
            <h2>${rune.name}</h2>
            <p class="type">${rune.type}</p>
            <p class="progress">1 / ${rune.needed}</p>
            <div class="bonuses">
                ${rune.bonuses.map(b => `<p><span>${b.mult}</span> ${b.desc}</p>`).join("")}
            </div>
            <div class="time">${formatTime(seconds)}</div>
        `;
        container.appendChild(card);
    });

    revealOnScroll();
}

// ==== Анимация появления ====
function revealOnScroll() {
    document.querySelectorAll(".fade-in, .rune-card").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
}

// ==== Обработчики ====
document.getElementById("rateInput").addEventListener("input", e => {
    const rps = parseNumber(e.target.value);
    document.getElementById("parsedRate").textContent =
        isNaN(rps) ? "Parsed Rate: invalid" : `Parsed Rate: ${rps.toExponential(2)} RPS`;
    if (!isNaN(rps)) renderRunes(rps);
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", () => {
    revealOnScroll();
    renderRunes(1); // начальное значение
});
