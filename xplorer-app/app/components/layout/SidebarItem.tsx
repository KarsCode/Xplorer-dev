'use client';
import React, { useCallback } from 'react';
import { IconType } from "react-icons";
import { useRouter } from 'next/navigation';

import useLoginModal from "@/app/hooks/useLoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { BsDot } from 'react-icons/bs';
import router from 'next/navigation';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> =  ({ label, icon: Icon, href,onClick}) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    
    
   if (href) {
      router.push(href);
      
    }
  }, [router, href,  onClick, ]);
  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-2 
        hover:text-yellow-600
        cursor-pointer 
        lg:hidden
        transition-ease-in-out
        delay-100
        hover:-translate-y-1 
        hover:scale-110
        duration-300
      ">
        <Icon size={28} color="white" />
      </div>
      <div className="
        text-white
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-2 
        rounded-xl
        hover:opacity-80
        hover:text-yellow-400
        cursor-pointer
        items-center
        transition-ease-in-out
        delay-100
        hover:-translate-y-1 
        hover:scale-110
        duration-300
      ">
        <Icon size={24} color="dark:white" />
        <p className="hidden lg:block text-xl">
          {label}
        </p>
      </div>
    </div>
  );
}

export default SidebarItem; 