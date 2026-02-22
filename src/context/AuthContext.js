"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
   const [user, setUser] = useState("");
     const [users, setUsers] = useState([]);

    useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
        const storedUsers = localStorage.getItem("users");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setLogged(parsed.logged === true);
            setEmail(parsed.email || "");
            setUser(parsed.user || "");
    }
        if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "auth",
      JSON.stringify({ logged, email,user,  })
    );
  }, [logged, email,user ]);

  return (
    <AuthContext.Provider value={{ logged, setLogged,user,setUser, email, setEmail,      users,
      setUsers}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
