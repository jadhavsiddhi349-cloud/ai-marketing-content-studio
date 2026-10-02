const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};


const generateCampaign = async ({ brand, campaign }) => {

    const prompt = `
You are an expert digital marketing content generator for BrandAI.

Generate a complete marketing campaign for the following brand.

BRAND INFORMATION:
Brand Name: ${brand.brandName}
Brand Description: ${brand.description || ""}
Brand Tone: ${brand.tone}
Target Audience: ${brand.targetAudience}
Products: ${JSON.stringify(brand.products || [])}
Offers: ${brand.offers || ""}
Preferred Style: ${brand.preferredStyle || ""}
Preferred Language: ${brand.preferredLanguage || "English"}

CAMPAIGN INFORMATION:
Campaign Name: ${campaign.campaignName}
Goal: ${campaign.goal}
Product: ${campaign.product}
Audience: ${campaign.audience}
Tone: ${campaign.tone}
Platforms: ${JSON.stringify(campaign.platforms || [])}

Create marketing content for these platforms:

1. Instagram
2. Facebook
3. LinkedIn
4. YouTube
5. WhatsApp
6. Email

Return ONLY valid JSON.

The JSON must follow exactly this structure:

{
    "instagram": {
        "caption": "string",
        "hashtags": ["string", "string", "string"],
        "postIdea": "string"
    },

    "facebook": {
        "post": "string",
        "hashtags": ["string", "string", "string"]
    },

    "linkedin": {
        "post": "string",
        "hashtags": ["string", "string", "string"]
    },

    "youtube": {
        "title": "string",
        "script": "string",
        "description": "string"
    },

    "whatsapp": {
        "message": "string"
    },

    "email": {
        "subject": "string",
        "body": "string"
    }
}

Important rules:

- Match the brand tone.
- Match the target audience.
- Focus on the campaign goal.
- Make the content platform-specific.
- Do not invent products that are not provided.
- Keep the content engaging and professional.
- Use the preferred language.
- Return ONLY JSON.
`;


    // Retry Gemini if it temporarily returns 503
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

        try {

            console.log(
                `Generating campaign with Gemini... Attempt ${attempt}/${maxAttempts}`
            );


            const response = await ai.models.generateContent({
                // model: "gemini-3.5-flash-lite",
                model: "gemini-3.8-flash",
                contents: prompt
            });


            let resultText = response.text;


            if (!resultText) {
                throw new Error("Gemini returned an empty response");
            }


            // Remove markdown code fences if Gemini adds them
            resultText = resultText
                .replace(/^```json\s*/i, "")
                .replace(/^```\s*/i, "")
                .replace(/\s*```$/i, "")
                .trim();


            const generatedContent = JSON.parse(resultText);


            console.log("Gemini campaign generated successfully");


            return generatedContent;


        } catch (error) {

            console.error(
                `Gemini attempt ${attempt} failed:`,
                error.message
            );


            // Retry only for temporary server/capacity errors
            if (error.status === 503 && attempt < maxAttempts) {

                const waitTime = attempt * 2000;

                console.log(
                    `Gemini temporarily unavailable. Retrying in ${waitTime / 1000} seconds...`
                );

                await sleep(waitTime);

                continue;
            }


            // Do not silently return undefined
            throw new Error(
                `Failed to generate campaign using Gemini: ${error.message}`
            );
        }
    }
};


module.exports = {
    generateCampaign
};