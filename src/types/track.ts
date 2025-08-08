import { SubArtistDetails } from '@/types/artist';
import { SubAlbum } from '@/types/album';

export interface Track {
  _id: bigint;
  title: string;
  artistDetails: SubArtistDetails;
  albumDetails: SubAlbum;
  featuredArtists: [string];
  audio: string;
  genre: string;
  description: string; 
  streamsCount: bigint; 
  explicit: boolean;
  trackNumber: number;
}
