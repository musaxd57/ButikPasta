'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
  Html,
} from '@react-three/drei';
import { useTranslations } from 'next-intl';
import { Camera, Loader2 } from 'lucide-react';
import CakeModel from './CakeModel';
import type { CakeConfig } from '@/types/cake';
import { useToast } from '@/components/ui/Toast';

function Loader() {
  return (
    <Html center>
      <Loader2 className="animate-spin text-gold" size={32} />
    </Html>
  );
}

export default function CakeViewer({ config }: { config: CakeConfig }) {
  const t = useTranslations('configurator');
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const snapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `atelier-cake-${Date.now()}.png`;
    link.href = url;
    link.click();
    toast(t('snapshotSaved'), 'success');
  };

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#26211a] to-charcoal-dark md:h-[600px]">
      <Canvas
        ref={canvasRef}
        shadows
        dpr={[1, 1.6]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ position: [0, 1.5, 5], fov: 40 }}
      >
        <color attach="background" args={['#1a1712']} />
        <ambientLight intensity={0.6} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.4}
          penumbra={1}
          intensity={1.4}
          castShadow
          color="#fff4d6"
        />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#C9A84C" />
        <Suspense fallback={<Loader />}>
          <CakeModel config={config} />
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.5}
            scale={10}
            blur={2.4}
            far={4}
          />
          {/* Procedural studio environment — gives soft gold reflections for
              fondant/ganache without downloading a multi-MB HDRI. */}
          <Environment resolution={128} frames={1}>
            <Lightformer
              intensity={2.2}
              position={[0, 4, 3]}
              scale={[8, 8, 1]}
              color="#fff4d6"
            />
            <Lightformer
              intensity={1.1}
              position={[-5, 1, -2]}
              scale={[5, 5, 1]}
              color="#C9A84C"
            />
            <Lightformer
              intensity={1.3}
              position={[5, 2, 2]}
              scale={[5, 5, 1]}
              color="#ffffff"
            />
          </Environment>
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.9}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/40">
        {t('rotateHint')}
      </p>

      <button
        onClick={snapshot}
        className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-gold/40 bg-charcoal/60 px-4 py-2 text-xs uppercase tracking-wider text-gold backdrop-blur transition hover:bg-gold hover:text-charcoal"
      >
        <Camera size={15} />
        {t('snapshot')}
      </button>
    </div>
  );
}
