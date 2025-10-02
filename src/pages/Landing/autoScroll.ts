export function autoScroll(track: HTMLElement, delayMs: number) {
  let timer: number | null = null;

  const getStep = () => {
    // One card width + gap
    const first = track.querySelector(":scope > *") as HTMLElement | null;
    if (!first) return Math.floor(track.clientWidth * 0.9);
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.columnGap || cs.rowGap || "0");
    return first.offsetWidth + gap;
  };

  const maxScroll = () => track.scrollWidth - track.clientWidth;

  const tick = () => {
    const step = getStep();
    const max = maxScroll();

    // If we're at (or very near) the end, jump back to start, otherwise scroll right by one slide
    if (track.scrollLeft + step >= max - 1) {
      track.scrollLeft = 0; // instant jump back
    } else {
      track.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  const start = () => {
    if (timer == null) timer = window.setInterval(tick, delayMs);
  };
  const stop = () => {
    if (timer != null) window.clearInterval(timer);
    timer = null;
  };

  // Pause on hover/focus
  const pause = () => stop();
  const resume = () => start();
  track.addEventListener("pointerenter", pause);
  track.addEventListener("pointerleave", resume);
  track.addEventListener("focusin", pause);
  track.addEventListener("focusout", resume);

  // Respect reduced motion
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  if (!mq.matches) start();
  const onRM = () => (mq.matches ? stop() : start());
  mq.addEventListener?.("change", onRM);

  return () => {
    stop();
    mq.removeEventListener?.("change", onRM);
    track.removeEventListener("pointerenter", pause);
    track.removeEventListener("pointerleave", resume);
    track.removeEventListener("focusin", pause);
    track.removeEventListener("focusout", resume);
  };
}
