import React, { useEffect, useRef, useState } from "react";

const FOLLOW_EASING = 0.2;

function MouseTrail() {
  const [enabled, setEnabled] = useState(false);
  const [follower, setFollower] = useState({ x: -100, y: -100, ready: false });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const targetRef = useRef({ x: -100, y: -100 });
  const followerRef = useRef({ x: -100, y: -100 });
  const readyRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarsePointer || reduceMotion) return undefined;

    setEnabled(true);

    const onMouseMove = (event) => {
      // Offset slightly to the bottom-right so it sits neatly beside the standard mouse arrow
      targetRef.current = { x: event.clientX + 14, y: event.clientY + 14 };

      const target = event.target;
      if (
        target &&
        target.closest("a, button, input, select, textarea, [role='button'], .interactive-card, .cursor-pointer, .clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => {
      readyRef.current = false;
      setFollower((prev) => ({ ...prev, ready: false }));
      setIsHovered(false);
      setIsClicked(false);
    };

    const tick = () => {
      const dx = targetRef.current.x - followerRef.current.x;
      const dy = targetRef.current.y - followerRef.current.y;

      followerRef.current.x += dx * FOLLOW_EASING;
      followerRef.current.y += dy * FOLLOW_EASING;

      if (!readyRef.current && (targetRef.current.x > 0 || targetRef.current.y > 0)) {
        readyRef.current = true;
        setFollower({ x: followerRef.current.x, y: followerRef.current.y, ready: true });
      } else if (readyRef.current) {
        setFollower((prev) => ({ ...prev, x: followerRef.current.x, y: followerRef.current.y }));
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {follower.ready && (
        <div
          className={`absolute flex items-center justify-center rounded-lg font-mono font-black select-none will-change-transform ${
            isHovered
              ? "h-8 w-8 scale-110 border-2 border-sky-400 bg-sky-500/30 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.8)] backdrop-blur-md dark:border-sky-300 dark:bg-sky-400/35 dark:text-white"
              : "h-6 w-6 scale-100 border border-blue-600/80 bg-white/95 text-blue-700 shadow-[0_2px_12px_rgba(37,99,235,0.35)] backdrop-blur-sm dark:border-sky-400/80 dark:bg-slate-900/90 dark:text-sky-300 dark:shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          } ${isClicked ? "scale-75" : ""}`}
          style={{
            left: follower.x,
            top: follower.y,
            transform: "translate(-50%, -50%)",
            transition: "width 160ms ease, height 160ms ease, border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
          }}
        >
          <span className="text-[9px] font-black tracking-tight leading-none pointer-events-none">&lt;/&gt;</span>
        </div>
      )}
    </div>
  );
}

export default MouseTrail;
