"use client";

import { useEffect, useRef } from "react";

interface VizCanvasProps {
  mode: string;
  rgb: string;
  getFrequencyData: () => Uint8Array | null;
}

export default function VizCanvas({ mode, rgb, getFrequencyData }: VizCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef(0);
  const tRef = useRef(0);
  const barsRef = useRef<{ c: number; t: number }[]>([]);
  const modeRef = useRef(mode);
  const rgbRef = useRef(rgb);
  const getFreqRef = useRef(getFrequencyData);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { rgbRef.current = rgb; }, [rgb]);
  useEffect(() => { getFreqRef.current = getFrequencyData; }, [getFrequencyData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Non-null for closure capture
    const c = canvas;
    const x = ctx;

    const fs = 14;
    barsRef.current = [];
    for (let i = 0; i < 70; i++) barsRef.current[i] = { c: Math.random() * 0.3, t: Math.random() * 0.3 };

    function stageSize() {
      const stage = document.getElementById("vizStage");
      if (!stage) return;
      c.width = stage.clientWidth;
      c.height = stage.clientHeight;
    }
    stageSize();
    window.addEventListener("resize", stageSize);

    const getCols = () => c.width ? Math.floor(c.width / (fs * 0.55)) : 80;
    const getRows = () => c.height ? Math.floor(c.height / (fs * 1.1)) : 40;

    function fn(px: number, py: number, ch: string, rgba: string) {
      x.fillStyle = rgba;
      x.fillText(ch, px * fs * 0.55, py * fs * 1.1);
    }

    const DM = "\u25C6", DO = "\u25C7", DT = "\u00B7";
    const BF = "\u2588", BK = "\u2593", BM = "\u2592";
    const TU = "\u25B2", TD = "\u25BC";
    const CI = "\u25CB", CII = "\u25C9";
    const CR = "\u2726", WV = "\u2248";
    const AR = "\u2193", VL = "\u2502", SP = "_";

    function hue2rgb(h: number): string {
      const i = Math.floor(h / 60), f = h / 60 - i;
      let r: number, g: number, b: number;
      switch (i) {
        case 0: r = 230; g = Math.floor(f * 230); b = 40; break;
        case 1: r = Math.floor((1 - f) * 230); g = 220; b = 40; break;
        case 2: r = 40; g = 220; b = Math.floor(f * 180); break;
        case 3: r = 40; g = Math.floor((1 - f) * 180); b = 230; break;
        case 4: r = Math.floor(f * 200); g = 40; b = 230; break;
        default: r = 230; g = 40; b = Math.floor((1 - f) * 200); break;
      }
      return `${r},${g},${b}`;
    }

    const modeAmbient = () => {
      const freq = getFreqRef.current();
      const t = tRef.current;
      x.font = "14px monospace";
      for (let i = 0; i < 70; i++) {
        const px = Math.floor((Math.sin(t * 0.003 + i * 1.7) * 0.5 + 0.5) * getCols());
        const py = Math.floor((Math.cos(t * 0.002 + i * 2.1) * 0.5 + 0.5) * getRows());
        if (px >= 0 && px < getCols() && py >= 0 && py < getRows()) {
          const b = 60 + Math.floor(180 * Math.abs(Math.sin(t * 0.01 + i)));
          fn(px, py, ".", `rgba(${b},${b},${b + 40},${(0.1 + Math.sin(t * 0.02 + i) * 0.07).toFixed(2)})`);
        }
      }
      if (freq) {
        const nb = Math.min(getCols(), 50);
        for (let i = 0; i < nb; i++) {
          const v = freq[Math.floor(i * freq.length / nb)] / 255;
          const bh = Math.floor(v * getRows() * 0.2);
          const cx = Math.floor(i * getCols() / nb);
          for (let h = 0; h < bh; h++) {
            fn(cx, getRows() - 1 - h, SP, `rgba(${rgbRef.current},${(0.1 + v * 0.2).toFixed(2)})`);
          }
        }
      }
    };

    const modePulse = () => {
      const t = tRef.current;
      const cx2 = getCols() / 2, cy2 = getRows() / 2;
      x.font = "14px monospace";
      for (let r = 0; r < getRows(); r++) {
        for (let c = 0; c < getCols(); c += 2) {
          const dx = c - cx2, dy = r - cy2;
          const d = Math.sqrt(dx * dx + dy * dy);
          const p = Math.sin(d * 0.15 - t * 0.04) * 0.5 + 0.5;
          if (p > 0.2) {
            const ch = p > 0.7 ? DM : p > 0.4 ? DO : DT;
            fn(c, r, ch, `rgba(${rgbRef.current},${(p * 0.55).toFixed(2)})`);
          }
        }
      }
    };

    const modeBars = () => {
      const freq = getFreqRef.current();
      const t = tRef.current;
      const nb = Math.min(getCols(), 70);
      x.font = "14px monospace";
      const bars = barsRef.current;
      for (let i = 0; i < nb; i++) {
        const ci = Math.floor(i * getCols() / nb);
        const v = freq ? freq[Math.floor(i * freq.length / nb)] / 255 : (Math.sin(t * 0.008 + i * 0.15) * 0.3 + 0.3);
        const bar = bars[i];
        bar.t = v;
        bar.c += (bar.t - bar.c) * 0.25;
        const bh = Math.floor(bar.c * getRows() * 0.85);
        for (let h = 0; h < bh; h++) {
          const ry = getRows() - 1 - h;
          const pp = h / Math.max(1, bh);
          const ch = pp > 0.8 ? BF : pp > 0.5 ? BK : BM;
          const br = 40 + Math.floor(v * 200);
          fn(ci, ry, ch, `rgba(${br},${br},${Math.floor(br * 1.4)},${(0.25 + v * 0.6).toFixed(2)})`);
        }
      }
    };

    const modeMountain = () => {
      const t = tRef.current;
      x.font = "14px monospace";
      for (let c = 0; c < getCols(); c++) {
        const dx = c - getCols() / 2;
        const dist = Math.abs(dx) / (getCols() / 2);
        let ph = getRows() * 0.78 * (1 - dist * dist * 1.8);
        if (ph < 1) ph = 1;
        for (let r = Math.max(0, getRows() - 1 - Math.ceil(ph)); r < getRows(); r++) {
          const ch = r < getRows() - 1 - Math.floor(ph * 0.7) ? TU : TD;
          const b = 60 + Math.floor((1 - dist) * 160);
          fn(c, r, ch, `rgba(${b - 20},${b},${b + 20},${(0.15 + (1 - dist) * 0.6).toFixed(2)})`);
        }
      }
      const sx = Math.floor(getCols() * 0.72);
      const sy = Math.floor(getRows() * 0.22 + Math.sin(t * 0.005) * 6);
      const sr = Math.floor(getRows() * 0.09);
      for (let r = 0; r < getRows(); r++) {
        for (let c = 0; c < getCols(); c++) {
          const dx = c - sx, dy = r - sy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < sr && d > sr * 0.3) fn(c, r, CI, `rgba(255,220,170,${(0.2 + Math.sin(t * 0.01) * 0.1).toFixed(2)})`);
          else if (d < sr * 0.3) fn(c, r, CII, "rgba(255,240,200,0.45)");
        }
      }
    };

    const modeRain = () => {
      const t = tRef.current;
      const nc = Math.min(getCols(), 28);
      x.font = "14px monospace";
      for (let i = 0; i < nc; i++) {
        const dy = (t * 3 + i * 47) % getRows();
        const cx = Math.floor(i * getCols() / nc);
        const ry = Math.floor(dy);
        if (cx >= 0 && cx < getCols() && ry >= 0 && ry < getRows()) {
          fn(cx, ry, BF, `rgba(${rgbRef.current},0.7)`);
          if (ry + 1 < getRows()) fn(cx, ry + 1, VL, `rgba(${rgbRef.current},0.25)`);
          if (ry + 2 < getRows()) fn(cx, ry + 2, VL, `rgba(${rgbRef.current},0.12)`);
        }
      }
    };

    const modeCrystals = () => {
      const t = tRef.current;
      x.font = "14px monospace";
      for (let i = 0; i < 8; i++) {
        const px = (Math.sin(t * 0.003 + i * 2.1) * 0.5 + 0.5) * getCols();
        const py = (Math.cos(t * 0.002 + i * 1.7) * 0.5 + 0.5) * getRows();
        for (let a = 0; a < 6; a++) {
          const ang = a * Math.PI / 3 + t * 0.001;
          for (let d = 1; d < 7; d++) {
            const mx = Math.round(px + Math.cos(ang) * d);
            const my = Math.round(py + Math.sin(ang) * d);
            if (mx >= 0 && mx < getCols() && my >= 0 && my < getRows())
              fn(mx, my, d === 1 ? CR : DT, `rgba(${rgbRef.current},${(0.1 + (1 - d / 7) * 0.35).toFixed(2)})`);
          }
        }
      }
    };

    const modeDrip = () => {
      const t = tRef.current;
      x.font = "14px monospace";
      for (let c = 0; c < getCols(); c++) {
        const cxVal = c - getCols() / 2;
        const arc = getRows() * 0.82 - Math.sqrt(Math.max(0, Math.pow(getCols() * 0.4, 2) - cxVal * cxVal * 1.3));
        const ry = Math.round(arc);
        if (ry >= 0 && ry < getRows()) {
          const hue = ((c / getCols()) * 360 + t * 1.5) % 360;
          const hrgb = hue2rgb(hue);
          fn(c, ry, BF, `rgba(${hrgb},0.6)`);
          if (ry + 1 < getRows()) fn(c, ry + 1, VL, `rgba(${hrgb},0.15)`);
        }
      }
      const dripCount = Math.min(getCols(), 18);
      for (let c = 0; c < dripCount; c++) {
        const dy2 = (t * 2 + c * 43) % getRows();
        const cxVal = Math.floor(c * getCols() / dripCount);
        const hue = ((c / dripCount) * 360 + t * 2) % 360;
        fn(cxVal, Math.round(dy2), AR, `rgba(${hue2rgb(hue)},0.22)`);
      }
    };

    const modeTree = () => {
      const t = tRef.current;
      const cxVal = Math.round(getCols() / 2);
      const tr = Math.floor(getRows() * 0.28);
      x.fillStyle = `rgba(${rgbRef.current},0.4)`;
      x.font = "14px monospace";
      for (let r = tr; r < getRows() - 1; r++) x.fillText(VL, cxVal * fs * 0.55, r * fs * 1.1);
      for (let b = 0; b < 5; b++) {
        const by = Math.floor(tr + b * (getRows() - tr - 1) / 5);
        const dir = b % 2 === 0 ? 1 : -1;
        for (let d = 1; d < Math.floor(getCols() * 0.25); d++) {
          const bx = cxVal + Math.round(d * dir * (0.7 + Math.sin(t * 0.004 + b) * 0.3));
          const br2 = by + Math.round(d * 0.05 * Math.sin(t * 0.002 + b));
          if (bx >= 0 && bx < getCols() && br2 >= 0 && br2 < getRows())
            fn(bx, br2, DT, `rgba(${rgbRef.current},${(0.15 - d * 0.005).toFixed(3)})`);
        }
      }
    };

    const modeMoon = () => {
      const t = tRef.current;
      x.font = "14px monospace";
      const mx = Math.floor(getCols() * 0.5);
      const my = Math.floor(getRows() * 0.33);
      const mr = Math.floor(getRows() * 0.11);
      for (let r = 0; r < getRows(); r++) {
        for (let c = 0; c < getCols(); c++) {
          const dx = c - mx, dy = r - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(d - mr) < 1.5) fn(c, r, CI, "rgba(200,210,230,0.55)");
          else {
            const rip = Math.sin(d * 0.05 - t * 0.012) * 0.3;
            if (rip > 0.4 && d > mr) fn(c, r, WV, `rgba(${rgbRef.current},${(rip * 0.15).toFixed(2)})`);
          }
        }
      }
      for (let c = 0; c < getCols(); c++) {
        const w = Math.floor(Math.sin(t * 0.003 + c * 0.04) * 0.5);
        const py2 = getRows() - 3 + w;
        if (py2 >= 0) fn(c, py2, WV, `rgba(${rgbRef.current},0.08)`);
      }
    };

    const MODES: Record<string, () => void> = {
      ambient: modeAmbient, pulse: modePulse, bars: modeBars, mountain: modeMountain,
      rain: modeRain, crystals: modeCrystals, drip: modeDrip, tree: modeTree, moon: modeMoon,
    };

    const loop = () => {
      tRef.current++;
      x.fillStyle = "#080806";
      x.fillRect(0, 0, c.width, c.height);
      x.textBaseline = "top";
      const modeFn = MODES[modeRef.current];
      if (modeFn) modeFn();
      animIdRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", stageSize);
      cancelAnimationFrame(animIdRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
