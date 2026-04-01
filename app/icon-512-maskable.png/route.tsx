import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#84b279",
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
            borderRadius: 160,
            color: "#f4f0e8",
            display: "flex",
            fontSize: 220,
            fontWeight: 700,
            height: 320,
            justifyContent: "center",
            letterSpacing: "-0.08em",
            width: 320,
          }}
        >
          M
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
