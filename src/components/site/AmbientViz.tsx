"use client";

import VizCanvas from "@/components/VizCanvas";

interface AmbientVizProps {
  mode: string;
  rgb: string;
  className?: string;
}

/**
 * Ambient (audio-less) backdrop. VizCanvas already animates from time alone for every
 * mode — the freq-driven branches simply fall back to sine motion — so we feed it a
 * null frequency source. VizCanvas sizes itself to the element with id="vizStage".
 */
export default function AmbientViz({ mode, rgb, className }: AmbientVizProps) {
  return (
    <div id="vizStage" className={className ?? "absolute inset-0"}>
      <VizCanvas mode={mode} rgb={rgb} getFrequencyData={() => null} />
    </div>
  );
}
