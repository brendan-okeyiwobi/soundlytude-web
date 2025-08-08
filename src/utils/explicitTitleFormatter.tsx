// explicitTitleFormatter.tsx
'use client'

import React from "react";
import Image from "next/image";
import useColorScheme from "@/components/UseColorScheme";

interface ExplicitTitleFormatterProps {
  title: string;
  explicit: boolean;
}

const ExplicitTitleFormatter: React.FC<ExplicitTitleFormatterProps> = ({
  title,
  explicit,
}) => {
  const theme = useColorScheme()

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", minWidth: 0 }} >
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }} >
          {title}
        </span>
        {explicit && (
          <Image
            src={`/assets/svg/${theme == "dark" ? "explicit-y" : "explicit-dy"}.svg`}
            alt="Verified"
            width={16}
            height={16}
            style={{
              width: "1rem",
              height: "auto",
              marginLeft: "5px",
              flexShrink: 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
export default ExplicitTitleFormatter;
