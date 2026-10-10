import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0B",
          color: "#EDEDED",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#D06A4C",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {siteConfig.status}
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "600",
              letterSpacing: "-0.04em",
              color: "#EDEDED",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#A1A1AA",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "32px",
            fontSize: "20px",
            color: "#71717A",
            fontFamily: "monospace",
          }}
        >
          <div>{siteConfig.location} · {siteConfig.degree}</div>
          <div>namangupta.dev</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
