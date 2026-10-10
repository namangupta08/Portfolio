import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug, true);
  const title = post ? post.title : "Blog Post";
  const description = post ? post.description : "Naman Gupta Engineering Blog";
  const dateStr = post?.date || "Engineering";

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
              display: "flex",
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#D06A4C",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Naman Gupta · Blog
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "50px",
              fontWeight: "600",
              letterSpacing: "-0.03em",
              color: "#EDEDED",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#A1A1AA",
              lineHeight: 1.4,
              marginTop: "8px",
              maxWidth: "900px",
            }}
          >
            {description}
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
          <div style={{ display: "flex" }}>{dateStr}</div>
          <div style={{ display: "flex" }}>namangupta.dev</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
