"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const nodes=[{label:"QA",p:[-2.4,.8,0],c:"#22d3ee"},{label:"AWS",p:[2.2,1,-.4],c:"#a78bfa"},{label:"Java",p:[-1.8,-1.7,.5],c:"#f59e0b"},{label:"Linux",p:[2,-1.5,.2],c:"#34d399"}];
function World(){const group=useRef<THREE.Group>(null);const [active,setActive]=useState("QA");useFrame((s,d)=>{if(group.current){group.current.rotation.y+=d*.09;group.current.rotation.x=Math.sin(s.clock.elapsedTime*.2)*.08;}});return <group ref={group}>
 <Float speed={1.5} rotationIntensity={.25} floatIntensity={.7}><mesh><icosahedronGeometry args={[1.25,2]}/><meshStandardMaterial color="#7c3aed" wireframe emissive="#5b21b6" emissiveIntensity={1}/></mesh></Float>
 {[1.8,2.35,2.9].map((r,i)=><mesh key={r} rotation={[i*.8,.3+i*.4,i*.35]}><torusGeometry args={[r,.014,8,160]}/><meshBasicMaterial color={i===0?"#22d3ee":"#8b5cf6"} transparent opacity={.75-i*.15}/></mesh>)}
 {nodes.map(n=><group key={n.label} position={n.p as [number,number,number]} onPointerOver={()=>setActive(n.label)}><mesh scale={active===n.label?1.35:1}><sphereGeometry args={[.12,24,24]}/><meshStandardMaterial color={n.c} emissive={n.c} emissiveIntensity={2}/></mesh><Text position={[0,.28,0]} fontSize={.18} color="#ffffff" anchorX="center">{n.label}</Text></group>)}
 <points><bufferGeometry><bufferAttribute attach="attributes-position" count={120} array={new Float32Array(Array.from({length:360},()=> (Math.random()-.5)*7))} itemSize={3}/></bufferGeometry><pointsMaterial size={.025} color="#a78bfa" transparent opacity={.8}/></points>
 </group>}
export default function Scene(){return <Canvas camera={{position:[0,0,7],fov:46}} dpr={[1,1.7]}><ambientLight intensity={1}/><pointLight position={[4,5,6]} intensity={35}/><pointLight position={[-4,-3,2]} intensity={18} color="#22d3ee"/><Stars radius={80} depth={40} count={1600} factor={3} fade speed={.35}/><World/><OrbitControls enablePan={false} minDistance={5} maxDistance={9} autoRotate autoRotateSpeed={.25}/></Canvas>}
