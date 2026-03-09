import React, { useEffect, useRef, useState } from "react";

const TRAIL_LIFETIME_MS = 1000;
const TRAIL_SPAWN_INTERVAL_MS = 45;
const FOLLOW_EASING = 0.2;

function MouseTrail() {
  const [enabled, setEnabled] = useState(false);
  const [trail, setTrail] = useState([]);
  const [follower, setFollower] = useState({ x: 0, y: 0, ready: false });

  const targetRef = useRef({ x: 0, y: 0 });
  const followerRef = useRef({ x: 0, y: 0 });
  const readyRef = useRef(false);
  const lastSpawnRef = useRef(0);
  const rafRef = useRef(0);
  const idRef = useRef(0);

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
      setTrail([]);
      readyRef.current = false;
      setFollower((prev) => ({ ...prev, ready: false }));
    };

    const tick = (time) => {
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

      if (time - lastSpawnRef.current >= TRAIL_SPAWN_INTERVAL_MS) {
        lastSpawnRef.current = time;
        const now = Date.now();
        const dot = {
          id: idRef.current++,
          x: followerRef.current.x,
          y: followerRef.current.y,
          createdAt: now,
        };

        setTrail((prev) => {
          const filtered = prev.filter((item) => now - item.createdAt < TRAIL_LIFETIME_MS);
          return [...filtered, dot];
        });
      } else {
        const now = Date.now();
        setTrail((prev) => prev.filter((item) => now - item.createdAt < TRAIL_LIFETIME_MS));
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

  const now = Date.now();

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      {trail.map((dot) => {
        const age = now - dot.createdAt;
        const progress = Math.min(age / TRAIL_LIFETIME_MS, 1);
        const opacity = 0.32 * (1 - progress);
        const scale = 1 + progress * 0.9;

        return (
          <span
            key={dot.id}
            className="absolute h-3 w-3 rounded-full bg-blue-400"
            style={{
              left: dot.x,
              top: dot.y,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          />
        );
      })}

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
