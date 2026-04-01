import { ImageResponse } from "next/og";

export const size = {
  width: 192,
  height: 192,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(160deg, #f4f0e8 0%, #dbe7cb 100%)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#1e2b20",
            borderRadius: 48,
            color: "#f4f0e8",
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            height: 140,
            justifyContent: "center",
            letterSpacing: "-0.06em",
            width: 140,
          }}
        >
          M
        </div>
      </div>
    ),
    size
  );
}
