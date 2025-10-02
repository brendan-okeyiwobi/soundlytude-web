// app/discover/components/advertView.tsx

import React from 'react';
import { Advert } from '@/types/advert';
import Image from 'next/image';
import { HStack, VStack } from '@/components/stack-layout';
import { resolveContentURL } from '@/utils/resolveContentURL';

type Props = {
  content: Advert;
  title: string;
  displaySize: string;
};

const AdvertView: React.FC<Props> = ({ content, title, displaySize }) => {
  console.log(content)
  return (
    // <div style={{ padding: "20px 0", width:"100%" }}>
    // {/* <div style={{ width: displaySize === 'large' ? '100%' : '50%' }}> */}
    <VStack className="inner-content">
      <a href={content.link} style={{width:"100%"}}>
        <HStack style={{ padding: "20px 0", width: "100%" }}>
          <Image src={resolveContentURL(content.source, "scaledToFill", { width: 512, height: 512 })} alt={title} width={512} height={512} style={{
            width: '100%', height: "100%",
            maxHeight: "200px", maxWidth: "200px", objectFit: "cover"
          }} />
          <VStack align='flex-start'  style={{padding: "10px"}}>
            <h3  style={{lineHeight: "40px"}}>{title}</h3>
            <p style={{margin:0, padding: 0}}>{content.description}</p>
          </VStack>
        </HStack>
      </a>
    </VStack>
    // </div>
  );
};

export default AdvertView;