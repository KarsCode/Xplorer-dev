import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
   <Image className='Logo' src="/images/XplorerLogoBgDm.png" alt="Image not found"
    height={100} width={150}/>
  );
};

export default Logo;