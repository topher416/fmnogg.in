import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface CardOptions {
  title: string;
  subtitle: string;
  color: string;
  rgb: string;
}

/**
 * Album-colored Open Graph card. Pure inline styles (satori has no Tailwind / CSS file
 * support); every multi-child element declares display:flex per satori's requirement.
 */
export function ogCard({ title, subtitle, color, rgb }: CardOptions): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#080808",
          backgroundImage: `radial-gradient(circle at 22% 18%, rgba(${rgb},0.42), rgba(8,8,8,0) 58%), linear-gradient(135deg, rgba(${rgb},0.16), rgba(8,8,8,0) 70%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "monospace",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 26 ? 84 : 108,
            fontWeight: 700,
            lineHeight: 1.02,
            color,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.62)",
            fontFamily: "monospace",
          }}
        >
          One Thousand Feet Per Second
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
