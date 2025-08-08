// app/discover/components/advertView.tsx

import React from 'react';
import { Advert } from '@/types/advert';
import Image from 'next/image';

type Props = {
  data: Advert;
  title: string;
  displaySize: string;
};

const AdvertView: React.FC<Props> = ({ data, title, displaySize }) => {
  return (
    <div style={{ width: displaySize === 'large' ? '100%' : '50%' }}>
      <h3>{title}</h3>
      <a href={data.link}>
        <Image src={data.imageUrl} alt={title} style={{ width: '100%' }} />
      </a>
    </div>
  );
};

export default AdvertView;