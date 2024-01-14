const { Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      required: true,
    },
    readAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
