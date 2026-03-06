import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll(
              ".animate-fade-up, .animate-fade-in",
            );
            let idx = 0;
            for (const t of targets) {
              setTimeout(() => {
                t.classList.add("in-view");
              }, idx * 80);
              idx++;
            }
            // Also add to the element itself if it has the class
            if (
              entry.target.classList.contains("animate-fade-up") ||
              entry.target.classList.contains("animate-fade-in")
            ) {
              entry.target.classList.add("in-view");
            }
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    // Observe both the container and all children with animation classes
    observer.observe(el);
    const animatedEls = el.querySelectorAll(
      ".animate-fade-up, .animate-fade-in",
    );
    for (const child of animatedEls) {
      observer.observe(child);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useSectionReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    const els = document.querySelectorAll(
      ".animate-fade-up:not(.in-view), .animate-fade-in:not(.in-view)",
    );
    for (const el of els) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  });
}
