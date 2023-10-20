// pages/_app.tsx
import { AppProps } from 'next/app';
import { useState } from 'react';

function Toggle({ Component, pageProps }: AppProps) {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <button onClick={toggleMode}>
        Toggle Mode: {isDarkMode ? 'Dark' : 'Light'}
      </button>
      <Component {...pageProps} />
    </div>
  );
}

export default Toggle;