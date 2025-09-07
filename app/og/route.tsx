import { siteConfig } from "@/lib/config";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const background = "hsl(0 0% 3.9%)";
  const primary = "hsl(0 0% 98%)";
  const primaryForeground = "hsl(0 0% 9%)";
  const mutedForeground = "hsl(0 0% 63.9%)";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background,
          color: primary,
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          border: `8px solid ${primary}`,
        }}
      >
        <div
          style={{
            padding: "24px 48px",
            background: primary,
            color: primaryForeground,
            borderRadius: "12px",
          }}
        >
          {siteConfig.name}
        </div>
        <p
          style={{
            marginTop: 40,
            fontSize: 28,
            fontWeight: 400,
            maxWidth: "80%",
            textAlign: "center",
            color: mutedForeground,
          }}
        >
          {siteConfig.description}
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
