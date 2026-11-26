import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Zero-scroll-reflow, cross-browser (iOS/iPadOS Safari, Android, Linux Firefox/Chrome/WebKit)
 * section entrance hook.
 *
 * - Driven strictly by off-main-thread IntersectionObserver (zero window scroll listeners,
 *   zero per-frame getBoundingClientRect() reflows).
 * - Defaults to one-shot (`once = true`) so sections stay crisp and never dim/ghost
 *   when scrolling up or down.
 * - Pre-paint layout check ensures above-the-fold content never flashes on refresh.
 */
export function useSectionReveal(options = {}) {
  const threshold =
    typeof options === 'number' ? options : (options.threshold ?? 0.04);
  const once = typeof options === 'number' ? true : (options.once ?? true);

  const ref = useRef(null);
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return true;
    }
    if (typeof IntersectionObserver !== 'function') return true;
    return false;
  });

  useLayoutEffect(() => {
    if (revealed && once) return undefined;
    if (
      typeof window === 'undefined' ||
      (typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      typeof IntersectionObserver !== 'function'
    ) {
      setRevealed(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) {
      setRevealed(true);
      return undefined;
    }

    // Immediate pre-paint check so visible sections never flash blank on load/deep-link
    const r = node.getBoundingClientRect();
    const h = window.innerHeight || 800;
    if (r.top < h + 60 && r.bottom > -40) {
      setRevealed(true);
      if (once) return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          const br = entry.boundingClientRect;
          const vh = window.innerHeight || 800;
          if (br.bottom < -120 || br.top > vh + 120) {
            setRevealed(false);
          }
        }
      },
      { threshold: [0, threshold], rootMargin: '80px 0px 80px 0px' }
    );

    const onNavTarget = (e) => {
      const targetId = e?.detail?.id;
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (
        targetEl &&
        (targetEl === node || targetEl.contains(node) || node.contains(targetEl))
      ) {
        setRevealed(true);
        if (once) observer.disconnect();
      }
    };

    const onNavSettled = () => {
      const br = node.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (br.top < vh + 60 && br.bottom > -40) {
        setRevealed(true);
        if (once) observer.disconnect();
      }
    };

    observer.observe(node);
    window.addEventListener('piyo:nav-target', onNavTarget);
    window.addEventListener('piyo:nav-settled', onNavSettled);
    return () => {
      observer.disconnect();
      window.removeEventListener('piyo:nav-target', onNavTarget);
      window.removeEventListener('piyo:nav-settled', onNavSettled);
    };
  }, [revealed, threshold, once]);

  return [ref, revealed];
}
