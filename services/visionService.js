const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const analyzeProductImage = async (imageDataUrl) => {

    try {

        // Extract MIME type and base64 data from data URL
        const [header, base64Data] = imageDataUrl.split(",");

        const mimeType = header.match(/data:(.*);base64/)?.[1] || "image/jpeg";

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
Analyze this product image for BrandAI.

Provide:

1. Product name or type
2. Important visual details
3. Main colors
4. Useful marketing description
5. Possible target audience

Return the answer clearly.
`
                        },
                        {
                            inlineData: {
                                mimeType: mimeType,
                                data: base64Data
                            }
                        }
                    ]
                }
            ]
        });

        return response.text;

    } catch (error) {

        console.error("Vision AI Error:", error);

        throw error;
    }
};

module.exports = {
    analyzeProductImage
};