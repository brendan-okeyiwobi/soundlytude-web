// app/page.tsx

import type { Metadata } from "next";
import Link from 'next/link';
import { HStack, VStack } from "@/components/stack-layout";
import Image from "next/image";

const title = "Soundlytude - Official"
const description = `Soundlytude is a music streaming service created to provide a platform to showcase DJ bon26's music plus a curated selection of music from 
talented artists who I've partnered with. In Soundlytude, you can officially access DJ bon26 exclusive tracks `
const logo = "/assets/images/logos/Soundlytude favicon.png"

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: ["music", "streaming", "Lytude", "DJ bon26", "soundlytude", "Brendan", "Okey-Iwobi", "Nzubechukwu", "entertainment"],
  openGraph: {
    title: title,
    description: description,
    url: "https://soundlytude.lytude.com",
    images: [logo],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [logo],
  },
  authors: [{ name: "Nzubechukwu Brendan Okey-iwobi" }]
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7099FF' },
    { media: '(prefers-color-scheme: dark)', color: '#7099FF' },
  ],
}

const Home = () => {
  return (
    <div>
      <HomeView />
    </div>
  );
};


function HomeView() {

  const heroStyle = {
    // backgroundColor: "#fff000",
    backgroundImage: `linear-gradient(rgba(112, 153, 255, 0.5), rgba(112, 153, 255, 1)), url("assets/images/soundlytude_background.JPG")`,
    borderRadius: "0px 0px 70vw 0px",
    backgroundSize: "cover",
    color: "white",
    fontSize: "30px",
    opacity: 0.9,
    height: "700px",
    padding: "20px",
    width: '100%'
  };

  return (
    <VStack className="content" gap="40px" justify="center" align="center" style={{ /*minHeight: "100vh"*/ }}>
      {/* Hero Section */}
      <VStack style={heroStyle}>
        <VStack className="inner-content" align="center" justify="flex-start" style={{ padding: "0px" }}>
          <div style={{ height: "180px" }}></div>

          <VStack align="flex-start" style={{ padding: 0, width: "fit-content" }}>
            {/* First HStack */}
            <HStack align="center">
              <h1 style={{ letterSpacing: "3px", fontSize: "clamp(1.25rem, 3vw, 6rem)", margin: 0, padding: 0, color: "#ffffff" }}>
                A beautiful,
              </h1>
            </HStack>

            {/* Second HStack */}
            <HStack align="center">
              <h2 style={{ letterSpacing: "3px", fontSize: "clamp(1.25rem, 3vw, 6rem)", margin: 0, padding: "0 0 0 clamp(1rem, 9vw, 9rem)", color: "#ffffff" }}>
                beautiful space
              </h2>
            </HStack>
          </VStack>

          <VStack align="center" style={{ width: "fit-content" }}>
            <p className="cursive" style={{ fontSize: "clamp(0.9rem, 2vw, 2rem)", color: "#fff000" }}>
              And more
            </p>
          </VStack>
        </VStack>
      </VStack>
      <HStack className="inner-content" gap="50px" style={{padding:"20px", flexWrap: "wrap", }}>
        <VStack align="flex-start" justify="flex-end" style={{ maxWidth: "750px", minWidth: "250px", flex:"1" }}>
          <h1 style={{ fontSize: "2.5rem" }}>Get soundlytude</h1>
          <p> {description} </p>
        </VStack>
        <VStack gap="20px">
          <HStack gap="20px">
            <Image src='/assets/images/ipad_tag_screenshot.png' alt="Download Soundlytude on the App Store" width="1024" height="1024"
              style={{ width: "auto", height: "clamp(210px, 20vw, 300px)" }}
            />
            <Image src='/assets/images/iphone_effect_screenshot.png' alt="Download Soundlytude on the App Store" width="1024" height="1024"
              style={{ width: "auto", height: "clamp(210px, 20vw, 300px)" }}
            />
          </HStack>
          <Link href="https://apps.apple.com/us/app/soundlytude/id6503627263" style={{ width: "fit-content" }} target="_blank">
            <Image src='/assets/svg/download-on-the-app-store.svg' alt="Download Soundlytude on the App Store" width="1024" height="1024"
              style={{ width: "125px", height: "auto" }}
            />
          </Link>
        </VStack>
      </HStack>
      <div style={{ height: "20px" }} />
    </VStack>
  );
}

export default Home;


// <Image
//   src="/appstore-badge.svg" // Or use .png if that's what you have
//   alt="Download on the App Store"
//   width={180}
//   height={60}
// />