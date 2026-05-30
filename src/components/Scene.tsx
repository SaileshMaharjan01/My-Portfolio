"use client";

import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function IntroModel() {
  const { scene } = useGLTF("/axe.glb");
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += 0.02;
    modelRef.current.rotation.x += 0.01;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.6}
        position={[0, 0, 0]}
      />
    </Float>
  );
}

function MainModel() {
  const { scene } = useGLTF("/mecha.glb");
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!modelRef.current) return;

    const scrollY = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;

    modelRef.current.position.x = THREE.MathUtils.lerp(0, 2, scrollProgress);
    modelRef.current.position.y = THREE.MathUtils.lerp(
      -2.5,
      -2.5,
      scrollProgress,
    );
    modelRef.current.position.z = THREE.MathUtils.lerp(0, -2, scrollProgress);

    modelRef.current.rotation.y = scrollProgress * Math.PI * 2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.35}
        position={[0, -2.5, 0]}
      />
    </Float>
  );
}

function SceneOrbitControls() {
  const invalidate = useThree((state) => state.invalidate);

  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      onChange={() => invalidate()}
    />
  );
}

function ScrollInvalidator() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    let rafId = 0;

    const scheduleInvalidate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        invalidate();
      });
    };

    window.addEventListener("scroll", scheduleInvalidate, { passive: true });
    window.addEventListener("resize", scheduleInvalidate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleInvalidate);
      window.removeEventListener("resize", scheduleInvalidate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [invalidate]);

  return null;
}

export default function Scene({ isIntro }: { isIntro: boolean }) {
  return (
    <div className="fixed inset-0 w-full h-full bg-transparent z-0">
      <Canvas shadows gl={{ alpha: true }} frameloop={isIntro ? "always" : "demand"}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <SceneOrbitControls />
        <ScrollInvalidator />

        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
          color="#EF4444"
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#EF4444" />

        <Suspense fallback={null}>
          {isIntro ? <IntroModel /> : <MainModel />}
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.6}
            scale={20}
            blur={2}
            far={4.5}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
