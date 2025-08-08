// app/discover/components/artistsView.tsx

"use client";

import React from "react";
import { Artist } from "@/types/artist";
import { VStack } from "@/components/stack-layout";
import Image from "next/image";
import Slider from "react-slick";
import ArtistNameFormatter from "@/utils/artistNameFormatter";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

type Props = {
    data: Artist[];
    title: string;
    displaySize: string;
};

const ArtistView: React.FC<Props> = ({ data, title }) => {
    //     function slidesToShow(): number {
    //   return 1;
    // }

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
        <div style={{ padding: "20px 0" }}>
            {data.length > 0
                ? (
                    <div className="inner-content slider-container">
                        <h3 style={{ padding: "10px 10px" }}>{title}</h3>
                        <Slider {...settings}>
                            {data.map((item, index) => {
                                return <ArtistCard key={index} item={item} />;
                            })}
                        </Slider>
                    </div>
                )
                : null}
            <style>
                {`
    .slick-slider .slick-slide {
        padding: 0 5px;
    }

    .slick-prev::before {
        content: '❮';
        font-size: clamp(18px, 15vw, 30px);
        color: var(--black-white-color);
    }

    .slick-next::before {
        content: '❯';
        font-size: clamp(18px, 15vw, 30px);
        padding-left: 10px;
        color: var(--black-white-color);
    }

    `}
            </style>
        </div>
    );
};

function ArtistCard({ item }: { item: Artist }) {
    return (
        <Link href={`/artist/${item.username}`}>
            <VStack
                justify="center"
                style={{ width: "clamp(128px, 10vw, 192px)" }}
            >
                <Image
                    src={item.profilePicture ?? ""}
                    alt={item.artistName}
                    width={512}
                    height={512}
                    style={{
                        width: "clamp(128px, 10vw, 192px)",
                        height: "clamp(128px, 10vw, 192px)",
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                />

                <h2
                    style={{
                        fontFamily: "Audiowide",
                        fontSize: "clamp(18px, 1rem, 41px)",
                        margin: "10px 0 5px 0",
                        width: "clamp(128px, 10vw, 192px)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <ArtistNameFormatter
                        artistName={item.artistName}
                        verification={item.verified == true}
                        featuredArtists={[]}
                    />
                </h2>
                <p style={{ margin: 0, opacity: 0.75 }}>
                    {item.totalPlays} Total{" "}
                    {item.totalPlays > 1 ? "plays" : "play"}
                </p>
            </VStack>
        </Link>
        // <VStack>
        //     <Image
        //         src={item.profilePicture ?? ""}
        //         alt={item.artistName}
        //         height={128}
        //         width={128}
        //         style={{
        //             maxWidth: "128px",
        //             maxHeight: "128px",
        //             borderRadius: "100%",
        //         }}
        //     />
        //     <h1
        //         style={{
        //             fontFamily: "Audiowide",
        //             fontSize: "clamp(18px, 1.5rem, 41px)",
        //         }}
        //     >
        //         {item.artistName}
        //     </h1>
        // </VStack>
    );
}

export default ArtistView;
