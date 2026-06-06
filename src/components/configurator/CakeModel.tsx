'use client';

import { useMemo } from 'react';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { CakeConfig, FlavorKey, SizeKey } from '@/types/cake';

const SIZE_RADIUS: Record<SizeKey, number> = {
  small: 0.85,
  medium: 1.15,
  large: 1.5,
};

const TIER_HEIGHT = 0.7;

// Sponge/flavor colours show as a thin band where the frosting "reveals" cake.
const FLAVOR_COLOR: Record<FlavorKey, string> = {
  chocolate: '#5a3825',
  vanilla: '#f3e3c3',
  redvelvet: '#8e2b2b',
  pistachio: '#bcd49a',
  lemon: '#f5e08a',
};

function Decorations({
  config,
  radius,
  topY,
}: {
  config: CakeConfig;
  radius: number;
  topY: number;
}) {
  const items = useMemo(() => {
    const meshes: JSX.Element[] = [];
    const ring = (count: number, r: number, y: number, render: (i: number) => JSX.Element) => {
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        meshes.push(
          <group key={`${y}-${i}-${r}`} position={[Math.cos(a) * r, y, Math.sin(a) * r]}>
            {render(i)}
          </group>,
        );
      }
    };

    if (config.decorations.includes('berries')) {
      ring(10, radius * 0.78, topY + 0.06, () => (
        <mesh castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#8e1b3a" roughness={0.3} />
        </mesh>
      ));
    }
    if (config.decorations.includes('macarons')) {
      ring(8, radius * 0.82, topY + 0.05, (i) => (
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.1, 24]} />
          <meshStandardMaterial
            color={['#C4896F', '#E0C878', '#bcd49a'][i % 3]}
            roughness={0.5}
          />
        </mesh>
      ));
    }
    if (config.decorations.includes('flowers')) {
      ring(6, radius * 0.6, topY + 0.1, () => (
        <group>
          {Array.from({ length: 5 }).map((_, p) => {
            const pa = (p / 5) * Math.PI * 2;
            return (
              <mesh key={p} position={[Math.cos(pa) * 0.09, 0, Math.sin(pa) * 0.09]} castShadow>
                <sphereGeometry args={[0.07, 12, 12]} />
                <meshStandardMaterial color="#F3D9CF" roughness={0.6} />
              </mesh>
            );
          })}
          <mesh>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#C9A84C" />
          </mesh>
        </group>
      ));
    }
    if (config.decorations.includes('topper')) {
      meshes.push(
        <group key="topper" position={[0, topY + 0.45, 0]}>
          <mesh castShadow>
            <torusGeometry args={[0.22, 0.05, 16, 40]} />
            <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>,
      );
    }
    return meshes;
  }, [config.decorations, radius, topY]);

  return <>{items}</>;
}

export default function CakeModel({ config }: { config: CakeConfig }) {
  const tiers = config.tiers;

  // Compute stacked Y positions; tier 0 is the bottom (largest).
  let y = 0;
  const placed = tiers.map((tier) => {
    const radius = SIZE_RADIUS[tier.size];
    const cy = y + TIER_HEIGHT / 2;
    y += TIER_HEIGHT;
    return { tier, radius, cy };
  });

  const topTier = placed[placed.length - 1];
  const topY = topTier.cy + TIER_HEIGHT / 2;
  const hasDrip = config.decorations.includes('drip');

  return (
    <group position={[0, -y / 2, 0]}>
      {/* Cake plate */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <cylinderGeometry args={[SIZE_RADIUS[tiers[0].size] + 0.35, SIZE_RADIUS[tiers[0].size] + 0.45, 0.12, 64]} />
        <meshStandardMaterial color="#e8e0d0" metalness={0.3} roughness={0.4} />
      </mesh>

      {placed.map(({ tier, radius, cy }, i) => (
        <group key={i}>
          {/* Frosted tier */}
          <mesh position={[0, cy, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[radius, radius, TIER_HEIGHT, 64]} />
            <meshStandardMaterial
              color={config.frostingColor}
              roughness={config.frosting === 'fondant' ? 0.25 : 0.7}
              metalness={config.frosting === 'ganache' ? 0.15 : 0}
            />
          </mesh>

          {/* Drip effect ring */}
          {hasDrip && (
            <mesh position={[0, cy + TIER_HEIGHT / 2 - 0.02, 0]}>
              <cylinderGeometry args={[radius + 0.015, radius + 0.015, 0.18, 64, 1, true]} />
              <meshStandardMaterial
                color="#C9A84C"
                side={THREE.DoubleSide}
                roughness={0.3}
              />
            </mesh>
          )}

          {/* Flavor band hint */}
          <mesh position={[0, cy - TIER_HEIGHT / 2 + 0.05, 0]}>
            <cylinderGeometry args={[radius + 0.005, radius + 0.005, 0.06, 64]} />
            <meshStandardMaterial color={FLAVOR_COLOR[tier.flavor]} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Message text on the cake */}
      {config.message.trim() && (
        <Float speed={2} floatIntensity={0.3} rotationIntensity={0}>
          <Text
            position={[0, topTier.cy, topTier.radius + 0.02]}
            fontSize={0.16}
            maxWidth={topTier.radius * 1.6}
            textAlign="center"
            color="#A88A38"
            anchorX="center"
            anchorY="middle"
          >
            {config.message.slice(0, 30)}
          </Text>
        </Float>
      )}

      <Decorations config={config} radius={topTier.radius} topY={topY} />
    </group>
  );
}
