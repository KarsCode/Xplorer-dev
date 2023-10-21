import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
   <Image className='Logo' src="/images/final-removebg-preview.png" alt="Image not found"
    height={100} width={150}/>
  );
};

export default Logo;