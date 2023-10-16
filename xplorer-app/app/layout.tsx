import { Nunito } from 'next/font/google'

import ClientOnly from '@/app/components/ClientOnly';



import './globals.css'
import RegisterModal from '@/app/components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from '@/app/components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

import NavBar from './components/NavBar';
import MapComponent from './components/MapComponent';
import EmailButton from './components/EmailButton';

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
  console.log(typeof(currentUser));
  return (
    <html lang="en">
      <body className={font.className}>

          <NavBar currentUser={currentUser}/>
          <ClientOnly>
            <ToasterProvider/>
            <MapComponent currentUser={currentUser}/>
            <RegisterModal/>  
            <LoginModal/>
            <EmailButton/> 
          </ClientOnly>
          
          {children}
      </body>
    </html>
  )
}