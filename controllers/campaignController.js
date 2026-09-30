const Campaign = require("../models/Campaign");
const Brand = require("../models/Brand");

const { generateCampaign } = require("../services/aiService");


// CREATE CAMPAIGN
const createCampaign = async (req, res) => {

    try {

        const {
            brandId,
            campaignName,
            goal,
            product,
            audience,
            tone,
            platforms
        } = req.body;


        // Check brand
        const brand = await Brand.findById(brandId);

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found"
            });
        }


        // Generate content
        const generatedContent = await generateCampaign({
            brand,
            campaign: {
                campaignName,
                goal,
                product,
                audience,
                tone,
                platforms
            }
        });


        // Save campaign
        const campaign = await Campaign.create({

            brandId,

            campaignName,

            goal,

            product,

            audience,

            tone,

            platforms,

            content: generatedContent,

            status: "review"

        });


        res.status(201).json({

            success: true,

            message: "Campaign generated successfully",

            campaign

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// GET ALL CAMPAIGNS
const getCampaigns = async (req, res) => {

    try {

        const campaigns = await Campaign
            .find()
            .populate("brandId")
            .sort({ createdAt: -1 });


        res.status(200).json({

            success: true,

            campaigns

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// GET SINGLE CAMPAIGN
const getCampaignById = async (req, res) => {

    try {

        const campaign = await Campaign
            .findById(req.params.id)
            .populate("brandId");


        if (!campaign) {

            return res.status(404).json({

                success: false,

                message: "Campaign not found"

            });

        }


        res.status(200).json({

            success: true,

            campaign

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// UPDATE CAMPAIGN CONTENT
const updateCampaign = async (req, res) => {

    try {

        const campaign = await Campaign.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );


        if (!campaign) {

            return res.status(404).json({

                success: false,

                message: "Campaign not found"

            });

        }


        res.status(200).json({

            success: true,

            message: "Campaign updated successfully",

            campaign

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// APPROVE CAMPAIGN
const approveCampaign = async (req, res) => {

    try {

        const campaign = await Campaign.findByIdAndUpdate(

            req.params.id,

            {
                status: "approved"
            },

            {
                new: true
            }

        );


        if (!campaign) {

            return res.status(404).json({

                success: false,

                message: "Campaign not found"

            });

        }


        res.status(200).json({

            success: true,

            message: "Campaign approved successfully",

            campaign

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


module.exports = {

    createCampaign,

    getCampaigns,

    getCampaignById,

    updateCampaign,

    approveCampaign

};