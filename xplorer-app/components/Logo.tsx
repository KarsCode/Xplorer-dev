import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
   <Image className='Logo' src="/XplorerLogoBg.png" alt="Image not foung"
    height={100} width={150}/>
  );
};

export default Logo;