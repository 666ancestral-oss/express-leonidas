import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

const PASSWORD_KEY = '@expressoleonidas/admin-password';
const AUTH_KEY = '@expressoleonidas/auth';

function getStoredPassword(): string {
  return localStorage.getItem(PASSWORD_KEY) || 'admin123';
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (current: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  const login = useCallback((password: string) => {
    if (password === getStoredPassword()) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  }, []);

  const changePassword = useCallback((current: string, newPassword: string) => {
    if (current !== getStoredPassword()) return false;
    localStorage.setItem(PASSWORD_KEY, newPassword);
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
