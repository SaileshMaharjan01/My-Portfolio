"use client";

import { marqueeImages } from "@/data/marquee.data";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const MarqueeSection = () => {
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const offsetRef = useRef(0);
  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startOffset: number;
  }>({
    pointerId: null,
    startX: 0,
    startOffset: 0,
  });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();

    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const row1 = marqueeImages.slice(0, 6);
  const row2 = marqueeImages.slice(6);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (isMobile) {
      let rafId = 0;
      let lastTime = performance.now();
      let current = offsetRef.current;

      const animate = (time: number) => {
        if (isDragging) {
          current = offsetRef.current;
          lastTime = time;
          rafId = window.requestAnimationFrame(animate);
          return;
        }

        const delta = time - lastTime;
        lastTime = time;
        current -= delta * 0.045;
        if (Math.abs(current) > 2000) current = 0;
        setOffset(current);
        offsetRef.current = current;
        rafId = window.requestAnimationFrame(animate);
      };

      rafId = window.requestAnimationFrame(animate);

      return () => {
        if (rafId) window.cancelAnimationFrame(rafId);
      };
    }

    let rafId = 0;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        if (!sectionRef.current) return;

        const sectionTop = sectionRef.current.offsetTop;
        const currentOffset =
          (window.scrollY - sectionTop + window.innerHeight) * 0.3;

        setOffset(currentOffset);
        offsetRef.current = currentOffset;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [isDragging, isMobile, prefersReducedMotion]);

  const row1Offset = prefersReducedMotion ? 0 : isMobile ? offset : offset - 200;
  const row2Offset = prefersReducedMotion ? 0 : isMobile ? -offset : -(offset - 200);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: offsetRef.current,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile || !isDragging) return;
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    const nextOffset = dragStateRef.current.startOffset + deltaX * 1.2;
    setOffset(nextOffset);
    offsetRef.current = nextOffset;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    dragStateRef.current.pointerId = null;
    setIsDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore capture release failures on some browsers.
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 overflow-hidden border-y border-white/10 bg-black/20 px-6 py-24 md:px-12 md:py-32 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-12 md:mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-secondary">
            Skills
          </p>
          <h2 className="mt-4 text-4xl md:text-7xl font-bold tracking-tight">
            Interactive tools, tuned for{" "}
            <span className="text-cta">3D motion</span>.
          </h2>
        </motion.div>
      </div>

      <div
        className="flex flex-col gap-3 md:gap-4"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ touchAction: isMobile ? "pan-y" : "auto" }}
      >
        <div
          className="flex gap-3 md:gap-4 px-4 md:px-12"
          style={{
            transform: `translate3d(${row1Offset}px, 0, 0)`,
            willChange: "transform",
          }}
        >
          {[...row1, ...row1, ...row1].map((skill, i) => (
            <SkillCard key={`${skill.name}-${i}`} skill={skill} />
          ))}
        </div>

        <div
          className="flex gap-3 md:gap-4 px-4 md:px-12"
          style={{
            transform: `translate3d(${row2Offset}px, 0, 0)`,
            willChange: "transform",
          }}
        >
          {[...row2, ...row2, ...row2].map((skill, i) => (
            <SkillCard key={`${skill.name}-${i}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

function SkillCard({ skill }: { skill: (typeof marqueeImages)[number] }) {
  const mobileCard = (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:hidden">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${skill.accent} text-sm font-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.25)]`}
      >
        {skill.glyph}
      </div>
      <div className="min-w-0">
        <p className="text-[0.72rem] font-semibold leading-none tracking-tight text-white">
          {skill.name}
        </p>
        <p className="mt-1 truncate text-[0.6rem] leading-none text-white/55">
          {skill.eyebrow}
        </p>
      </div>
    </div>
  );

  return (
    <motion.article
      whileHover={{ y: -10, rotateX: 10, rotateY: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="group relative w-auto shrink-0 overflow-visible bg-transparent p-0 shadow-none sm:h-108 sm:w-84 sm:overflow-hidden sm:rounded-[34px] sm:border sm:border-white/10 sm:bg-white/4 sm:p-4 sm:shadow-[0_20px_40px_rgba(0,0,0,0.28)] sm:backdrop-blur-2xl sm:transform-3d sm:perspective-distant"
    >
      {mobileCard}

      <div className="hidden sm:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.22))] opacity-75" />
        <div
          className={`absolute inset-x-3 top-3 h-32 overflow-hidden rounded-[18px] bg-linear-to-br ${skill.accent} shadow-[0_18px_40px_rgba(0,0,0,0.3)] sm:inset-x-5 sm:top-5 sm:h-56 sm:rounded-[30px] sm:shadow-[0_24px_60px_rgba(0,0,0,0.35)]`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_18%),radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.18),transparent_22%),linear-gradient(145deg,rgba(255,255,255,0.12),rgba(0,0,0,0.18))]" />
          <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-white/35 to-transparent opacity-40 sm:h-20" />
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-linear-to-t from-black/18 to-transparent sm:h-24" />

          <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[8px] font-medium uppercase tracking-[0.28em] text-white/85 backdrop-blur-md sm:left-5 sm:top-5 sm:px-3 sm:text-[10px] sm:tracking-[0.35em]">
            {skill.eyebrow}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[20px] border border-white/30 bg-white/25 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:h-32 sm:w-32 sm:rounded-[34px]">
              <div className="absolute inset-1.5 rounded-[16px] border border-white/30 bg-black/15 sm:inset-2 sm:rounded-[26px]" />
              <div className="relative z-10 flex h-full w-full items-center justify-center text-2xl font-black tracking-tight text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] sm:text-4xl">
                {skill.glyph}
              </div>
            </div>
          </div>
        </div>

        <div className="z-10 flex h-full flex-col justify-end px-3 pb-3 pt-36 text-white sm:px-4 sm:pb-4 sm:pt-64">
          <div className="rounded-2xl bg-linear-to-br from-white/10 to-white/5 px-3 py-3 text-center backdrop-blur-3xl backdrop-saturate-200 shadow-[0_16px_40px_rgba(0,0,0,0.14)] sm:rounded-3xl sm:px-5 sm:py-5 sm:text-left">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[0.7rem] sm:tracking-[0.3em]">
              {skill.name}
            </p>

            <h3 className="mt-2 text-[1.15rem] font-semibold leading-none tracking-tight sm:mt-3 sm:text-[1.85rem]">
              {skill.name}
            </h3>

            <p className="mx-auto mt-2 max-w-[16rem] text-[0.72rem] leading-relaxed text-white/65 sm:mx-0 sm:mt-3 sm:text-sm">
              {skill.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
