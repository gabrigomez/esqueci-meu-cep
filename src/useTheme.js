import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export default function ThemeContextProvider({children}) {
  const [theme, setTheme] = useState(localStorage.getItem('cepTheme' || null));

  useEffect(()=> {
    const root = window.document.documentElement;

    if (theme) {
      root.classList.add('dark');
      localStorage.setItem('cepTheme', 'dark');

    } else {
      root.classList.remove('dark');
      localStorage.removeItem('cepTheme');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={({theme, setTheme})}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme () {
  return useContext(ThemeContext);
};