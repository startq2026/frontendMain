"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AuthSession } from "@/lib/auth-config";
import {
  clearSession,
  getSession,
  login as loginRequest,
  signup as signupRequest,
} from "@/lib/auth-client";

interface AuthContextType {
  user: AuthSession | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (
    displayName: string,
    email: string,
    password: string,
  ) => Promise<string | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setUser(getSession());
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginRequest(email, password);
    if (result.error) return result.error;

    setUser(getSession());
    return null;
  }, []);

  const signup = useCallback(
    async (displayName: string, email: string, password: string) => {
      const result = await signupRequest(displayName, email, password);
      if (result.error) return result.error;
      return null;
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
