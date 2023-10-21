import ClientOnly from '@/app/components/ClientOnly';
import './globals.css'
import RegisterModal from '@/app/components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from '@/app/components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import Sidebar from './components/layout/Sidebar';
import Friendsbar from './components/layout/FriendsBar';
import Header from './components/Header';
import { Nunito } from 'next/font/google'
import PostModal from './components/modals/PostModal';
import { useState } from 'react';




export const metadata = {
  title: 'Xplorer',
  description: 'Explore to your hearts content',
}

const font = Nunito({ 
  subsets: ['latin'], 
});


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
   /** To have the RegisterModal modal popup you need to give onclick function as registerModal.onOpen */
  const currentUser =( await getCurrentUser())?.currentUser;
 
  return (
    <html lang="en">
      <body className={`${font.className}`} id="first">

          <div className='max-h-screen'>
              <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
                <div className='grid grid-cols-4 h-full'>  
                  
                <Sidebar currentUser={currentUser} />
                  <div className='col-span-3 lg:col-span-2 border-x-[1px] twelth' >
                  <ClientOnly>
                    <ToasterProvider />
                    <LoginModal />
                    <RegisterModal />
                    <PostModal
                    //@ts-ignore
                    currentUser={currentUser} />
                  </ClientOnly>
                    
                    {children}
                  </div>
                  
                  {currentUser&&<Friendsbar currentUser={currentUser}/>}
                </div>

              </div>
          </div>
      </body>
      </html>
  )
}