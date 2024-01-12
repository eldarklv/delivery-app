const AdvertisementModule = require("../modules/AdvertisementModule");
const UserModule = require("../modules/UserModule");

const AdvertisementController = {
  async createAdvertisement(req, res) {
    const { shortTitle, description } = req.body;
    const images = req.files.map((image) => image.path);
    const userId = req.session.passport.user;
    const dataIn = { shortTitle, description, images, userId };

    let dataOut = await AdvertisementModule.create(dataIn);
    const name = await UserModule.findById(userId);
    dataOut.set('user', { id: userId, name: name });

    dataOut = dataOut.toJSON();
    delete dataOut.createdAt;
    delete dataOut.updatedAt;
    delete dataOut.tags;
    delete dataOut.__v;

    res.json({
      data: [dataOut],
      status: "ok",
    });
  },
};

module.exports = AdvertisementController;
