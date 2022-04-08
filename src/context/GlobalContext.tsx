import { Backdrop } from "components/shared";
import { GlobalContextProp } from "global/types/item.types";
import React, { useState, useCallback, useContext, useMemo } from "react";

export const GlobalContext = React.createContext<GlobalContextProp>({
  setTheme: () => {},
  setLoading: () => {},
  theme: "light",
  isLoading: false,
  setAlert: () => {},
});

export const useGlobal = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children?: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [alertItem, setAlertItem] = useState({
    message: "",
    show: false,
    severity: "success",
  });

  const setTheme = useCallback((isDark: boolean) => {
    setIsDarkMode(isDark);
  }, []);

  const setLoading = useCallback((status: boolean) => {
    setShowBack(status);
  }, []);

  const setAlert = useCallback((message: string, severity: string) => {
    setAlertItem({
      message,
      show: true,
      severity: "success",
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        setTheme,
        setLoading,
        theme: isDarkMode ? "dark" : "light",
        isLoading: showBack,
        setAlert,
      }}
    >
      {children}
      <Backdrop show={showBack} />
    </GlobalContext.Provider>
  );
};
