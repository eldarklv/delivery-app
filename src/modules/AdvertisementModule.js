const Advertisement = require("../models/AdvertisementModel");

const AdvertisementModule = {
  async create(data) {
    const createdAd = await Advertisement.create(data);
    return createdAd;
  },

  async find(params) {
    let { shortTitle, description, userId, tags } = params;

    shortTitle = shortTitle || "";
    description = description || "";
    userId = userId || "";
    tags = tags || [];

    let query = {
      shortTitle: { $regex: shortTitle, $options: "i" },
      description: { $regex: description, $options: "i" },
      userId: userId,
    };

    if (tags && tags.length > 0) {
      query.tags = { $all: tags };
    }

    const advertisements = await Advertisement.find(query);
    return advertisements;
  },
};

// test data
async function test() {
  const testData = await AdvertisementModule.find({
    shortTitle: "test",
    description: "",
    userId: "65a2c20ea2a4fef84ca8dd25",
    tags: ["vue"],
  });
  console.log("LOOK", testData);
}
test();

module.exports = AdvertisementModule;
