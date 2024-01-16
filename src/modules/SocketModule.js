const ChatModule = require("./ChatModule");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.handshake);

    socket.on("getHistory", async (user0, user1) => {
      const chat = await ChatModule.find([user0, user1]);
      const { messages } = chat;
      socket.emit("chatHistory", messages);
    });

    socket.on("sendMessage", async (author, receiver, text) => {
      const message = await ChatModule.sendMessage({ author, receiver, text });
      socket.emit("newMessage", message);
    });
  });
};
