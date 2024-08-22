import { createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const defaultDarkModeContext: DarkModeContextType = {
  isDarkMode: false,
  toggleDarkMode: () => {
    throw new Error("toggleDarkMode must be used within a DarkModeProvider");
  },
};

export const DarkModeContext = createContext<DarkModeContextType>(
  defaultDarkModeContext
);

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "isDarkMode",
    window.matchMedia("(prefers-color-scheme:dark)").matches
  );

  useEffect(() => {
    const addedClass = isDarkMode ? "dark-mode" : "light-mode";
    const removedClass = isDarkMode ? "light-mode" : "dark-mode";

    document.documentElement.classList.add(addedClass);
    document.documentElement.classList.remove(removedClass);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((isDark) => !isDark);
  };
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
