// components/MediaViewer.tsx
 
import React, { useState } from 'react';
import { resolveContentURL } from '@/utils/resolveContentURL';
import Image from 'next/image';

// Props type
interface MediaViewerProps {
  media?: string[];
  thumbnailSize?: string;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  media = [],
  thumbnailSize = '500px',
}) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const openMedia = (mediaItem: string) => {
    setSelectedMedia(mediaItem);
  };

  const closeMedia = () => {
    setSelectedMedia(null);
  };

  return (
    <div>
      {/* Media Thumbnails */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '10px',
          margin: '0px 0',
        }}
      >
        {media.map((item, index) => (
          <div
            key={index}
            onClick={() => openMedia(item)}
            className="scale-on-hover2"
            style={{
              cursor: 'pointer',
              marginRight: '10px',
              borderRadius: '7.5px',
              overflow: 'hidden',
              width: 'fit-content',
              height: thumbnailSize,
              maxWidth: '700px',
              minWidth: '300px',
            }}
          >
            {item.endsWith('.mp4') || item.endsWith('.mov') ? (
              <video
                src={resolveContentURL(item)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                src={resolveContentURL(item)}
                alt={`Media ${index}`}
                height={1024}
                width={1024}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Enlarged Media Viewer (Modal) */}
      {selectedMedia && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%',
              overflow: 'hidden',
              borderRadius: '10px',
            }}
          >
            {selectedMedia.endsWith('.mp4') || selectedMedia.endsWith('.mov') ? (
              <video
                src={resolveContentURL(selectedMedia)}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                }}
                controls
                autoPlay
              />
            ) : (
              <Image
                src={resolveContentURL(selectedMedia)}
                alt="Enlarged media"
                height={1024}
                width={1024}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                }}
              />
            )}
            <button
              onClick={closeMedia}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#FF0000',
                color: 'white',
                border: 'none',
                fontSize: '15px',
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                minHeight: '30px',
                borderRadius: '100%',
                padding: '0',
                margin: 0,
                textAlign: 'center',
              }}
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaViewer;
