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

  async deleteAdvertisement(req, res) {
    try {
      const advertisementId = req.params.id;

      const advertisement = await AdvertisementModule.find({
        advertisementId: advertisementId,
      });

      if (advertisement[0] === null || advertisement.length === 0) {
        return res
          .status(404)
          .json({ error: "Объявление не найдено", status: "error" });
      }
      const advertisementUserId = advertisement[0].user.id;
      const sessionUserId = req.session.passport.user;
      console.log(advertisementUserId === sessionUserId);

      if (advertisementUserId === sessionUserId) {
        const advertisementRes = await AdvertisementModule.delete(
          advertisementId
        );
        res.json({ data: advertisementRes, status: "ok" });
      } else {
        return res
          .status(403)
          .json({ error: "Доступ запрещен", status: "error" });
      }
    } catch (error) {
      console.error(`Не удалось удалить объявление: ${error}`);
      res
        .status(500)
        .json({ error: "Внутренняя ошибка сервера", status: "error" });
    }
  },
};

module.exports = AdvertisementController;
