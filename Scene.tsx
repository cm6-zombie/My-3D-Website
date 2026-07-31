"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x += delta * 0.05;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.2}>
      <group ref={group}>
        <mesh><icosahedronGeometry args={[1.35, 1]} /><meshStandardMaterial color="#7c3aed" wireframe emissive="#4c1d95" emissiveIntensity={0.7} /></mesh>
        <mesh rotation={[0.4, 0.2, 0]}><torusGeometry args={[1.9, 0.025, 12, 100]} /><meshBasicMaterial color="#22d3ee" /></mesh>
        <mesh rotation={[1.1, 0.4, 0.5]}><torusGeometry args={[2.25, 0.018, 12, 100]} /><meshBasicMaterial color="#a78bfa" /></mesh>
      </group>
    </Float>
  );
}

export default function Scene() {
  return <Canvas camera={{ position: [0, 0, 6], fov: 48 }} dpr={[1, 1.7]}>
    <ambientLight intensity={0.8} /><pointLight position={[5, 5, 5]} intensity={25} /><Stars radius={70} depth={30} count={1000} factor={3} fade speed={0.5} />
    <Core /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
  </Canvas>;
}
