import React from 'react';
import {VStack} from '@/components/stack-layout';

interface StickerProps {
  label: string;
  inline?: boolean;
}

const Sticker: React.FC<StickerProps> = ({ label, inline = false }) => {
  return (
    <VStack
      className=""
      align="flex-start"
      style={{
        width: 'fit-content',
        height: 'fit-content',
        backgroundColor: '#80808020',
        borderRadius: '5px 5px 0px 0px',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          padding: '2.5px 5px',
          margin: '0',
          color: 'gray',
          display: inline ? 'inline-flex' : 'block',
          width: 'fit-content',
          alignItems: inline ? 'center' : undefined,
          whiteSpace: inline ? 'nowrap' : undefined,
        }}
      >
        {label}
      </p>
    </VStack>
  );
};

export default Sticker;
