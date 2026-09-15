"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  age: number;
};

export default function PixelTrailOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const pushDot = (x: number, y: number) => {
      dotsRef.current.push({ x, y, age: 0 });
      if (dotsRef.current.length > 120) dotsRef.current.shift();
    };

    const onMove = (event: MouseEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      const last = lastPointRef.current;
      if (!last) {
        pushDot(point.x, point.y);
        lastPointRef.current = point;
        return;
      }

      const dx = point.x - last.x;
      const dy = point.y - last.y;
      const distance = Math.hypot(dx, dy);
      const step = 33 / 1.8;
      const count = Math.max(1, Math.floor(distance / step));
      for (let index = 1; index <= count; index += 1) {
        const t = index / count;
        pushDot(last.x + dx * t, last.y + dy * t);
      }
      lastPointRef.current = point;
    };

    const render = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      dotsRef.current = dotsRef.current
        .map((dot) => ({ ...dot, age: dot.age + 16 }))
        .filter((dot) => dot.age < 350);

      for (const dot of dotsRef.current) {
        const alpha = 1 - dot.age / 350;
        const size = 33 * 0.12 * alpha;
        context.fillStyle = `rgba(228,245,88,${alpha})`;
        context.fillRect(dot.x - size / 2, dot.y - size / 2, size, size);
      }

      rafRef.current = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    rafRef.current = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true" />;
}
