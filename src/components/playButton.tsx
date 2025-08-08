import React from "react";
import { ZStack } from '@/components/stack-layout';
import { CSSProperties } from "react";

type PlayPauseButtonProps = {
    isPlaying: boolean;
    onClick: () => void;
    size?: number; // Optional size override (default 64px)
};

export function PlayPauseButton({ isPlaying, onClick, size = 64 }: PlayPauseButtonProps) {
    const borderColor = isPlaying ? "#7099ff" : "#ffffff"; // Blue or gray

    const buttonStyle: CSSProperties = {
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${borderColor}`,
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        boxShadow: `
      inset 0 0 6px rgba(0, 0, 0, 0.5),  /* inner shadow */
      0 0 6px rgba(0, 0, 0, 0.25)         /* outer subtle glow */
    `,
    };

    const iconStyle: CSSProperties = {
        fontSize: size * 0.4,
        color: borderColor,
        pointerEvents: "none",
        userSelect: "none",
        textShadow: "0 0 6px rgba(0, 0, 0, 0.5)"
    };

    return (
        <ZStack alignment="center" style={{ width: size, height: size }}>
            <button onClick={onClick} style={buttonStyle}>
                <span style={iconStyle}>
                    {isPlaying ? "❚❚" : "▶"}
                </span>
            </button>
        </ZStack>
    );
}
