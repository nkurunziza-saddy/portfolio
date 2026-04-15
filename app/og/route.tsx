import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export async function GET() {
  const background = "hsl(0 0% 6.5%)";
  const foreground = "hsl(0 0% 91%)";
  const muted = "hsl(0 0% 45%)";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: background,
        padding: "60px",
        fontFamily: "sans-serif",
        color: foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: muted, letterSpacing: "0.2em" }}>
            ENGINEER / DEVELOPER
          </span>
          <h1 style={{ fontSize: 64, fontWeight: 700, margin: 0, letterSpacing: "-0.04em" }}>{siteConfig.name}</h1>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <p
          style={{
            fontSize: 38,
            lineHeight: 1.3,
            maxWidth: "850px",
            margin: 0,
            fontWeight: 400,
            color: foreground,
          }}
        >
          {siteConfig.description}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: muted, letterSpacing: "0.1em" }}>LOCATION</span>
          <span style={{ fontSize: 18, fontWeight: 400 }}>RWANDA / AFRICA</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: muted, letterSpacing: "0.1em" }}>DOMAIN</span>
          <span style={{ fontSize: 18, fontWeight: 400 }}>{siteConfig.url.replace("https://", "")}</span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
