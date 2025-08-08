// app/artists/artistsView.tsx

import React from 'react';
import styles from './artistsView.module.css';
import { Artist } from '@/types/artist';
import Image from 'next/image';
import Link from 'next/link';
import ArtistNameFormatter from '@/utils/artistNameFormatter';

type Props = { artists: Artist[] };

export default function ArtistsView({ artists }: Props) {
    return (
        <div className={styles.container + ' inner-content'}>
            <div style={{ height: '50px' }} />
            <h1 style={{ marginTop: 10 }}>Top 20</h1>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th}></th>
                            <th className={styles.th} style={{ padding: '0.75rem 0.25rem' }} />
                            <th className={styles.th}><h3>Artist</h3></th>
                            <th className={styles.th}><h3>Plays</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map((artist, i) => (
                            <tr key={artist._id} className={styles.rowHover}>
                                <td className={styles.td}>{i + 1}</td>
                                <td className={styles.td} style={{ padding: '0.75rem 0rem' }}>
                                    <Link href={`/artist/${artist.username}`} className={styles.playsLink} >
                                        <Pfp pfp={artist.profilePicture || ''} name={artist.artistName} />
                                    </Link>
                                </td>
                                <td className={styles.td} style={{ width: '100%' }}>
                                    <Link href={`/artist/${artist.username}`} className={styles.playsLink + " p"} >
                                        <ArtistNameFormatter artistName={artist.artistName} verification={artist.verified == true} featuredArtists={[]}/>
                                    </Link>
                                </td>
                                <td className={styles.td} style={{ textAlign: 'right' }}>
                                    {artist.totalPlays.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

type PfpProps = { pfp: string; name: string };

function Pfp({ pfp, name }: PfpProps) {
    return <Image src={pfp} alt={name} width={40} height={40} className={styles.avatar} />;
}
