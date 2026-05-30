"use client";

import Background3D from "@/components/Background3D";
import { MarqueeSection } from "@/components/MarqueeSection";
import Scene from "@/components/Scene";
import ServicesSection from "@/components/ServicesSection";
import StackedCards from "@/components/StackedCards";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "SCSS",
  "Node.js",
  "Mongodb",
  "Adobe Creative Suite",
  "Blender",
];

const FadeInUp = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [isIntro, setIsIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative isolate w-full text-white font-sans">
      <Background3D />
      <Scene isIntro={isIntro} />

      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          isIntro ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* ── Hero Section ────────────────────────────────────────── */}
        <section className="relative z-10 h-screen w-full flex items-center justify-center text-center px-4 pointer-events-none">
          <div className="z-10 pointer-events-auto">
            <FadeInUp>
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 opacity-90">
                WHERE DESIGN <br />
                <span className="text-cta">MEETS INTERACTION</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="max-w-lg text-lg md:text-xl mb-8 opacity-80 mx-auto text-white [text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.3)]">
                Bridging design and development to create immersive interfaces,
                interactive 3D experiences, and high-performance web products.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <div className="flex gap-4 justify-center">
                <a
                  href="#work"
                  className="px-8 py-3 bg-cta text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95"
                >
                  Explore Work
                </a>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ── About Section ───────────────────────────────────────── */}
        <section
          id="about"
          className="relative z-10 min-h-screen w-full flex items-center justify-start px-6 md:px-20 py-20 pointer-events-none"
        >
          <div className="mx-auto max-w-7xl text-center pointer-events-auto">
            <FadeInUp>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                ABOUT <span className="text-cta">ME</span>
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg md:text-xl leading-relaxed mb-6 text-white [text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.3)]">
                I specialize in crafting intuitive user experiences and
                immersive digital products, combining thoughtful UI/UX design
                with modern web technologies. My work bridges design and
                development, creating interactive 3D websites and seamless web
                experiences that are both visually engaging and highly
                functional. I focus on transforming complex ideas into elegant,
                user-centered interfaces that push the boundaries of what&apos;s
                possible in the browser.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <div className="flex flex-wrap gap-3 items-center justify-center">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border rounded-full text-sm font-medium hover:border-cta transition-colors cursor-default  border-y border-white/10 bg-white/5 backdrop-blur-md backdrop-saturate-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ── Projects Section — Scroll-Stacked Cards ─────────────── */}
        {/*
          StackedCards handles its own section header + the tall sticky
          scroll container.  The #work anchor is placed on the outer div
          inside StackedCards so nav links still work.
        */}
        <ServicesSection />

        <StackedCards />

        <MarqueeSection />

        {/* ── Contact Section ─────────────────────────────────────── */}
        <section
          id="contact"
          className="relative z-10 min-h-screen w-full flex items-center justify-center px-6 py-20 text-center pointer-events-none"
        >
          <div className="max-w-3xl pointer-events-auto">
            <FadeInUp>
              <h2 className="text-4xl md:text-7xl font-bold mb-8">
                LET&apos;S <span className="text-cta">CONNECT</span>
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-xl text-white! [text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.3)] mb-12 opacity-80">
                Have a project in mind? Let&apos;s build something extraordinary
                together.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <a
                href="mailto:uxdsaileshmaharjan@gmail.com"
                className="text-3xl md:text-5xl font-bold underline decoration-cta underline-offset-8 hover:text-cta transition-colors"
              >
                Connect@sailesh.studio
              </a>
            </FadeInUp>
          </div>
        </section>

        {/* ── Navigation ──────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4 md:pt-6 pointer-events-none">
          <div className="nav-glass pointer-events-auto mx-auto max-w-7xl md:rounded-full rounded-[48px] px-5 py-4 md:px-7 md:py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xl font-bold tracking-[0.25em] text-white cursor-pointer">
                SAILESH.STUDIO
              </div>

              <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-secondary">
                <a
                  href="#about"
                  className="hover:text-cta transition-colors cursor-pointer"
                >
                  About
                </a>
                <a
                  href="#services"
                  className="hover:text-cta transition-colors cursor-pointer"
                >
                  Services
                </a>
                <a
                  href="#skills"
                  className="hover:text-cta transition-colors cursor-pointer"
                >
                  Skills
                </a>
                <a
                  href="#work"
                  className="hover:text-cta transition-colors cursor-pointer"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="hover:text-cta transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </div>

              <button
                type="button"
                className="inline-flex lg:hidden items-center justify-center rounded-full border border-white/15 bg-white/5 p-3 text-white transition-colors hover:border-cta/60 hover:bg-white/10"
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <span className="sr-only">
                  {isMenuOpen ? "Close menu" : "Open menu"}
                </span>
                <span className="relative block h-4 w-5">
                  <span
                    className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                      isMenuOpen ? "translate-y-1.75 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                      isMenuOpen ? "-translate-y-1.25 -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>

            <div
              id="mobile-navigation"
              className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
                isMenuOpen
                  ? "max-h-48 opacity-100 mt-4"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="flex flex-col gap-3 border-t border-white/10 pt-4 text-sm font-medium text-secondary">
                <a
                  href="#about"
                  className="rounded-2xl px-3 py-2 transition-colors hover:bg-white/5 hover:text-cta"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#services"
                  className="rounded-2xl px-3 py-2 transition-colors hover:bg-white/5 hover:text-cta"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#skills"
                  className="rounded-2xl px-3 py-2 transition-colors hover:bg-white/5 hover:text-cta"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Skills
                </a>
                <a
                  href="#work"
                  className="rounded-2xl px-3 py-2 transition-colors hover:bg-white/5 hover:text-cta"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl px-3 py-2 transition-colors hover:bg-white/5 hover:text-cta"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="relative z-10 p-10 text-center text-xs text-secondary opacity-50">
          © 2026 SAILESH.STUDIO — Crafted in the Mind, Engineered in the Void.
        </footer>
      </div>
    </main>
  );
}
