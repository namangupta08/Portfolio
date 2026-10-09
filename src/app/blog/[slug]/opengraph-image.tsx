import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: Props) {
  const post = await getPostBySlug(params.slug, true);
  const title = post ? post.title : "Blog Post";
  const description = post ? post.description : "Naman Gupta Engineering Blog";

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
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#d97753",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Naman Gupta • Blog
          </div>
          <div
            style={{
              fontSize: "52px",
              fontWeight: "bold",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              lineHeight: 1.4,
              marginTop: "8px",
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
            borderTop: "1px solid #27272a",
            paddingTop: "32px",
            fontSize: "20px",
            color: "#71717a",
            fontFamily: "monospace",
          }}
        >
          <div>{post?.date || "Engineering"}</div>
          <div>namangupta.dev</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
