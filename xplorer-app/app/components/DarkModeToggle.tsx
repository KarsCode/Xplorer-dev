"use client"
import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react';

interface DarkModeToggleProps {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export default function DarkModeToggle({ darkMode, setDarkMode }: DarkModeToggleProps) {
    const toggleDarkMode = () => {
      // Toggle dark mode state
      setDarkMode(!darkMode);
    };
  
    return (
      <div className="py-16">
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          className={`${
            darkMode ? 'bg-beige' : 'bg-black'
          } relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Toggle Dark Mode</span>
          <span
            aria-hidden="true"
            className={`${
              darkMode ? 'translate-x-9' : 'translate-x-0'
            } pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    );
  }