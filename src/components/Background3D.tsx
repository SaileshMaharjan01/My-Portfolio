"use client";

import React, { Suspense, useEffect, useState } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const SplineFallback = () => (
  <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#0f0f11]">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Configuring 3D Core...
      </span>
    </div>
  </div>
);

export default function Background3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (isMobile) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden">
        <div className="absolute inset-0 pointer-events-auto">
          <Suspense fallback={<SplineFallback />}>
            <Spline
              scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
              className="h-full w-full"
            />
          </Suspense>
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none bg-black/60" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(239,68,68,0.08),transparent_25%),linear-gradient(180deg,#050505_0%,#000000_55%,#040404_100%)]" />
      <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-cta/10 blur-3xl" />
      <div className="absolute -right-40 top-1/3 h-128 w-lg rounded-full bg-white/5 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[24px_24px] opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/20 to-black/60" />
    </div>
  );
}
