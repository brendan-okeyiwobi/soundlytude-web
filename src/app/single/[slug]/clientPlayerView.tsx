// app/single/[slug]/clientPlayerView.tsx

"use client";

import { useEffect, useState } from 'react';

import { PlayPauseButton } from '@/components/playButton';
import { HStack } from '@/components/stack-layout';
import { resolveContentURL } from '@/utils/resolveContentURL';
import WavesurferPlayer from '@wavesurfer/react';
import WaveSurfer from "wavesurfer.js";

type Props = {
    title: string;
    artistName: string;
    featuringArtists: [string];
    artwork: string;
    audio: string;
};

export function ClientPlayerView(player: Props) {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const onReady = (ws: WaveSurfer) => {
        setWavesurfer(ws);
        setIsPlaying(false);
        setIsLoading(false);

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: player.title,
                artist: player.artistName,
                artwork: [
                    { src: resolveContentURL(player.artwork, null, { width: 512, height: 512 }), sizes: '512x512', type: 'image/jpeg' }
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => {
                ws.play();
            });

            navigator.mediaSession.setActionHandler('pause', () => {
                ws.pause();
            });

            // Optional: seek support
            navigator.mediaSession.setActionHandler('seekbackward', (details) => {
                ws.setTime(ws.getCurrentTime() - (details.seekOffset || 10));
            });

            navigator.mediaSession.setActionHandler('seekforward', (details) => {
                ws.setTime(ws.getCurrentTime() + (details.seekOffset || 10));
            });
        }

    };

    useEffect(() => {
        setIsLoading(true);
        setIsPlaying(false);
    }, []);

    return (
        <HStack gap='10px' style={{ height: "100%", }}>
            <PlayPauseButton
                isPlaying={isPlaying}
                onClick={() => wavesurfer?.playPause()}
            />
            <div style={{ width: '100%' }}>
                {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', }}>
                        <div className="loader"></div>
                    </div>
                )}
                <div
                    style={{
                        width: '100%', height: isLoading ? 0 : "75px", 
                        transform: isLoading ? 'scaleY(0)' : 'scaleY(1)',
                        transformOrigin: 'center',
                        transition: 'transform 0.5s ease-in-out',
                    }}>
                    <WavesurferPlayer
                        height={75}
                        waveColor="#adc5ff"
                        progressColor="#7099ff"
                        dragToSeek={true}
                        cursorWidth={2}
                        barRadius={100}
                        barWidth={2.5}
                        url={resolveContentURL(player.audio)}
                        onReady={onReady}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    /></div>
            </div>
        </HStack>
    )
}