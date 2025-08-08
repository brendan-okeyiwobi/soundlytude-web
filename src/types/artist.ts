export interface Artist {
    _id?: string;
    artistName: string;
    username?: string;
    profilePicture?: string;
    bio: string;
    genre: string[];
    verified?: boolean;
    totalPlays: bigint;
    LytudeMLA: string;
    about: string;
    _createdDate: Date;
}

export interface SubArtistDetails {
    _id?: string;
    artistName: string;
    username?: string;
    profilePicture?: string;
    verified?: boolean;
}