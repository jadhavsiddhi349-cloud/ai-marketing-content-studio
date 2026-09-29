import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    const [campaign, setCampaign] = useState(null);

    const [message, setMessage] = useState("");


    useEffect(() => {

        loadCampaign();

    }, [id]);


    const loadCampaign = async () => {

        try {

            const response =
                await getCampaign(id);

            setCampaign(
                response.data.campaign
            );

        } catch (error) {

            console.log(error);

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

        await approveCampaign(id);

        await loadCampaign();

        setMessage(
            "Campaign approved successfully!"
        );

    };


    if (!campaign) {

        return (
            <main className="app-page">
                <h2>Loading campaign...</h2>
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