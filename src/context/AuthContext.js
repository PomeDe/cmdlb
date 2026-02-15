"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
   const [user, setUser] = useState("");

    useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setLogged(parsed.logged === true);
            setEmail(parsed.email || "");
            setUser(parsed.user || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "auth",
      JSON.stringify({ logged, email,user })
    );
  }, [logged,user]);

  return (
    <AuthContext.Provider value={{ logged, setLogged,user,setUser, email, setEmail}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
