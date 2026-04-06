import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

const ALLOWED_SIZES = new Set([192, 512]);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: sizeParam } = await params;
  const size = parseInt(sizeParam, 10);

  if (!ALLOWED_SIZES.has(size)) {
    return new Response("Invalid icon size", { status: 400 });
  }

  const borderRadius = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.55);

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8B6914, #B8860B)",
          borderRadius,
        }}
      >
        <span
          style={{
            color: "#FFFCF9",
            fontSize,
            fontWeight: 700,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          S
        </span>
      </div>
    ),
    { width: size, height: size }
  );
}
