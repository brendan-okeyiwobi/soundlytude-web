
import { SubArtistDetails } from '@/types/artist';

export interface Album {
  _id: bigint;
  title: string;
  artistDetails: SubArtistDetails;
  featuredArtists: string[];
  coverArt: string;
  genre: string;
  description: string; 
  releaseDate: Date;
  streamsCount: bigint; 
  tracksCount: number; 
  slug: string; 
};

export interface SubAlbum {
  _id: string;
  title: string;
  artistDetails: SubArtistDetails;
  featuredArtists: string[];
  coverArt: string;
  genre: string;
  description: string; 
  releaseDate: Date; // or string?
  streamsCount: string; 
  slug: string; 
};
