'use client';

import React, { useState, useEffect, useRef, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { MailOpen } from 'lucide-react';

function isWebGLAvailable() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn('R3F WebGL Error caught, falling back to 2D:', error);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ── 3D Envelope Mesh with navy + cream colors ── */
function EnvelopeMesh({ isOpen }: { isOpen: boolean }) {
  const flapRef = useRef<THREE.Group>(null);
  const targetRotation = isOpen ? -Math.PI * 0.75 : 0;

  useFrame((_, delta) => {
    if (flapRef.current) {
      flapRef.current.rotation.x = THREE.MathUtils.damp(
        flapRef.current.rotation.x,
        targetRotation,
        5,
        delta
      );
    }
  });

  return (
    <group position={[0, -0.2, 0]} rotation={[0.2, 0, 0]}>
      {/* Envelope body — navy deep */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="#17335C" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Wax seal — gold */}
      <mesh position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Flap — navy accent */}
      <group ref={flapRef} position={[0, 1, 0]}>
        <mesh position={[0, -0.5, 0.02]}>
          <coneGeometry args={[1.5, 1, 4]} />
          <meshStandardMaterial color="#3E5C8A" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/* ── 2D fallback envelope (navy + gold) ── */
function Fallback2DEnvelope({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-64 h-44 rounded-lg shadow-2xl relative flex items-center justify-center overflow-hidden border-2"
        style={{ backgroundColor: '#17335C', borderColor: 'rgba(212,175,55,0.4)' }}
      >
        <div
          className="absolute top-0 left-0 w-full h-1/2"
          style={{ backgroundColor: '#3E5C8A', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        />
        <div
          className="w-14 h-14 rounded-full border flex items-center justify-center shadow-lg z-10"
          style={{ backgroundColor: '#D4AF37', borderColor: 'rgba(255,255,255,0.3)' }}
        >
          <span className="font-script text-xl font-bold" style={{ color: '#17335C' }}>A &amp; M</span>
        </div>
      </motion.div>
      {!isOpen && (
        <button
          onClick={onOpen}
          className="mt-6 px-8 py-3 rounded-full font-serif-title tracking-widest text-sm shadow-xl flex items-center gap-2 hover:opacity-90 transition-all border"
          style={{ backgroundColor: '#F7F3EA', color: '#17335C', borderColor: 'rgba(23,51,92,0.2)' }}
        >
          <MailOpen className="w-4 h-4" />
          Buka Undangan
        </button>
      )}
    </div>
  );
}

interface Envelope3DProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const Envelope3D: React.FC<Envelope3DProps> = ({ isOpen, onOpen }) => {
  const [canUseWebGL, setCanUseWebGL] = useState<boolean>(true);

  useEffect(() => {
    setCanUseWebGL(isWebGLAvailable());
  }, []);

  if (!canUseWebGL) {
    return <Fallback2DEnvelope isOpen={isOpen} onOpen={onOpen} />;
  }

  return (
    <WebGLErrorBoundary fallback={<Fallback2DEnvelope isOpen={isOpen} onOpen={onOpen} />}>
      <div className="w-full h-64 relative flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          <EnvelopeMesh isOpen={isOpen} />
        </Canvas>
        {/* Open button overlay when not opened */}
        {!isOpen && (
          <div className="absolute bottom-0 w-full flex justify-center">
            <button
              onClick={onOpen}
              className="px-8 py-2.5 rounded-full font-serif-title tracking-widest text-xs shadow-xl flex items-center gap-2 border border-cream/30 hover:bg-white hover:text-navy-deep transition-all"
              style={{ backgroundColor: 'rgba(247,243,234,0.15)', color: '#F7F3EA', backdropFilter: 'blur(4px)' }}
            >
              <MailOpen className="w-4 h-4" />
              Buka Undangan
            </button>
          </div>
        )}
      </div>
    </WebGLErrorBoundary>
  );
};
