import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogType = "image/png";

export function siteIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          color: "#6eedc6",
          fontSize: Math.round(size * 0.55),
          fontWeight: 600,
          letterSpacing: "-0.06em",
        }}
      >
        T
      </div>
    ),
    { width: size, height: size },
  );
}

export function ogCard({
  kicker,
  title,
  line,
}: {
  kicker: string;
  title: string;
  line: string;
}) {
  const titleSize = title.length > 48 ? 44 : title.length > 28 ? 52 : 64;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#f3f3f3",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            color: "#a1a1a1",
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#6eedc6",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              color: "#a1a1a1",
              lineHeight: 1.4,
              maxWidth: 920,
            }}
          >
            {line}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a1a1a1" }}>{site.name}</div>
      </div>
    ),
    { width: ogSize.width, height: ogSize.height },
  );
}
