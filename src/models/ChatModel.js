const { Schema, default: mongoose } = require("mongoose");
const Message = require("./MessageModel");

const chatSchema = new Schema(
  {
    users: {
      type: [ObjectId],
      required: true,
    },
    messages: {
      type: [Message],
      required: false,
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
