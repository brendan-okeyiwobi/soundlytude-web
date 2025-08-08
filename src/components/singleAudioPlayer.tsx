// components/singleAudioPlayer.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioPlayerProps {
  audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#adc5ff',
      progressColor: '#7099ff',
      height: 30,
    });

    waveSurferRef.current = ws;

    ws.on('loading', () => {
      if (isMounted) {
        setIsLoading(true);
      }
    });

    ws.on('ready', () => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    ws.on('error', (e) => {
      console.error('WaveSurfer error:', e);
    });

    ws.load(audioUrl);

    return () => {
      isMounted = false;

      // Delay destroy to prevent race condition on unmount
      setTimeout(() => {
        ws.destroy();
      }, 100);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    waveSurferRef.current?.playPause();
  };

  return (
    <div>
      {isLoading && <div>Loading audio...</div>}
      <div ref={containerRef} />
      <button onClick={togglePlay}>Play / Pause</button>
    </div>
  );
}
