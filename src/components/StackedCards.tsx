"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const projects = [
  {
    title: "Framer",
    description:
      "A deep dive into a framer clone, showcasing advanced animations and interactions.",
    color: "bg-zinc-900",
    index: "01",
    link: "https://framer-clone-chi.vercel.app/",
    image: "/images/Framer-clone.png",
  },
  {
    title: "FurnitureX",
    description:
      "An aesthetic furniture e-commerce site built with Next.js, Tailwind CSS, and Framer Motion.",
    color: "bg-zinc-800",
    index: "02",
    link: "https://furniture-website-alpha-gilt.vercel.app/",
    image: "/images/Furniture-site.png",
  },
  {
    title: "Lambo City",
    description:
      "Interactive visualization of Lamborghini models, blending graphics with dynamic UI elements.",
    color: "bg-zinc-700",
    index: "03",
    link: "https://lamborghini-clone-site.vercel.app/",
    image: "/images/Lambo-site.png",
  },
  {
    title: "Nature's Pulse",
    description:
      "Nature's Pulse is a serene exploration of the natural world, blending immersive visuals with interactive storytelling to create a tranquil digital escape.",
    color: "bg-zinc-600",
    index: "04",
    link: "https://nature-site-rho.vercel.app/",
    image: "/images/Nature-site.png",
  },
  {
    title: "Juicery",
    description:
      "Juicery offers fresh, healthy juices and smoothies made from natural ingredients. Enjoy refreshing flavors crafted to support your wellness and active lifestyle.",
    color: "bg-zinc-600",
    index: "05",
    link: "https://juicery-one.vercel.app/",
    image: "/images/Juicery.png",
  },
  {
    title: "Prosthetic Dreams",
    description:
      "A modern e-commerce platform for prosthetic devices, combining sleek design with user-friendly navigation to enhance the shopping experience.",
    color: "bg-zinc-600",
    index: "06",
    link: "https://prosthetic-site.vercel.app/",
    image: "/images/prosthetic-site.png",
  },
  {
    title: "Sentinal",
    description:
      "A cutting-edge AI-powered security solution that leverages advanced algorithms to provide real-time threat detection and response.",
    color: "bg-zinc-600",
    index: "07",
    link: "https://sentinal-ai-ashen.vercel.app/",
    image: "/images/Sentinal.png",
  },
  {
    title: "JARVIS",
    description: "A UI for AI assistant JARVIS from Ironman",
    color: "bg-zinc-600",
    index: "08",
    link: "https://jarvis-beta-1-0-0.vercel.app/",
    image: "/images/JARVIS.png",
  },
  {
    title: "WeatherX",
    description:
      "A modern weather application that provides accurate forecasts and real-time updates.",
    color: "bg-zinc-600",
    index: "09",
    link: "https://weather-app-lime-five-71.vercel.app/",
    image: "/images/weather-app.png",
  },
  {
    title: "tic-tac-toe",
    description: "A classic game of tic-tac-toe with a modern twist.",
    color: "bg-zinc-600",
    index: "10",
    link: "https://tictactoe-rho-lovat.vercel.app/",
    image: "/images/tictactoe.png",
  },
  {
    title: "image-gen",
    description:
      "A image search engine based on search query and image fetch using  api.",
    color: "bg-zinc-600",
    index: "11",
    link: "https://image-search-app-nu-henna.vercel.app/",
    image: "/images/image-gen.png",
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[0];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // same stacking principle as component B
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const topOffset = index * 0.5; // Keep the stagger without touching window during prerender

  return (
    <div
      ref={ref}
      className="h-screen sticky top-0.5 flex items-center justify-center lg:min-w-6xl md:min-w-4xl"
    >
      <motion.article
        style={{
          scale,
          top: `${topOffset}vh`,
        }}
        className={`relative w-full max-w-6xl h-135 overflow-hidden rounded-[40px] border border-white/10 shadow-2xl`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row h-full gap-8 p-8 md:p-12 px-6 md:px-12 py-24 md:py-32 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-3xl backdrop-saturate-200 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Left */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-5xl md:text-7xl font-black text-white/10">
                {project.index}
              </span>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                →
              </a>
            </div>

            <div>
              <h3 className="text-4xl md:text-6xl font-black leading-none tracking-tight mb-6">
                {project.title}
              </h3>

              <p className="max-w-md text-zinc-300 text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 relative rounded-[28px] overflow-hidden min-h-60">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function StackedCards() {
  return (
    <section id="work" className="relative z-10  px-6 md:px-12 py-24">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            SELECTED <span className="text-red-500">WORKS</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-zinc-400 text-lg"
        >
          Scroll to explore projects.
        </motion.p>
      </div>

      {/* Cards */}
      <div className=" flex flex-col items-center justify-start">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
