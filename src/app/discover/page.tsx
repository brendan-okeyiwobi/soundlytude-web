// app/discover/page.tsx

import React from "react";
import { getHomepage } from "./getHomepage";

import AdvertView from "./components/advertView";
import ArtistView from "./components/artistsView";
import AlbumView from "./components/albumsView";
import AlbumSingleView from "./components/albumSinglesView";
import RecentlyListenedView from "./components/recentlyListenedView";
import DiscoverView from "./components/discoverView";

import { Artist } from '@/types/artist';
import { Album } from '@/types/album';
import { AlbumSingle } from '@/types/albumSingle';
import { Advert } from '@/types/advert';


export async function generateMetadata() {
  return {
    title: "DiscoverED",
    description:
      "More than DJ bon26 discover new Songs from various artists as well",
    metadataBase: new URL("https://lytude.com"),
  };
}
const HomePageLogicView = async () => {
  const { homepage, error } = await getHomepage();
  let d = homepage;
  if (!d) {
    console.warn("[Discover] Error:", error);
    d = [];
  }

  return (
    <div>
      <div style={{ height: "50px" }}></div>
      {d.map((item, index) => {
        const type = item.type.toLowerCase();
        const size = item.displaySize.toLowerCase();

        switch (type) {
          case "advert":
            // if ("source" in (item.content ?? {})) {
            return (
              <AdvertView
                key={index}
                content={
                  Array.isArray(item.content)
                    ? (item.content[0] as unknown as Advert)
                    : (item.content as unknown as Advert)
                }
                title={item.title}
                displaySize={size}
              />
            );
          // }
          // return <p key={index}>Invalid advert data</p>;

          case "artist":
            if (Array.isArray(item.content)) {
              return (
                <ArtistView
                  key={index}
                  data={item.content as Artist[]}
                  title={item.title}
                  displaySize={size}
                />
              );
            }

            return <p key={index}>Invalid artist data</p>;

          case "album":
            if (Array.isArray(item.content)) {
              return (
                <AlbumView
                  key={index}
                  data={item.content as Album[]}
                  title={item.title}
                  displaySize={size}
                />
              );
            }
            return <p key={index}>Invalid album data</p>;

          case "albumsingle":
            if (Array.isArray(item.content)) {
              return (
                <AlbumSingleView
                  key={index}
                  data={item.content as AlbumSingle[]}
                  title={item.title}
                  displaySize={size}
                />
              );
            }
            return <p key={index}>Invalid music data</p>;

          case "history":
            return null;
            return <RecentlyListenedView key={index} title={item.title} />;

          case "discover":
            return <DiscoverView key={index} />;

          default:
            return <p key={index}>Unknown Type</p>;
        }
      })}
    </div>
  );
};

export default HomePageLogicView;
