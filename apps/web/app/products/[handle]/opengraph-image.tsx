import { ImageResponse } from "next/og";
import { medusa } from "@/lib/medusa/client";

export const runtime = "edge";
export const alt = "Product image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  let product: any = null;
  try {
    const { products } = await medusa.store.product.list({
      handle,
      limit: 1,
    });
    product = products?.[0] ?? null;
  } catch {
    // Backend unavailable
  }

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            width: "100%",
            height: "100%",
          }}
        >
          <span style={{ color: "#fff", fontSize: 48 }}>Product Not Found</span>
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
          padding: 48,
        }}
      >
        {product.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.thumbnail}
            alt=""
            width={300}
            height={300}
            style={{ objectFit: "contain", marginBottom: 24 }}
          />
        )}
        {product.metadata?.brand && (
          <span style={{ fontSize: 24, color: "#666" }}>
            {product.metadata.brand as string}
          </span>
        )}
        <span
          style={{ fontSize: 48, fontWeight: "bold", textAlign: "center", color: "#111" }}
        >
          {product.title}
        </span>
      </div>
    ),
    size
  );
}
