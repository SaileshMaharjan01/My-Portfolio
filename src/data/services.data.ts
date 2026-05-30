export type ServiceItem = {
  id: string;
  name: string;
  description: string;
};

export const servicesData: ServiceItem[] = [
  {
    id: "01",
    name: "UI/UX Design",
    description:
      "Designing intuitive interfaces, user flows, and digital experiences that balance usability, aesthetics, and business goals.",
  },
  {
    id: "02",
    name: "Interactive 3D Websites",
    description:
      "Building immersive web experiences with Three.js, React Three Fiber, and modern web technologies that engage users through depth and interaction.",
  },
  {
    id: "03",
    name: "Frontend Development",
    description:
      "Transforming designs into performant, responsive, and accessible applications using React, Next.js, TypeScript, and modern frontend architectures.",
  },
  {
    id: "04",
    name: "Motion & Interaction Design",
    description:
      "Crafting meaningful animations, micro-interactions, and scroll-driven experiences that enhance usability and bring interfaces to life.",
  },
  {
    id: "05",
    name: "Design Systems",
    description:
      "Creating scalable component libraries and design systems that ensure consistency across products while accelerating development workflows.",
  },
  {
    id: "06",
    name: "Creative Development",
    description:
      "Bridging design and engineering to create unique digital experiences that combine storytelling, interaction, and cutting-edge web technologies.",
  },
];
