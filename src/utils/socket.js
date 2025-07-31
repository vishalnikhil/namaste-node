const socketIo = require('socket.io');

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {

    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("-");
      socket.join(roomId);
    });

   socket.on("sendMessage", ({ firstName, lastName, userId, targetUserId, text }) => {
  const roomId = [userId, targetUserId].sort().join("-");
  // broadcast to everyone *except* the sender:
  socket.to(roomId).emit("messageReceived", { firstName, lastName, text });
});

    socket.on("disconnect", () => { /* ... */ });
  });
};

module.exports = initializeSocket;
