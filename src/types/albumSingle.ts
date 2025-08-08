import { SubArtistDetails } from '@/types/artist';

export interface AlbumSingle {
  _id: bigint;
  type: string;
  title: string;
  coverArt: string;
  featuredArtists: [string];
  artistDetails: SubArtistDetails;
  audio: string | undefined;
  genre: string;
  slug: string;
  description: string; 
  streamsCount: bigint; 
  explicit: boolean;
  licensed: boolean;
  likesCount: boolean;
  trackNumber: number;
  releaseDate: Date; 
  _createdDate: Date; 
}
