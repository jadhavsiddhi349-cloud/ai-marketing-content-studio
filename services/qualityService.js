const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const checkContentQuality = async (campaign) => {

    try {

        const prompt = `
You are BrandAI's AI marketing content quality evaluator.

Evaluate the following marketing campaign.

Campaign information:

Brand Name:
${campaign.brandName || "Not provided"}

Tone:
${campaign.tone || "Not provided"}

Target Audience:
${campaign.audience || campaign.targetAudience || "Not provided"}

Goal:
${campaign.goal || "Not provided"}

Instagram:
${campaign.content?.instagram?.caption || "Not provided"}

Instagram Hashtags:
${campaign.content?.instagram?.hashtags?.join(", ") || "Not provided"}

Facebook:
${campaign.content?.facebook?.post || "Not provided"}

LinkedIn:
${campaign.content?.linkedin?.post || "Not provided"}

YouTube:
${campaign.content?.youtube?.script || "Not provided"}

WhatsApp:
${campaign.content?.whatsapp?.message || "Not provided"}

Email:
${campaign.content?.email?.body || "Not provided"}


Evaluate the campaign based on:

1. Brand consistency
2. Content clarity
3. Call-to-action quality
4. Target audience fit
5. Overall marketing quality

Give each category a score from 0 to 100.

Then calculate an overall score from these categories.

Return ONLY valid JSON in this exact format:

{
    "score": 85,
    "brandConsistency": 90,
    "clarity": 85,
    "cta": 80,
    "audienceFit": 85,
    "suggestions": [
        "Suggestion 1",
        "Suggestion 2",
        "Suggestion 3"
    ]
}

Do not include markdown.
Do not include explanations outside the JSON.
`;


        const response = await ai.models.generateContent({
           model: "gemini-3.8-flash",
            contents: prompt
        });


        const resultText = response.text;


        const result = JSON.parse(resultText);


        return result;

    } catch (error) {

        console.error("AI Quality Check Error:", error);

        return {
            score: 0,
            brandConsistency: 0,
            clarity: 0,
            cta: 0,
            audienceFit: 0,
            suggestions: [
                "AI quality check could not be completed."
            ]
        };
    }
};


module.exports = {
    checkContentQuality
};