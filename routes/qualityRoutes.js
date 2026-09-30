const express = require("express");

const {
    checkQuality
} = require("../controllers/qualityController");

const router = express.Router();

router.post("/:id", checkQuality);

module.exports = router;