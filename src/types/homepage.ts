// types/homepage.ts
 
import { Album } from '@/types/album'
import { AlbumSingle } from '@/types/albumSingle'
import { Artist } from '@/types/artist'
import { Advert } from '@/types/advert'

// all of your possible “type” strings:
type SectionType = 'advert' | 'Album' | 'AlbumSingle' | 'Artist' | 'discover'

// restrict displaySize to your four variants:
type DisplaySize = 'XS' | 'S' | 'M' | 'L'

// common bits for all sections:
interface SectionBase<T extends SectionType, C> {
  title: string
  type: T
  displaySize: DisplaySize
  content: C
}

export type HistorySection = SectionBase<'advert', Advert>;
export type AlbumSection = SectionBase<'Album', Album[]>;
export type AlbumSingleSection = SectionBase<'AlbumSingle', AlbumSingle[]>;
export type ArtistSection = SectionBase<'Artist', Artist[]>;
export type DiscoverSection = SectionBase<'discover', null>;
/* interface:

// 1. purely history (no content)
export interface HistorySection
  extends SectionBase<'advert', Advert> {}

// 2. album sections
export interface AlbumSection
  extends SectionBase<'Album', Album[]> {}

// 3. album+single sections
//    (here I assume SubAlbum is actually your “single” shape)
export interface AlbumSingleSection
  extends SectionBase<'AlbumSingle', AlbumSingle[]> {}

// 4. top‐artists section
//    you’ll need an `Artist` interface somewhere—here I assume you’ve defined it
export interface ArtistSection
  extends SectionBase<'Artist', Artist[]> {}

// 5. a discover section (no content)
export interface DiscoverSection
  extends SectionBase<'discover', null> {}
*/

// the union of all of them:
export type Section =
  | HistorySection
  | AlbumSection
  | AlbumSingleSection
  | ArtistSection
  | DiscoverSection

// finally, your payload is just:
export type Homepage = Section[]

// how to use:
// const payload: SectionsPayload = [ /* …the JSON you showed… */ ]