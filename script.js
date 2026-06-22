const countdown = document.querySelector(".countdown");

function updateCountdown() {
  if (!countdown) return;

  const endTime = Number(countdown.dataset.end) * 1000;
  const remaining = Math.max(0, endTime - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const values = { days, hours, minutes, seconds: secs };

  Object.entries(values).forEach(([unit, value]) => {
    const target = countdown.querySelector(`[data-unit="${unit}"]`);
    if (target) target.textContent = String(value).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const panel = item.querySelector("div");
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector("div").style.maxHeight = "0";
    });

    if (!isOpen) {
      item.classList.add("open");
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
});

const menuButton = document.querySelector(".menu-toggle");
const mobilePanel = document.querySelector(".mobile-panel");

if (menuButton && mobilePanel) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobilePanel.hidden = expanded;
  });
}
