// components/NoItemsView.tsx

"use client";

import React, { useEffect, CSSProperties } from "react";

interface NoItemsViewProps {
  title?: string;
  message?: string;
  paddingTop?: boolean;
  style?: CSSProperties;
}

const NoItemsView: React.FC<NoItemsViewProps> = ({
  title = "Uh oh ...",
  message = "Nothing Found",
  paddingTop = false,
  style,
}) => {
  useEffect(() => {
    // document.title = "404 | Lytude";
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", paddingTop: paddingTop ? "75px" : "", ...style }}>
      <h3>{title}</h3>
      <p style={{ opacity: 0.75 }}>{message}</p>
    </div>
  );
};

export default NoItemsView;
