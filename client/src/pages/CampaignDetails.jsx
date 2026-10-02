import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
    getCampaign,
    qualityCheck,
    approveCampaign
} from "../services/api";

import {
    CheckCircle,
    Sparkles
} from "lucide-react";


function CampaignDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

   const [campaign, setCampaign] = useState(null);
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

    useEffect(() => {

        loadCampaign();

    }, [id]);


//     const loadCampaign = async () => {
//     try {
//         setLoading(true);
//         setError("");

//         console.log("Campaign ID:", id);

//         const response = await getCampaign(id);

//         console.log("Campaign API response:", response.data);

//         setCampaign(response.data.campaign);

//     } catch (error) {
//         console.error("Get campaign error:", error);

//         setError(
//             error.response?.data?.message ||
//             "Failed to load campaign."
//         );
//     } finally {
//         setLoading(false);
//     }
// };
const loadCampaign = async () => {
    try {
        setLoading(true);
        setError("");

        console.log("Campaign ID from URL:", id);

        // Check MongoDB ObjectId format
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            setError(
                `Invalid campaign ID: ${id}`
            );
            return;
        }

        const response = await getCampaign(id);

        console.log(
            "Campaign API response:",
            response.data
        );

        setCampaign(response.data.campaign);

    } catch (error) {
        console.error(
            "Get campaign error:",
            error
        );

        setError(
            error.response?.data?.message ||
            "Failed to load campaign."
        );

    } finally {
        setLoading(false);
    }
};

    const handleQualityCheck = async () => {

        await qualityCheck(id);

        await loadCampaign();

        setMessage(
            "AI Quality Check completed ✨"
        );

    };


    const handleApprove = async () => {
    try {
        // 1. Approve campaign in MongoDB
        const response = await approveCampaign(id);

        console.log("Approve response:", response.data);

        // 2. Update campaign in localStorage
        const currentUser = JSON.parse(
            localStorage.getItem("brandai_current_user") || "null"
        );

        if (currentUser) {
            const storageKey =
                `brandai_campaigns_${currentUser.id}`;

            const savedCampaigns = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            const updatedCampaigns = savedCampaigns.map(
                (campaign) => {

                    const campaignId =
                        campaign._id ||
                        campaign.id;

                    if (
                        String(campaignId) ===
                        String(id)
                    ) {
                        return {
                            ...campaign,
                            status: "approved",
                            approved: true
                        };
                    }

                    return campaign;
                }
            );

            localStorage.setItem(
                storageKey,
                JSON.stringify(updatedCampaigns)
            );

            console.log(
                "Updated campaigns in localStorage:",
                updatedCampaigns
            );
        }

        // 3. Tell Dashboard to refresh
        window.dispatchEvent(
            new Event("brandai-dashboard-update")
        );

        // 4. Reload campaign
        await loadCampaign();

        setMessage(
            "Campaign approved successfully!"
        );

        // 5. Go to Dashboard
        navigate("/dashboard");

    } catch (error) {

        console.error(
            "Approve campaign error:",
            error
        );

        setMessage(
            error.response?.data?.message ||
            "Failed to approve campaign."
        );
    }
};

  if (loading) {
    return (
        <main className="app-page">
            <h2>Loading campaign...</h2>
        </main>
    );
}

if (error) {
    return (
        <main className="app-page">
            <h2>Unable to load campaign</h2>
            <p>{error}</p>
        </main>
    );
}

if (!campaign) {
    return (
        <main className="app-page">
            <h2>Campaign not found</h2>
        </main>
    );
}


    return (

        <main className="app-page">

            <div className="page-heading">

                <div className="small-badge">
                    GENERATED CAMPAIGN
                </div>

                <h1>
                    {campaign.campaignName}
                </h1>

                <p>
                    Status:
                    <strong>
                        {" "}{campaign.status}
                    </strong>
                </p>

            </div>


            <div className="campaign-grid">


                <ContentCard
                    title="Instagram"
                    content={
                        campaign.content?.instagram?.caption
                    }
                    hashtags={
                        campaign.content?.instagram?.hashtags
                    }
                />


                <ContentCard
                    title="Facebook"
                    content={
                        campaign.content?.facebook?.post
                    }
                />


                <ContentCard
                    title="LinkedIn"
                    content={
                        campaign.content?.linkedin?.post
                    }
                />


                <ContentCard
                    title="YouTube"
                    content={
                        campaign.content?.youtube?.script
                    }
                />


                <ContentCard
                    title="WhatsApp"
                    content={
                        campaign.content?.whatsapp?.message
                    }
                />


                <ContentCard
                    title="Email"
                    content={
                        campaign.content?.email?.body
                    }
                />

            </div>


            <div className="action-row">

                <button
                    className="secondary-btn"
                    onClick={handleQualityCheck}
                >

                    <Sparkles size={18} />

                    Run AI Quality Check

                </button>


                <button
                    className="primary-btn"
                    onClick={handleApprove}
                >

                    <CheckCircle size={18} />

                    Approve Campaign

                </button>

            </div>


            {campaign.qualityCheck?.score > 0 && (

                <div className="quality-box">

                    <h2>
                        AI Quality Score
                    </h2>

                    <div className="quality-score">
                        {campaign.qualityCheck.score}
                        <small>/100</small>
                    </div>


                    <h3>
                        Suggestions
                    </h3>

                    <ul>

                        {campaign.qualityCheck.suggestions.map(
                            (suggestion, index) => (

                                <li key={index}>
                                    {suggestion}
                                </li>

                            )
                        )}

                    </ul>

                </div>

            )}


            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

        </main>

    );
}


function ContentCard({
    title,
    content,
    hashtags
}) {

    return (

        <div className="content-card">

            <h3>{title}</h3>

            <p>
                {content || "No content generated."}
            </p>

            {hashtags && (

                <div className="hashtags">

                    {hashtags.map(
                        (tag, index) => (
                            <span key={index}>
                                {tag}
                            </span>
                        )
                    )}

                </div>

            )}

        </div>

    );
}


export default CampaignDetails;