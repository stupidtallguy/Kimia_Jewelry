"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { animateRunway } from "./runway-motion";
import { useEditorialMotion } from "./use-editorial-motion";

const open = "inset(0% 0% 0% 0%)";

export function InteriorMotion({ theme, children }: { theme: "women" | "men" | "about"; children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useEditorialMotion(scope, (root, desktop) => {
    const hero = root.querySelector(".v3-hero")!;
    const heading = hero.querySelectorAll(".v3-line > span");
    const heroImage = hero.querySelector(".v3-hero-image img");
    const isMen = theme === "men";

    gsap.timeline({ defaults: { ease: "power2.out" } })
      .fromTo(heroImage, { clipPath: isMen ? "inset(0% 0% 0% 21%)" : "inset(0% 13% 14% 0%)", scale: 1.09 },
        { clipPath: open, scale: 1, duration: 0.95 }, 0)
      .from(heading, { yPercent: 102, stagger: 0.11, duration: 0.64 }, 0.08)
      .from(hero.querySelectorAll(".v3-hero-inset"), { y: 24, opacity: 0, duration: 0.7 }, 0.25);

    if (desktop) {
      gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }, defaults: { ease: "none" } })
        .to(hero.querySelector(".v3-hero-image"), { yPercent: isMen ? 8 : 11 }, 0)
        .to(hero.querySelectorAll(".v3-hero-inset, .v3-hero-rule"), { yPercent: -22, stagger: 0.08 }, 0);
    }

    const frames = [...root.querySelectorAll<HTMLElement>(".v3-category, .v3-study-piece, .v3-philosophy, .v3-pricing-card, .v3-closing")];
    for (const [index, frame] of frames.entries()) {
      const image = frame.querySelector(".photo img");
      const label = frame.querySelector(".v3-category-copy, .v3-study-copy, .v3-pricing-copy");
      const mask = !desktop ? "inset(0% 0% 15% 0%)"
        : index % 2 ? "inset(0% 22% 0% 0%)" : "inset(0% 0% 16% 15%)";
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: frame, start: "top 95%", end: desktop ? "top 29%" : "top 56%", scrub: true },
      });
      timeline.fromTo(image, { clipPath: mask, scale: desktop ? 1.2 : 1.06 }, { clipPath: open, scale: 1, duration: 1 }, 0);
      if (label) timeline.fromTo(label, { y: desktop ? 18 : 7, opacity: 0.72 }, { y: 0, opacity: 1, duration: 0.55 }, 0.3 + (index % 2) * 0.12);
    }

    const study = root.querySelector(".v3-study");
    if (study && desktop) {
      gsap.to(study, { "--v3-study-tone": isMen ? "#1b3347" : "#f1ded0", ease: "none",
        scrollTrigger: { trigger: study, start: "top bottom", end: "top 30%", scrub: true } });
    }

    const runway = root.querySelector<HTMLElement>(".collection-runway");
    if (!runway || !desktop) return;
    root.setAttribute("data-cinematic", "");
    const cleanup = animateRunway(runway);
    return () => {
      cleanup();
      root.removeAttribute("data-cinematic");
    };
  });

  return <div className="v3-page" data-theme={theme} ref={scope}>{children}</div>;
}
