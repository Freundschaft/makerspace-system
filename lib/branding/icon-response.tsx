import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { ImageResponse } from "next/og";

const loadLogoDataUrl = cache(async () => {
  const logoPath = path.join(process.cwd(), "public", "branding", "makerspace-logo.webp");
  const buffer = await readFile(logoPath);
  return `data:image/webp;base64,${buffer.toString("base64")}`;
});

export async function createBrandIconResponse(
  width: number,
  height: number,
  options?: {
    maskable?: boolean;
    padded?: boolean;
  },
) {
  const logoDataUrl = await loadLogoDataUrl();
  const padded = options?.padded ?? false;
  const maskable = options?.maskable ?? false;
  const logoWidth = padded ? "74%" : "82%";
  const logoHeight = maskable ? "74%" : "82%";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f4f0e8",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: maskable ? "#dbe7cb" : "transparent",
            borderRadius: maskable ? Math.round(width * 0.22) : 0,
            display: "flex",
            height: maskable ? "88%" : "100%",
            justifyContent: "center",
            padding: maskable ? "8%" : padded ? "5%" : "2%",
            width: maskable ? "88%" : "100%",
          }}
        >
          <img
            alt="Makerspace Lesvos"
            src={logoDataUrl}
            style={{
              height: logoHeight,
              objectFit: "contain",
              width: logoWidth,
            }}
          />
        </div>
      </div>
    ),
    {
      width,
      height,
    },
  );
}
