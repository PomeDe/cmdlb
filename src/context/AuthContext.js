"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(false);

    useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setLogged(parsed.logged === true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "auth",
      JSON.stringify({ logged })
    );
  }, [logged]);

  return (
    <AuthContext.Provider value={{ logged, setLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
