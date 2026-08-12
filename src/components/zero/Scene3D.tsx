import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlowingWireframe() {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.1;
      coreRef.current.rotation.y += delta * 0.15;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x -= delta * 0.05;
      outerRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      {/* Inner glowing core */}
      <Icosahedron ref={coreRef} args={[1.5, 1]}>
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.4} />
      </Icosahedron>

      {/* Outer subtle shell rotating oppositely */}
      <Icosahedron ref={outerRef} args={[2.2, 1]}>
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.15} />
      </Icosahedron>

      {/* Third outermost shell */}
      <Icosahedron args={[3, 2]}>
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.05} />
      </Icosahedron>
    </Float>
  );
}

export function Scene3D() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-60 mix-blend-screen overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        {/* Fog fades to black, which with mix-blend-screen makes it perfectly transparent */}
        <fog attach="fog" args={["#000000", 3, 9]} />
        <GlowingWireframe />
      </Canvas>

      {/* Bottom fade gradient so it blends smoothly into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}
