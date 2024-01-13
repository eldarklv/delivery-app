const Advertisement = require("../models/AdvertisementModel");
const UserModule = require("./UserModule");
const mongoose = require("mongoose");

const AdvertisementModule = {
  async create(data) {
    let advertisement = [await Advertisement.create(data)];

    advertisement = await Promise.all(
      advertisement.map(async (item) => {
        const { name } = await UserModule.findById(item.userId);
        let newItem = item.toJSON();
        delete newItem.updatedAt;
        delete newItem.__v;
        delete newItem.userId;
        newItem.user = { id: item.userId, name: name };
        return newItem;
      })
    );

    return advertisement;
  },

  async find(params) {
    let { shortTitle, description, userId, tags, advertisementId } = params;

    shortTitle = shortTitle || "";
    description = description || "";
    userId = userId || "";
    tags = tags || [];

    let query = {};

    if (shortTitle) {
      query.shortTitle = { $regex: shortTitle, $options: "i" };
    }

    if (description) {
      query.description = { $regex: description, $options: "i" };
    }

    if (userId) {
      query.userId = userId;
    }

    if (tags && tags.length > 0) {
      query.tags = { $all: tags };
    }

    if (advertisementId) {
      const ObjectId = mongoose.Types.ObjectId;
      const objectId = new ObjectId(advertisementId);
      query._id = objectId;
    }

    let advertisements = await Advertisement.find(query);

    advertisements = await Promise.all(
      advertisements.map(async (item) => {
        const { name } = await UserModule.findById(item.userId);
        let newItem = item.toJSON();
        delete newItem.updatedAt;
        delete newItem.__v;
        delete newItem.userId;
        newItem.user = { id: item.userId, name: name };
        return newItem;
      })
    );

    return advertisements;
  },
};

// async function test() {
//   const testData = await AdvertisementModule.find({
//     advertisementId: "65a2c7099f699724dd703987",
//   });
//   console.log("LOOK", testData);
// }
// test();

module.exports = AdvertisementModule;
