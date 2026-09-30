const generateCampaign = async ({
    brand,
    campaign
}) => {

    const product = campaign.product;
    const audience = campaign.audience;
    const goal = campaign.goal;
    const tone = campaign.tone;

    return {
        instagram: {
            caption:
                `✨ Discover ${product}! Designed for ${audience}. ` +
                `${goal}. Experience something special with ${brand.brandName}.`,

            hashtags: [
    "#BrandAI",
    "#Marketing",
    "#NewProduct",
    `#${product.replace(/\s+/g, "")}`
],

            postIdea:
                `Create a product-focused visual showing ${product}.`
        },

        facebook: {
            post:
                `Introducing ${product}! ` +
                `Our campaign is focused on ${goal}. ` +
                `Perfect for ${audience}.`,

            hashtags: [
                "#BrandAI",
                "#Marketing"
            ]
        },

        linkedin: {
            post:
                `${brand.brandName} is excited to introduce ${product}. ` +
                `Our goal is to ${goal}, while creating value for ${audience}.`,

            hashtags: [
                "#Business",
                "#Marketing",
                "#BrandAI"
            ]
        },

        youtube: {
            title:
                `${product} - Discover Something New`,

            script:
                `Hook: Are you looking for something made for ${audience}?\n\n` +
                `Problem: Many customers struggle to find the right product.\n\n` +
                `Solution: Meet ${product}.\n\n` +
                `CTA: Try ${product} today!`,

            description:
                `${product} by ${brand.brandName}.`
        },

        whatsapp: {
            message:
                `Hello 👋\n\n` +
                `Check out ${product} from ${brand.brandName}!\n\n` +
                `${goal}.\n\n` +
                `Interested? Contact us today.`
        },

        email: {
            subject:
                `Discover ${product} from ${brand.brandName}`,

            body:
                `Hello,\n\n` +
                `We are excited to introduce ${product}.\n\n` +
                `Designed for ${audience}, this campaign focuses on ${goal}.\n\n` +
                `Thank you,\n${brand.brandName}`
        }
    };
};

module.exports = {
    generateCampaign
};