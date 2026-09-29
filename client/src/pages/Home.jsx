import { Link } from "react-router-dom";

import {
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Brain,
    ShieldCheck,
    WandSparkles
} from "lucide-react";

import Hero from "../components/Hero";


function Home() {

    return (

        <main className="home-page">


            {/* =========================================
                NEW ANIMATED HERO
            ========================================= */}

            <Hero />


            {/* =========================================
                FEATURES
            ========================================= */}

            <section
                className="features-section"
                id="features"
            >

                <div className="section-title">

                    <div className="small-badge">

                        <WandSparkles size={14} />

                        POWERFUL FEATURES

                    </div>


                    <h2>

                        Everything you need to

                        <span>
                            create better.
                        </span>

                    </h2>


                    <p>

                        From your brand identity to your final campaign,
                        BrandAI brings the entire workflow together.

                    </p>

                </div>


                <div className="feature-grid">


                    <Feature
                        icon={<Brain size={23} />}
                        title="Brand Brain"
                        text="Store your brand tone, audience, products and preferred style."
                    />


                    <Feature
                        icon={<Sparkles size={23} />}
                        title="Multi-Platform"
                        text="Generate content for Instagram, Facebook, LinkedIn, YouTube, WhatsApp and Email."
                    />


                    <Feature
                        icon={<WandSparkles size={23} />}
                        title="AI Assistant"
                        text="Ask BrandAI questions and improve your marketing ideas."
                    />


                    <Feature
                        icon={<ShieldCheck size={23} />}
                        title="Quality Checker"
                        text="Check clarity, brand consistency, CTA and audience fit."
                    />


                </div>

            </section>


            {/* =========================================
                HOW IT WORKS
            ========================================= */}

            <section
                className="how-section"
                id="how-it-works"
            >

                <div className="section-title">

                    <div className="small-badge">
                        HOW IT WORKS
                    </div>


                    <h2>

                        One brief.

                        <span>
                            Complete campaign.
                        </span>

                    </h2>

                </div>


                <div className="workflow">


                    <Step
                        number="01"
                        title="Campaign Brief"
                        text="Tell BrandAI about your campaign."
                    />


                    <Step
                        number="02"
                        title="Brand Intelligence"
                        text="BrandAI understands your brand identity."
                    />


                    <Step
                        number="03"
                        title="AI Generation"
                        text="Generate platform-specific content."
                    />


                    <Step
                        number="04"
                        title="Review & Approve"
                        text="Check the content and approve it."
                    />


                </div>

            </section>


            {/* =========================================
                ABOUT
            ========================================= */}

            <section
                className="about-section"
                id="about"
            >

                <div className="about-glow"></div>


                <div className="about-content">


                    <div className="small-badge">
                        ABOUT BRANDAI
                    </div>


                    <h2>

                        Your AI marketing

                        <span>
                            co-pilot.
                        </span>

                    </h2>


                    <p>

                        BrandAI helps brands and creators turn one idea
                        into a complete marketing campaign without
                        repeating the same work for every platform.

                    </p>


                    <Link
                        to="/create-campaign"
                        className="primary-btn"
                    >

                        Start Creating

                        <ArrowRight size={18} />

                    </Link>


                </div>

            </section>


        </main>

    );

}


/* =========================================
   FEATURE COMPONENT
========================================= */

function Feature({
    icon,
    title,
    text
}) {

    return (

        <div className="feature-card">


            <div className="feature-icon">
                {icon}
            </div>


            <h3>
                {title}
            </h3>


            <p>
                {text}
            </p>


            <div className="feature-bottom">

                <span>
                    Explore
                </span>

                <ArrowRight size={16} />

            </div>


        </div>

    );

}


/* =========================================
   STEP COMPONENT
========================================= */

function Step({
    number,
    title,
    text
}) {

    return (

        <div className="step-card">


            <div className="step-number">
                {number}
            </div>


            <div className="step-line"></div>


            <h3>
                {title}
            </h3>


            <p>
                {text}
            </p>


        </div>

    );

}


export default Home;