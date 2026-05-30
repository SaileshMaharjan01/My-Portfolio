"use client";

import { servicesData } from "@/data/services.data";
import { motion } from "framer-motion";

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

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-10 w-full border-y border-white/10 px-6 md:px-12 py-24 md:py-32bg-black/20 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto max-w-7xl">
        <div className=" text-center">
          <FadeInUp>
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-secondary">
              Services
            </p>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-none">
              Crafted to turn ideas into{" "}
              <span className="text-cta">immersive</span> interfaces.
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="mt-6  text-lg md:text-xl leading-relaxed text-secondary">
              The focus is on visually strong, performant sections that feel
              premium, move smoothly, and support a clear message.
            </p>
          </FadeInUp>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col">
          {servicesData.map((service, index) => (
            <FadeInUp key={service.id} delay={0.08 * index}>
              <article className="group border-b border-white/10 py-8 md:py-10 transition-colors hover:border-cta/40">
                <div className="grid gap-4 md:grid-cols-[auto,minmax(0,1fr)] md:items-start md:gap-8">
                  <span className="font-mono text-sm uppercase tracking-[0.35em] text-white/35 group-hover:text-cta transition-colors">
                    {service.id}
                  </span>

                  <div className="grid gap-3 md:grid-cols-[minmax(0,0.7fr),minmax(0,1fr)] md:items-start md:gap-8">
                    <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">
                      {service.name}
                    </h3>

                    <p className="max-w-2xl text-base md:text-lg leading-relaxed text-secondary">
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
