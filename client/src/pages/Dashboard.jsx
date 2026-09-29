import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getCampaigns
} from "../services/api";

import {
    Sparkles,
    ArrowRight
} from "lucide-react";


function Dashboard() {

    const [campaigns, setCampaigns] = useState([]);


    useEffect(() => {

        loadCampaigns();

    }, []);


    const loadCampaigns = async () => {

        try {

            const response =
                await getCampaigns();

            setCampaigns(
                response.data.campaigns
            );

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <main className="app-page">

            <div className="page-heading">

                <div className="small-badge">
                    <Sparkles size={14} />
                    DASHBOARD
                </div>

                <h1>
                    Your <span>campaigns.</span>
                </h1>

                <p>
                    Manage your AI-generated campaigns.
                </p>

            </div>


            <div className="dashboard-actions">

                <Link
                    to="/brand-brain"
                    className="secondary-btn"
                >
                    Brand Brain
                </Link>

                <Link
                    to="/create-campaign"
                    className="primary-btn"
                >
                    Create Campaign
                </Link>

            </div>


            <div className="campaign-list">

                {campaigns.length === 0 ? (

                    <div className="empty-state">

                        <h2>
                            No campaigns yet
                        </h2>

                        <p>
                            Create your first AI campaign.
                        </p>

                        <Link
                            to="/create-campaign"
                            className="primary-btn"
                        >
                            Create Campaign
                            <ArrowRight size={18} />
                        </Link>

                    </div>

                ) : (

                    campaigns.map(campaign => (

                        <Link
                            key={campaign._id}
                            to={`/campaign/${campaign._id}`}
                            className="campaign-item"
                        >

                            <div>

                                <h3>
                                    {campaign.campaignName}
                                </h3>

                                <p>
                                    {campaign.product}
                                </p>

                            </div>

                            <span>
                                {campaign.status}
                            </span>

                        </Link>

                    ))

                )}

            </div>

        </main>

    );
}


export default Dashboard;