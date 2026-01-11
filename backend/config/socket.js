let io;

export const initSocket = async (server) => {
  io = new (await import("socket.io")).Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(userId);
    });
  });
};

export const getIO = () => io;
