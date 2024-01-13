const AdvertisementModule = require("../modules/AdvertisementModule");
const UserModule = require("../modules/UserModule");

const AdvertisementController = {
  async createAdvertisement(req, res) {
    const { shortTitle, description } = req.body;
    const images = req.files.map((image) => image.path);
    const userId = req.session.passport.user;
    const dataIn = { shortTitle, description, images, userId };

    let advertisement = await AdvertisementModule.create(dataIn);

    res.json({ data: advertisement, status: "ok" });
  },

  async getAllAdvertisements(req, res) {
    const advertisements = await AdvertisementModule.find({});

    res.json({ data: advertisements, status: "ok" });
  },

  async getAdvertisementById(req, res) {
    const advertisementId = req.params.id;
    const advertisement = await AdvertisementModule.find({
      advertisementId: advertisementId,
    });

    res.json({ data: advertisement, status: "ok" });
  },
};

module.exports = AdvertisementController;
