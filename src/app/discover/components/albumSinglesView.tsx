// app/discover/components/albumSinglesView.tsx

"use client";

import React from "react";
import { AlbumSingle } from "@/types/albumSingle";
import { VStack } from "@/components/stack-layout";
import Slider from "react-slick";
import Image from "next/image";

import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArtistNameFormatter from "@/utils/artistNameFormatter";
import { resolveContentURL } from "@/utils/resolveContentURL";

type Props = {
    data: AlbumSingle[];
    title: string;
    displaySize: string;
};

const AlbumSingleView: React.FC<Props> = ({ data, title }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4.25,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4.25,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3.25,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2.25,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div style={{padding:"20px 0"}}>
            {data.length > 0
                ? (
                    <div className="inner-content slider-container">
                        <h3 style={{ padding: "10px 20px" }}>{title}</h3>
                        <Slider {...settings}>
                            {data.map((item) => {
                                return AlbumSingleCard(item);
                            })}
                        </Slider>
                    </div>
                )
                : null}
        </div>
    );
};

function AlbumSingleCard(item: AlbumSingle) {
    return (
        <VStack style={{ width: "clamp(192px, 15vw, 256px)" }}>
            <Link
                href={`/${
                    item.type.toLowerCase() == "single" ? "single" : "album"
                }/${item.slug}`}
            >
                <Image
                    src={resolveContentURL(item.coverArt, "scaledToFill", { width: 512, height: 512 })}
                    alt={item.title}
                    width={512}
                    height={512}
                    style={{
                        width: "100%",
                        height: "auto", // maintain aspect ratio
                        borderRadius: "5px 5px 0 0",
                        aspectRatio: "1 / 1", // Ensure it's square
                        objectFit: "cover",
                    }}
                />

                <h2
                    style={{
                        fontFamily: "Audiowide",
                        fontSize: "clamp(18px, 1.5rem, 41px)",
                        margin: "10px 0 5px 0",
                        lineHeight: "25px"
                    }}
                    className="text-limited-4"
                >
                    {item.title}
                </h2>
                <div className="p" style={{ margin: 0 }}>
                    <ArtistNameFormatter
                        artistName={item.artistDetails.artistName}
                        verification={item.artistDetails.verified == true}
                        featuredArtists={item.featuredArtists}
                    /></div>
                    
            </Link>
                            {/* <div style={{ fontFamily: "Futura" }}>
                                <ArtistNameFormatter artistName={item.artistDetails.artistName} verification={item.artistDetails.verified == true}
                                    featuredArtists={item.featuredArtists} username={item.artistDetails.username} />
                            </div> */}
        </VStack>
    );
}

export default AlbumSingleView;
