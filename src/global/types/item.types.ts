export type User = {
  id: string;
  name: string;
  email: string;
};

export type Authentication = {
  user?: User | null;
  login: (params: LoginParams) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type GlobalContextProp = {
  setTheme: (isDark: boolean) => void;
  setLoading: (status: boolean) => void;
  isLoading: boolean;
  theme: string;
  setAlert: (message: string, severity: string) => void;
};
