"use client";

import { useRef, type ReactNode } from "react";
import { animateDesktopChapters, animateEditorialChapters } from "./timelines";
import { useEditorialMotion } from "./use-editorial-motion";

export function EditorialMotion({ children }: { children: ReactNode }) {
  const campaign = useRef<HTMLDivElement>(null);

  useEditorialMotion(campaign, (root, desktop) => {
    const cleanup = desktop ? animateDesktopChapters(root) : undefined;
    animateEditorialChapters(root, desktop);
    return cleanup;
  });

  return <div className="campaign" ref={campaign}>{children}</div>;
}
