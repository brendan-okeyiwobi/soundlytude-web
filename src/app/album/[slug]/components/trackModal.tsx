// app/album/[slug]/components/trackModal.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Track } from "@/types/track";
import { useHash } from "@/components/useHash";
import { resolveContentURL } from "@/utils/resolveContentURL";
import { HStack, VStack, ZStack } from "@/components/stack-layout";
import Image from "next/image";
import WaveSurfer from "wavesurfer.js";

import WavesurferPlayer from "@wavesurfer/react";
import { PlayPauseButton } from "@/components/playButton";

type Props = {
    tracks: Track[];
};

export function TrackModal({ tracks }: Props) {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const [openTrack, setOpenTrack] = useState<Track | null>(null);
    const router = useRouter();
    const hash = useHash(); // ← use the custom hook

    useEffect(() => {
        if (hash?.startsWith("#")) {
            // setTimeout(() => {
            if (hash?.startsWith("#")) {
                const trackId = hash.slice(1);
                const match = tracks.find((t) => t._id.toString() === trackId);
                setOpenTrack(match ?? null);
                setIsLoading(true);
                setIsPlaying(false);
                console.log("Locking scroll");
                const scrollbarWidth = window.innerWidth -
                    document.documentElement.clientWidth;
                document.documentElement.style.overflow = "hidden";
                document.documentElement.style.paddingRight =
                    `${scrollbarWidth}px`;
            }
            // }, 100);
        } else {
            setOpenTrack(null);
            console.log("UnLocking scroll");
            document.documentElement.style.overflow = "auto";
            document.documentElement.style.paddingRight = `0px`;
        }
    }, [hash, tracks]);

    useEffect(() => {
        if (openTrack) {
            // Reset visible first so opacity starts at 0
            setVisible(false);
            // Next tick trigger fade-in
            const timeout = setTimeout(() => setVisible(true), 10);
            // Cleanup timeout if openTrack changes quickly
            return () => clearTimeout(timeout);
        } else {
            setVisible(false);
        }
    }, [openTrack]);

    if (!openTrack) return null;

    const onReady = (ws: WaveSurfer) => {
        setWavesurfer(ws);
        setIsPlaying(false);
        setIsLoading(false);

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: openTrack.title,
                artist: openTrack.artistDetails.artistName,
                artwork: [
                    {
                        src: resolveContentURL(
                            openTrack.albumDetails.coverArt,
                            null,
                            { width: 512, height: 512 },
                        ),
                        sizes: "512x512",
                        type: "image/jpeg",
                    },
                ],
            });

            navigator.mediaSession.setActionHandler("play", () => {
                ws.play();
            });

            navigator.mediaSession.setActionHandler("pause", () => {
                ws.pause();
            });

            // Optional: seek support
            navigator.mediaSession.setActionHandler(
                "seekbackward",
                (details) => {
                    ws.setTime(
                        ws.getCurrentTime() - (details.seekOffset || 10),
                    );
                },
            );

            navigator.mediaSession.setActionHandler(
                "seekforward",
                (details) => {
                    ws.setTime(
                        ws.getCurrentTime() + (details.seekOffset || 10),
                    );
                },
            );
        }
    };

    return (
        <div
            className={`modal-overlay ${visible ? "visible" : ""}`}
            onClick={() => {
                router.replace(window.location.pathname, { scroll: false });
                setOpenTrack(null);
            }}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // ← prevent modal close on child click
            >
                <VStack>
                    <p
                        style={{
                            padding: "10px",
                            margin: 0,
                            backgroundColor: "#7099ff20",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        Soundlytude is better on the App
                    </p>
                    <HStack align="flex-start">
                        <ZStack alignment="center">
                            <Image
                                src={resolveContentURL(openTrack.albumDetails.coverArt, "scaledToFill", { width: 400, height: 400 })}
                                alt={openTrack.albumDetails.coverArt}
                                width="512"
                                height="512"
                                style={{
                                    width: "clamp(150px, 15vw, 200px)",
                                    height: "clamp(150px, 15vw, 200px)",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                    boxShadow: "0 0 60px #55555540",
                                }}
                            />
                            <PlayPauseButton
                                isPlaying={isPlaying}
                                onClick={() => wavesurfer?.playPause()}
                            />
                        </ZStack>
                        <VStack
                            align="flex-start"
                            style={{ maxWidth: "100%", padding: "5px 20px" }}
                        >
                            <h1
                                style={{
                                    padding: "0px",
                                    margin: 0,
                                    fontSize: "21px",
                                }}
                            >
                                {openTrack.title}
                            </h1>
                            <p
                                style={{
                                    paddingLeft: "0px",
                                    margin: 0,
                                    fontSize: "15px",
                                    minWidth: "175px",
                                }}
                            >
                                {openTrack.artistDetails.artistName}
                            </p>
                            <h3
                                style={{
                                    paddingLeft: "0px",
                                    margin: 0,
                                    fontSize: "18px",
                                }}
                            >
                                {openTrack.albumDetails.title}
                            </h3>
                        </VStack>
                    </HStack>
                    {/* <AudioPlayer audioUrl={resolveContentURL(openTrack.audio)} /> */}
                    <div style={{ width: "100%", padding: "10px" }}>
                        {isLoading && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <div className="loader"></div>
                            </div>
                        )}
                        <WavesurferPlayer
                            height={50}
                            waveColor="#adc5ff"
                            progressColor="#7099ff"
                            dragToSeek={true}
                            cursorWidth={2}
                            barRadius={100}
                            barWidth={2.5}
                            url={resolveContentURL(openTrack.audio)}
                            onReady={onReady}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                    </div>
                </VStack>
            </div>
            <style>
                {`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(128, 128, 128, 0.05);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          opacity: 0;
          transition: opacity 250ms ease;
        }
          
        .modal-overlay.visible {
          opacity: 1;
        }

        .modal-content {
          background-color: rgba(128, 128, 128, 0.01);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-radius: 10px 10px 0 0;
          max-width: 90% !important;
          max-height: 90%;
          overflow-y: auto;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
        }
      `}
            </style>
        </div>
    );
}
