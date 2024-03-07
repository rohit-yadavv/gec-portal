"use client";
import { getUserByToken } from "@/lib/actions/user.action"; 
import { useRouter } from "next/navigation";
import React, { useContext, createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: any;
  setUser: any;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState('');
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await getUserByToken();
      // @ts-ignore
      const parsedUser = JSON.parse(res);
      setUser(parsedUser); 
    } catch (error: any) {
      router.push("/sign-in");
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    fetchData();
    // eslinst - disable - next - line
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined) {
    throw new Error("useTheme not in themeProvider");
  }
  return auth;
}
