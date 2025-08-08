'use client';

import React, { useState, useEffect } from 'react';
import { searchAction } from './action';
import { HStack, Spacer, VStack } from '@/components/stack-layout';
import { SearchSuggestion } from '@/types/searchSuggestion';
import { Search } from '@/types/search';
import Image from 'next/image';
import ArtistNameFormatter from '@/utils/artistNameFormatter';
import Link from 'next/link';
import ExplicitTitleFormatter from '@/utils/explicitTitleFormatter';

interface SearchPageViewProps {
    initialSuggestions: SearchSuggestion[];
}

const SearchPageView: React.FC<SearchPageViewProps> = ({ initialSuggestions }) => {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState<SearchSuggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [results, setResults] = useState<Search[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            const lower = query.toLowerCase();
            const matches = initialSuggestions
                .filter(item => (item.title ?? '').toLowerCase().includes(lower))
                .slice(0, 10);
            setFiltered(matches);
            setShowDropdown(matches.length > 0);
        } else {
            setShowDropdown(false);
            setFiltered([]);
        }
    }, [query, initialSuggestions]);

    function onSelect(item: SearchSuggestion) {
        setQuery(item.title ?? 'undefined');
        setShowDropdown(false);
    }

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const res = await searchAction(formData);
        setLoading(false);
        setResults(res);
    }

    function formatLink(search: Search) {
        switch (search.type) {
            case "Album track":
                return `/album/${search.slug}`;
            case "Album":
                return `/album/${search.slug}`;
            case "Single":
                return `/single/${search.slug}`;
            case "Artist":
                return `/artist/${search.slug}`;
            default:
                return "";
        }
    }


    return (
        <div className="container inner-content">
            <div style={{ height: "50px" }}></div>
            <h1>Search Soundlytude</h1>
            <form action={handleSubmit} className="search-form">
                <div className="autocomplete">
                    <input
                        type="text"
                        name="query"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search Artists, Album and more"
                        onFocus={() => query && setShowDropdown(filtered.length > 0)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                        className="search-input"
                    />
                    {showDropdown && (
                        <ul className="suggestions-list">
                            {filtered.map(item => (
                                <li key={item._id + item.type} onClick={() => onSelect(item)}>
                                    <p style={{ margin: 0 }}>{item.title}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit" className="search-button">
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {results && (
                <div className="inner-content results">
                    <h3 style={{ padding: "20px 0" }}>Results for: {query}</h3>
                    {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
                    <VStack gap="10px" style={{ width: "100%" }}>
                        {results.map((item, index) => (
                            <div key={item._id + index} style={{ width: "100%" }}>
                                <Link href={formatLink(item)}>
                                    {item.type == "Artist" &&
                                        listArtistView(item)
                                    }
                                    {item.type != "Artist" &&
                                        listOtherView(item)
                                    }
                                </Link>
                            </div>
                        ))}

                    </VStack>
                </div>
            )}
            {results && (
                <div style={{height: "50vh"}}></div>
            )}
            <style jsx>{`
        .container {
          margin: 2rem auto;
          padding: 1rem;
          font-family: Arial, sans-serif;
        }
        .search-form {
          position: relative;
          display: flex;
        }
        .autocomplete {
          flex: 1;
          position: relative;
        }
        .search-input {
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #cccccc80;
          border-width: 0 0 1px 0;
          border-radius: 5px 5px 0 0;
          transition: 0.25s linear;
          background: transparent;
          outline: none; 
        }
        .search-input:focus {
          border: 1px solid var(--foreground);
          border-width: 0 0 1.1px 0;
        }
        .suggestions-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: #ffffff20;
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-radius: 0 0 4px 4px;
          max-height: 150px;
          overflow-y: auto;
          margin: 0;
          padding: 0;
          list-style: none;
          z-index: 10;
        }
        .suggestions-list li {
          padding: 0.5rem;
          cursor: pointer;
        }
        .suggestions-list li:hover {
          background: linear-gradient(to right, #00000050 0%, #00000000 100%);
        }
        .search-button {
          padding: 0.5rem 1rem;
          margin-left: 0.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 5px 5px 0 0;
          background-color: #7099ff;
          color: white;
          cursor: pointer;
        }
        .search-button:hover {
          background-color: #9db9ffff;
        }
        .results {
          margin-top: 2rem;
          padding: 1rem;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
};

function listArtistView(artist: Search) {
    return (
        <HStack key={artist._id} style={{ width: "100%" }} align="center" justify="flex-start">
            {/* {item.title} */}
            <Image src={artist.thumbnail ?? ""} width={256} height={256} alt={artist.title}
                style={{
                    width: "64px", height: "64px", objectFit: "cover", margin: "10px",
                    borderRadius: `${artist.type.toLowerCase() == "artist" ? "50%" : "5px 5px 0 0"}`
                }} />
            <VStack align='flex-start'>
                <div style={{ fontFamily: "Audiowide", display: "flex", flex: 1, color: "var(--foreground)" }}>
                    <ArtistNameFormatter artistName={artist.title ?? ""} verification={artist.artistName == undefined && artist.artistVerified == true} featuredArtists={[]} />
                </div>
                {artist.artistName &&
                    <div className="p secondary" style={{ display: "flex" }}>
                        <ArtistNameFormatter artistName={`@${artist.artistName ?? ""}`} verification={artist.artistVerified == true} featuredArtists={[]} />
                    </div>
                }
            </VStack>
            <Spacer />
            <p>❯</p>
        </HStack>
    )
}

function listOtherView(item: Search) {
    return (
        <HStack key={item._id + item.type} style={{ width: "100%" }} align="center" justify="flex-start">
            {/* {item.title} */}
            <Image src={item.thumbnail ?? ""} width={256} height={256} alt={item.title}
                style={{
                    width: "64px", height: "64px", objectFit: "cover", margin: "10px", boxShadow: "0px 0px 5px #7099ff40",
                    borderRadius: `${item.type.toLowerCase() == "artist" ? "50%" : "5px 5px 0 0"}`
                }} />
            <VStack align='flex-start'>
                <div className='secondary p'>
                    <ExplicitTitleFormatter title={item.type != "Album track" ? item.type : item.albumTitle ?? "Track"} explicit={item.explicit == true} />
                </div>
                <h2 className="text-limited-3" style={{ margin: 0, fontSize:"1.25rem" }}>{item.title}</h2>
                {item.artistName &&
                    <div className="p secondary" style={{ display: "flex" }}>
                        <ArtistNameFormatter artistName={`${item.artistName ?? ""}`} verification={item.artistVerified == true} featuredArtists={[]} />
                    </div>
                }
            </VStack>
            <Spacer />
            <p>❯</p>
        </HStack>
    )
}

export default SearchPageView;
