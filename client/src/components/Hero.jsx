import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">

            {/* =========================================
                LEFT CONTENT
            ========================================= */}

            <div className="hero-left">

                <div className="small-badge">
                    <Sparkles size={15} />
                    AI CONTENT STUDIO
                </div>

                <h1>
                    Build your
                    <br />
                    <span>complete campaign</span>
                    <br />
                    with AI.
                </h1>

                <p>
                    BrandAI transforms one campaign idea into
                    brand-consistent content for multiple platforms —
                    all from a single brief.
                </p>

                <div className="hero-buttons">

                    <Link
                        to="/create-campaign"
                        className="primary-btn"
                    >
                        Create Campaign
                        <ArrowRight size={19} />
                    </Link>

                    <a
                        href="#features"
                        className="secondary-btn"
                    >
                        Explore BrandAI
                    </a>

                </div>

                <div className="hero-process">

                    <div>
                        <strong>01</strong>
                        <span>Brief</span>
                    </div>

                    <div className="process-line" />

                    <div>
                        <strong>AI</strong>
                        <span>Strategy</span>
                    </div>

                    <div className="process-line" />

                    <div>
                        <strong>∞</strong>
                        <span>Content</span>
                    </div>

                </div>

            </div>


            {/* =========================================
                FUTURISTIC ROBOT WORLD
            ========================================= */}

            <div className="robot-world">

                {/* Background atmospheric glow */}
                <div className="robot-world-glow" />

                <div className="robot-stars">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                </div>


                {/* =====================================
                    BRAND INTELLIGENCE PANEL
                ===================================== */}

                <div className="hologram-panel brand-intelligence">

                    <div className="panel-heading">
                        <span className="panel-symbol">◈</span>
                        Brand Intelligence
                    </div>

                    <div className="panel-item">
                        <span>◉ Brand Voice</span>
                        <b>Active</b>
                    </div>

                    <div className="panel-item">
                        <span>◉ Audience</span>
                        <b>Analyzed</b>
                    </div>

                    <div className="panel-item">
                        <span>◉ Tone</span>
                        <b>Modern</b>
                    </div>

                    <div className="panel-item">
                        <span>◉ Brand Safety</span>
                        <b>Ready</b>
                    </div>

                </div>


                {/* =====================================
                    ROBOT
                ===================================== */}

                <div className="coded-robot">

                    {/* Antenna */}

                    <div className="robot-antenna">

                        <div className="antenna-line" />

                        <div className="antenna-light" />

                    </div>


                    {/* Head */}

                    <div className="robot-head">

                        <div className="head-top-highlight" />

                        <div className="robot-side-ear left">
                            <span />
                        </div>

                        <div className="robot-side-ear right">
                            <span />
                        </div>


                        <div className="robot-face">

                            <div className="face-glass">

                                <div className="eye left" />
                                <div className="eye right" />

                                <div className="face-mouth" />

                            </div>

                        </div>

                    </div>


                    {/* Neck */}

                    <div className="robot-neck">

                        <span />
                        <span />
                        <span />

                    </div>


                    {/* Body */}

                    <div className="robot-torso">

                        <div className="torso-top" />

                        <div className="robot-chest">

                            <div className="brandai-symbol">

                                <span />
                                <span />
                                <span />

                            </div>

                            <div className="chest-line large" />
                            <div className="chest-line small" />

                        </div>

                        <div className="torso-light" />

                    </div>


                    {/* Left arm */}

                    <div className="robot-arm robot-arm-left">

                        <div className="arm-upper" />

                        <div className="arm-joint" />

                        <div className="arm-lower" />

                        <div className="robot-hand">

                            <span />
                            <span />
                            <span />

                        </div>

                    </div>


                    {/* Right arm */}

                    <div className="robot-arm robot-arm-right">

                        <div className="arm-upper" />

                        <div className="arm-joint" />

                        <div className="arm-lower" />

                        <div className="robot-hand">

                            <span />
                            <span />
                            <span />

                        </div>

                    </div>


                    {/* Lower body */}

                    <div className="robot-lower-body">

                        <div className="robot-core" />

                    </div>

                </div>


                {/* =====================================
                    HOLOGRAPHIC RINGS
                ===================================== */}

                <div className="holo-ring ring-a" />
                <div className="holo-ring ring-b" />
                <div className="holo-ring ring-c" />
                <div className="holo-ring ring-d" />


                {/* =====================================
                    AI SYSTEM PANEL
                ===================================== */}

                <div className="hologram-panel ai-system">

                    <div className="panel-heading">
                        <span className="panel-symbol">◈</span>
                        AI System
                    </div>

                    <div className="panel-item">
                        <span>✓ Strategy</span>
                        <b>ON</b>
                    </div>

                    <div className="panel-item">
                        <span>✓ Content</span>
                        <b>ON</b>
                    </div>

                    <div className="panel-item">
                        <span>✓ Design</span>
                        <b>ON</b>
                    </div>

                    <div className="panel-item">
                        <span>✓ Optimization</span>
                        <b>ON</b>
                    </div>

                </div>


                {/* =====================================
                    PLATFORM
                ===================================== */}

                <div className="robot-platform">

                    <div className="platform-outer-ring" />

                    <div className="platform-middle-ring" />

                    <div className="platform-inner">

                        <div className="platform-energy" />

                    </div>

                    <div className="platform-beam" />

                </div>


                {/* =====================================
                    SOCIAL PLATFORM PANEL
                ===================================== */}

                <div className="platform-ready-panel">

                    <div className="platform-icons">

                        <span>◎</span>
                        <span>f</span>
                        <span>in</span>
                        <span>▶</span>
                        <span>𝕏</span>
                        <span>◉</span>

                    </div>

                    <small>
                        MULTI-PLATFORM READY
                    </small>

                </div>

            </div>

        </section>
    );
}

export default Hero;