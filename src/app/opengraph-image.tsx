import { ImageResponse } from "next/og";
import { personalData } from "@/data/portfolio";

export const runtime = "nodejs";

export const alt = `${personalData.name} — ${personalData.headline}`;
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
          backgroundColor: "#111112",
          color: "#f4f4f5",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "20px",
              fontFamily: "monospace",
              color: "#d97753",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {personalData.status}
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {personalData.name}
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#a1a1aa",
            }}
          >
            {personalData.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #27272a",
            paddingTop: "32px",
            fontSize: "22px",
            color: "#71717a",
            fontFamily: "monospace",
          }}
        >
          <div>{personalData.location}</div>
          <div>namangupta.dev</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
