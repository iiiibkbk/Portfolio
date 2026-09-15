"use client";
/* eslint-disable react/no-unknown-property */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { shaderMaterial, useTrailTexture } from "@react-three/drei";
import * as THREE from "three";
import "./PixelTrail.css";

type PixelTrailProps = {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Record<string, unknown>;
  glProps?: Record<string, unknown>;
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
};

const GooeyFilter = ({ id = "goo-filter", strength = 10 }) => {
  return (
    <svg className="goo-filter-container" style={{ pointerEvents: "none" }}>
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color("#ffffff")
  },
  `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;
    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }
    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;
      float trail = texture2D(mouseTrail, gridUvCenter).r;
      gl_FragColor = vec4(pixelColor, trail);
    }
  `
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }) {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);
  const invalidate = useThree((s) => s.invalidate);
  const dotMaterial = useMemo(() => new DotMaterial(), []);
  const onMoveRef = useRef<((event: { uv: THREE.Vector2 }) => void) | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, dirty: false });
  const rafRef = useRef<number | null>(null);
  const lastMoveAtRef = useRef<number>(0);
  const lastInvalidateAtRef = useRef<number>(0);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);
  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || ((x) => x)
  });
  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }
  onMoveRef.current = onMove;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (!width || !height) return;
      pointerRef.current.x = event.clientX / width;
      pointerRef.current.y = 1 - event.clientY / height;
      pointerRef.current.dirty = true;
      lastMoveAtRef.current = performance.now();
    };

    const tick = () => {
      const now = performance.now();

      if (pointerRef.current.dirty && onMoveRef.current) {
        pointerRef.current.dirty = false;
        const uv = new THREE.Vector2(pointerRef.current.x, pointerRef.current.y);
        onMoveRef.current({ uv });
      }

      // 限制渲染频率：只在最近有移动时渲染（并以 ~30fps 刷新），避免全站常驻 60fps 占用主线程/GPU
      const shouldRender = now - lastMoveAtRef.current < 900;
      if (shouldRender && now - lastInvalidateAtRef.current > 33) {
        lastInvalidateAtRef.current = now;
        invalidate();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scale = Math.max(viewport.width, viewport.height) / 2;
  return (
    <mesh scale={[scale, scale, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: "high-performance" as WebGLPowerPreference,
    alpha: true
  },
  gooeyFilter,
  color = "#ffffff",
  className = ""
}: PixelTrailProps) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={`pixel-canvas ${className}`}
        dpr={1}
        frameloop="demand"
        style={gooeyFilter ? { filter: `url(#${gooeyFilter.id})`, width: "100%", height: "100%" } : { width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
