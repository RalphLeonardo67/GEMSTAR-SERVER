const multer = require("multer");
const fs = require("fs-extra");
const uuidv4 = require("uuid");
// TODO FILE VALIDATION IN THIS FUNCTION
const fileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  // cb(null, false);

  // To accept the file pass `true`, like so:
  cb(null, true);

  // You can always pass an error if something goes wrong:
  // cb(new Error("I don't have a clue!"));
};

const thumbnailUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const projectId = req.projectId;
      const path = `${process.env.PROJECT_DIR}/${projectId}`;
      fs.ensureDir(path, { recursive: true })
        .then(() => {
          cb(null, path);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filename: function (req, file, cb) {
      const splitFileName = file.originalname.split(".");
      const fileExtension = splitFileName[splitFileName.length - 1];
      cb(null, `${uuidv4.v4()}.${fileExtension}`);
    },
  }),
});

module.exports = thumbnailUpload;
