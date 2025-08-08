// Анимация появления элементов при скролле
function revealOnScroll() {
    document.querySelectorAll(".fade-in, .rune-card").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
