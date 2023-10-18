import type { AppProps } from 'next/app';
import Header from './components/Header';
import ClientOnly from './components/ClientOnly';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';



export default function Home({Component,pageProps}:AppProps) {
  return (
    <div>
      <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
        </ClientOnly>
      <Header label='Home'/>   
    </div>
  )
}