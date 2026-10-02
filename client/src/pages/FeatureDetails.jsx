import {
    ArrowLeft,
    ArrowRight,
    Brain,
    CheckCircle2,
    Mail,
    MessageCircle,
    ShieldCheck,
    Sparkles,
    WandSparkles
} from "lucide-react";

import {
    Link,
    useParams
} from "react-router-dom";


const featureData = {

    "brand-brain": {

        badge: "BRAND INTELLIGENCE",

        icon: <Brain size={30} />,

        title: "Give BrandAI a clear understanding of your brand.",

        subtitle: "Your brand identity stays at the center of every campaign.",

        description:
            "Brand Brain stores the important information about your brand so BrandAI can create content that matches your identity, audience and communication style.",

        benefits: [
            "Brand name and description",
            "Target audience",
            "Brand tone and voice",
            "Products and services",
            "Preferred content style",
            "Brand-specific preferences"
        ],

        steps: [
            {
                number: "01",
                title: "Add your brand",
                text: "Enter your important brand information in one place."
            },
            {
                number: "02",
                title: "Define your voice",
                text: "Set the tone and style you want BrandAI to follow."
            },
            {
                number: "03",
                title: "Create consistently",
                text: "BrandAI uses this information when building your campaigns."
            }
        ],

        cta: "Try Brand Brain",
        path: "/brand-brain"

    },


    "multi-platform": {

        badge: "MULTI-PLATFORM CONTENT",

        icon: <Sparkles size={30} />,

        title: "Turn one campaign idea into content for multiple platforms.",

        subtitle: "One brief. Multiple platform-ready outputs.",

        description:
            "BrandAI takes one campaign brief and adapts it into content for the platforms your audience uses, while keeping your brand voice consistent.",

        benefits: [
            "Instagram captions and ideas",
            "Facebook posts",
            "LinkedIn content",
            "YouTube content",
            "WhatsApp messages",
            "Email campaigns"
        ],

        steps: [
            {
                number: "01",
                title: "Write your brief",
                text: "Enter the campaign goal, product, audience and tone."
            },
            {
                number: "02",
                title: "Choose platforms",
                text: "Select the platforms where your campaign should appear."
            },
            {
                number: "03",
                title: "Generate content",
                text: "BrandAI creates content adapted to each selected platform."
            }
        ],

        cta: "Create a Campaign",
        path: "/create-campaign"

    },


    "ai-assistant": {

        badge: "AI MARKETING ASSISTANT",

        icon: <WandSparkles size={30} />,

        title: "A marketing co-pilot for ideas, improvements and answers.",

        subtitle: "Ask BrandAI whenever you need marketing help.",

        description:
            "Use the BrandAI Assistant to brainstorm campaign ideas, improve content, write stronger calls-to-action and get useful marketing suggestions.",

        benefits: [
            "Generate campaign ideas",
            "Improve existing content",
            "Create stronger CTAs",
            "Brainstorm social media ideas",
            "Rewrite marketing copy",
            "Ask marketing questions"
        ],

        steps: [
            {
                number: "01",
                title: "Ask",
                text: "Describe what you want BrandAI to help you with."
            },
            {
                number: "02",
                title: "Explore",
                text: "BrandAI provides ideas and possible directions."
            },
            {
                number: "03",
                title: "Improve",
                text: "Use the suggestions to refine your marketing work."
            }
        ],

        cta: "Try AI Assistant",
        path: "/ai-assistant"

    },


    "content-checker": {

        badge: "AI CONTENT QUALITY",

        icon: <ShieldCheck size={30} />,

        title: "Check your content before you publish.",

        subtitle: "Improve clarity, consistency and audience fit.",

        description:
            "BrandAI Content Checker reviews your marketing content against important quality factors and provides suggestions before you approve your campaign.",

        benefits: [
            "Brand consistency",
            "Clarity",
            "Readability",
            "Call-to-action strength",
            "Audience fit",
            "Overall content quality"
        ],

        steps: [
            {
                number: "01",
                title: "Add your content",
                text: "Paste the caption, post or marketing copy you want to review."
            },
            {
                number: "02",
                title: "Run the check",
                text: "BrandAI evaluates the content against quality factors."
            },
            {
                number: "03",
                title: "Improve",
                text: "Review the suggestions and make your final edits."
            }
        ],

        cta: "Check My Content",
        path: "/content-checker"

    }

};


function FeatureDetails() {

    const { feature } = useParams();

    const data = featureData[feature];


    if (!data) {

        return (

            <main className="feature-details-page">

                <section className="feature-not-found">

                    <h1>
                        Feature not found
                    </h1>

                    <p>
                        The BrandAI feature you requested does not exist.
                    </p>

                    <Link
                        to="/"
                        className="feature-primary-button"
                    >
                        Back to Home
                    </Link>

                </section>

            </main>

        );

    }


    return (

        <main className="feature-details-page">


            {/* =========================================
                HERO
            ========================================= */}

            <section className="feature-details-hero">

                <Link
                    to="/"
                    className="feature-back-link"
                >
                    <ArrowLeft size={16} />

                    Back to Home
                </Link>


                <div className="feature-details-content">


                    <div className="feature-details-icon">
                        {data.icon}
                    </div>


                    <div className="feature-details-badge">
                        {data.badge}
                    </div>


                    <h1>
                        {data.title}
                    </h1>


                    <h2>
                        {data.subtitle}
                    </h2>


                    <p>
                        {data.description}
                    </p>


                    <div className="feature-details-actions">

                        <Link
                            to={data.path}
                            className="feature-primary-button"
                        >
                            {data.cta}

                            <ArrowRight size={18} />
                        </Link>


                        <Link
                            to="/"
                            className="feature-secondary-button"
                        >
                            Explore BrandAI
                        </Link>

                    </div>

                </div>

            </section>


            {/* =========================================
                BENEFITS
            ========================================= */}

            <section className="feature-info-section">

                <div className="feature-heading">

                    <div className="feature-section-label">
                        WHAT YOU GET
                    </div>


                    <h2>
                        Everything you need to
                        <span> create better.</span>
                    </h2>


                    <p>
                        BrandAI brings the important parts of the
                        marketing workflow together in one place.
                    </p>

                </div>


                <div className="feature-benefit-grid">

                    {data.benefits.map(
                        (benefit, index) => (

                            <div
                                className="feature-benefit-card"
                                key={index}
                            >

                                <div className="benefit-check">
                                    <CheckCircle2 size={18} />
                                </div>


                                <span>
                                    {benefit}
                                </span>

                            </div>

                        )
                    )}

                </div>

            </section>


            {/* =========================================
                PROCESS
            ========================================= */}

            <section className="feature-process-section">

                <div className="feature-heading">

                    <div className="feature-section-label">
                        HOW IT WORKS
                    </div>


                    <h2>
                        Simple steps.
                        <span> Smarter workflow.</span>
                    </h2>

                </div>


                <div className="feature-process-grid">

                    {data.steps.map(
                        (step) => (

                            <div
                                className="feature-process-card"
                                key={step.number}
                            >

                                <div className="process-number">
                                    {step.number}
                                </div>


                                <h3>
                                    {step.title}
                                </h3>


                                <p>
                                    {step.text}
                                </p>

                            </div>

                        )
                    )}

                </div>

            </section>


            {/* =========================================
                EXAMPLE
            ========================================= */}

            <section className="feature-demo-section">

                <div className="feature-demo-card">

                    <div className="feature-demo-header">

                        <div>

                            <div className="feature-section-label">
                                BRANDAI
                            </div>

                            <h2>
                                Example
                            </h2>

                        </div>

                        <div className="demo-status">
                            <span></span>
                            READY
                        </div>

                    </div>


                    {/* BRAND BRAIN */}

                    {feature === "brand-brain" && (

                        <div className="demo-interface">

                            <div className="demo-row">

                                <div className="demo-icon">
                                    <Brain size={18} />
                                </div>

                                <div>

                                    <strong>
                                        Brand Voice
                                    </strong>

                                    <p>
                                        Friendly, confident and professional
                                    </p>

                                </div>

                            </div>


                            <div className="demo-tags">

                                <span>
                                    Modern
                                </span>

                                <span>
                                    Friendly
                                </span>

                                <span>
                                    Professional
                                </span>

                                <span>
                                    Minimal
                                </span>

                            </div>

                        </div>

                    )}


                    {/* MULTI PLATFORM */}

                    {feature === "multi-platform" && (

                        <div className="demo-interface">

                            <div className="demo-platform-grid">

                                <div className="demo-platform">
                                    <span>◎</span>
                                    Instagram
                                </div>

                                <div className="demo-platform">
                                    <span>f</span>
                                    Facebook
                                </div>

                                <div className="demo-platform">
                                    <span>in</span>
                                    LinkedIn
                                </div>

                                <div className="demo-platform">
                                    <span>▶</span>
                                    YouTube
                                </div>

                                <div className="demo-platform">
                                    <MessageCircle size={17} />
                                    WhatsApp
                                </div>

                                <div className="demo-platform">
                                    <Mail size={17} />
                                    Email
                                </div>

                            </div>

                        </div>

                    )}


                    {/* AI ASSISTANT */}

                    {feature === "ai-assistant" && (

                        <div className="demo-interface">

                            <div className="chat-message user-message">

                                Give me 5 Instagram campaign ideas.

                            </div>


                            <div className="chat-message ai-message">

                                <div className="ai-message-icon">
                                    <Sparkles size={15} />
                                </div>

                                Here are 5 campaign ideas tailored
                                to your brand and audience.

                            </div>


                            <div className="demo-input">

                                Ask BrandAI anything...

                                <ArrowRight size={16} />

                            </div>

                        </div>

                    )}


                    {/* CONTENT CHECKER */}

                    {feature === "content-checker" && (

                        <div className="demo-interface">

                            <div className="quality-overview">

                                <div className="quality-score">

                                    <strong>
                                        88
                                    </strong>

                                    <span>
                                        Overall Score
                                    </span>

                                </div>


                                <div className="quality-items">

                                    <div>
                                        Brand Consistency
                                        <strong>92%</strong>
                                    </div>

                                    <div>
                                        Clarity
                                        <strong>88%</strong>
                                    </div>

                                    <div>
                                        Audience Fit
                                        <strong>94%</strong>
                                    </div>

                                    <div>
                                        CTA
                                        <strong>76%</strong>
                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </section>


            {/* =========================================
                FINAL CTA
            ========================================= */}

            <section className="feature-final-cta">

                <div>

                    <div className="feature-section-label">
                        READY TO GET STARTED?
                    </div>


                    <h2>
                        Put BrandAI to work.
                    </h2>


                    <p>
                        Explore the feature and start creating
                        smarter campaigns.
                    </p>


                    <Link
                        to={data.path}
                        className="feature-primary-button"
                    >
                        {data.cta}

                        <ArrowRight size={18} />
                    </Link>

                </div>

            </section>

        </main>

    );

}


export default FeatureDetails;