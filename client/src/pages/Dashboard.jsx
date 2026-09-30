import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Home,
    PlusCircle,
    Brain,
    CalendarDays,
    ShieldCheck,
    MessageSquare,
    Settings,
    LogOut,
    ChevronRight,
    Activity,
    Sparkles,
    Users,
    Package,
    TrendingUp,
    FileText,
    Edit3
} from "lucide-react";


function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [brand, setBrand] = useState(null);

    const [campaigns, setCampaigns] = useState([]);

    const [activities, setActivities] = useState([]);


    /* =========================================================
       LOAD DASHBOARD DATA
    ========================================================= */

    useEffect(() => {

        const currentUser = JSON.parse(
            localStorage.getItem(
                "brandai_current_user"
            ) || "null"
        );


        if (!currentUser) {

            navigate("/login");

            return;

        }


        setUser(currentUser);


        /* =====================================================
           LOAD BRAND
        ===================================================== */

        const savedBrand = JSON.parse(
            localStorage.getItem(
                `brandai_brand_${currentUser.id}`
            ) || "null"
        );


        setBrand(savedBrand);


        /* =====================================================
           LOAD CAMPAIGNS
        ===================================================== */

        const savedCampaigns = JSON.parse(
            localStorage.getItem(
                `brandai_campaigns_${currentUser.id}`
            ) || "[]"
        );


        setCampaigns(savedCampaigns);


        /* =====================================================
           LOAD ACTIVITIES
        ===================================================== */

        const savedActivities = JSON.parse(
            localStorage.getItem(
                `brandai_activity_${currentUser.id}`
            ) || "[]"
        );


        setActivities(savedActivities);

    }, [navigate]);


    /* =========================================================
       LOGOUT
    ========================================================= */

    const handleLogout = () => {

        localStorage.removeItem(
            "brandai_current_user"
        );

        navigate("/");

    };


    /* =========================================================
       REFRESH DASHBOARD
    ========================================================= */

    useEffect(() => {

        const handleDashboardUpdate = () => {

            const currentUser = JSON.parse(
                localStorage.getItem(
                    "brandai_current_user"
                ) || "null"
            );


            if (!currentUser) {
                return;
            }


            /* =============================================
               REFRESH BRAND
            ============================================= */

            const savedBrand = JSON.parse(
                localStorage.getItem(
                    `brandai_brand_${currentUser.id}`
                ) || "null"
            );


            setBrand(savedBrand);


            /* =============================================
               REFRESH CAMPAIGNS
            ============================================= */

            const savedCampaigns = JSON.parse(
                localStorage.getItem(
                    `brandai_campaigns_${currentUser.id}`
                ) || "[]"
            );


            setCampaigns(savedCampaigns);


            /* =============================================
               REFRESH ACTIVITIES
            ============================================= */

            const savedActivities = JSON.parse(
                localStorage.getItem(
                    `brandai_activity_${currentUser.id}`
                ) || "[]"
            );


            setActivities(savedActivities);

        };


        window.addEventListener(
            "brandai-dashboard-update",
            handleDashboardUpdate
        );


        return () => {

            window.removeEventListener(
                "brandai-dashboard-update",
                handleDashboardUpdate
            );

        };

    }, []);


    /* =========================================================
       NO USER
    ========================================================= */

    if (!user) {

        return null;

    }


    /* =========================================================
       USER INITIALS
    ========================================================= */

    const initials = user.name

        ? user.name
            .split(" ")
            .map(
                name => name[0]
            )
            .slice(0, 2)
            .join("")
            .toUpperCase()

        : "U";


    /* =========================================================
       DASHBOARD STATISTICS
    ========================================================= */

    const campaignCount =
        campaigns.length;


    const contentCount =
        campaigns.reduce(
            (
                total,
                campaign
            ) => {

                if (
                    campaign.contentCount
                ) {

                    return (
                        total +
                        Number(
                            campaign.contentCount
                        )
                    );

                }


                if (
                    Array.isArray(
                        campaign.content
                    )
                ) {

                    return (
                        total +
                        campaign.content.length
                    );

                }


                if (
                    campaign.content
                ) {

                    return total + 1;

                }


                return total;

            },
            0
        );


    const approvedCount =
        campaigns.filter(
            campaign =>
                campaign.status ===
                    "approved" ||
                campaign.approved === true
        ).length;


    const approvalRate =
        campaignCount > 0

            ? `${Math.round(
                (
                    approvedCount /
                    campaignCount
                ) * 100
            )}%`

            : "—";


    /* =========================================================
       RECENT ACTIVITIES
    ========================================================= */

    const recentActivities =
        activities

            .slice()

            .sort(
                (a, b) =>
                    new Date(
                        b.createdAt || 0
                    ) -
                    new Date(
                        a.createdAt || 0
                    )
            )

            .slice(0, 5);


    return (

        <div className="dashboard-page">


            {/* =================================================
                TOP HEADER
            ================================================= */}

            <header className="dashboard-header">

                <div className="dashboard-brand">

                    <div className="dashboard-logo">

                        <Sparkles size={25} />

                    </div>


                    <div className="dashboard-brand-name">

                        <span>
                            Brand
                        </span>

                        <strong>
                            AI
                        </strong>

                    </div>


                    <div className="dashboard-divider" />


                    <p>
                        Smarter Campaigns. Stronger Brands.
                    </p>

                </div>


                <div className="dashboard-user-area">

                   


                    <div className="user-profile">

                        <div className="user-avatar">
                            {initials}
                        </div>

                        <div className="user-name">
                            {user.name}
                        </div>

                    </div>

                </div>

            </header>


            {/* =================================================
                DASHBOARD LAYOUT
            ================================================= */}

            <div className="dashboard-layout">


                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <aside className="dashboard-sidebar">

                    <nav className="sidebar-navigation">


                        <SidebarItem
                            to="/dashboard"
                            icon={
                                <Home
                                    size={21}
                                />
                            }
                            label="Home"
                            active
                        />


                        <SidebarItem
                            to="/create-campaign"
                            icon={
                                <PlusCircle
                                    size={21}
                                />
                            }
                            label="Create Campaign"
                        />


                        <SidebarItem
                            to="/brand-brain"
                            icon={
                                <Brain
                                    size={21}
                                />
                            }
                            label="Brand Brain"
                        />


                        <SidebarItem
                            icon={<CalendarDays size={18} />}
                            label="Campaign Calendar"
                            to="/campaign-calendar"
                        />


                        <SidebarItem
                            to="/content-checker"
                            icon={
                                <ShieldCheck
                                    size={21}
                                />
                            }
                            label="Content Checker"
                        />


                        <SidebarItem
                            to="/ai-assistant"
                            icon={
                                <MessageSquare
                                    size={21}
                                />
                            }
                            label="AI Assistant"
                        />

                    </nav>


                    <div className="sidebar-divider" />


                    <nav className="sidebar-navigation sidebar-bottom">


                        <SidebarItem
                            to="/settings"
                            icon={
                                <Settings
                                    size={21}
                                />
                            }
                            label="Settings"
                        />


                        <button
                            className="sidebar-item logout-item"
                            onClick={
                                handleLogout
                            }
                        >

                            <LogOut
                                size={21}
                            />

                            <span>
                                Logout
                            </span>

                        </button>

                    </nav>


                    {/* =========================================
                        SIDEBAR BRAND CARD
                    ========================================= */}

                    <div className="sidebar-brand-card">

                        <div className="sidebar-brand-sparkle">

                            <Sparkles
                                size={22}
                            />

                        </div>


                        <h3>

                            Your Brand
                            <br />
                            Your AI Partner

                        </h3>


                        <p>

                            Smarter campaigns.
                            <br />
                            Bigger growth.

                        </p>


                        <div
                            className="sidebar-card-glow"
                        />

                    </div>

                </aside>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <main className="dashboard-main">


                    {/* =================================================
                        CENTRAL AI AREA
                    ================================================= */}

                    <section className="dashboard-center">


                        <div className="dashboard-orbit-background">

                            <div
                                className="orbit orbit-one"
                            />

                            <div
                                className="orbit orbit-two"
                            />

                            <div
                                className="orbit orbit-three"
                            />

                            <div
                                className="orbit orbit-four"
                            />

                        </div>


                        {/* =========================================
                            BRAND BRAIN
                        ========================================= */}

                        <DashboardFeature
                            className="feature-top"
                            icon={
                                <Brain
                                    size={27}
                                />
                            }
                            title="Brand Brain"
                            subtitle="Your brand. Our memory."
                            color="purple"
                        />


                        {/* =========================================
                            CAMPAIGN CALENDAR
                        ========================================= */}

                        <DashboardFeature
                            className="feature-left-top"
                            icon={
                                <CalendarDays
                                    size={27}
                                />
                            }
                            title="Campaign Calendar"
                            subtitle="Plan. Create. Grow."
                            color="cyan"
                        />


                        {/* =========================================
                            CONTENT CHECKER
                        ========================================= */}

                        <DashboardFeature
                            className="feature-right-top"
                            icon={
                                <FileText
                                    size={27}
                                />
                            }
                            title="Content Checker"
                            subtitle="Better content. Always."
                            color="pink"
                        />


                        {/* =========================================
                            MULTI PLATFORM
                        ========================================= */}

                        <DashboardFeature
                            className="feature-left-bottom"
                            icon={
                                <TrendingUp
                                    size={27}
                                />
                            }
                            title="Multi-Platform"
                            subtitle="One brief. Multiple platforms."
                            color="orange"
                        />


                        {/* =========================================
                            AI ASSISTANT
                        ========================================= */}

                        <DashboardFeature
                            className="feature-right-bottom"
                            icon={
                                <MessageSquare
                                    size={27}
                                />
                            }
                            title="AI Assistant"
                            subtitle="Ask. Get. Create."
                            color="blue"
                        />


                        {/* =================================================
                            CENTRAL ROBOT
                        ================================================= */}

                        <div className="dashboard-robot-wrapper">


                            <div
                                className="robot-energy-ring ring-one"
                            />

                            <div
                                className="robot-energy-ring ring-two"
                            />

                            <div
                                className="robot-energy-ring ring-three"
                            />


                            <div className="dashboard-robot">


                                <div className="dashboard-robot-ear left" />

                                <div className="dashboard-robot-ear right" />


                                <div className="dashboard-robot-head">

                                    <div className="dashboard-robot-face">


                                        <div className="robot-eye left">
                                            ^
                                        </div>


                                        <div className="robot-eye right">
                                            ^
                                        </div>


                                        <div className="robot-smile">
                                            ⌣
                                        </div>


                                    </div>

                                </div>


                                <div className="dashboard-robot-neck" />


                                <div className="dashboard-robot-body">

                                    <div className="dashboard-robot-chest">

                                        <Sparkles
                                            size={25}
                                        />

                                    </div>

                                </div>


                                <div className="dashboard-robot-arm left" />

                                <div className="dashboard-robot-arm right" />

                                <div className="dashboard-robot-glow" />


                            </div>


                            <div className="robot-platform-glow" />

                        </div>


                        {/* =================================================
                            GENERATE BUTTON
                        ================================================= */}

                        <Link
                            to="/create-campaign"
                            className="dashboard-generate-button"
                        >

                            <Sparkles
                                size={23}
                            />


                            <span>
                                Generate Content
                            </span>


                            <ChevronRight
                                size={23}
                            />

                        </Link>

                    </section>


                    {/* =================================================
                        RIGHT PANEL
                    ================================================= */}

                    <aside className="dashboard-right-panel">


                        {/* =================================================
                            RECENT ACTIVITY
                        ================================================= */}

                        <section className="dashboard-card activity-card">


                            <div className="dashboard-card-header">


                                <div className="card-title">


                                    <div className="activity-title-icon">

                                        <Activity
                                            size={20}
                                        />

                                    </div>


                                    <div>

                                        <h3>
                                            Recent Activity
                                        </h3>


                                        <span className="activity-header-subtitle">
                                            Your latest workspace updates
                                        </span>

                                    </div>


                                </div>


                                {recentActivities.length > 0 && (

                                    <button
                                        type="button"
                                        className="activity-view-button"
                                    >

                                        View All

                                        <ChevronRight
                                            size={15}
                                        />

                                    </button>

                                )}

                            </div>


                            {recentActivities.length === 0 ? (


                                /* =====================================
                                   EMPTY ACTIVITY STATE
                                ===================================== */

                                <div className="empty-activity-state">


                                    <div className="activity-empty-visual">


                                        <div
                                            className="activity-empty-orbit orbit-a"
                                        />


                                        <div
                                            className="activity-empty-orbit orbit-b"
                                        />


                                        <div className="activity-empty-icon">

                                            <Activity
                                                size={27}
                                            />

                                        </div>


                                    </div>


                                    <div className="empty-activity-content">


                                        <span className="empty-activity-badge">

                                            <Sparkles
                                                size={13}
                                            />

                                            WORKSPACE READY

                                        </span>


                                        <h4>
                                            Your activity feed is ready
                                        </h4>


                                        <p>

                                            Campaigns, content generation,
                                            brand updates and approvals will
                                            appear here automatically.

                                        </p>


                                        <Link
                                            to="/create-campaign"
                                            className="activity-create-button"
                                        >

                                            <Sparkles
                                                size={16}
                                            />

                                            Create your first campaign

                                            <ChevronRight
                                                size={16}
                                            />

                                        </Link>


                                    </div>


                                </div>


                            ) : (


                                /* =====================================
                                   REAL ACTIVITY LIST
                                ===================================== */

                                <div className="activity-list">

                                    {recentActivities.map(
                                        (
                                            activity,
                                            index
                                        ) => (

                                            <ActivityItem
                                                key={
                                                    activity.id ||
                                                    `${activity.createdAt}-${index}`
                                                }

                                                icon={
                                                    activity.type === "brand"

                                                        ? (
                                                            <ShieldCheck
                                                                size={19}
                                                            />
                                                        )

                                                        : activity.type === "content"

                                                            ? (
                                                                <Sparkles
                                                                    size={19}
                                                                />
                                                            )

                                                            : (
                                                                <FileText
                                                                    size={19}
                                                                />
                                                            )
                                                }

                                                iconClass={
                                                    activity.type === "brand"

                                                        ? "activity-green"

                                                        : activity.type === "content"

                                                            ? "activity-pink"

                                                            : "activity-purple"
                                                }

                                                title={
                                                    activity.title
                                                }

                                                subtitle={
                                                    formatActivityDate(
                                                        activity.createdAt
                                                    )
                                                }

                                            />

                                        )
                                    )}

                                </div>

                            )}

                        </section>


                        {/* =================================================
                            BRAND OVERVIEW
                        ================================================= */}

                        <section className="dashboard-card brand-overview-card">


                            <div className="dashboard-card-header">


                                <div className="card-title">

                                    <Sparkles
                                        size={21}
                                    />

                                    <h3>
                                        Brand Overview
                                    </h3>

                                </div>


                                <Link
                                    to="/brand-brain"
                                >

                                    Edit

                                    <Edit3
                                        size={16}
                                    />

                                </Link>

                            </div>


                            {brand ? (

                                <>


                                    <div className="brand-overview-main">


                                        <div className="brand-avatar">

                                            {brand.brandName

                                                ? brand.brandName
                                                    .substring(
                                                        0,
                                                        2
                                                    )
                                                    .toUpperCase()

                                                : "BR"

                                            }

                                        </div>


                                        <div>

                                            <h3>
                                                {brand.brandName}
                                            </h3>


                                            <p>

                                                {brand.industry ||
                                                    "Industry not set"}

                                                {" • "}

                                                {brand.audience ||
                                                    "Audience not set"}

                                            </p>

                                        </div>


                                    </div>


                                    <div className="brand-detail-row">


                                        <Users
                                            size={19}
                                        />


                                        <span>
                                            Audience
                                        </span>


                                        <strong>

                                            {brand.audience ||
                                                "Not set"}

                                        </strong>


                                    </div>


                                    <div className="brand-detail-row">


                                        <MessageSquare
                                            size={19}
                                        />


                                        <span>
                                            Tone
                                        </span>


                                        <strong>

                                            {brand.tone ||
                                                "Not set"}

                                        </strong>


                                    </div>


                                    <div className="brand-detail-row">


                                        <Package
                                            size={19}
                                        />


                                        <span>
                                            Products
                                        </span>


                                        <strong>

                                            {brand.products ||
                                                "Not set"}

                                        </strong>


                                    </div>


                                </>


                            ) : (


                                <div className="empty-brand-state">


                                    <Brain
                                        size={30}
                                    />


                                    <h3>
                                        Your Brand Brain is empty
                                    </h3>


                                    <p>

                                        Add your brand information
                                        to personalize BrandAI.

                                    </p>


                                    <Link
                                        to="/brand-brain"
                                        className="small-primary-button"
                                    >

                                        Set Up Brand

                                    </Link>


                                </div>

                            )}

                        </section>


                        {/* =================================================
                            QUICK STATS
                        ================================================= */}

                        <section className="dashboard-card stats-card">


                            <div className="dashboard-card-header">


                                <div className="card-title">

                                    <TrendingUp
                                        size={21}
                                    />

                                    <h3>
                                        Quick Stats
                                    </h3>

                                </div>


                            </div>


                            <div className="stats-grid">


                                <Stat
                                    icon={
                                        <FileText
                                            size={21}
                                        />
                                    }
                                    number={
                                        campaignCount
                                    }
                                    label="Campaigns"
                                    color="cyan"
                                />


                                <Stat
                                    icon={
                                        <Sparkles
                                            size={21}
                                        />
                                    }
                                    number={
                                        contentCount
                                    }
                                    label="Content Pieces"
                                    color="purple"
                                />


                                <Stat
                                    icon={
                                        <ShieldCheck
                                            size={21}
                                        />
                                    }
                                    number={
                                        approvalRate
                                    }
                                    label="Approval Rate"
                                    color="green"
                                />


                                <Stat
                                    icon={
                                        <TrendingUp
                                            size={21}
                                        />
                                    }
                                    number="—"
                                    label="Engagement"
                                    color="pink"
                                />


                            </div>

                        </section>


                    </aside>

                </main>

            </div>

        </div>

    );

}


/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
    to,
    icon,
    label,
    active = false
}) {

    return (

        <Link
            to={to}
            className={
                `sidebar-item ${
                    active
                        ? "active"
                        : ""
                }`
            }
        >

            {icon}

            <span>
                {label}
            </span>

        </Link>

    );

}


/* =========================================================
   DASHBOARD FEATURE
========================================================= */

function DashboardFeature({
    className,
    icon,
    title,
    subtitle,
    color
}) {

    return (

        <div
            className={
                `dashboard-feature ${
                    className
                } feature-${color}`
            }
        >

            <div className="feature-circle">

                {icon}

            </div>


            <div className="feature-text">

                <h3>
                    {title}
                </h3>


                <p>
                    {subtitle}
                </p>

            </div>

        </div>

    );

}


/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({
    icon,
    iconClass,
    title,
    subtitle
}) {

    return (

        <div className="activity-item">


            <div
                className={
                    `activity-icon ${iconClass}`
                }
            >

                {icon}

            </div>


            <div className="activity-content">


                <h4>
                    {title}
                </h4>


                <p>
                    {subtitle}
                </p>


            </div>


            <ChevronRight
                size={19}
            />

        </div>

    );

}


/* =========================================================
   QUICK STAT
========================================================= */

function Stat({
    icon,
    number,
    label,
    color
}) {

    return (

        <div
            className={
                `quick-stat stat-${color}`
            }
        >


            <div className="stat-icon">

                {icon}

            </div>


            <strong>
                {number}
            </strong>


            <span>
                {label}
            </span>


        </div>

    );

}


/* =========================================================
   ACTIVITY DATE
========================================================= */

function formatActivityDate(date) {

    if (!date) {

        return "Recently";

    }


    const activityDate =
        new Date(date);


    if (
        Number.isNaN(
            activityDate.getTime()
        )
    ) {

        return "Recently";

    }


    const now =
        new Date();


    const difference =
        now.getTime() -
        activityDate.getTime();


    const minutes =
        Math.floor(
            difference /
            (1000 * 60)
        );


    if (minutes < 1) {

        return "Just now";

    }


    if (minutes < 60) {

        return `${minutes} minute${
            minutes === 1
                ? ""
                : "s"
        } ago`;

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {

        return `${hours} hour${
            hours === 1
                ? ""
                : "s"
        } ago`;

    }


    const days =
        Math.floor(
            hours / 24
        );


    if (days < 7) {

        return `${days} day${
            days === 1
                ? ""
                : "s"
        } ago`;

    }


    return activityDate.toLocaleDateString();

}


export default Dashboard;