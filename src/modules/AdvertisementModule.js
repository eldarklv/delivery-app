const Advertisement = require("../models/AdvertisementModel");
const UserModule = require("./UserModule");
const mongoose = require("mongoose");

const AdvertisementModule = {
  async create(data) {
    let advertisement = [await Advertisement.create(data)];

    advertisement = await Promise.all(
      advertisement.map(async (item) => {
        const user = await UserModule.findById(item.userId);

        if (user) {
          let newItem = item.toJSON();
          delete newItem.updatedAt;
          delete newItem.__v;
          delete newItem.userId;
          newItem.user = { id: item.userId, name: user.name };
          return newItem;
        } else {
          console.error(error);
          return null;
        }
      })
    );

    return advertisement;
  },

  async find(params) {
    try {
      let { shortTitle, description, userId, tags, advertisementId } = params;

      shortTitle = shortTitle || "";
      description = description || "";
      userId = userId || "";
      tags = tags || [];

      let query = {
        isDeleted: false,
      };

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
          const user = await UserModule.findById(item.userId);

          if (user) {
            let newItem = item.toJSON();
            delete newItem.updatedAt;
            delete newItem.__v;
            delete newItem.userId;
            newItem.user = { id: item.userId, name: user.name };
            return newItem;
          } else {
            console.error(`Не удалось найти пользователя ${item.userId}`);
            return null;
          }
        })
      );

      return advertisements;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async delete(id) {
    let advertisement = [
      await Advertisement.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      ),
    ];

    advertisement = await Promise.all(
      advertisement.map(async (item) => {
        const user = await UserModule.findById(item.userId);

        if (user) {
          let newItem = item.toJSON();
          delete newItem.updatedAt;
          delete newItem.__v;
          delete newItem.userId;
          newItem.user = { id: item.userId, name: user.name };
          return newItem;
        } else {
          console.error(error);
          return null;
        }
      })
    );

    return advertisement;
  },
};

// async function test() {
//   const testData = await AdvertisementModule.find({
//     advertisementId: "65a2c7099f699724dd703987",
//   });
//   console.log("LOOK", testData);
// }
// test();

// async function testDelete() {
//   const testData = await AdvertisementModule.delete("65a41ce1d9e70b266bb29580");
//   console.log("LOOK DELETE", testData);
// }
// testDelete();

module.exports = AdvertisementModule;
