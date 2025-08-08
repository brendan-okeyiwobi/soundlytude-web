// components/stack-layouts.tsx
import React, { CSSProperties, HTMLAttributes } from "react";

type StackProps = {
    children: React.ReactNode;
    style?: CSSProperties;
    className?: string;
    gap?: string;
    justify?: CSSProperties["justifyContent"];
    align?: CSSProperties["alignItems"];
} & HTMLAttributes<HTMLDivElement>;

export function HStack({
    children,
    style = {},
    className = "",
    gap = "0px",
    justify = "flex-start",
    align = "center",
    ...props
}: StackProps) {
    const combinedStyle: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        gap,
        justifyContent: justify,
        alignItems: align,
        ...style,
    };

    return (
        <div className={`hstack ${className}`} style={combinedStyle} {...props}>
            {children}
        </div>
    );
}

export function VStack({
    children,
    style = {},
    className = "",
    gap = "0px",
    justify = "flex-start",
    align = "center",
    ...props
}: StackProps) {
    const combinedStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap,
        justifyContent: justify,
        alignItems: align,
        ...style,
    };

    return (
        <div className={`vstack ${className}`} style={combinedStyle} {...props}>
            {children}
        </div>
    );
}
/*
type ZStackProps = {
    children: React.ReactNode;
    style?: CSSProperties;
    className?: string;
    justify?: CSSProperties["justifyContent"];
    align?: CSSProperties["alignItems"];
} & HTMLAttributes<HTMLDivElement>;

export function ZStack({
    children,
    style = {},
    className = "",
    justify = "center",
    align = "center",
    ...props
}: ZStackProps) {
    const combinedStyle: CSSProperties = {
        display: "grid",
        placeContent: `${align} ${justify}`,
        position: "relative",
        ...style,
    };

    return (
        <div className={`zstack ${className}`} style={combinedStyle} {...props}>
            {children}
        </div>
    );
}
*/



type ZStackAlignment =
  | "center"
  | "top"
  | "bottom"
  | "leading"
  | "trailing"
  | "topLeading"
  | "topTrailing"
  | "bottomLeading"
  | "bottomTrailing";

type ZStackProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  alignment?: ZStackAlignment;
} & React.HTMLAttributes<HTMLDivElement>;

const alignmentToStyle = (alignment: ZStackAlignment): React.CSSProperties => {
  switch (alignment) {
    case "top":
      return { justifyContent: "center", alignItems: "flex-start" };
    case "bottom":
      return { justifyContent: "center", alignItems: "flex-end" };
    case "leading":
      return { justifyContent: "flex-start", alignItems: "center" };
    case "trailing":
      return { justifyContent: "flex-end", alignItems: "center" };
    case "topLeading":
      return { justifyContent: "flex-start", alignItems: "flex-start" };
    case "topTrailing":
      return { justifyContent: "flex-end", alignItems: "flex-start" };
    case "bottomLeading":
      return { justifyContent: "flex-start", alignItems: "flex-end" };
    case "bottomTrailing":
      return { justifyContent: "flex-end", alignItems: "flex-end" };
    case "center":
    default:
      return { justifyContent: "center", alignItems: "center" };
  }
};

export function ZStack({
  children,
  className = "",
  style = {},
  alignment = "center",
  ...props
}: ZStackProps) {
  const [firstChild, ...restChildren] = React.Children.toArray(children);

  return (
    <div
      className={`zstack ${className}`}
      style={{
        position: "relative",
        display: "inline-block", // ensures it wraps to content size
        ...style,
      }}
      {...props}
    >
      {/* Base layer (image or first element) */}
      {firstChild}

      {/* Overlay layers (positioned absolutely) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          pointerEvents: "none", // makes button clicks go through unless overridden
          ...alignmentToStyle(alignment),
        }}
      >
        {restChildren.map((child, idx) => (
          <div key={idx} style={{ pointerEvents: "auto" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}


type SpacerProps = {
    direction?: "horizontal" | "vertical";
    style?: React.CSSProperties;
    className?: string;
};

/**
 * Spacer that grows in a specific direction.
 * Defaults to horizontal (flex: 1).
 */
export function Spacer({ direction = "horizontal", style = {}, className = "" }: SpacerProps) {
    const computedStyle: CSSProperties =
        direction === "horizontal"
            ? { flexGrow: 1, ...style } // Removed width: "100%"
            : { flexGrow: 1, ...style }; // Removed height: "100%"

    return <div className={`spacer ${className}`} style={computedStyle} />;
}
