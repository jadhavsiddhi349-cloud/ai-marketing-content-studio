const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        brandName: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        tone: {
            type: String,
            required: true
        },

        targetAudience: {
            type: String,
            required: true
        },

        products: [
            {
                name: {
                    type: String,
                    required: true
                },

                description: {
                    type: String,
                    default: ""
                }
            }
        ],

        offers: {
            type: String,
            default: ""
        },

        preferredStyle: {
            type: String,
            default: ""
        },

        preferredLanguage: {
            type: String,
            default: "English"
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Brand", brandSchema);