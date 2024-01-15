const Chat = require("../models/ChatModel");
const Message = require("../models/MessageModel");
const { EventEmitter } = require("events");

const eventEmitter = new EventEmitter();

const ChatModule = {
  async sendMessage(data) {
    const { author, receiver, text } = data;

    let chat = await Chat.findOne({ users: { $all: [author, receiver] } });

    if (!chat) {
      chat = await Chat.create({ users: [author, receiver] });
    }

    const message = new Message({
      author: author,
      sentAt: new Date(),
      text: text,
    });

    chat.messages.push(message);
    chat.save();

    eventEmitter.emit("newMessage", { chatId: chat._id, message });

    return message;
  },

  async find(users) {
    const user0 = users[0];
    const user1 = users[1];

    const chat = await Chat.findOne({ users: { $all: [user0, user1] } });

    return chat;
  },

  subscribe(callback) {
    eventEmitter.on("newMessage", callback);
  },
};

// async function testSendMsg() {
//   try {
//     ChatModule.subscribe((data) => {
//       console.log("LOOK", data.chatId, data.message);
//     });

//     const message = await ChatModule.sendMessage({
//       author: "65a41cd8d9e70b266bb2957a",
//       receiver: "65a43b41372ea956b442de07",
//       text: "hello world",
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
// testSendMsg();

// async function testFind() {
//   const chat = await ChatModule.find([
//     "65a41cd8d9e70b266bb2957a",
//     "65a43b41372ea956b442de07",
//   ]);
//   console.log(chat);
// }
// testFind();

module.exports = ChatModule;
