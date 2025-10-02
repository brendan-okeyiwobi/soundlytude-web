// app/album/[slug]/components/AlbumDetailsView.tsx

import Image from 'next/image';
import { Album } from '@/types/album';
import { Track } from '@/types/track';
import { HStack, VStack } from '@/components/stack-layout';
import { resolveContentURL } from '@/utils/resolveContentURL';
import DateUtil from '@/utils/dateUtil';
import TrackRowView from '@/components/TrackRowView';
import Link from 'next/link';
import ArtistNameFormatter from '@/utils/artistNameFormatter';

const AlbumDetailsView = ({ album, tracks }: { album: Album; tracks: Track[] }) => {

    const {
        title,
        coverArt,
        artistDetails,
        description,
        genre,
        streamsCount,
        releaseDate,
        available
    } = album;

    return (
        <div>
            <div className="ADV-vstack" />
            <VStack className="inner-content" align='flex-start' style={{ padding: "20px 0" }}>

                <div style={{ height: "80px" }}></div>

                <div className='ADV-horizontal-display'>
                    <HStack gap="40px" align='flex-end' style={{ flexWrap: "wrap", padding: "0 20px" }}>
                        <Image src={resolveContentURL(coverArt, "scaledToFill", { width: 512, height: 512 })} alt={title} width="512" height="512"
                            style={{
                                width: "auto", height: "200px", maxWidth: "100%",
                                borderRadius: "5px 5px 0 0", objectFit: "contain", boxShadow: "0 0 60px #55555540"
                            }}
                        />
                        <VStack gap="0" align='flex-start'>
                            <h2 style={{ padding: 0, margin: 0 }}>{title}</h2>
                            <div style={{ fontFamily: "Futura" }}>
                                <ArtistNameFormatter artistName={artistDetails.artistName} verification={artistDetails.verified == true}
                                    featuredArtists={[]} username={artistDetails.username} />
                            </div>
                            <p style={{ padding: 0, margin: 0 }}>{`${genre} ⦿ ${DateUtil.simpleDate(releaseDate)}`}</p>
                            <div style={{ height: "10px" }}></div>
                            {/* <button className='button' style={{ color: "#7099ff" }}>Play in the App</button> */}
                        </VStack>
                    </HStack>
                </div>

                <div className='ADV-vertical-display' style={{ width: "100%" }}>
                    <VStack gap="40px" align='center' style={{ flexWrap: "wrap", padding: "0 20px" }}>
                        <Image src={resolveContentURL(coverArt, "scaledToFill", { width: 512, height: 512 })} alt={title} width="1024" height="1024"
                            style={{
                                width: "auto", height: "200px", maxWidth: "100%",
                                borderRadius: "5px 5px 0 0", objectFit: "contain", boxShadow: "0 0 60px #55555540"
                            }}
                        />
                        <VStack gap="0" align='center'>
                            <h2 style={{ padding: 0, margin: 0, textAlign: "center" }}>{title}</h2>
                            <div style={{ fontFamily: "Futura" }}>
                                <ArtistNameFormatter artistName={artistDetails.artistName} verification={artistDetails.verified == true}
                                    featuredArtists={[]} username={artistDetails.username} />
                            </div>
                            <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{`${genre} ⦿ ${DateUtil.simpleDate(releaseDate)}`}</p>
                        </VStack>
                        {/* <Link href={`soundlytude://app/album/${_id}`}>
                            <button className='button' style={{ color: "#7099ff" }}>Play in the App</button>
                        </Link> */}
                    </VStack>
                </div>

                {/* <div style={{ height: "40px" }}></div>
            
            <HStack style={{ padding: "0 20px" }}>
                <button className='button' style={{color: "#7099ff"}}>Play in the App</button>
                <button>Shuffle</button>
            </HStack> */}

                <div style={{ height: "40px" }}></div>

                {tracks.map((track) => (
                    <div key={track._id.toString()} style={{ width: "100%" }} >
                        {(available && (releaseDate <= new Date())) ?
                            <Link href={`#${track._id}`} scroll={false}>
                                <TrackRowView
                                    _id={track._id}
                                    trackNumber={track.trackNumber}
                                    title={track.title}
                                    explicit={track.explicit}
                                    streamsCount={track.streamsCount}
                                />
                            </Link>
                            :
                            <div>
                                <TrackRowView
                                    _id={track._id}
                                    trackNumber={track.trackNumber}
                                    title={track.title}
                                    explicit={track.explicit}
                                    streamsCount={track.streamsCount}
                                />
                            </div>
                        }
                    </div>
                ))}

                <div style={{ height: "40px" }}></div>
                <p style={{ color: "rgba(128, 128, 128)", fontSize: "1rem", margin: 0, whiteSpace: 'pre-line', padding: "0 20px" }}>{description}</p>

                <div style={{ height: "40px" }}></div>

                <h1 style={{ color: "rgba(128, 128, 128, 0.75)", fontSize: "4rem", margin: 0, padding: "0 20px" }}>{streamsCount}</h1>
                <p style={{ color: "rgba(128, 128, 128, 0.5)", margin: 0, whiteSpace: 'pre-line', padding: "0 20px" }}>Total Plays</p>

                <div style={{ height: "40px" }}></div>
                <style>{`
                    .ADV-horizontal-display {
                        display: block;
                    }

                    .ADV-vertical-display {
                        display: none;
                    }

                    .ADV-vstack {
                        // background-image: url("https://i.scdn.co/image/ab67616d00001e02d02311f945cb56a97011a9f7");
                        background-image: url("${resolveContentURL(album.coverArt, "scaledToFill", { width: 64, height: 64 })}");
                        background-color: #7099ff;
                        height: 750px;
                        width: 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        position: absolute;
                        top: 0;
                        z-index: -1;
                        filter: blur(7.5vw);
                        opacity: 0.35;
                        mask-image: linear-gradient(to bottom, 
                        rgba(0, 0, 0, 0) 0%, 
                        rgba(0, 0, 0, 0.5) 1%, 
                        rgba(0, 0, 0, 0.75) 40%, 
                        rgba(0, 0, 0, 0.3) 75%, 
                        rgba(0, 0, 0, 0) 100%
                        );
                        -webkit-mask-image: linear-gradient(to bottom, 
                        rgba(0, 0, 0, 0) 0%, 
                        rgba(0, 0, 0, 0.5) 1%, 
                        rgba(0, 0, 0, 0.75) 40%, 
                        rgba(0, 0, 0, 0.3) 75%, 
                        rgba(0, 0, 0, 0) 100%
                        );
                    }
                        
                    @media (prefers-color-scheme: dark) {
                        .ADV-vstack {
                            filter: blur(7.5vw) saturate(100%);
                        }
                    }
                        

                    @media only screen and (max-width: 700px) {
                        .ADV-horizontal-display {
                            display: none;
                        }

                        .ADV-vertical-display {
                            display: block;
                        }
                    }
            `}</style>
            </VStack>
        </div>
    )
}

export default AlbumDetailsView