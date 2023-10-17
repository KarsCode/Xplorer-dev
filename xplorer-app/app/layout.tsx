import { Nunito } from 'next/font/google'

import ClientOnly from '@/app/components/ClientOnly';



import './globals.css'
import RegisterModal from '@/app/components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from '@/app/components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

import NavBar from './components/widgets/NavBar';
import MapComponent from './components/widgets/MapComponent';
import WeatherApp from './components/widgets/WeatherApp';
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
      <body className={font.className}>
          <div className='h-screen bg-black'>
              <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
              <NavBar currentUser={currentUser}/>
              {currentUser?.latitude &&<MapComponent currentUser={currentUser} />}
              {currentUser?.latitude && <WeatherApp currentUser={currentUser} />}
                <div className='grid grid-cols-4 h-full'>
                  
                  <ClientOnly>
                    <ToasterProvider/>
                    
                    <RegisterModal/>  
                    <LoginModal/>

                  </ClientOnly>
                  {children}
                </div>
              </div>
          </div>
          
      </body>
    </html>
  )
}