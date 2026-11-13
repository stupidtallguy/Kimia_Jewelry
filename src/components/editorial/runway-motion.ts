import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const stageStart = () => "top " + (document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0) + "px";

export function pinChapter(id: string, chapter: HTMLElement, stage: HTMLElement, distance: () => number) {
  return {
    id,
    trigger: chapter,
    start: stageStart,
    end: () => "+=" + distance(),
    pin: stage,
    pinSpacing: false as const,
    scrub: true as const,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  };
}

export function animateRunway(chapter: HTMLElement) {
  const stage = chapter.querySelector<HTMLElement>(".runway-stage")!;
  const windowElement = stage.querySelector<HTMLElement>(".runway-window")!;
  const track = stage.querySelector<HTMLElement>(".runway-track")!;
  const distance = () => Math.max(0, track.offsetWidth - windowElement.clientWidth);
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: pinChapter("kimia-runway", chapter, stage, () => chapter.offsetHeight - stage.offsetHeight),
  });

  // The first item is at the right edge in RTL. Positive translation brings the remaining items into view.
  timeline
    .fromTo(track, { x: 0 }, { x: distance, duration: 1 }, 0)
    .fromTo(stage.querySelector(".runway-progress > span"), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
    .fromTo(track.querySelectorAll("img"), { scale: 1.08 }, { scale: 1, duration: 1 }, 0);

  function revealFocusedCard(event: FocusEvent) {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(".runway-piece > a");
    const trigger = timeline.scrollTrigger;
    if (!link?.matches(":focus-visible") || !trigger || !distance()) return;
    const bounds = link.getBoundingClientRect();
    const frame = windowElement.getBoundingClientRect();
    if (bounds.left >= frame.left && bounds.right <= frame.right) return;

    const currentX = Number(gsap.getProperty(track, "x"));
    const offset = (frame.left + frame.right - bounds.left - bounds.right) / 2;
    const fraction = gsap.utils.clamp(0, 1, (currentX + offset) / distance());
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * fraction, behavior: "instant" });
    ScrollTrigger.update();
  }

  track.addEventListener("focusin", revealFocusedCard);
  return () => track.removeEventListener("focusin", revealFocusedCard);
}
