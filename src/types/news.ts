export interface News {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  _createdDate: string;
  categories: { name: string }[];
  artistDetails: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    artistName: string;
    profilePicture?: string;
  };
}

export interface FullNews {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  _createdDate: string;
  categories: { _id: string; name: string }[];
  content: string;
  artistDetails: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    artistName: string;
    profilePicture?: string;
  };
}
