import { useEffect, useRef } from "react";

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationPlayState = "running";
          observer.disconnect();
        }
      },
      { threshold },
    );
    el.style.animationPlayState = "paused";
    el.classList.add("animate-fade-rise");
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}
