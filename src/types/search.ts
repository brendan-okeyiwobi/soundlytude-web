export interface Search {
  _id: string;
  type: string;
  title: string;
  description: string;
  thumbnail?: string;
  slug?: string;
  explicit?: boolean;
  artistId?: string;
  artistName?: string;
  artistUsername?: string;
  artistPfp?: string; 
  artistVerified?: boolean; 
  featArtists?: string;
  albumTitle?: string;
  streamsCount?: Date; 
  _createdDate?: Date; 
}