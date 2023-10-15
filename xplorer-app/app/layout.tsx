import { Nunito } from 'next/font/google'
import Modal from '@/app/components/Modal';
import ClientOnly from '@/app/components/ClientOnly';



import './globals.css'
import RegisterModal from '@/app/components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from '@/app/components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import MapComponent from './components/Map';

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

  return (
    <html lang="en">
      <body className={font.className}>
          <ClientOnly>
            <ToasterProvider/>

            <RegisterModal/>  
            <LoginModal/>
          </ClientOnly>
          
          {children}
      </body>
    </html>
  )
}