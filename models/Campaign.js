const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        },

        campaignName: {
            type: String,
            required: true
        },

        goal: {
            type: String,
            required: true
        },

        product: {
            type: String,
            required: true
        },

        audience: {
            type: String,
            required: true
        },

        tone: {
            type: String,
            required: true
        },

        platforms: [
            {
                type: String
            }
        ],

        content: {
            instagram: {
                caption: String,
                hashtags: [String],
                postIdea: String
            },

            facebook: {
                post: String,
                hashtags: [String]
            },

            linkedin: {
                post: String,
                hashtags: [String]
            },

            youtube: {
                title: String,
                script: String,
                description: String
            },

            whatsapp: {
                message: String
            },

            email: {
                subject: String,
                body: String
            }
        },

        qualityCheck: {
            score: {
                type: Number,
                default: 0
            },

            brandConsistency: {
                type: Number,
                default: 0
            },

            clarity: {
                type: Number,
                default: 0
            },

            cta: {
                type: Number,
                default: 0
            },

            audienceFit: {
                type: Number,
                default: 0
            },

            suggestions: [
                {
                    type: String
                }
            ]
        },

        status: {
            type: String,
            enum: ["draft", "review", "approved"],
            default: "draft"
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Campaign", campaignSchema);