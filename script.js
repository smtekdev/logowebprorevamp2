gsap.registerPlugin(ScrollTrigger);
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const split = (el) => {
  const walk = (n) =>
    [...n.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (!t.trim()) return f.append(" ");
          const w = document.createElement("span");
          w.className = "w";
          w.innerHTML = '<span class="wi"></span>';
          w.firstChild.textContent = t;
          f.append(w);
        });
        c.replaceWith(f);
      } else if (c.nodeType === 1) walk(c);
    });
  walk(el);
};
$$("[data-split],[data-words]").forEach(split);
gsap.set("[data-split] .wi", { yPercent: 110 });
gsap.set("[data-words] .wi", { opacity: 0.15 });
gsap.set(".rule", { scaleX: 0 });

/* NAVBAR */
const menu = $(".menu");
$(".burger").onclick = () => menu.classList.toggle("open");
$$(".menu a").forEach((a) =>
  a.addEventListener("click", () => menu.classList.remove("open")),
);
let hidden = false;
ScrollTrigger.create({
  start: 0,
  end: "max",
  onUpdate: (s) => {
    const h = s.direction === 1 && s.scroll() > 300;
    if (h !== hidden) {
      hidden = h;
      gsap.to(".nav", { yPercent: h ? -160 : 0, duration: 0.5 });
    }
  },
});
gsap.to(".bar", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: { scrub: 0.3, start: 0, end: "max" },
});

/* HERO */
gsap
  .timeline({ defaults: { ease: "power4.out" } })
  .from(".nav__in", { y: -80, opacity: 0, duration: 1 })
  .to(".hl .wi", { yPercent: 0, duration: 1.1, stagger: 0.14 }, 0.2)
  .to(".rule", { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0.6)
  .from(
    ".rail a",
    { scale: 0, opacity: 0, stagger: 0.1, duration: 0.6, ease: "back.out(2)" },
    1,
  )
  .from(
    ".fl",
    {
      scale: 0.3,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: "back.out(1.6)",
    },
    1,
  )
  .from(
    ".lead, .pf, .hero__stats",
    { y: 30, opacity: 0, stagger: 0.15, duration: 0.9 },
    1.1,
  );

const stage = $(".stage");
gsap.from(".lap", {
  scale: 0.8,
  opacity: 0,
  duration: 1.3,
  delay: 0.9,
  ease: "power3.out",
});
$(".hero").addEventListener("mousemove", (e) => {
  const x = e.clientX / innerWidth - 0.5,
    y = e.clientY / innerHeight - 0.5;
  gsap.to(stage, { x: x * 26, y: y * 26, duration: 1.4, overwrite: "auto" });
});

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=120%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  })
  .to("[data-words] .wi", { opacity: 1, stagger: 0.2, ease: "none" }, 0)
  .to(
    ".grad .wi",
    { backgroundPosition: "100% 0", ease: "none", duration: 3 },
    0,
  )
  .to(".hero__bg", { scale: 1.15, ease: "none", duration: 3 }, 0);

/* SECTION HEADINGS */
$$("[data-split]").forEach((el) => {
  if (el.closest(".hero")) return;
  gsap.to($$(".wi", el), {
    yPercent: 0,
    duration: 1,
    stagger: 0.04,
    ease: "power4.out",
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
  });
});

/* ABOUT */
$$(".ab__media figure").forEach((f, i) => {
  gsap.fromTo(
    f,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.3,
      ease: "power4.inOut",
      delay: i * 0.2,
      clearProps: "clipPath",
      scrollTrigger: { trigger: ".ab__media", start: "top 75%" },
    },
  );
  gsap.fromTo(
    $("img", f),
    { scale: 1.18, yPercent: -5 },
    {
      scale: 1.18,
      yPercent: 5,
      ease: "none",
      scrollTrigger: { trigger: f, scrub: true },
    },
  );
});
gsap.from(".ab__frame, .ab__dots", {
  opacity: 0,
  scale: 0.9,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ab__media", start: "top 75%" },
});
gsap.from(".ab__stat, .ab__badge", {
  y: 50,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ab__media", start: "top 65%" },
});
gsap.from(".ab__txt > :not(h2)", {
  y: 30,
  opacity: 0,
  stagger: 0.12,
  duration: 0.9,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ab__txt", start: "top 70%" },
});

const mvT = $$(".ab__tabs button"),
  mvC = $$(".ab__c");
let mv = 0;
mvT.forEach(
  (b, i) =>
    (b.onclick = () => {
      if (i === mv) return;
      const p = mvC[mv],
        x = mvC[i];
      mvT.forEach((t, j) => t.classList.toggle("on", j === i));
      gsap.to(p, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        onComplete: () => {
          p.classList.remove("on");
          gsap.set(p, { clearProps: "all" });
          x.classList.add("on");
          gsap.fromTo(
            $$(".wi", x),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, stagger: 0.012, ease: "power3.out" },
          );
        },
      });
      mv = i;
    }),
);

$$("[data-to]").forEach((el) => {
  const o = { v: 0 };
  gsap.to(o, {
    v: +el.dataset.to,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString()),
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
  });
});
gsap.from(".ab__nums > div", {
  y: 40,
  opacity: 0,
  stagger: 0.15,
  duration: 0.9,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ab__nums", start: "top 88%" },
});

/* PORTFOLIO */
(() => {
  const root = $(".pfo"),
    tr = $(".pf__track"),
    vp = $(".pf__vp"),
    cards = $$(".pc", tr),
    dotsBox = $(".pf__dots"),
    count = $(".pf__count");
  let page = 0,
    pv = 3,
    gap = 24,
    pages = 1;

  const idx = (p) => Math.min(p * pv, cards.length - pv);
  const posX = (p) => -idx(p) * (cards[0].offsetWidth + gap);
  const pad = (n) => String(n).padStart(2, "0");

  function paint() {
    $$("button", dotsBox).forEach((d, i) =>
      d.classList.toggle("on", i === page),
    );
    count.innerHTML = "<b>" + pad(page + 1) + "</b> / " + pad(pages);
  }
  function go(p, instant) {
    page = (p + pages) % pages;
    gsap.to(tr, {
      x: posX(page),
      duration: instant ? 0 : 0.9,
      ease: "power3.out",
      overwrite: true,
    });
    paint();
  }
  function layout() {
    pv = parseInt(getComputedStyle(root).getPropertyValue("--pv")) || 3;
    gap = parseFloat(getComputedStyle(tr).columnGap) || 24;
    pages = Math.ceil(cards.length / pv);
    cards.forEach((c, i) => (c.dataset.p = i % pv));
    dotsBox.innerHTML = "";
    for (let i = 0; i < pages; i++) {
      const d = document.createElement("button");
      d.setAttribute("aria-label", "Page " + (i + 1));
      d.onclick = () => go(i);
      dotsBox.append(d);
    }
    page = Math.min(page, pages - 1);
    go(page, true);
  }
  $$(".pc__img").forEach((im) => {
    const miss = () => im.closest(".pc").classList.add("nofile");
    im.addEventListener("error", miss);
    if (im.complete && !im.naturalWidth) miss();
  });

  layout();
  let rt;
  addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(layout, 150);
  });

  $(".pf__next").onclick = () => go(page + 1);
  $(".pf__prev").onclick = () => go(page - 1);

  let sx = 0,
    base = 0,
    dx = 0,
    down = false,
    moved = false;
  tr.addEventListener("pointerdown", (e) => {
    down = true;
    moved = false;
    sx = e.clientX;
    base = gsap.getProperty(tr, "x");
  });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    dx = e.clientX - sx;
    if (Math.abs(dx) > 6) {
      moved = true;
      tr.classList.add("drag");
    }
    if (moved) gsap.set(tr, { x: base + dx });
  });
  addEventListener("pointerup", () => {
    if (!down) return;
    down = false;
    tr.classList.remove("drag");
    if (moved) go(dx < -60 ? page + 1 : dx > 60 ? page - 1 : page);
  });
  tr.addEventListener("dragstart", (e) => e.preventDefault());

  cards.forEach((c) =>
    c.addEventListener("click", () => {
      if (moved) return;
      const was = c.classList.contains("on");
      cards.forEach((o) => o.classList.remove("on"));
      if (!was && matchMedia("(hover: none)").matches) c.classList.add("on");
    }),
  );

  gsap.from(cards, {
    y: 70,
    opacity: 0,
    duration: 1,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: { trigger: vp, start: "top 85%", once: true },
  });
  gsap.from(".pf__ctl, .pf__cta, .pf__dots", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: ".pf__top", start: "top 80%", once: true },
  });
})();

$$("[data-form]").forEach((f) =>
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const b = $("button", f),
      t = b.textContent;
    b.textContent = "Sent";
    f.reset();
    setTimeout(() => (b.textContent = t), 2500);
  }),
);

/* PRICING */
(() => {
  const tabs = $$(".pr__tabs button");
  const panels = $$(".pr__panel");
  tabs.forEach((btn) =>
    btn.addEventListener("click", () => {
      const key = btn.dataset.tab;
      tabs.forEach((t) => t.classList.toggle("on", t === btn));
      panels.forEach((p) => {
        const isTarget = p.dataset.panel === key;
        if (isTarget) {
          p.classList.add("on");
          gsap.fromTo(
            $$(".plan", p),
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            },
          );
        } else {
          p.classList.remove("on");
        }
      });
    }),
  );
})();

gsap.from(".pr__tabs", {
  y: 30,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out",
  scrollTrigger: { trigger: ".pricing", start: "top 80%", once: true },
});
gsap.from(".pr__panel.on .plan", {
  y: 60,
  opacity: 0,
  duration: 0.9,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".pr__grid", start: "top 80%", once: true },
});

/* PROCESS */
gsap.from(".prc__card", {
  y: 50,
  opacity: 0,
  duration: 0.85,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".prc__grid", start: "top 82%", once: true },
});

/* TESTIMONIALS */
(() => {
  const slider = $(".tst__slider");
  if (!slider) return;
  const track = $(".tst__track");
  const slides = $$(".tst__slide", track);
  const dotsBox = $(".tst__dots");
  const prevBtn = $(".tst__prev");
  const nextBtn = $(".tst__next");

  let page = 0;
  let perView = 2;
  let gap = 24;
  let pages = 1;

  const pad = (n) => String(n).padStart(2, "0");
  const maxIndex = () => Math.max(0, slides.length - perView);
  const posX = (p) =>
    -Math.min(p * perView, maxIndex()) * (slides[0].offsetWidth + gap);

  function paint() {
    $$("button", dotsBox).forEach((d, i) =>
      d.classList.toggle("on", i === page),
    );
  }

  function go(p, instant) {
    page = (p + pages) % pages;
    gsap.to(track, {
      x: posX(page),
      duration: instant ? 0 : 0.9,
      ease: "power3.out",
      overwrite: true,
    });
    paint();
  }

  function layout() {
    perView = window.matchMedia("(max-width: 900px)").matches ? 1 : 2;
    gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    pages = Math.max(1, Math.ceil(slides.length / perView));
    dotsBox.innerHTML = "";
    for (let i = 0; i < pages; i++) {
      const d = document.createElement("button");
      d.setAttribute("aria-label", "Slide " + (i + 1));
      d.onclick = () => go(i);
      dotsBox.append(d);
    }
    page = Math.min(page, pages - 1);
    go(page, true);
  }

  layout();
  let rt;
  addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(layout, 150);
  });

  nextBtn.onclick = () => go(page + 1);
  prevBtn.onclick = () => go(page - 1);

  let sx = 0,
    base = 0,
    dx = 0,
    down = false,
    moved = false;
  track.addEventListener("pointerdown", (e) => {
    down = true;
    moved = false;
    sx = e.clientX;
    base = gsap.getProperty(track, "x");
  });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    dx = e.clientX - sx;
    if (Math.abs(dx) > 6) {
      moved = true;
      track.classList.add("drag");
    }
    if (moved) gsap.set(track, { x: base + dx });
  });
  addEventListener("pointerup", () => {
    if (!down) return;
    down = false;
    track.classList.remove("drag");
    if (moved) go(dx < -60 ? page + 1 : dx > 60 ? page - 1 : page);
  });
  track.addEventListener("dragstart", (e) => e.preventDefault());

  gsap.from(slides, {
    y: 60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: { trigger: slider, start: "top 80%", once: true },
  });
  gsap.from(".tst__nav", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: { trigger: slider, start: "top 80%", once: true },
  });
})();

/* CONTACT */
gsap.from(".ct__info > *", {
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ct__g", start: "top 78%", once: true },
});
gsap.from(".ct__panel", {
  x: 60,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ct__g", start: "top 78%", once: true },
});

/* NEWSLETTER */
gsap.from(".nw__left > *", {
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".nw__box", start: "top 82%", once: true },
});
gsap.from(".nw__form", {
  y: 30,
  opacity: 0,
  duration: 0.9,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".nw__box", start: "top 82%", once: true },
});

/* FOOTER */
gsap.from(".foot__g > *", {
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".foot", start: "top 88%", once: true },
});
gsap.from(".foot__btm", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 0.3,
  ease: "power3.out",
  scrollTrigger: { trigger: ".foot", start: "top 88%", once: true },
});

/* MARQUEE */
const mq = $(".mq__track");
if (mq) {
  mq.addEventListener(
    "mouseenter",
    () => (mq.style.animationPlayState = "paused"),
  );
  mq.addEventListener(
    "mouseleave",
    () => (mq.style.animationPlayState = "running"),
  );
}

window.addEventListener("load", () => ScrollTrigger.refresh());
