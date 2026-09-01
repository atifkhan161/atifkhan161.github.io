/**
 * Portfolio runtime.
 * Renders content from data/profile.js and wires up interactions.
 * Vanilla JS, no dependencies. Classic script (not an ES module) so the
 * page also works when opened directly from the filesystem.
 */
(() => {
  "use strict";

  /* ---------- constants ---------- */
  const NAV_SCROLL_THRESHOLD = 24; // px scrolled before nav gains its frosted background
  const TYPE_SPEED_MS = 65;        // typing speed
  const TYPE_DELETE_MS = 32;       // deleting speed
  const TYPE_HOLD_MS = 2100;       // pause on a completed word
  const TYPE_NEXT_MS = 350;        // pause before the next word

  /* ---------- tiny helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Whole years of experience since the career start date.
   * Counts a year once its anniversary (same month/day) has passed,
   * so "13" flips to "14" on each April 1st — never stale.
   */
  function yearsOfExperience(startIso) {
    const start = new Date(startIso);
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    const beforeAnniversary =
      now.getMonth() < start.getMonth() ||
      (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
    if (beforeAnniversary) years -= 1;
    return Math.max(1, years);
  }

  /* ---------- renderers (content comes from PROFILE) ---------- */

  /** Hero + code-card years, footer copyright year. */
  function renderDynamicNumbers(years) {
    const slots = [
      ["#expYears", String(years)],
      ["#expYearsAbout", String(years)],
      ["#codeYears", String(years)],
      ["#currentYear", String(new Date().getFullYear())],
    ];
    slots.forEach(([sel, value]) => {
      const el = $(sel);
      if (el) el.textContent = value;
    });
  }

  /** About-section stat cards. */
  function renderStats(years) {
    const grid = $("#statsGrid");
    if (!grid) return;
    PROFILE.stats.forEach((stat, i) => {
      const value = stat.dynamic === "years" ? `${years}+` : stat.value;
      const card = document.createElement("div");
      card.className = "stat reveal";
      card.dataset.d = String(Math.min(i + 1, 4));
      card.innerHTML = `<div class="num">${value}</div><div class="lbl">${stat.label}</div>`;
      grid.appendChild(card);
    });
  }

  /** Skills bento grid. */
  function renderSkills() {
    const grid = $("#bentoGrid");
    if (!grid) return;
    PROFILE.skillGroups.forEach((group, i) => {
      const tile = document.createElement("div");
      tile.className = `tile${group.span === 2 ? " t-2" : ""} reveal`;
      tile.dataset.d = String(Math.min(i, 4));
      const chips = [
        ...(group.featured || []).map((c) => `<li class="chip hl">${c}</li>`),
        ...(group.chips || []).map((c) => `<li class="chip">${c}</li>`),
      ].join("");
      tile.innerHTML = `
        <h3><span class="ico" aria-hidden="true">${group.icon}</span> ${group.title}</h3>
        ${chips ? `<ul>${chips}</ul>` : ""}
        ${group.note ? `<p class="mini">${group.note}</p>` : ""}`;
      grid.appendChild(tile);
    });
  }

  /** Experience timeline (newest first, as stored in PROFILE.experience). */
  function renderTimeline() {
    const root = $("#timeline");
    if (!root) return;
    PROFILE.experience.forEach((job) => {
      const item = document.createElement("article");
      item.className = "t-item reveal";
      const company = job.url
        ? `<a href="${job.url}" target="_blank" rel="noopener">${job.company} ↗</a>`
        : job.company;
      item.innerHTML = `
        <div class="t-card">
          <div class="t-top">
            <h3>${job.role} — ${company}</h3>
            <span class="t-when">${job.period}</span>
          </div>
          <p class="t-loc">📍 ${job.location}</p>
          <ul>${job.points.map((p) => `<li>${p}</li>`).join("")}</ul>
        </div>`;
      root.appendChild(item);
    });
  }

  /** Tech marquee — rendered twice for the seamless CSS loop. */
  function renderMarquee() {
    const track = $("#marqueeTrack");
    if (!track) return;
    const items = PROFILE.marqueeTech.map((t) => `<span>${t}</span>`).join("");
    track.innerHTML = items + items;
  }


  /* ---------- interactions ---------- */

  /** Hero typewriter. Static first role under reduced motion; pauses when tab hidden. */
  function initTypewriter() {
    const el = $("#typed");
    const roles = PROFILE.typewriterRoles || [];
    if (!el || roles.length === 0) return;
    if (prefersReducedMotion()) {
      el.textContent = roles[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    function tick() {
      const word = roles[roleIndex];
      el.textContent = word.slice(0, charIndex);
      let delay = TYPE_SPEED_MS;
      if (!deleting && charIndex < word.length) {
        charIndex += 1;
      } else if (!deleting) {
        deleting = true;
        delay = TYPE_HOLD_MS;
      } else if (charIndex > 0) {
        charIndex -= 1;
        delay = TYPE_DELETE_MS;
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = TYPE_NEXT_MS;
      }
      timer = window.setTimeout(tick, delay);
    }

    // Don't burn cycles (or annoy readers) while the tab is in the background.
    document.addEventListener("visibilitychange", () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(tick, 0);
    });

    tick();
  }

  /** Frosted nav once the page is scrolled. */
  function initNav() {
    const nav = $("#nav");
    if (!nav) return;
    const update = () =>
      nav.classList.toggle("scrolled", window.scrollY > NAV_SCROLL_THRESHOLD);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /** Mobile menu: aria-expanded state, close on link click or Escape, focus returned. */
  function initMobileMenu() {
    const burger = $("#burger");
    const menu = $("#mobileMenu");
    if (!burger || !menu) return;

    burger.setAttribute("aria-controls", menu.id);
    burger.setAttribute("aria-expanded", "false");

    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    };

    burger.addEventListener("click", () =>
      setOpen(!menu.classList.contains("open"))
    );
    $$("a", menu).forEach((link) =>
      link.addEventListener("click", () => setOpen(false))
    );
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("open")) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  /** Scroll-reveal. Elements appear instantly under reduced motion. */
  function initReveal() {
    const targets = $$(".reveal");
    if (prefersReducedMotion()) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when intersecting — or when the element was scrolled past
          // entirely (fast jump / End key) so nothing is left invisible.
          const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          if (entry.isIntersecting || scrolledPast) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  /** Cursor-tracking glow inside bento tiles (pointer devices only). */
  function initTileGlow() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    $$(".tile").forEach((tile) => {
      tile.addEventListener("mousemove", (ev) => {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        tile.style.setProperty("--my", `${ev.clientY - r.top}px`);
      });
    });
  }

  /* ---------- boot ---------- */
  function init() {
    if (typeof PROFILE === "undefined") {
      console.error("profile.js failed to load — page content not rendered.");
      return;
    }
    const years = yearsOfExperience(PROFILE.careerStart);

    renderMarquee();
    renderDynamicNumbers(years);
    renderStats(years);
    renderSkills();
    renderTimeline();

    initTypewriter();
    initNav();
    initMobileMenu();
    initReveal();
    initTileGlow();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
