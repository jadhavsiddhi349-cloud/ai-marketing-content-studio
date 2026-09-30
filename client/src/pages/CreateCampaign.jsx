import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getBrands,
    createCampaign
} from "../services/api";

import {
    Sparkles,
    Mail,
    MessageCircle
} from "lucide-react";


function CreateCampaign() {

    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);

    const [form, setForm] = useState({
        brandId: "",
        campaignName: "",
        goal: "",
        product: "",
        audience: "",
        tone: ""
    });

    const [platforms, setPlatforms] = useState([]);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");


    /* =========================================================
       LOAD BRANDS
    ========================================================= */

    useEffect(() => {

        const currentUser = JSON.parse(
            localStorage.getItem("brandai_current_user") || "null"
        );


        if (!currentUser) {

            navigate("/login");

            return;
        }


        loadBrands();

    }, [navigate]);


    /* =========================================================
       LOAD BRANDS FROM BACKEND
    ========================================================= */

    const loadBrands = async () => {

        try {

            const response = await getBrands();

            setBrands(
                response.data?.brands || []
            );

        } catch (error) {

            console.log("Could not load brands:", error);

            setBrands([]);

        }

    };


    /* =========================================================
       FORM CHANGE
    ========================================================= */

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    /* =========================================================
       PLATFORM SELECTION
    ========================================================= */

    const handlePlatformChange = (platform) => {

        if (platforms.includes(platform)) {

            setPlatforms(
                platforms.filter(
                    item => item !== platform
                )
            );

        } else {

            setPlatforms([
                ...platforms,
                platform
            ]);

        }

    };


    /* =========================================================
       CREATE CAMPAIGN
    ========================================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");


        /* =====================================================
           CHECK LOGIN
        ===================================================== */

        const currentUser = JSON.parse(
            localStorage.getItem("brandai_current_user") || "null"
        );


        if (!currentUser) {

            navigate("/login");

            return;
        }


        /* =====================================================
           CHECK PLATFORM
        ===================================================== */

        if (platforms.length === 0) {

            setMessage(
                "Please select at least one platform."
            );

            return;
        }


        setLoading(true);


        try {

            /* =================================================
               SEND CAMPAIGN TO BACKEND
            ================================================= */

            const response = await createCampaign({

                ...form,

                platforms

            });


            const backendCampaign =
                response.data?.campaign;


            /* =================================================
               GET CAMPAIGN ID
            ================================================= */

            const campaignId =
                backendCampaign?._id ||
                backendCampaign?.id ||
                Date.now();


            /* =================================================
               DETERMINE CONTENT COUNT
            ================================================= */

            let contentCount = 0;


            if (
                backendCampaign?.contentCount !== undefined
            ) {

                contentCount =
                    Number(
                        backendCampaign.contentCount
                    );

            } else if (
                Array.isArray(
                    backendCampaign?.content
                )
            ) {

                contentCount =
                    backendCampaign.content.length;

            } else if (
                backendCampaign?.content
            ) {

                contentCount = 1;

            } else {

                /*
                 * Each selected platform represents
                 * one initial content piece.
                 */

                contentCount = platforms.length;

            }


            /* =================================================
               CREATE LOCAL CAMPAIGN RECORD
            ================================================= */

            const localCampaign = {

                id: campaignId,

                _id: campaignId,

                campaignName:
                    form.campaignName,

                goal:
                    form.goal,

                product:
                    form.product,

                audience:
                    form.audience,

                tone:
                    form.tone,

                brandId:
                    form.brandId,

                platforms:
                    platforms,

                contentCount:
                    contentCount,

                status:
                    backendCampaign?.status ||
                    "generated",

                approved:
                    backendCampaign?.approved ||
                    false,

                createdAt:
                    backendCampaign?.createdAt ||
                    new Date().toISOString()

            };


            /* =================================================
               LOAD EXISTING USER CAMPAIGNS
            ================================================= */

            const campaignStorageKey =
                `brandai_campaigns_${currentUser.id}`;


            const existingCampaigns =
                JSON.parse(
                    localStorage.getItem(
                        campaignStorageKey
                    ) || "[]"
                );


            /* =================================================
               SAVE CAMPAIGN
            ================================================= */

            const updatedCampaigns = [

                localCampaign,

                ...existingCampaigns

            ];


            localStorage.setItem(
                campaignStorageKey,
                JSON.stringify(updatedCampaigns)
            );


            /* =================================================
               CREATE RECENT ACTIVITY
            ================================================= */

            const activityStorageKey =
                `brandai_activity_${currentUser.id}`;


            const existingActivities =
                JSON.parse(
                    localStorage.getItem(
                        activityStorageKey
                    ) || "[]"
                );


            const campaignActivity = {

                id:
                    `campaign-${campaignId}-${Date.now()}`,

                type:
                    "campaign",

                title:
                    "Campaign generated",

                description:
                    form.campaignName,

                campaignId:
                    campaignId,

                createdAt:
                    new Date().toISOString()

            };


            const contentActivity = {

                id:
                    `content-${campaignId}-${Date.now()}`,

                type:
                    "content",

                title:
                    "Content generated",

                description:
                    `${platforms.length} platform${
                        platforms.length === 1
                            ? ""
                            : "s"
                    } selected`,

                campaignId:
                    campaignId,

                createdAt:
                    new Date().toISOString()

            };


            const updatedActivities = [

                contentActivity,

                campaignActivity,

                ...existingActivities

            ].slice(0, 20);


            localStorage.setItem(
                activityStorageKey,
                JSON.stringify(updatedActivities)
            );


            /* =================================================
               TELL DASHBOARD TO REFRESH
            ================================================= */

            window.dispatchEvent(
                new Event("brandai-dashboard-update")
            );


            /* =================================================
               OPEN CAMPAIGN DETAILS
            ================================================= */

            navigate(
                `/campaign/${campaignId}`
            );


        } catch (error) {

            console.log(
                "Campaign generation error:",
                error
            );


            setMessage(

                error.response?.data?.message ||

                "Campaign generation failed. Please try again."

            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="app-page">


            {/* =================================================
                PAGE HEADING
            ================================================= */}

            <div className="page-heading">

                <div className="small-badge">

                    <Sparkles size={14} />

                    AI CAMPAIGN GENERATOR

                </div>


                <h1>
                    Create your <span>campaign.</span>
                </h1>


                <p>
                    One brief. Multiple platforms.
                    Complete campaign.
                </p>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <form
                className="glass-form"
                onSubmit={handleSubmit}
            >


                <div className="form-grid">


                    {/* =================================================
                        BRAND
                    ================================================= */}

                    <div className="input-group full">

                        <label>
                            Select Brand
                        </label>


                        <select
                            name="brandId"
                            value={form.brandId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select your Brand Brain
                            </option>


                            {brands.map(
                                (brand) => (

                                    <option
                                        key={brand._id}
                                        value={brand._id}
                                    >
                                        {brand.brandName}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* =================================================
                        CAMPAIGN NAME
                    ================================================= */}

                    <div className="input-group">

                        <label>
                            Campaign Name
                        </label>


                        <input
                            name="campaignName"
                            value={form.campaignName}
                            onChange={handleChange}
                            placeholder="Summer Launch"
                            required
                        />

                    </div>


                    {/* =================================================
                        GOAL
                    ================================================= */}

                    <div className="input-group">

                        <label>
                            Campaign Goal
                        </label>


                        <input
                            name="goal"
                            value={form.goal}
                            onChange={handleChange}
                            placeholder="Increase product awareness"
                            required
                        />

                    </div>


                    {/* =================================================
                        PRODUCT
                    ================================================= */}

                    <div className="input-group">

                        <label>
                            Product
                        </label>


                        <input
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            placeholder="Protein Bowl"
                            required
                        />

                    </div>


                    {/* =================================================
                        AUDIENCE
                    ================================================= */}

                    <div className="input-group">

                        <label>
                            Target Audience
                        </label>


                        <input
                            name="audience"
                            value={form.audience}
                            onChange={handleChange}
                            placeholder="College students"
                            required
                        />

                    </div>


                    {/* =================================================
                        TONE
                    ================================================= */}

                    <div className="input-group full">

                        <label>
                            Campaign Tone
                        </label>


                        <input
                            name="tone"
                            value={form.tone}
                            onChange={handleChange}
                            placeholder="Friendly and energetic"
                            required
                        />

                    </div>

                </div>


                {/* =================================================
                    PLATFORMS
                ================================================= */}

                <h3 className="platform-heading">
                    Select Platforms
                </h3>


                <div className="platform-select">


                    <Platform
                        name="Instagram"
                        icon={<span>◎</span>}
                        selected={
                            platforms.includes("Instagram")
                        }
                        onClick={() =>
                            handlePlatformChange(
                                "Instagram"
                            )
                        }
                    />


                    <Platform
                        name="Facebook"
                        icon={<span>f</span>}
                        selected={
                            platforms.includes("Facebook")
                        }
                        onClick={() =>
                            handlePlatformChange(
                                "Facebook"
                            )
                        }
                    />


                    <Platform
                        name="LinkedIn"
                        icon={<span>in</span>}
                        selected={
                            platforms.includes("LinkedIn")
                        }
                        onClick={() =>
                            handlePlatformChange(
                                "LinkedIn"
                            )
                        }
                    />


                    <Platform
                        name="YouTube"
                        icon={<span>▶</span>}
                        selected={
                            platforms.includes("YouTube")
                        }
                        onClick={() =>
                            handlePlatformChange(
                                "YouTube"
                            )
                        }
                    />


                    <Platform
                        name="WhatsApp"
                        icon={<MessageCircle />}
                        selected={
                            platforms.includes("WhatsApp")
                        }
                        onClick={() =>
                            handlePlatformChange(
                                "WhatsApp"
                            )
                        }
                    />


                    <Platform
                        name="Email"
                        icon={<Mail />}
                        selected={
                            platforms.includes("Email")
                        }
                        onClick={() =>
                            handlePlatformChange(
                                "Email"
                            )
                        }
                    />

                </div>


                {/* =================================================
                    GENERATE BUTTON
                ================================================= */}

                <button
                    className="primary-btn form-button"
                    disabled={loading}
                >

                    <Sparkles size={18} />


                    {loading

                        ? "Generating..."

                        : "Generate Complete Campaign"

                    }

                </button>


                {/* =================================================
                    ERROR MESSAGE
                ================================================= */}

                {message && (

                    <div className="error-message">

                        {message}

                    </div>

                )}

            </form>

        </main>

    );

}


/* =========================================================
   PLATFORM COMPONENT
========================================================= */

function Platform({
    name,
    icon,
    selected,
    onClick
}) {

    return (

        <button
            type="button"
            className={
                selected
                    ? "platform-choice selected"
                    : "platform-choice"
            }
            onClick={onClick}
        >

            {icon}

            <span>
                {name}
            </span>

        </button>

    );

}


export default CreateCampaign;