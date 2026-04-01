import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
            background: "#84b279",
            borderRadius: 42,
            color: "#1e2b20",
            display: "flex",
            fontSize: 86,
            fontWeight: 700,
            height: 132,
            justifyContent: "center",
            letterSpacing: "-0.06em",
            width: 132,
          }}
        >
          M
        </div>
      </div>
    ),
    size
  );
}
