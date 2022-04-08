import React, { useContext, useCallback } from "react";
import { useGlobal } from "./GlobalContext";
import { Authentication, LoginParams, User } from "global/types/item.types";

export const AuthContext = React.createContext<Authentication>({
  isAuthenticated: false,
  user: null,
  login: (params: LoginParams) => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  return { ...auth };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setAlert, setLoading } = useGlobal();
  const [user, setUser] = React.useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}") || null
  );

  const doLogin = useCallback(
    async (params: LoginParams) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setUser({
          id: "1",
          name: "John Doe",
          email: params.email,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "1",
            name: "John Doe",
            email: params.email,
          })
        );
      }, 1000);
    },
    [setLoading]
  );

  const doLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser(null);
      localStorage.removeItem("user");
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        login: doLogin,
        logout: doLogout,
        isAuthenticated: user ? true : false,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
