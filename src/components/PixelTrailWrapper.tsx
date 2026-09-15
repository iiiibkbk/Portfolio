"use client";

import dynamic from "next/dynamic";

const PixelTrail = dynamic(() => import("./PixelTrail"), { ssr: false });

export default function PixelTrailWrapper() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 10,
        pointerEvents: "none"
      }}
      aria-hidden="true"
    >
      <PixelTrail
        gridSize={26}
        trailSize={0.08}
        maxAge={200}
        interpolate={3}
        color="#e5f756"
        gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
      />
    </div>
  );
}
