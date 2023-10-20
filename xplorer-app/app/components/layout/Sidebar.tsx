'use client';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import {FaBowlFood} from 'react-icons/fa6';

import SidebarItem from "@/app/components/layout/SidebarItem";
import getCurrentUser from "@/app/actions/getCurrentUser";

import SidebarLogo from './SidebarLogo';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { User } from "@prisma/client";
import addFriend from '@/app/actions/addFriend';
import { sign } from 'crypto';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import MapButton from '../widgets/map/MapButton';
import WeatherApp from '../widgets/WeatherApp';
import SidebarPostButton from './SidebarPostButton';
import usePostModal from '@/app/hooks/usePostModal';



interface SidebarProps {
  currentUser: User | null | undefined,
}

const Sidebar: React.FC<SidebarProps> =  ({currentUser}) => {
    

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: FaBowlFood,
      label: 'Restaurants',
      href: '/restaurants',
      auth: true,
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ]
  const loginModal = useLoginModal();
  //const postModal = usePostModal(); 
   return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
              {items.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href} 
                  icon={item.icon} 
                  label={item.label}
                />
              ))}
              
              {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
              
              {currentUser && <SidebarPostButton currentUser={currentUser}/>}
              {!currentUser && <SidebarItem onClick={loginModal.onOpen} icon={BiLogIn} label="Log In / Sign Up" />}
              {currentUser && <MapButton currentUser={currentUser}/>}
              {currentUser && <WeatherApp currentUser={currentUser}/>}
              

          </div>
        </div>
      </div>
  )
};

export default Sidebar;