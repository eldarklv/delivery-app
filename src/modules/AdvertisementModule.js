const Advertisement = require("../models/AdvertisementModel");

const AdvertisementModule = {
  async create(data) {
    const createdAd = await Advertisement.create(data);
    return createdAd
  },
};

module.exports = AdvertisementModule
