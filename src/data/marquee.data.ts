export type MarqueeSkill = {
  name: string;
  glyph: string;
  accent: string;
  description: string;
  eyebrow: string;
};

export const marqueeImages: MarqueeSkill[] = [
  {
    name: "HTML",
    glyph: "<>",
    accent: "from-orange-400 to-amber-600",
    description: "Semantic structure",
    eyebrow: "Markup foundation",
  },
  {
    name: "CSS",
    glyph: "{}",
    accent: "from-sky-400 to-cyan-600",
    description: "Visual systems",
    eyebrow: "Styling layers",
  },
  {
    name: "JavaScript",
    glyph: "JS",
    accent: "from-yellow-300 to-amber-500",
    description: "Interactive logic",
    eyebrow: "Behavior engine",
  },
  {
    name: "React",
    glyph: "⚛",
    accent: "from-cyan-300 to-sky-600",
    description: "Component flow",
    eyebrow: "UI architecture",
  },
  {
    name: "Next.js",
    glyph: "N",
    accent: "from-zinc-100 to-zinc-500",
    description: "App architecture",
    eyebrow: "App routing",
  },
  {
    name: "TypeScript",
    glyph: "TS",
    accent: "from-blue-300 to-blue-700",
    description: "Typed systems",
    eyebrow: "Safe code paths",
  },
  {
    name: "Tailwind CSS",
    glyph: "TW",
    accent: "from-sky-300 to-indigo-500",
    description: "Utility styling",
    eyebrow: "Design tokens",
  },
  {
    name: "SCSS",
    glyph: "S",
    accent: "from-pink-300 to-rose-600",
    description: "Theming layers",
    eyebrow: "Scaled styling",
  },
  {
    name: "Node.js",
    glyph: "⟡",
    accent: "from-emerald-300 to-green-700",
    description: "Runtime tooling",
    eyebrow: "Server runtime",
  },
  {
    name: "MongoDB",
    glyph: "M",
    accent: "from-green-300 to-emerald-700",
    description: "Data handling",
    eyebrow: "Data storage",
  },
  {
    name: "Adobe Suite",
    glyph: "A",
    accent: "from-red-300 to-pink-700",
    description: "Creative polish",
    eyebrow: "Visual direction",
  },
  {
    name: "Blender",
    glyph: "B",
    accent: "from-amber-300 to-orange-700",
    description: "3D asset craft",
    eyebrow: "3D modeling",
  },
];
