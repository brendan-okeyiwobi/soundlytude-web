import { SubArtistDetails } from '@/types/artist';
import { SubAlbum } from '@/types/album';

export interface TrackSingle {
  _id: bigint;
  title: string;
  type: string;
  coverArt: string | undefined;
  artistDetails: SubArtistDetails;
  albumDetails: SubAlbum | undefined;
  featuredArtists: [string];
  audio: string | undefined;
  genre: string;
  description: string; 
  streamsCount: bigint; 
  explicit: boolean;
  trackNumber: number;
  releaseDate: Date; 
  _createdDate: Date; 
}
