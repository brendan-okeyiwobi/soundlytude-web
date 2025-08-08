// ArtistNameFormatter.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ArtistNameFormatterProps {
  artistName: string;
  verification: boolean;
  featuredArtists: string[];
  username?: string;
}

const ArtistNameFormatter: React.FC<ArtistNameFormatterProps> = ({
  artistName,
  verification,
  featuredArtists,
  username
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}>
      {username &&
        <Link href={`/artist/${username}`}>
          <div style={{ display: "flex", alignItems: "center", minWidth: 0 }} >
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }} >
              {artistName}
            </span>
            {verification && (
              <Image
                src="/assets/svg/checkmark.svg"
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
        </Link>
      }
      
      {!username &&
        <div>
          <div style={{ display: "flex", alignItems: "center", minWidth: 0 }} >
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }} >
              {artistName}
            </span>
            {verification && (
              <Image
                src="/assets/svg/checkmark.svg"
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
      }
      {featuredArtists.length > 0 && (
        <span
          style={{
            fontSize: "0.875rem",
            color: "#666",
            marginTop: "2px",
          }}
        >
          feat. {featuredArtists.join(", ")}
        </span>
      )}
    </div>
  );
};
export default ArtistNameFormatter;
