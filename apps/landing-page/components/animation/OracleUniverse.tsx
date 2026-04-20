"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * Background Environment - Milky Way
 */
const Skybox = () => {
    const { scene } = useThree();
    const texture = useLoader(THREE.TextureLoader, "/images/2k_stars_milky_way.jpg");
    
    useEffect(() => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        scene.background = texture;
    }, [texture, scene]);

    return null;
};

/**
 * Earth - The Disconnected Reality
 */
const Earth = ({ position }: { position: [number, number, number] }) => {
    const texture = useLoader(THREE.TextureLoader, "/images/2k_earth_daymap.jpg");
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.05; });
    
    return (
      <mesh position={position} ref={ref} receiveShadow castShadow>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial map={texture} roughness={0.6} metalness={0.1} />
      </mesh>
    );
};

/**
 * Mars - The Blind Chain
 */
const Mars = ({ position }: { position: [number, number, number] }) => {
    const texture = useLoader(THREE.TextureLoader, "/images/2k_mars.jpg");
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.03; });
    
    return (
      <mesh position={position} ref={ref} receiveShadow castShadow>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial map={texture} roughness={0.9} metalness={0.2} emissive="#221105" emissiveIntensity={0.2} />
      </mesh>
    );
};

/**
 * Friehub Core - The Central Oracle Base
 */
const FriehubCore = ({ position, planetRef }: { position: [number, number, number], planetRef: React.RefObject<THREE.Mesh> }) => {
  const texture = useLoader(THREE.TextureLoader, "/images/2k_makemake_fictional.jpg");

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.02; // Slower majestic rotation
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
      <mesh position={position} ref={planetRef} receiveShadow castShadow>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={1}
          metalness={0.2}
          emissive={new THREE.Color("#050505")}
          emissiveIntensity={1}
        />
      </mesh>
    </Float>
  );
};

/**
 * Oracle Satellite Node
 */
const Satellite = ({ position, color, streamIntensityRef, speedOffset }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const blinkRef = useRef(0);

    useFrame((_, delta) => {
        blinkRef.current += delta * (5 * speedOffset);
        if (lightRef.current) {
            lightRef.current.intensity = (Math.sin(blinkRef.current) > 0.5 ? 3 : 0.2) * streamIntensityRef.current;
        }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <boxGeometry args={[0.1, 0.1, 0.2]} />
                <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
            </mesh>
            <pointLight ref={lightRef} color={color} distance={2} decay={2} />
        </group>
    );
};

/**
 * Hub Node System - Attached to Friehub Core
 */
const NodeSystem = ({ nodesRef, count = 30, streamIntensityRef, corePosition }: any) => {
    const streamsRef = useRef<THREE.Group>(null);
    const DATA_COLORS = ["#49E774", "#4970E7", "#E74949", "#E7E749", "#E749E7", "#49E7E7"];

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const radius = 6.5 + Math.random() * 5;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.05 + Math.random() * 0.2;
            const yOffset = (Math.random() - 0.5) * 8;
            const color = DATA_COLORS[i % DATA_COLORS.length];
            // Fix: Extract speed multiplier for the satellite blinking independently
            const blinkSpeed = 0.5 + Math.random(); 
            temp.push({ radius, angle, speed, yOffset, color, blinkSpeed });
        }
        return temp;
    }, [count]);

    // Use a secondary ref to rotate the entire system cleanly
    const parentRotator = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (!streamsRef.current) return;
        
        if (parentRotator.current) {
            parentRotator.current.rotation.y += delta * 0.02; // Very slow global orbit
        }

        particles.forEach((p, i) => {
            p.angle += delta * p.speed * (1 + streamIntensityRef.current * 0.5);
            const x = Math.cos(p.angle) * p.radius;
            const z = Math.sin(p.angle) * p.radius;

            const stream = streamsRef.current!.children[i] as THREE.Mesh;
            if (stream) {
                stream.position.set(x / 2, p.yOffset / 2, z / 2);
                stream.lookAt(0, 0, 0); 
                stream.scale.set(1, 1, p.radius);
                (stream.material as THREE.MeshStandardMaterial).opacity = streamIntensityRef.current * 0.6;
            }
        });
    });

    return (
        <group ref={nodesRef} position={corePosition}>
            <group ref={parentRotator}>
                {particles.map((p, i) => (
                    <Satellite 
                        key={i} 
                        position={[Math.cos(p.angle) * p.radius, p.yOffset, Math.sin(p.angle) * p.radius]} 
                        color={p.color}
                        streamIntensityRef={streamIntensityRef}
                        speedOffset={p.blinkSpeed}
                    />
                ))}
                <group ref={streamsRef}>
                    {particles.map((p, i) => (
                        <mesh key={`stream-${i}`}>
                            <cylinderGeometry args={[0.005, 0.005, 1, 4]} />
                            <meshStandardMaterial color={p.color} emissive={p.color} transparent opacity={0} blending={THREE.AdditiveBlending} />
                        </mesh>
                    ))}
                </group>
            </group>
        </group>
    );
};

/**
 * Camera Controller
 */
const CameraRig = ({ cameraRef, targetRef }: { cameraRef: React.RefObject<any>, targetRef: React.MutableRefObject<THREE.Vector3> }) => {
    useFrame(() => {
        if (cameraRef.current) {
            cameraRef.current.lookAt(targetRef.current);
        }
    });
    return null;
};

export const OracleUniverse: React.FC = () => {
  const planetRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<any>(null);
  
  // Positions
  const posEarth: [number, number, number] = [-30, 0, 0];
  const posMars: [number, number, number] = [30, 10, -50];
  const posFriehub: [number, number, number] = [0, -10, -110];

  const cameraTarget = useRef(new THREE.Vector3(...posEarth));
  const streamIntensity = useRef(0);
  
  const [narrative, setNarrative] = useState("");
  const [introFinished, setIntroFinished] = useState(false);

  // --- THE RAPID CINEMATIC INTRO --- //
  useGSAP(() => {
    const tl = gsap.timeline({
        onComplete: () => {
             setNarrative("");
             setIntroFinished(true); // Triggers the Side-by-Side Hero lock
        }
    });

    // Initial setup (Start far left of Earth)
    tl.set(cameraRef.current?.position || {}, { x: -40, y: 5, z: 12 });

    // Scene 1: The Raw World
    tl.to(cameraRef.current?.position || {}, { x: -20, y: -2, z: 5, duration: 1.5, ease: "slow" }, 0);
    tl.fromTo((val: any) => setNarrative(""), { x: 0 }, { x: 1, duration: 1.5, onStart: () => setNarrative("DEFRAGMENTING DATA SILOS...") }, 0.2);

    // Scene 2: The Blind Blockchains (Warp to Mars)
    tl.to(cameraRef.current?.position || {}, { x: 30, y: 10, z: -30, duration: 1.5, ease: "circ.inOut", onStart: () => setNarrative("ISOLATED CONSENSUS DETECTED.") }, 1.5);
    tl.to(cameraTarget.current, { x: posMars[0], y: posMars[1], z: posMars[2], duration: 1.5, ease: "circ.inOut" }, 1.5);

    // Scene 3: The Hub Reveal (Warp to Friehub)
    // We target the camera slightly to the LEFT of the planet, so Friehub sits on the RIGHT half of the screen.
    tl.to(cameraRef.current?.position || {}, { x: 15, y: -7, z: -90, duration: 2.5, ease: "power3.out", onStart: () => setNarrative("ACTIVATING FRIEHUB PROTOCOL.") }, 3);
    tl.to(cameraTarget.current, { x: posFriehub[0] - 10, y: posFriehub[1], z: posFriehub[2], duration: 2.5, ease: "power3.out" }, 3);

    // Scene 4: Node Ignition (Instantly post-arrival)
    tl.to(streamIntensity, { current: 1, duration: 1 }, 4.5);
    if (nodesRef.current) {
        tl.fromTo(nodesRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1.5, ease: "back.out(1.5)" }, 4.5);
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-[#000] overflow-hidden">
      
      {/* --- THE 3D UNIVERSE --- */}
      <Canvas shadows>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[-30, 0, 15]} fov={45} />
        <CameraRig cameraRef={cameraRef} targetRef={cameraTarget} />
        
        <ambientLight intensity={0.15} />
        {/* Main "Sun" light driving deep shadows across the solar system */}
        <directionalLight position={[50, 20, 20]} intensity={4} color="#fff" castShadow shadow-mapSize={[2048, 2048]} />
        <pointLight position={[-10, -10, -50]} intensity={0.5} color="#4970E7" />

        <React.Suspense fallback={null}>
          <Skybox />
          <Earth position={posEarth} />
          <Mars position={posMars} />
          <FriehubCore position={posFriehub} planetRef={planetRef as React.RefObject<THREE.Mesh>} />
          <NodeSystem nodesRef={nodesRef} count={50} streamIntensityRef={streamIntensity} corePosition={posFriehub} />

          <Stars radius={200} depth={100} count={5000} factor={4} saturation={0} fade speed={0.2} />
        </React.Suspense>
      </Canvas>

      {/* --- CINEMATIC INTRO SUBTITLES --- */}
      {!introFinished && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6">
           <AnimatePresence mode="wait">
             {narrative && (
               <motion.div
                 key={narrative}
                 initial={{ opacity: 0, y: 15, scale: 0.98 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                 transition={{ duration: 0.5, ease: "easeOut" }}
                 className="text-center w-full max-w-4xl"
               >
                 <h2 className="font-display text-xl md:text-3xl text-white uppercase font-bold tracking-[0.3em] drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                   {narrative}
                 </h2>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
      )}

      {/* --- THE SIDE-BY-SIDE HERO CONTENT (Appears when intro finishes) --- */}
      <AnimatePresence>
        {introFinished && (
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 w-full md:w-[65%] flex flex-col justify-center px-8 sm:px-12 lg:px-24 z-30 pointer-events-auto"
            >
                <div className="relative p-8 md:p-12 lg:p-16 rounded-[2rem] overflow-hidden group">
                    
                    {/* Glassmorphic Background that blocks out the stars behind the text */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl border border-white/5 -z-10 transition-all duration-700 group-hover:bg-black/70" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tighter leading-[1.05] mb-8 drop-shadow-2xl">

                        Oracles Built on Proof, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-emerald-400 drop-shadow-[0_0_30px_rgba(73,231,116,0.2)]">
                           Not Promises.
                        </span>
                    </h1>
                    
                    <p className="text-white/70 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed mb-10 font-light tracking-wide">
                        TaaS is the first oracle network where every data response is validated by invariant guards, aggregated by a manifest-driven strategy engine, and finalized by BLS threshold consensus and then secured by EigenLayer restaking.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            href="https://github.com/friehub/Taas" 
                            className="h-14 px-8 bg-primary text-[#050505] font-black text-xs md:text-sm tracking-wider uppercase rounded-sm hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center"
                        >
                            Deploy Infrastructure
                        </Link>
                        <Link 
                            href="https://docs.friehub.cloud" 
                            className="h-14 px-8 bg-white/5 border border-white/10 text-white font-bold text-xs md:text-sm tracking-widest uppercase rounded-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                        >
                            Read Arch Spec
                        </Link>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Vignette to ground the scene */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.95)] z-20" />
    </div>
  );
};

export default OracleUniverse;
