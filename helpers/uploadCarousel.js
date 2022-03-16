"use strict";
const multer = require("multer");
const fs = require("fs-extra");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "uploads/carousel";
    fs.ensureDir(path, { recursive: true })
      .then(() => {
        cb(null, path);
      })
      .catch((err) => {
        console.log(err);
      });
    // cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadCarousel = multer({ storage: storage, fileFilter: filefilter });

module.exports = uploadCarousel;
