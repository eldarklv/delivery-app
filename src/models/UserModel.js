const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
