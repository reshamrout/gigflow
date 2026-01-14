import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const SocketContext = createContext();

const socket = io("http://localhost:5000", {
  withCredentials: true
});

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", user._id);

    const handleHired = (data) => {
      toast.success(data.message);
    };

    socket.on("hired", handleHired);

    // ✅ CLEANUP
    return () => {
      socket.off("hired", handleHired);
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
