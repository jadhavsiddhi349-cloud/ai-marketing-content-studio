const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};


const generateWithRetry = async (prompt, maxRetries = 3) => {

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

            console.log(
                `Gemini Assistant Attempt ${attempt}/${maxRetries}`
            );

            const response = await ai.models.generateContent({
                model: "gemini-3.8-flash",
                contents: prompt
            });

            return response;

        } catch (error) {

            console.error(
                `Gemini Assistant Attempt ${attempt} failed:`,
                error?.status,
                error?.message
            );

            const retryableErrors = [
                429,
                500,
                503
            ];

            if (
                retryableErrors.includes(error?.status) &&
                attempt < maxRetries
            ) {

                const delay =
                    attempt * 3000;

                console.log(
                    `Gemini temporarily unavailable. Retrying in ${
                        delay / 1000
                    } seconds...`
                );

                await sleep(delay);

                continue;
            }

            throw error;
        }
    }

    throw new Error(
        "Gemini Assistant failed after multiple attempts."
    );
};


const chatWithAssistant = async (
    message,
    brandContext = {}
) => {

    try {

        if (!message || !message.trim()) {

            throw new Error(
                "Assistant message is empty."
            );
        }


        const prompt = `
You are BrandAI's in-app AI assistant.

Your main purpose is to help users understand and use the BrandAI platform.

You are NOT a general-purpose chatbot.

You should mainly answer questions about BrandAI and guide users through its features.

BRANDAI PLATFORM FEATURES:

1. Dashboard
The Dashboard gives users an overview of their BrandAI activity
and provides access to the main platform features.

2. Brand Brain
Brand Brain stores information about the user's brand, including:
- Brand name
- Industry
- Target audience
- Brand tone
- Products or services

3. Create Campaign
Users can create a new campaign by selecting their Brand Brain
and entering campaign information.

4. Campaign Details
Users can view the generated campaign and its content
for different platforms.

5. AI Quality Check
AI Quality Check evaluates campaign content and provides
a quality score and suggestions for improvement.

6. Approve Campaign
Users can approve a campaign after reviewing it.

7. Campaign Calendar
Users can view their campaigns and see scheduled or
completed campaigns in the calendar.

8. AI Assistant
Users can ask questions about BrandAI and get guidance
about how to use the platform.

IMPORTANT RULES:

- Answer questions related to the BrandAI platform.
- Guide users step-by-step when they ask how to use a feature.
- Tell the user which BrandAI page or feature they should use.
- Keep answers simple and easy to understand.
- Do not claim that you performed an action unless the system
  actually performed that action.
- Do not invent features that are not available in BrandAI.
- If you do not know something about BrandAI, say that you
  don't have enough information instead of making it up.
- If the question is unrelated to BrandAI, politely explain
  that you are designed to help users use the BrandAI platform.
- Do not return JSON.
- Give a normal conversational answer.
- Use short paragraphs or numbered steps when explaining a process.

USER'S BRAND CONTEXT:

Brand Name: ${brandContext?.brandName || "Not provided"}

Industry: ${brandContext?.industry || "Not provided"}

Audience: ${brandContext?.audience || "Not provided"}

Tone: ${brandContext?.tone || "Not provided"}

Products/Services: ${
    Array.isArray(brandContext?.products)
        ? brandContext.products
            .map((product) =>
                typeof product === "object"
                    ? product.name
                    : product
            )
            .join(", ")
        : brandContext?.products || "Not provided"
}

USER QUESTION:

${message}
`;


        const response = await generateWithRetry(
            prompt
        );


        const answer = response?.text?.trim();


        if (!answer) {

            throw new Error(
                "Gemini returned an empty response."
            );
        }


        console.log(
            "BrandAI Assistant Response:",
            answer
        );


        return answer;

    } catch (error) {

        console.error(
            "AI Assistant Error:",
            error
        );

        throw error;
    }
};


module.exports = {
    chatWithAssistant
};