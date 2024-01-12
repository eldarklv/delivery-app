const { Schema, default: mongoose } = require("mongoose");

const advertisementSchema = new Schema(
  {
    shortTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    userId: {
      type: Object,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true }
);

const AdvertisementModel = mongoose.model("Advertisement", advertisementSchema);

module.exports = AdvertisementModel;
