import React from "react";
import { createContext, useContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const login = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    setUser(res.data.user);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  await api.post("/auth/logout");
  setUser(null);
};


  const register = async (data) => {
    
    try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error) {
    throw error;
  }

  };

const value = { user, login, logout, register }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

