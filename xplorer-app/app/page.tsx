import type { AppProps } from 'next/app';
import Header from './components/Header';
import ClientOnly from './components/ClientOnly';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import PostModal from './components/modals/PostModal';
import EditModal from './components/modals/EditModal';
import getCurrentUser from './actions/getCurrentUser';
import { Nunito } from 'next/font/google'
import HomeFeed from './components/HomeFeed';
import { useState } from 'react';

export default async function Home({Component,pageProps}:AppProps) {
  const currentUser =( await getCurrentUser())?.currentUser;
  const [selectedOption, setSelectedOption] = useState(null);
  return (
     <div> 
      <Header label='Home'  />
      <div className='h-screen overflow-x-auto'>
      {currentUser&&<HomeFeed currentUser={currentUser} />}   
      </div>
    </div>
  )
}