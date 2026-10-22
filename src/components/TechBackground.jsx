import React, { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

const GLYPHS = ["0", "1", "0", "1", "0", "1", "0", "1", "0x", "</>", "λ", "{}", "10", "01"];

export default function TechBackground() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Optimized column count for smooth 60fps performance across desktop and mobile
    const isMobile = width < 768;
    const columnSpacing = isMobile ? 48 : 36;
    const columnCount = Math.floor(width / columnSpacing);

    const streams = Array.from({ length: columnCount }, (_, i) => {
      const depth = Math.random();
      const streamLength = Math.floor(8 + Math.random() * 12);

      return {
        x: i * columnSpacing + (Math.random() * 6 - 3),
        y: Math.random() * (height + 200) - 100,
        speed: depth > 0.6 ? 2.0 + Math.random() * 1.2 : 1.1 + Math.random() * 0.8,
        length: streamLength,
        chars: Array.from({ length: streamLength }, () =>
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ),
        depth,
        fontSize: depth > 0.6 ? 12 : depth > 0.3 ? 10 : 9,
        baseOpacity: depth > 0.6 ? 0.75 : depth > 0.3 ? 0.45 : 0.25,
        mutationRate: 0.06 + Math.random() * 0.08,
      };
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let lastTime = performance.now();
    const interval = 1000 / 30; // Solid 30 FPS target for background ambient canvas

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";

      for (let s = 0; s < streams.length; s++) {
        const stream = streams[s];
        const normalFont = `${stream.fontSize}px "Space Grotesk", "Fira Code", monospace`;
        const boldFont = `bold ${stream.fontSize + 1}px "Space Grotesk", "Fira Code", monospace`;

        for (let idx = 0; idx < stream.chars.length; idx++) {
          if (Math.random() < stream.mutationRate) {
            stream.chars[idx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }

          const charY = stream.y - idx * (stream.fontSize + 4);

          if (charY > -25 && charY < height + 25) {
            const isHead = idx === 0;
            const isNearHead = idx === 1 || idx === 2;
            const tailFactor = Math.max(0, 1 - idx / stream.length);

            if (isHead) {
              // High-contrast crisp leading glyph without expensive GPU shadowBlur
              ctx.font = boldFont;
              ctx.fillStyle = isDark ? "#ffffff" : "#1e40af";
            } else {
              ctx.font = normalFont;
              const alpha = stream.baseOpacity * tailFactor * (isDark ? 0.75 : 0.6);

              ctx.fillStyle = isDark
                ? isNearHead
                  ? `rgba(56, 189, 248, ${alpha * 1.3})`
                  : idx % 2 === 0
                    ? `rgba(96, 165, 250, ${alpha})`
                    : `rgba(129, 140, 248, ${alpha})`
                : isNearHead
                  ? `rgba(37, 99, 235, ${alpha * 1.2})`
                  : `rgba(79, 70, 229, ${alpha})`;
            }

            ctx.fillText(stream.chars[idx], stream.x, charY);
          }
        }

        stream.y += stream.speed;

        const streamTotalHeight = stream.length * (stream.fontSize + 4);
        if (stream.y - streamTotalHeight > height) {
          stream.y = -Math.random() * 60;
          stream.speed = stream.depth > 0.6 ? 2.0 + Math.random() * 1.2 : 1.1 + Math.random() * 0.8;
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause canvas execution when browser tab is inactive to free 100% CPU/GPU
    const handleVisibility = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        lastTime = performance.now();
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDark]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient Floating Glow Orbs - GPU-accelerated soft radial gradients (no heavy blur filter) */}
      <div
        className="animate-float-orb-1 absolute -top-[10%] left-[10%] h-[480px] w-[480px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(79, 70, 229, 0.05) 50%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="animate-float-orb-2 absolute top-[35%] -right-[5%] h-[520px] w-[520px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(59, 130, 246, 0.07) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(14, 165, 233, 0.11) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="animate-float-orb-1 absolute -bottom-[10%] left-[25%] h-[440px] w-[440px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(79, 70, 229, 0.09) 0%, rgba(124, 58, 237, 0.04) 50%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Developer Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_75%,transparent_100%)] dark:bg-[linear-gradient(to_right,rgba(96,165,250,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.035)_1px,transparent_1px)]" />

      {/* Developer Ambient Watermarks */}
      <div className="absolute top-28 left-8 font-mono text-xs font-semibold text-blue-500/40 dark:text-blue-400/50 select-none">
        &lt;Muzaffarbek.dev /&gt;
      </div>
      <div className="absolute top-1/4 right-10 font-mono text-xs font-semibold text-indigo-500/35 dark:text-indigo-400/45 select-none hidden lg:block">
        system.binary_matrix: active
      </div>
      <div className="absolute bottom-16 right-12 font-mono text-xs font-semibold text-emerald-500/35 dark:text-emerald-400/45 select-none hidden sm:block">
        HTTP/2 200 OK · [01001101]
      </div>
      <div className="absolute bottom-28 left-10 font-mono text-xs font-semibold text-sky-500/35 dark:text-sky-400/45 select-none hidden sm:block">
        01001101 01110101 01111010
      </div>

      {/* Matrix Binary Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-100"
      />
    </div>
  );
}
