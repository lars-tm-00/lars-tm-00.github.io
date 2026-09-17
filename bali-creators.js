// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-mobile a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
