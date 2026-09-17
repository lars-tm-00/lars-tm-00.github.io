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

// Dispatch board — signature animation, mirrors the Routing Path section
const dispatchLines = [
  { t: "14:02:08", label: "LEAD RECEIVED", d: "Instagram DM" },
  { t: "14:02:11", label: "ROUTED → CRM", d: "tagged · deduplicated" },
  { t: "14:02:14", label: "AI REPLY SENT", d: "qualifying questions" },
  { t: "14:04:52", label: "SLOT BOOKED ✓", d: "Tue 14:00 confirmed" },
];

const board = document.getElementById("dispatchBoard");

function playDispatchBoard() {
  board.innerHTML = "";
  dispatchLines.forEach((line, i) => {
    const row = document.createElement("div");
    row.className = "board-line";
    row.style.animationDelay = `${i * 0.9}s`;
    row.innerHTML = `<span class="t">${line.t}</span><span>${line.label}</span><span class="d">${line.d}</span>`;
    board.appendChild(row);
  });
  const cursorDelay = dispatchLines.length * 0.9;
  const cursorRow = document.createElement("div");
  cursorRow.className = "board-line";
  cursorRow.style.animationDelay = `${cursorDelay}s`;
  cursorRow.innerHTML = `<span class="board-cursor"></span>`;
  board.appendChild(cursorRow);
}

if (board) {
  playDispatchBoard();
  const totalDuration = (dispatchLines.length * 0.9 + 3.5) * 1000;
  setInterval(playDispatchBoard, totalDuration);
}

// Manifest rows — ticker-in reveal on scroll
const manifestRows = document.querySelectorAll(".manifest-row");
if (manifestRows.length) {
  const manifestObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          manifestRows.forEach((row, i) => {
            row.style.transitionDelay = `${i * 110}ms`;
            row.classList.add("reveal");
          });
          obs.disconnect();
        }
      });
    },
    { threshold: 0.2 },
  );
  manifestObserver.observe(document.querySelector(".manifest"));
}

// Routing path — packet travels the line once, on scroll
const routingPath = document.getElementById("routingPath");
if (routingPath) {
  const pathObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          routingPath.classList.add("animate");
          obs.disconnect();
        }
      });
    },
    { threshold: 0.4 },
  );
  pathObserver.observe(routingPath);
}

// Pillar detail modals
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const steps = overlay.querySelectorAll(".modal-flow-step");
  steps.forEach((step, i) => {
    step.classList.remove("reveal");
    void step.offsetWidth;
    step.style.animationDelay = `${i * 130}ms`;
    step.classList.add("reveal");
  });
}

function closeModal(overlay) {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  overlay.querySelectorAll(".modal-flow-step").forEach((step) => {
    step.classList.remove("reveal");
  });
}

document.querySelectorAll("[data-modal]").forEach((trigger) => {
  trigger.addEventListener("click", () => openModal(trigger.dataset.modal));
});

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest("[data-close]")) {
      closeModal(overlay);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach(closeModal);
  }
});
