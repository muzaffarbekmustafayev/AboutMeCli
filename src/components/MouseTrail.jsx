import React, { useEffect, useRef } from "react";

const FOLLOW_EASING = 0.22;

export default function MouseTrail() {
  const cursorRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const isMovingRef = useRef(false);
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef(0);
  const lastTargetElemRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarsePointer || reduceMotion) return undefined;

    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    const updatePosition = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      currentRef.current.x += dx * FOLLOW_EASING;
      currentRef.current.y += dy * FOLLOW_EASING;

      // Apply transform directly to GPU compositor layer (0 reflow, 0 React re-renders)
      cursor.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`;

      // If close enough to target, stop animating to save 100% CPU when stationary
      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        currentRef.current.x = targetRef.current.x;
        currentRef.current.y = targetRef.current.y;
        cursor.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`;
        isMovingRef.current = false;
        return;
      }

      rafIdRef.current = window.requestAnimationFrame(updatePosition);
    };

    const startAnimation = () => {
      if (!isMovingRef.current) {
        isMovingRef.current = true;
        rafIdRef.current = window.requestAnimationFrame(updatePosition);
      }
    };

    const onMouseMove = (event) => {
      // Offset slightly to the bottom-right so it sits beside the standard cursor
      targetRef.current.x = event.clientX + 14;
      targetRef.current.y = event.clientY + 14;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursor.style.opacity = "1";
      }

      // Fast hover check without querying DOM on every single pixel if target hasn't changed
      const target = event.target;
      if (target !== lastTargetElemRef.current) {
        lastTargetElemRef.current = target;
        const isClickable =
          target &&
          target.closest(
            "a, button, input, select, textarea, [role='button'], .interactive-card, .cursor-pointer, .clickable"
          );

        if (isClickable) {
          cursor.classList.add("cursor-hovered");
        } else {
          cursor.classList.remove("cursor-hovered");
        }
      }

      startAnimation();
    };

    const onMouseDown = () => {
      cursor.classList.add("cursor-clicked");
    };

    const onMouseUp = () => {
      cursor.classList.remove("cursor-clicked");
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      cursor.style.opacity = "0";
      cursor.classList.remove("cursor-hovered", "cursor-clicked");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={cursorRef}
        className="mouse-trail-follower absolute top-0 left-0 flex items-center justify-center rounded-lg font-mono font-black select-none opacity-0"
        style={{
          willChange: "transform",
        }}
      >
        <span className="text-[9px] font-black tracking-tight leading-none pointer-events-none">
          &lt;/&gt;
        </span>
      </div>
    </div>
  );
}
