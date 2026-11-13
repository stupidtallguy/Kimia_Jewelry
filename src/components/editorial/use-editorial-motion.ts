"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useEditorialMotion(
  scope: RefObject<HTMLDivElement | null>,
  setup: (root: HTMLDivElement, desktop: boolean) => (() => void) | void,
) {
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;

    let disposed = false;
    let refreshTimer = 0;
    const refresh = () => {
      if (disposed) return;
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 961px) and (min-height: 620px) and (hover: hover) and (pointer: fine)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      const { desktop, motion } = context.conditions ?? {};
      if (!motion) return;
      const cleanup = setup(root, Boolean(desktop));
      ScrollTrigger.refresh();
      refresh();
      return cleanup;
    }, root);

    root.addEventListener("load", refresh, true);
    document.fonts.ready.then(refresh);

    return () => {
      disposed = true;
      window.clearTimeout(refreshTimer);
      root.removeEventListener("load", refresh, true);
      media.revert();
    };
  }, { scope });
}
