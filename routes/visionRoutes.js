const express = require("express");
const multer = require("multer");

const { analyzeImage } = require("../controllers/visionController");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/analyze",
    upload.single("productImage"),
    analyzeImage
);

module.exports = router;