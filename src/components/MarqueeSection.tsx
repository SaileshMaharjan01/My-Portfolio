"use client";

import { marqueeImages } from "@/data/marquee.data";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const MarqueeSection = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
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
  }, []);

  const row1 = marqueeImages.slice(0, 6);
  const row2 = marqueeImages.slice(6);

  const row1Offset = prefersReducedMotion ? 0 : offset - 200;
  const row2Offset = prefersReducedMotion ? 0 : -(offset - 200);

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

      <div className="flex flex-col gap-4">
        <div
          className="flex gap-4 px-6 md:px-12"
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
          className="flex gap-4 px-6 md:px-12"
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
  return (
    <motion.article
      whileHover={{ y: -10, rotateX: 10, rotateY: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="group relative h-104 w-[20rem] shrink-0 overflow-hidden rounded-[34px] border border-white/10 bg-white/4 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transform-3d perspective-distant sm:h-108 sm:w-84"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.22))] opacity-75" />
      <div
        className={`absolute inset-x-5 top-5 h-56 overflow-hidden rounded-[30px] bg-linear-to-br ${skill.accent} shadow-[0_24px_60px_rgba(0,0,0,0.35)]`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_18%),radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.18),transparent_22%),linear-gradient(145deg,rgba(255,255,255,0.12),rgba(0,0,0,0.18))]" />
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/35 to-transparent opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/18 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.35em] text-white/85 backdrop-blur-md">
          {skill.eyebrow}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-[34px] border border-white/30 bg-white/25 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <div className="absolute inset-2 rounded-[26px] border border-white/30 bg-black/15" />
            <div className="relative z-10 flex h-full w-full items-center justify-center text-4xl font-black tracking-tight text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]">
              {skill.glyph}
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 flex h-full flex-col justify-end px-4 pb-4 pt-64 text-white">
        <div className="rounded-3xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-3xl backdrop-saturate-200 px-5 py-5 shadow-[0_16px_40px_rgba(0,0,0,0.14)]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] ">
            {skill.name}
          </p>

          <h3 className="mt-3 text-[1.85rem] font-semibold leading-none tracking-tight">
            {skill.name}
          </h3>

          <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-white/65">
            {skill.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
