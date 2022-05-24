const express = require("express");
const router = express.Router();
const uploadCarousel = require("../helpers/uploadCarousel");
const { AppController } = require("../controller");
const { validate } = require("../model/validator/carousel")

router.post("/carousel-upload",uploadCarousel.single("filename"),(req, res) => {
  if(req.file)
    req.body.filename = req.file.filename;

  const { error } = validate(req.body);
  if(error) return res.status(400).send({ message: error.details[0].message });

  const filename = req.file.filename;
  const url = req.protocol + '://' + req.get('host')
  const filepath = url + '/carousel/'+ filename;
  const { userId } = req.session;
  const carouselData = {
    filename,
    user_id: userId,
    filepath,
    caption: req.body.caption
  }
  AppController.uploadCarousel(carouselData).then((response) => {
    res.send({ success: true, data: response });
  });
}
);

router.get("/logs/fetch", (req, res) => {
  AppController.fetchLogs().then((response) => {
    res.send({ success: true, ...response });
  });
});

router.get("/carousels", (req, res) => {
  AppController.getAllCarousels().then((result) => {
    res.send({ success: true, data: result });
  });
});

router.get("/active-carousels", (req, res) => {
  AppController.getAllActiveCarousels().then((result) => {
    res.send({ success: true, data: result });
  });
});

router.put("/update-carousel/", (req, res) => {
  const id = req.body.carousel_id;
  const is_inactive = req.body.is_inactive;
  AppController.updateCarouselStatus(id, is_inactive).then((result) => {
    res.send({ success: true, data: result });
  });
});

router.delete("/delete-carousel/", (req, res) => {
  const id = req.body.carousel_id;
  AppController.deleteCarousel(id).then((result) => {
    res.send({ success: true, data: result });
  });
});

module.exports = router;
