import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ScentScape",
    short_name: "ScentScape",
    description:
      "Discover your signature fragrance through personality-based matching",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFCF9",
    theme_color: "#8B6914",
    icons: [
      {
        src: "/api/pwa-icon/192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/api/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
