const express = require("express");

const {
    createCampaign,
    getCampaigns,
    getCampaignById,
    updateCampaign,
    approveCampaign
} = require("../controllers/campaignController");

const router = express.Router();

router.post("/", createCampaign);

router.get("/", getCampaigns);

router.get("/:id", getCampaignById);

router.put("/:id", updateCampaign);

router.put("/:id/approve", approveCampaign);

module.exports = router;