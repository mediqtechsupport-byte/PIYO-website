import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Zero-scroll-reflow, cross-browser (iOS/iPadOS Safari, Android, Linux, Desktop)
 * page-by-page scroll reveal hook.
 *
 * - Driven strictly by off-main-thread IntersectionObserver (zero scroll listeners,
 *   zero per-frame getBoundingClientRect() layout thrashing).
 * - Replays smoothly on page-by-page scrolling (`once = false` by default) using
 *   offscreen hysteresis: triggers as a section enters the viewport, and only
 *   resets once the section is completely offscreen so there is zero visible flicker.
 * - Pre-paint check ensures above-the-fold content never flashes hidden on reload.
 */
export function useSectionReveal(options = {}) {
  const threshold =
    typeof options === 'number' ? options : (options.threshold ?? 0.08);
  const once = typeof options === 'number' ? false : (options.once ?? false);

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

    // Immediate pre-paint check so currently visible pages never flash blank on load/deep-link
    const r = node.getBoundingClientRect();
    const h = window.innerHeight || 800;
    if (r.top < h * 0.92 && r.bottom > h * 0.08) {
      setRevealed(true);
      if (once) return undefined;
    }

    const enterObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) {
            enterObserver.disconnect();
            exitObserver?.disconnect();
          }
        }
      },
      { threshold: [0, Math.min(0.14, threshold)], rootMargin: '-4% 0px -6% 0px' }
    );

    // Separate offscreen hysteresis observer: only resets once the section is 100% outside the viewport
    const exitObserver = once
      ? null
      : new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (!entry || entry.isIntersecting) return;
            setRevealed(false);
          },
          { threshold: 0, rootMargin: '60px 0px 60px 0px' }
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
        if (once) {
          enterObserver.disconnect();
          exitObserver?.disconnect();
        }
      }
    };

    const onNavSettled = () => {
      const br = node.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (br.top < vh * 0.94 && br.bottom > vh * 0.06) {
        setRevealed(true);
        if (once) {
          enterObserver.disconnect();
          exitObserver?.disconnect();
        }
      }
    };

    enterObserver.observe(node);
    exitObserver?.observe(node);
    window.addEventListener('piyo:nav-target', onNavTarget);
    window.addEventListener('piyo:nav-settled', onNavSettled);
    return () => {
      enterObserver.disconnect();
      exitObserver?.disconnect();
      window.removeEventListener('piyo:nav-target', onNavTarget);
      window.removeEventListener('piyo:nav-settled', onNavSettled);
    };
  }, [threshold, once]);

  return [ref, revealed];
}
