
import { SubArtistDetails } from '@/types/artist';

export interface Single {
  _id: bigint;
  title: string;
  artistDetails: SubArtistDetails;
  featuredArtists: [string];
  coverArt: string;
  audio: string;
  genre: string;
  description: string; 
  streamsCount: bigint; 
  fullSong: boolean; 
  group: string; 
  explicit: boolean; 
  slug: string; 
  releaseDate: Date; 
  _createdDate: Date; 
};

export interface SubSingle {
  _id: string;
  title: string;
  artistDetails: SubArtistDetails;
  featuredArtists: [string];
  coverArt: string;
  genre: string;
  audio: string;
  description: string; 
  releaseDate: Date; // or string?
  streamsCount: string; 
  slug: string; 
};
