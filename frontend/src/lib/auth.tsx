import { createContext, useContext, useState } from 'react';

interface User {
  name?: string;
  email?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Auto-authenticated for demo
  const [user, setUser] = useState<User | null>({ name: 'Dr. Smith', email: 'dr.smith@neuroved.com' });

  const login = async (email: string, password: string) => {
    // Simple demo authentication
    setIsAuthenticated(true);
    setUser({ name: email.split('@')[0], email });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}