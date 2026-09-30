const Campaign = require("../models/Campaign");

const {checkContentQuality} = require("../services/qualityService");


const checkQuality = async (req, res) => {

    try {

        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {

            return res.status(404).json({

                success: false,

                message: "Campaign not found"

            });

        }


        const result = await checkContentQuality(campaign);


        campaign.qualityCheck = result;

        await campaign.save();


        res.status(200).json({

            success: true,

            message: "Quality check completed",

            qualityCheck: result

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


module.exports = {
    checkQuality
};