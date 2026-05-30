"use client";

import {
  ContactShadows,
  Environment,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
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
    <primitive ref={modelRef} object={scene} scale={0.6} position={[0, 0, 0]} />
  );
}

function MainModel() {
  const { scene } = useGLTF("/mecha.glb");
  const modelRef = useRef<THREE.Group>(null);
  const currentPose = useRef({
    position: new THREE.Vector3(0, -0.2, 0.9),
    rotation: new THREE.Euler(0.03, 0.06, 0),
    scale: 0.35,
  });

  useFrame(() => {
    if (!modelRef.current) return;

    const scrollY = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    const targetPose = getMechaPose(scrollProgress);

    currentPose.current.position.lerp(targetPose.position, 0.08);
    currentPose.current.rotation.x = THREE.MathUtils.lerp(
      currentPose.current.rotation.x,
      targetPose.rotation.x,
      0.08,
    );
    currentPose.current.rotation.y = THREE.MathUtils.lerp(
      currentPose.current.rotation.y,
      targetPose.rotation.y,
      0.08,
    );
    currentPose.current.rotation.z = THREE.MathUtils.lerp(
      currentPose.current.rotation.z,
      targetPose.rotation.z,
      0.08,
    );
    currentPose.current.scale = THREE.MathUtils.lerp(
      currentPose.current.scale,
      targetPose.scale,
      0.08,
    );

    modelRef.current.position.copy(currentPose.current.position);
    modelRef.current.rotation.copy(currentPose.current.rotation);
    modelRef.current.scale.setScalar(currentPose.current.scale);
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.35}
      position={[0, -2.5, 0]}
    />
  );
}

function getMechaPose(progress: number) {
  const t = THREE.MathUtils.clamp(progress, 0, 1);

  if (t < 0.33) {
    return interpolatePose(
      {
        position: new THREE.Vector3(0, -2.5, 0.9),
        rotation: new THREE.Euler(0.03, 0.06, 0),
        scale: 0.35,
      },
      {
        position: new THREE.Vector3(0.08, -2.65, 0.98),
        rotation: new THREE.Euler(0.01, -2, -0.01),
        scale: 0.35,
      },
      t / 0.33,
    );
  }

  if (t < 0.68) {
    return interpolatePose(
      {
        position: new THREE.Vector3(0.08, -0.12, 0.98),
        rotation: new THREE.Euler(0.01, 0.02, -0.01),
        scale: 0.35,
      },
      {
        position: new THREE.Vector3(0.75, -0.16, 0.72),
        rotation: new THREE.Euler(-0.03, 0.22, 0.02),
        scale: 0.35,
      },
      (t - 0.33) / 0.35,
    );
  }

  return interpolatePose(
    {
      position: new THREE.Vector3(0.75, -2.75, 0.72),
      rotation: new THREE.Euler(-0.03, -2.75, 0.02),
      scale: 0.35,
    },
    {
      position: new THREE.Vector3(3.5, -2.75, 1.64),
      rotation: new THREE.Euler(-0.1, -0.9, 0.02),
      scale: 0.35,
    },
    (t - 0.68) / 0.32,
  );
}

function interpolatePose(
  start: { position: THREE.Vector3; rotation: THREE.Euler; scale: number },
  end: { position: THREE.Vector3; rotation: THREE.Euler; scale: number },
  t: number,
) {
  const clampedT = THREE.MathUtils.clamp(t, 0, 1);
  return {
    position: start.position.clone().lerp(end.position, clampedT),
    rotation: new THREE.Euler(
      THREE.MathUtils.lerp(start.rotation.x, end.rotation.x, clampedT),
      THREE.MathUtils.lerp(start.rotation.y, end.rotation.y, clampedT),
      THREE.MathUtils.lerp(start.rotation.z, end.rotation.z, clampedT),
    ),
    scale: THREE.MathUtils.lerp(start.scale, end.scale, clampedT),
  };
}

export default function Scene() {
  return null;
}

export function SceneCanvas({
  isIntro,
  showMainModel,
}: {
  isIntro: boolean;
  showMainModel: boolean;
}) {
  return (
    <div className="fixed inset-0 w-full h-full bg-transparent z-0">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        frameloop="always"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />

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
          {isIntro ? <IntroModel /> : showMainModel ? <MainModel /> : null}
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
