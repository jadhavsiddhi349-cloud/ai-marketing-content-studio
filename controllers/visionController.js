const fs = require("fs");
const path = require("path");

const { analyzeProductImage } = require("../services/visionService");

const analyzeImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required"
            });
        }

        const imagePath = path.resolve(req.file.path);

        const imageBuffer = fs.readFileSync(imagePath);

        const base64Image = imageBuffer.toString("base64");

        const mimeType = req.file.mimetype;

        const imageDataUrl = `data:${mimeType};base64,${base64Image}`;

        const analysis = await analyzeProductImage(imageDataUrl);

        res.status(200).json({
            success: true,
            message: "Product image analyzed successfully",
            analysis
        });

    } catch (error) {
        console.error("Vision error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    analyzeImage
};