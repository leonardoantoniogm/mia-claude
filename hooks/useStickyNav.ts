import { useEffect } from "react";

// Toggles `sticky` on <body> once the given section scrolls out of view,
// matching the original site's per-page IntersectionObserver behavior
// (script.js/script2.js/script3.js/script4.js each duplicated this logic
// pointed at a different section selector).
export function useStickyNav(targetSelector: string) {
  useEffect(() => {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("sticky", !entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "-80px" }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, [targetSelector]);
}
