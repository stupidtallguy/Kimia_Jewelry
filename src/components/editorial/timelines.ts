import gsap from "gsap";

import { animateRunway, pinChapter } from "./runway-motion";

const clipOpen = "inset(0% 0% 0% 0%)";

function animateHero(root: HTMLElement) {
  const chapter = root.querySelector<HTMLElement>(".hero-chapter")!;
  const stage = chapter.querySelector<HTMLElement>(".editorial-hero")!;
  const main = stage.querySelector<HTMLElement>(".hero-shot-main")!;
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: pinChapter("kimia-hero", chapter, stage, () => chapter.offsetHeight - stage.offsetHeight),
  });

  timeline
    .to(stage.querySelector(".hero-shot-wave"), { xPercent: 143, yPercent: 82, scale: 0.73, duration: 0.53 }, 0)
    .to(stage.querySelector(".hero-shot-ribbon"), { xPercent: -105, yPercent: 35, rotate: -7, autoAlpha: 0, duration: 0.54 }, 0.1)
    .to(stage.querySelector(".hero-orbit"), { xPercent: 20, yPercent: 12, opacity: 0, duration: 0.65 }, 0)
    .to(stage.querySelector(".hero-copy h1 span"), { xPercent: 38, yPercent: -24, autoAlpha: 0, duration: 0.42 }, 0.06)
    .to(stage.querySelector(".hero-copy h1 em"), { xPercent: -22, yPercent: 34, autoAlpha: 0, duration: 0.43 }, 0.17)
    .to(stage.querySelectorAll(".hero-copy > :not(h1), .editorial-scroll, .hero-spark, .hero-photo-label"), { y: 25, autoAlpha: 0, duration: 0.44 }, 0.12)
    .to(main, {
      x: () => stage.clientWidth / 2 - main.offsetLeft - main.offsetWidth / 2,
      y: () => stage.clientHeight / 2 - main.offsetTop - main.offsetHeight / 2,
      scale: () => Math.max(stage.clientWidth / main.offsetWidth, stage.clientHeight / main.offsetHeight) * 1.045,
      duration: 0.83,
    }, 0.05)
    .to(stage.querySelector(".hero-curtain"), { yPercent: -100, duration: 0.25 }, 0.75);
}

function animateProductStory(root: HTMLElement) {
  const chapter = root.querySelector<HTMLElement>(".showcase")!;
  const stage = chapter.querySelector<HTMLElement>(".showcase-stage")!;
  const panels = [...stage.querySelectorAll<HTMLElement>(".showcase-panel")];
  const tones = [...stage.querySelectorAll<HTMLElement>(".showcase-wash > span")];
  const buttons = [...stage.querySelectorAll<HTMLButtonElement>("[data-story-jump]")];
  const progress = stage.querySelector(".showcase-line > span");
  const steps = [
    { scale: 0.58, x: -16, y: 12, mask: "inset(12% 17% 12% 17%)" },
    { scale: 0.86, x: 29, y: -4, mask: "inset(0% 44% 0% 0%)" },
    { scale: 1.24, x: -11, y: -16, mask: "inset(22% 0% 13% 0%)" },
    { scale: 0.93, x: 16, y: 20, mask: "inset(0% 0% 27% 22%)" },
  ];

  let current = -1;
  function activate(index: number) {
    if (current === index) return;
    const focusedPanel = panels[current];
    if (focusedPanel?.contains(document.activeElement)) buttons[index]?.focus({ preventScroll: true });

    current = index;
    for (const [i, panel] of panels.entries()) {
      const selected = i === index;
      panel.inert = !selected;
      panel.setAttribute("aria-hidden", String(!selected));
      if (selected) buttons[i].setAttribute("aria-current", "step");
      else buttons[i].removeAttribute("aria-current");
    }
    stage.dataset.scene = String(index);
  }

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: pinChapter("kimia-story", chapter, stage, () => chapter.offsetHeight - stage.offsetHeight),
  });

  for (const [i, panel] of panels.entries()) {
    const image = panel.querySelector(".showcase-image");
    const copy = panel.querySelector(".showcase-copy");
    const detail = panel.querySelector(".showcase-details");
    const description = panel.querySelector(".showcase-description");
    const frame = panel.querySelector(".showcase-frame");
    const step = steps[i];

    gsap.set(image, { xPercent: step.x, yPercent: step.y, scale: step.scale, clipPath: step.mask, opacity: i === 0 ? 1 : 0 });
    gsap.set(copy, { opacity: 0, y: 24 });
    gsap.set(description, { opacity: 0, y: 16 });
    gsap.set(detail, { opacity: 0, y: 13 });
    gsap.set(frame, { opacity: i === 0 ? 0.52 : 0 });
    gsap.set(tones[i], { opacity: i === 0 ? 1 : 0 });

    const entrance = Math.max(0, i - 0.16);
    timeline
      .to(tones[i], { opacity: 1, duration: 0.37 }, entrance)
      .to(frame, { opacity: 0.52, duration: 0.33 }, entrance)
      .to(image, { opacity: 1, xPercent: 0, yPercent: 0, scale: 1, clipPath: clipOpen, duration: i === 0 ? 0.57 : 0.58, ease: "power2.out" }, entrance)
      .to(copy, { opacity: 1, y: 0, duration: 0.22 }, i + 0.11)
      .to(description, { opacity: 1, y: 0, duration: 0.24 }, i + 0.23)
      .to(detail, { opacity: 1, y: 0, duration: 0.22 }, i + 0.37)
      .fromTo(panel.querySelector("img"), { scale: 1 }, { scale: i === 2 ? 1.19 : 1.11, duration: 0.86 }, i + 0.1);

    if (i < panels.length - 1) {
      timeline
        .to(copy, { opacity: 0, y: -19, duration: 0.21 }, i + 0.79)
        .to(frame, { opacity: 0, duration: 0.34 }, i + 0.81)
        .to(image, { opacity: 0, xPercent: i % 2 === 0 ? -22 : 22, scale: 1.055, clipPath: i % 2 === 0 ? "inset(0% 24% 0% 0%)" : "inset(0% 0% 0% 24%)", duration: 0.36 }, i + 0.79);
    }
  }

  timeline.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: panels.length }, 0);
  timeline.eventCallback("onUpdate", () => activate(Math.min(panels.length - 1, Math.floor(timeline.time()))));
  activate(0);

  const onJump = (event: MouseEvent) => {
    const trigger = timeline.scrollTrigger;
    const index = Number((event.currentTarget as HTMLElement).dataset.storyJump);
    if (!trigger) return;
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * ((index + 0.61) / panels.length), behavior: "smooth" });
  };

  buttons.forEach((button) => button.addEventListener("click", onJump));
  return () => {
    for (const [i, panel] of panels.entries()) {
      panel.inert = false;
      panel.removeAttribute("aria-hidden");
      buttons[i].removeAttribute("aria-current");
      buttons[i].removeEventListener("click", onJump);
    }
    delete stage.dataset.scene;
  };
}

export function animateDesktopChapters(root: HTMLElement) {
  root.setAttribute("data-cinematic", "");
  animateHero(root);
  const cleanupStory = animateProductStory(root);
  const cleanupRunway = animateRunway(root.querySelector<HTMLElement>(".collection-runway")!);

  return () => {
    cleanupStory();
    cleanupRunway();
    root.removeAttribute("data-cinematic");
  };
}

export function animateEditorialChapters(root: HTMLElement, desktop: boolean) {
  const manifesto = root.querySelector<HTMLElement>(".manifesto")!;
  const lines = [...manifesto.querySelectorAll(".campaign-display > span > span")];
  const entrance = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: manifesto, start: "top 94%", end: desktop ? "top 9%" : "top 25%", scrub: true },
  });
  entrance
    .fromTo(lines[0], { yPercent: 65, opacity: 0.45 }, { yPercent: 0, opacity: 1, duration: 0.49 }, 0)
    .fromTo(lines[1], { xPercent: desktop ? 13 : 5, yPercent: 79, opacity: 0.35 }, { xPercent: 0, yPercent: 0, opacity: 1, duration: 0.62 }, 0.13)
    .fromTo(lines[2], { yPercent: 84, opacity: 0.35 }, { yPercent: 0, opacity: 1, duration: 0.68 }, 0.28)
    .fromTo(manifesto.querySelector(".manifesto-image img"), { clipPath: "inset(14% 32% 42% 24%)", scale: 1.18 }, { clipPath: clipOpen, scale: 1, duration: 0.91 }, 0.06)
    .fromTo(manifesto.querySelector(".manifesto-inset"), { y: desktop ? 80 : 24, x: desktop ? -30 : -8 }, { x: 0, y: 0, duration: 0.82 }, 0.18);

  const collections = root.querySelector(".collection-features")!;
  const diptych = collections.querySelector(".collection-diptych")!;
  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: collections, start: "top 100%", end: "top 42%", scrub: true },
  })
    .fromTo(collections, { backgroundColor: "#e9dfd1", color: "#102e50" }, { backgroundColor: "#102e50", color: "#faf8f3" }, 0)
    .fromTo(collections.querySelector(".collection-intro .eyebrow"), { color: "#80551e" }, { color: "#f5c45e" }, 0);
  for (const [i, panel] of [...diptych.querySelectorAll(".collection-feature")].entries()) {
    const photo = panel.querySelector(".collection-feature-media img");
    const copy = panel.querySelector(".collection-feature-copy");
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: desktop ? diptych : panel, start: "top 94%", end: "top 24%", scrub: true },
    })
      .fromTo(photo, { clipPath: i === 0 ? "inset(0% 36% 0% 0%)" : "inset(0% 0% 0% 36%)", scale: i === 0 ? 1.18 : 1.28 }, { clipPath: clipOpen, scale: 1, duration: 0.88 }, i * 0.09)
      .fromTo(copy, { y: desktop ? (i === 0 ? 54 : -37) : 16, opacity: 0.76 }, { y: 0, opacity: 1, duration: 0.46 }, 0.47);
  }

  for (const [i, article] of [...root.querySelectorAll(".pricing-editorial")].entries()) {
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: article, start: "top 96%", end: "top 25%", scrub: true },
    })
      .fromTo(article.querySelector(".pricing-plate img"), { clipPath: i === 0 ? "inset(0% 0% 53% 0%)" : "inset(0% 42% 0% 0%)", scale: 1.12 }, { clipPath: clipOpen, scale: 1 }, 0)
      .fromTo(article.querySelector(".pricing-editorial-copy"), { x: desktop ? (i === 0 ? 30 : -30) : 0 }, { x: 0 }, 0.22);
  }

  for (const [i, card] of [...root.querySelectorAll(".gallery-piece")].entries()) {
    const hero = i === 0 || i === 3;
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: card, start: "top 96%", end: "top 29%", scrub: true },
    })
      .fromTo(card.querySelector(".gallery-piece-image"), hero ? { clipPath: "inset(19% 0% 28% 0%)" } : { y: desktop ? (i % 2 === 0 ? 78 : -34) : 16 }, hero ? { clipPath: clipOpen } : { y: 0 }, 0)
      .fromTo(card.querySelector(".gallery-piece-caption"), { y: 20, opacity: 0.6 }, { y: 0, opacity: 1 }, 0.26);
  }

  const finale = root.querySelector(".editorial-finale")!;
  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: finale, start: "top 95%", end: "top 12%", scrub: true },
  })
    .fromTo(finale.querySelector(".finale-image img"), { clipPath: "inset(19% 10% 25% 10%)", scale: 1.21 }, { clipPath: clipOpen, scale: 1 }, 0)
    .fromTo(finale.querySelector(".finale-inset"), { y: desktop ? 95 : 27, x: desktop ? 37 : 0 }, { y: 0, x: 0 }, 0.13)
    .fromTo(finale.querySelectorAll(".finale-copy h2 > span > span"), { yPercent: 58, opacity: 0.62 }, { yPercent: 0, opacity: 1, stagger: 0.14 }, 0.23);

  if (!desktop) {
    const hero = root.querySelector(".editorial-hero")!;
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    })
      .to(hero.querySelector(".hero-shot-wave"), { y: -35, x: -12 }, 0)
      .to(hero.querySelector(".hero-shot-ribbon"), { y: 24 }, 0);

    for (const panel of root.querySelectorAll(".showcase-panel")) {
      gsap.fromTo(panel.querySelector(".showcase-image img"), { scale: 1.12 }, {
        scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top 98%", end: "top 32%", scrub: true },
      });
    }
  }
}
