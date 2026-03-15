import React, { useEffect, useRef, useState } from "react";

const FOLLOW_EASING = 0.15;

function MouseTrail() {
  const [enabled, setEnabled] = useState(false);
  const [follower, setFollower] = useState({ x: 0, y: 0, ready: false });

  const targetRef = useRef({ x: 0, y: 0 });
  const followerRef = useRef({ x: 0, y: 0 });
  const readyRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarsePointer || reduceMotion) return undefined;

    setEnabled(true);

    const onMouseMove = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseLeave = () => {
      readyRef.current = false;
      setFollower((prev) => ({ ...prev, ready: false }));
    };

    const tick = () => {
      const dx = targetRef.current.x - followerRef.current.x;
      const dy = targetRef.current.y - followerRef.current.y;

      followerRef.current.x += dx * FOLLOW_EASING;
      followerRef.current.y += dy * FOLLOW_EASING;

      if (!readyRef.current && (targetRef.current.x !== 0 || targetRef.current.y !== 0)) {
        readyRef.current = true;
        setFollower({ x: followerRef.current.x, y: followerRef.current.y, ready: true });
      } else if (readyRef.current) {
        setFollower((prev) => ({ ...prev, x: followerRef.current.x, y: followerRef.current.y }));
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("blur", onMouseLeave);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("blur", onMouseLeave);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      {follower.ready && (
        <span
          className="absolute h-6 w-6 rounded-full border border-blue-300 bg-blue-300/25 shadow-[0_0_24px_rgba(59,130,246,0.35)]"
          style={{
            left: follower.x,
            top: follower.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
}

export default MouseTrail;
