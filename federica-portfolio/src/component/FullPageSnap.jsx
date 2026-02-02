import React, { useEffect, useRef, useState } from "react";
import "./FullPageSnap.css";

/**
 * SnapSection
 * - Wrapper semplice per ogni blocco/full-page
 * - Props: id (string), className (string), children
 */
export function SnapSection({ id, className = "", children }) {
  return (
    <section id={id} className={`fps-section ${className}`}>
      {children}
    </section>
  );
}

/**
 * FullPageSnap
 * - children: list of <SnapSection />
 * - dot navigation, keyboard arrows, wheel/touch lock, active section highlight
 */
export default function FullPageSnap({ children }) {
  const containerRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // simple lock to avoid multiple snaps from the same scroll
  const isLocked = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // collect section elements (assumes direct children are sections)
    const secs = Array.from(container.children).filter(
      (el) => el.nodeType === 1
    );
    setSections(secs);

    // IntersectionObserver to track active section more robustly
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = secs.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      {
        root: container,
        threshold: 0.6, // when 60% of the section is visible consider it active
      }
    );

    secs.forEach((s) => io.observe(s));

    return () => io.disconnect();
  }, [children]);

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        scrollRelative(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        scrollRelative(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToIndex(sections.length - 1);
      }
    };
    window.addEventListener("keydown", handleKey, { passive: false });
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  // wheel handler with lock (debounce-ish)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      // ignore if horizontal scrolling or small delta
      if (Math.abs(e.deltaY) < 10 || Math.abs(e.deltaX) > Math.abs(e.deltaY))
        return;

      e.preventDefault();
      if (isLocked.current) return;
      isLocked.current = true;

      if (e.deltaY > 0) scrollRelative(1);
      else scrollRelative(-1);

      // unlock after animation time (adjust if you change CSS scroll-behavior)
      setTimeout(() => {
        isLocked.current = false;
      }, 700);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [sections]);

  // touch handling (detect vertical swipe)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let startY = null;
    let lastTouchTime = 0;

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (startY == null) return;
      const endY = e.changedTouches[0].clientY;
      const dy = startY - endY;
      const now = Date.now();
      // small threshold, also prevent too frequent triggers
      if (Math.abs(dy) > 50 && now - lastTouchTime > 500) {
        lastTouchTime = now;
        if (dy > 0) scrollRelative(1);
        else scrollRelative(-1);
      }
      startY = null;
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [sections]);

  const scrollRelative = (dir) => {
    if (!sections || sections.length === 0) return;
    // clamp
    const next = Math.min(
      sections.length - 1,
      Math.max(0, activeIndex + dir)
    );
    scrollToIndex(next);
  };

  const scrollToIndex = (idx) => {
    const target = sections[idx];
    if (!target) return;
    // use scrollIntoView for smoothness (CSS also helps)
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(idx);
  };

  return (
    <div className="fps-root">
      <div ref={containerRef} className="fps-container">
        {children}
      </div>

      {/* Dot navigation */}
      <nav className="fps-dots" aria-label="Sezioni">
        {sections.map((_, i) => (
          <button
            key={i}
            className={`fps-dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Vai alla sezione ${i + 1}`}
            aria-current={i === activeIndex ? "true" : "false"}
          />
        ))}
      </nav>

    </div>
  );
}