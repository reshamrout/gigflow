import { createContext, useContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }){
  const [user, setUser] = useState("");
  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data);
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data);
  };

const value = { user, login, register }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

