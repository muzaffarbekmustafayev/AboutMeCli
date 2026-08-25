import React, { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

const GLYPHS = ["0", "1", "0", "1", "0", "1", "0", "1", "0x", "</>", "λ", "{}", "10", "01"];

export default function TechBackground() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Setup 3D Depth Matrix Rain Columns (Foreground, Midground, Background)
    const columnSpacing = 28; // Spacing between vertical rain drops
    const columnCount = Math.floor(width / columnSpacing);

    const streams = Array.from({ length: columnCount }, (_, i) => {
      const depth = Math.random(); // 0 (far/slow) to 1 (near/fast)
      const streamLength = Math.floor(10 + Math.random() * 16);

      return {
        x: i * columnSpacing + (Math.random() * 8 - 4),
        y: Math.random() * (height + 300) - 100, // Pre-distributed across entire screen
        speed: depth > 0.6 ? 2.2 + Math.random() * 1.5 : 1.2 + Math.random() * 1.0,
        length: streamLength,
        chars: Array.from({ length: streamLength }, () =>
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ),
        depth,
        fontSize: depth > 0.6 ? 13 : depth > 0.3 ? 11 : 9,
        baseOpacity: depth > 0.6 ? 0.75 : depth > 0.3 ? 0.45 : 0.25,
        mutationRate: 0.08 + Math.random() * 0.12, // Frequency of 0/1 character flipping
      };
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let lastTime = 0;
    const interval = 1000 / 30; // 30 FPS cap for high performance

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      ctx.clearRect(0, 0, width, height);

      streams.forEach((stream) => {
        ctx.font = `${stream.fontSize}px "Space Grotesk", "Fira Code", monospace`;
        ctx.textAlign = "center";

        stream.chars.forEach((char, idx) => {
          // Dynamic Live Character Mutation (flickering 0/1)
          if (Math.random() < stream.mutationRate) {
            stream.chars[idx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }

          const charY = stream.y - idx * (stream.fontSize + 4);

          if (charY > -30 && charY < height + 30) {
            const isHead = idx === 0;
            const isNearHead = idx === 1 || idx === 2;
            const tailFactor = Math.max(0, 1 - idx / stream.length);

            if (isHead) {
              // Glowing Bright Leading Digit
              const headAlpha = isDark ? 0.95 : 0.85;
              ctx.fillStyle = isDark ? `rgba(224, 242, 254, ${headAlpha})` : `rgba(30, 64, 175, ${headAlpha})`;
              ctx.shadowBlur = 6;
              ctx.shadowColor = isDark ? "#38bdf8" : "#2563eb";
            } else {
              ctx.shadowBlur = 0;
              const alpha = stream.baseOpacity * tailFactor * (isDark ? 0.8 : 0.65);

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
        });

        // Advance stream downwards
        stream.y += stream.speed;

        // Loop seamlessly once the tail leaves the screen
        const streamTotalHeight = stream.length * (stream.fontSize + 4);
        if (stream.y - streamTotalHeight > height) {
          stream.y = -Math.random() * 80;
          stream.speed = stream.depth > 0.6 ? 2.2 + Math.random() * 1.5 : 1.2 + Math.random() * 1.0;
        }
      });

      ctx.shadowBlur = 0; // Reset shadow
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient Floating Glow Orbs */}
      <div className="animate-float-orb-1 absolute -top-[15%] left-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-600/15 to-indigo-600/10 blur-[120px] dark:from-blue-500/20 dark:to-indigo-600/15" />
      <div className="animate-float-orb-2 absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-sky-500/10 to-blue-500/10 blur-[140px] dark:from-sky-400/15 dark:to-indigo-500/10" />
      <div className="animate-float-orb-1 absolute -bottom-[10%] left-[20%] h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/5 blur-[130px] dark:from-indigo-600/15 dark:to-purple-600/10" />

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
