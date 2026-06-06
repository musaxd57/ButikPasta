/**
 * Generates real .glb (binary glTF) assets from procedural Three.js geometry.
 * Output: public/models/*.glb — loaded at runtime via drei's useGLTF.
 *
 * Run with: node scripts/export-models.mjs
 *
 * GLTFExporter targets the browser, so we provide the few globals it touches
 * when exporting geometry-only (no textures) scenes in Node.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

// Minimal browser-global shims for Node. GLTFExporter converts the binary
// payload via a Blob + FileReader, so we provide a compatible FileReader that
// supports both the on* handlers and addEventListener.
globalThis.self = globalThis;
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class {
    constructor() {
      this.result = null;
      this._listeners = {};
    }
    addEventListener(type, cb) {
      (this._listeners[type] ||= []).push(cb);
    }
    _emit(type) {
      const ev = { target: this };
      this[`on${type}`]?.(ev);
      (this._listeners[type] || []).forEach((cb) => cb(ev));
    }
    readAsArrayBuffer(blob) {
      blob
        .arrayBuffer()
        .then((buf) => {
          this.result = buf;
          this._emit('load');
          this._emit('loadend');
        })
        .catch((err) => {
          this.error = err;
          this._emit('error');
          this._emit('loadend');
        });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        const b64 = Buffer.from(buf).toString('base64');
        this.result = `data:${blob.type || 'application/octet-stream'};base64,${b64}`;
        this._emit('load');
        this._emit('loadend');
      });
    }
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../public/models');
mkdirSync(OUT_DIR, { recursive: true });

const exporter = new GLTFExporter();

async function exportScene(scene, name) {
  const result = await exporter.parseAsync(scene, { binary: true });
  const buffer = Buffer.from(result);
  writeFileSync(resolve(OUT_DIR, `${name}.glb`), buffer);
  console.log(`✓ ${name}.glb (${(buffer.length / 1024).toFixed(1)} KB)`);
}

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color: new THREE.Color(color), ...opts });
}

// ── Macaron ─────────────────────────────────────────────────────────────────
function macaron() {
  const g = new THREE.Group();
  const shell = mat('#C4896F', { roughness: 0.55 });
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), shell);
  top.position.y = 0.18;
  top.scale.y = 0.5;
  const bottom = top.clone();
  bottom.rotation.x = Math.PI;
  bottom.position.y = -0.18;
  const filling = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 32), mat('#FAF7F2', { roughness: 0.4 }));
  g.add(top, bottom, filling);
  return g;
}

// ── Berry ───────────────────────────────────────────────────────────────────
function berry() {
  const g = new THREE.Group();
  const m = mat('#8e1b3a', { roughness: 0.25 });
  const main = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), m);
  main.scale.set(1, 1.15, 1);
  g.add(main);
  return g;
}

// ── Flower (5 petals + center) ───────────────────────────────────────────────
function flower() {
  const g = new THREE.Group();
  const petalMat = mat('#F3D9CF', { roughness: 0.6 });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 16), petalMat);
    petal.position.set(Math.cos(a) * 0.42, 0, Math.sin(a) * 0.42);
    petal.scale.set(1, 0.4, 1.4);
    petal.rotation.y = -a;
    g.add(petal);
  }
  const center = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), mat('#C9A84C', { metalness: 0.3, roughness: 0.4 }));
  g.add(center);
  return g;
}

// ── Topper (gold ring) ───────────────────────────────────────────────────────
function topper() {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.12, 20, 48), mat('#C9A84C', { metalness: 0.9, roughness: 0.15 }));
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  return g;
}

// ── Showcase cake (2-tier, real GLTF base) ───────────────────────────────────
function cake() {
  const g = new THREE.Group();
  const frosting = mat('#FAF7F2', { roughness: 0.6 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.7, 64), frosting);
  base.position.y = 0.35;
  const mid = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.7, 64), frosting);
  mid.position.y = 1.05;
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.7, 64), frosting);
  top.position.y = 1.75;
  g.add(base, mid, top);
  return g;
}

async function main() {
  const items = [
    ['macaron', macaron()],
    ['berry', berry()],
    ['flower', flower()],
    ['topper', topper()],
    ['cake', cake()],
  ];
  for (const [name, obj] of items) {
    const scene = new THREE.Scene();
    scene.add(obj);
    await exportScene(scene, name);
  }
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
