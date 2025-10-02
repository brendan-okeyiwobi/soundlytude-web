// app/artist/[username]/artistView.tsx

import Image from 'next/image';
import { VStack, HStack } from '@/components/stack-layout';
import { Artist } from '@/types/artist';
import { AlbumSingle } from '@/types/albumSingle';
import { resolveContentURL } from '@/utils/resolveContentURL';
import ArtistNameFormatter from '@/utils/artistNameFormatter';
import Link from 'next/link';
import DateUtil from '@/utils/dateUtil';


const ArtistDetailsView = ({ artist, music }: { artist: Artist, music: AlbumSingle[] }) => {

    const {
        username,
        verified,
        artistName,
        profilePicture,
        about,
        genre,
        totalPlays,
        LytudeMLA,
    } = artist;

    return (
        <div>
            <div className="ADV-vstack" />

            <div className='content inner-content'>
                <VStack
                    justify="flex-end"
                    align="flex-start"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url("${resolveContentURL(profilePicture, "scaledToFill", { width: 1024, height: 1024 })}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "clamp(400px, 40vw, 500px)",
                        backgroundSize: "cover",
                        overflow: "hidden",
                        borderRadius: "0 0 10px 10px",
                        padding: "20px clamp(20px, 5vw, 60px)"
                    }}>

                    <HStack className='inner-content' style={{ width: "100%" }}>
                        <VStack align='flex-start' className='p' style={{ color: "white", minWidth: "200px" }}>
                            <h1 style={{ color: "white", margin: 0 }}>{artistName}</h1>
                            <div style={{ opacity: "0.75" }}>
                                <ArtistNameFormatter artistName={`@${username}`} verification={verified == true} featuredArtists={[]} />
                            </div>
                        </VStack>
                        <div style={{ flex: 1 }} />
                        {LytudeMLA &&
                            <Link href={LytudeMLA} target='_blank'> <button className='button' style={{ color: "white", fontFamily: "Futura" }}>LytudeMLA </button></Link>}
                    </HStack>

                </VStack>
            </div>

            <VStack className="inner-content" align='flex-start' style={{ padding: "20px 0" }}>

                <h3 style={{ whiteSpace: 'pre-line', padding: "0 20px" }}>Music:</h3>
                <div className="my-albums-grid">
                    {music.map((items, index) => {
                        return (
                            <div key={index}>
                                <AlbumSingleCard {...items} />
                            </div>
                        )
                    })}
                </div>

                <div style={{ height: "40px" }}></div>

                <div style={{ height: "40px" }}></div>
                <h3 style={{ whiteSpace: 'pre-line', padding: "0 20px" }}>About:</h3>
                <p style={{ color: "rgba(128, 128, 128)", fontSize: "1rem", margin: 0, whiteSpace: 'pre-line', padding: "0 20px" }}>{about}</p>

                <div style={{ height: "40px" }}></div>

                <h3 style={{ whiteSpace: 'pre-line', padding: "0 20px" }}>Genres:</h3>
                <p style={{ color: "rgba(128, 128, 128)", fontSize: "1rem", margin: 0, whiteSpace: 'pre-line', padding: "0 20px" }}>{`${genre.join(", ")}.`}</p>

                <div style={{ height: "40px" }}></div>

                <h1 style={{ color: "rgba(128, 128, 128, 0.75)", fontSize: "4rem", margin: 0, padding: "0 20px" }}>{totalPlays}</h1>
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
                        background-image: url("${resolveContentURL(profilePicture, "scaledToFill", { width: 512, height: 512 })}");
                        background-color: #7099ff;
                        height: 750px;
                        width: 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        position: absolute;
                        top: 0;
                        z-index: -1;
                        filter: blur(7.5vw) saturate(200%);
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

                    .my-albums-grid {
                        display: grid;
                        gap: 20px;
                        padding: 0 20px;
                        grid-template-columns: repeat(5, 1fr);
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
                        .my-albums-grid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }

                    @media (max-width: 420px) {
                        /* small screens (<420px) = 2 columns */
                        .my-albums-grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
            `}</style>
            </VStack>
        </div>
    )
}

function AlbumSingleCard(item: AlbumSingle) {
    return (
        // <VStack style={{ width: "clamp(128px, 15vw, 256px)" }}>
        <VStack>
            <Link href={`/${item.type.toLowerCase() == "single" ? "single" : "album"}/${item.slug}`}>
                <Image
                    src={resolveContentURL(item.coverArt, "scaledToFill", { width: 256, height: 256 })}
                    alt={item.title}
                    width={512}
                    height={512}
                    style={{
                        width: "100%",
                        height: "auto", // maintain aspect ratio
                        borderRadius: "5px 5px 0 0",
                        aspectRatio: "1 / 1", // Ensure it's square
                        objectFit: "cover",
                    }}
                />

                <h2
                    style={{
                        fontFamily: "Audiowide",
                        fontSize: "1.25rem",
                        margin: "10px 0 5px 0",
                        lineHeight: "25px",
                        maxWidth: "200px",
                        wordWrap: "break-word",
                        overflowWrap: "anywhere", /* Alternative for better browser support */
                        whiteSpace: "normal"
                    }}
                    className="text-limited-4"
                >
                    {item.title}
                </h2>
                <p style={{margin: 0, padding: 0, fontSize: "0.75rem", opacity: 0.5}}>{DateUtil.getYear(item.releaseDate)}</p>

            </Link>
        </VStack>
    );
}

export default ArtistDetailsView