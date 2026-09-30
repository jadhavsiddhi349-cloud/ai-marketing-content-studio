const {
    chatWithAssistant
} = require("../services/assistantService");

const chat = async (req, res) => {
    try {
        const { message, brandContext } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const response = await chatWithAssistant(
            message,
            brandContext
        );

        res.status(200).json({
            success: true,
            message: "AI response generated successfully",
            response
        });

    } catch (error) {
        console.error("Assistant error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    chat
};