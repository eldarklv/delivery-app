const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const userId = req.session.passport.user;

    const uploadsPath = path.join(__dirname, "../uploads");

    const userIdPath = path.join(uploadsPath, userId);

    if (!fs.existsSync(userIdPath)) {
      fs.mkdirSync(userIdPath);
    }

    cb(null, userIdPath);
  },
  filename(req, file, cb) {
    // имя файла
    cb(null, `${file.originalname}`);
  },
});

module.exports = multer({ storage });
