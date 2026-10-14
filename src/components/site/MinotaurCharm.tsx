"use client";

import { useEffect, useRef, useState } from "react";
import geometryData from "./charm-geometry.json";

type Pt = [number, number];
type ShapeData = { outer: Pt[]; holes: Pt[][] };

const DATA = geometryData as ShapeData & { pieces: ShapeData[] };

const DEPTH = 0.3;
const BEVEL_T = 0.03;
const BEVEL_S = 0.018;
const ROT_SECONDS = 12; // one full turn

/**
 * The weeping Minotaur as a hollow chrome charm: his own line art extruded
 * as chrome ribbons (see-through everywhere else), rotating live in the hero.
 * Falls back to the flat mascot image until WebGL is running, and forever
 * if WebGL is unavailable.
 */
export default function MinotaurCharm({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;
      const mount = mountRef.current;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL: keep the flat mascot
      }
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();

      // Chrome studio: black void + bright softbox strips (PMREM env).
      const envScene = new THREE.Scene();
      envScene.background = new THREE.Color(0x000000);
      const room = new THREE.Mesh(
        new THREE.BoxGeometry(40, 24, 40),
        new THREE.MeshBasicMaterial({ color: 0x050505, side: THREE.BackSide }),
      );
      envScene.add(room);
      const strip = (w: number, h: number, x: number, y: number, z: number, ry: number, rx: number, i: number) => {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(i, i, i), side: THREE.DoubleSide }),
        );
        m.position.set(x, y, z);
        m.rotation.set(rx, ry, 0);
        envScene.add(m);
      };
      strip(18, 5, 0, 10, -6, 0, Math.PI / 2.6, 22);
      strip(4, 16, -13, 2, -2, Math.PI / 2.4, 0, 14);
      strip(4, 16, 13, 2, -2, -Math.PI / 2.4, 0, 14);
      strip(20, 4, 0, -3, 14, Math.PI, 0.5, 7);
      strip(10, 2.5, 0, 9, 12, Math.PI, -0.6, 10);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromScene(envScene, 0.06);
      scene.environment = envRT.texture;

      const buildShape = (d: ShapeData) => {
        const s = new THREE.Shape();
        d.outer.forEach(([x, y], i) => (i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)));
        s.closePath();
        for (const hole of d.holes) {
          const p = new THREE.Path();
          hole.forEach(([x, y], i) => (i === 0 ? p.moveTo(x, y) : p.lineTo(x, y)));
          p.closePath();
          s.holes.push(p);
        }
        return s;
      };
      const extrude = (d: ShapeData) => {
        const g = new THREE.ExtrudeGeometry(buildShape(d), {
          depth: DEPTH,
          steps: 1,
          bevelEnabled: true,
          bevelThickness: BEVEL_T,
          bevelSize: BEVEL_S,
          bevelSegments: 4,
        });
        g.translate(0, 0, -DEPTH / 2);
        return g;
      };

      const capMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.12,
        envMapIntensity: 1.3,
      });
      const wallMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.07,
        envMapIntensity: 1.35,
      });

      const charm = new THREE.Group();
      charm.add(new THREE.Mesh(extrude(DATA), [capMat, wallMat]));
      for (const piece of DATA.pieces) {
        charm.add(new THREE.Mesh(extrude(piece), [capMat, wallMat]));
      }
      charm.rotation.x = 0.06;
      scene.add(charm);

      const key = new THREE.DirectionalLight(0xffffff, 1.2);
      key.position.set(4, 6, 8);
      scene.add(key);

      const camera = new THREE.PerspectiveCamera(32, 1094 / 1262, 0.1, 100);
      camera.position.set(0, 0, 10.2);
      camera.lookAt(0, 0, 0);

      const resize = () => {
        const w = mount.clientWidth || 144;
        const h = mount.clientHeight || 166;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let raf = 0;
      let running = true;
      let inView = true;
      const clock = new THREE.Clock();
      const renderFrame = () => renderer.render(scene, camera);

      if (reduced) {
        charm.rotation.y = 0;
        renderFrame();
      } else {
        const tick = () => {
          raf = requestAnimationFrame(tick);
          if (!running || !inView) return;
          const t = clock.getElapsedTime();
          charm.rotation.y = (t * Math.PI * 2) / ROT_SECONDS;
          renderFrame();
        };
        tick();
        const io = new IntersectionObserver(
          (entries) => {
            inView = entries[0]?.isIntersecting ?? true;
            if (inView) clock.getDelta();
          },
          { threshold: 0.05 },
        );
        io.observe(mount);
        const onVis = () => {
          running = document.visibilityState === "visible";
          if (running) clock.getDelta();
        };
        document.addEventListener("visibilitychange", onVis);
        cleanup = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          document.removeEventListener("visibilitychange", onVis);
        };
      }

      if (!disposed) setLive(true);

      const baseCleanup = cleanup;
      cleanup = () => {
        baseCleanup();
        ro.disconnect();
        scene.traverse((obj) => {
          const mesh = obj as InstanceType<typeof THREE.Mesh>;
          if (mesh.geometry) mesh.geometry.dispose();
        });
        capMat.dispose();
        wallMat.dispose();
        envRT.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => {
      /* any failure: keep the flat mascot fallback */
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={mountRef} className={`relative aspect-[1094/1262] ${className}`} aria-hidden>
      {!live && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/mascot.png"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-contain"
        />
      )}
    </div>
  );
}
