// app/discover/components/albumsView.tsx

"use client";

import React from "react";
import { Album } from "@/types/album";
import { VStack } from "@/components/stack-layout";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ArtistNameFormatter from "@/utils/artistNameFormatter";

type Props = {
    data: Album[];
    title: string;
    displaySize: string;
};

const AlbumView: React.FC<Props> = ({ data, title }) => {
    function slidesToShow(): number {
        if (data.length > 2) {
            return -1;
        }
        return 1;
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow() == -1 ? 4.25 : 1,
        slidesToScroll: slidesToShow() == -1 ? 4 : 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesToShow() == -1 ? 4.25 : 1,
                    slidesToScroll: slidesToShow() == -1 ? 4 : 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: slidesToShow() == -1 ? 3.25 : 1,
                    slidesToScroll: slidesToShow() == -1 ? 3 : 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: slidesToShow() == -1 ? 2.25 : 1,
                    slidesToScroll: slidesToShow() == -1 ? 2 : 1,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: slidesToShow() == -1 ? 1.25 : 1,
                    slidesToScroll: slidesToShow() == -1 ? 1 : 1,
                },
            },
        ],
    };
    return (
        <div style={{ padding: "20px 0" }}>
            {data.length > 0
                ? (
                    <div className="inner-content slider-container">
                        <h3 style={{ padding: "10px 20px" }}>{title}</h3>
                        <Slider {...settings}>
                            {data.map((item) => {
                                return AlbumCard(item);
                            })}
                        </Slider>
                    </div>
                )
                : null}
        </div>
    );
};

function AlbumCard(item: Album) {
    return (
        <VStack style={{ width: "clamp(192px, 15vw, 256px)" }}>
            <Link href={`/album/${item.slug}`}>
                <Image
                    src={item.coverArt ?? ""}
                    alt={item.title}
                    width={1024}
                    height={1024}
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
                        lineHeight: "25px",
                    }}
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
        </VStack>
    );
}

export default AlbumView;
