import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    ChevronLeft,
    ChevronRight,
    Plus,
    CalendarDays,
    Clock3,
    CheckCircle2,
    Circle,
    ArrowLeft
} from "lucide-react";

function CampaignCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        loadUserCampaigns();

        window.addEventListener(
            "brandai-dashboard-update",
            loadUserCampaigns
        );

        return () => {
            window.removeEventListener(
                "brandai-dashboard-update",
                loadUserCampaigns
            );
        };
    }, []);

    const loadUserCampaigns = () => {
        const storedUser = localStorage.getItem(
            "brandai_current_user"
        );

        if (!storedUser) {
            setCampaigns([]);
            return;
        }

        try {
            const user = JSON.parse(storedUser);

            const storedCampaigns = JSON.parse(
                localStorage.getItem(
                    `brandai_campaigns_${user.id}`
                ) || "[]"
            );

            setCampaigns(
                Array.isArray(storedCampaigns)
                    ? storedCampaigns
                    : []
            );
        } catch (error) {
            console.error(
                "Failed to load campaigns:",
                error
            );

            setCampaigns([]);
        }
    };

    const monthName = currentDate.toLocaleString(
        "default",
        {
            month: "long"
        }
    );

    const year = currentDate.getFullYear();

    const getDaysInMonth = (date) => {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        ).getDay();
    };

    const previousMonth = () => {
        setCurrentDate(
            new Date(
                year,
                currentDate.getMonth() - 1,
                1
            )
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(
                year,
                currentDate.getMonth() + 1,
                1
            )
        );
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const today = new Date();

    const isToday = (day) => {
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    /*
     * Try to get the campaign date from several
     * possible fields.
     *
     * This makes the calendar compatible with
     * campaigns already saved by the frontend.
     */
    const getCampaignDate = (campaign) => {
        const possibleDate =
            campaign.scheduledDate ||
            campaign.date ||
            campaign.startDate ||
            campaign.createdAt;

        if (!possibleDate) {
            return null;
        }

        const date = new Date(possibleDate);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        return date;
    };

    const getCampaignsForDay = (day) => {
        return campaigns.filter((campaign) => {
            const campaignDate =
                getCampaignDate(campaign);

            if (!campaignDate) {
                return false;
            }

            return (
                campaignDate.getDate() === day &&
                campaignDate.getMonth() ===
                    currentDate.getMonth() &&
                campaignDate.getFullYear() ===
                    currentDate.getFullYear()
            );
        });
    };

    const getCampaignTitle = (campaign) => {
        return (
            campaign.campaignName ||
            campaign.name ||
            campaign.title ||
            "Untitled Campaign"
        );
    };

    const getCampaignStatus = (campaign) => {
        if (
            campaign.status === "approved" ||
            campaign.approved === true
        ) {
            return "completed";
        }

        return "scheduled";
    };

    const getCampaignType = (campaign) => {
        if (
            Array.isArray(campaign.platforms) &&
            campaign.platforms.length > 0
        ) {
            return campaign.platforms[0];
        }

        return campaign.goal || "Campaign";
    };

    const daysInMonth =
        getDaysInMonth(currentDate);

    const firstDay =
        getFirstDayOfMonth(currentDate);

    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {
        calendarDays.push(day);
    }

    const currentMonthCampaigns =
        campaigns.filter((campaign) => {
            const date =
                getCampaignDate(campaign);

            if (!date) {
                return false;
            }

            return (
                date.getMonth() ===
                    currentDate.getMonth() &&
                date.getFullYear() === year
            );
        });

    const upcomingCampaigns =
        [...currentMonthCampaigns]
            .sort((a, b) => {
                const dateA =
                    getCampaignDate(a);

                const dateB =
                    getCampaignDate(b);

                return dateA - dateB;
            })
            .slice(0, 5);

    const completedCount =
        currentMonthCampaigns.filter(
            (campaign) =>
                getCampaignStatus(campaign) ===
                "completed"
        ).length;

    const scheduledCount =
        currentMonthCampaigns.length -
        completedCount;

    return (
        <div className="calendar-page">

            <div className="calendar-page-header">

                <div>

                    <Link
                        to="/dashboard"
                        className="page-back-link"
                    >
                        <ArrowLeft size={17} />
                        Dashboard
                    </Link>

                    <h1>
                        Campaign Calendar
                    </h1>

                    <p>
                        Plan, organize and track your campaigns.
                    </p>

                </div>

                <Link
                    to="/create-campaign"
                    className="calendar-create-button"
                >
                    <Plus size={18} />
                    Create Campaign
                </Link>

            </div>

            <div className="calendar-layout">

                <section className="calendar-main-card">

                    <div className="calendar-toolbar">

                        <div className="calendar-month-navigation">

                            <button
                                type="button"
                                onClick={previousMonth}
                                className="calendar-nav-button"
                            >
                                <ChevronLeft size={19} />
                            </button>

                            <h2>
                                {monthName} {year}
                            </h2>

                            <button
                                type="button"
                                onClick={nextMonth}
                                className="calendar-nav-button"
                            >
                                <ChevronRight size={19} />
                            </button>

                        </div>

                        <button
                            type="button"
                            onClick={goToToday}
                            className="calendar-today-button"
                        >
                            Today
                        </button>

                    </div>

                    <div className="calendar-weekdays">

                        {[
                            "Sun",
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat"
                        ].map((day) => (
                            <div key={day}>
                                {day}
                            </div>
                        ))}

                    </div>

                    <div className="calendar-grid">

                        {calendarDays.map(
                            (day, index) => {

                                if (!day) {
                                    return (
                                        <div
                                            key={index}
                                            className="calendar-day calendar-day-empty"
                                        />
                                    );
                                }

                                const dayCampaigns =
                                    getCampaignsForDay(
                                        day
                                    );

                                return (
                                    <div
                                        key={day}
                                        className={`calendar-day ${
                                            isToday(day)
                                                ? "calendar-day-today"
                                                : ""
                                        }`}
                                    >

                                        <div className="calendar-day-number">
                                            {day}
                                        </div>

                                        {dayCampaigns.map(
                                            (campaign) => {

                                                const status =
                                                    getCampaignStatus(
                                                        campaign
                                                    );

                                                return (
                                                    <Link
                                                        key={
                                                            campaign._id ||
                                                            campaign.id ||
                                                            `${day}-${getCampaignTitle(
                                                                campaign
                                                            )}`
                                                        }
                                                        to={
                                                            campaign._id ||
                                                            campaign.id
                                                                ? `/campaign/${
                                                                      campaign._id ||
                                                                      campaign.id
                                                                  }`
                                                                : "/campaign-calendar"
                                                        }
                                                        className={`calendar-event calendar-event-${status}`}
                                                    >
                                                        <span>
                                                            {getCampaignTitle(
                                                                campaign
                                                            )}
                                                        </span>
                                                    </Link>
                                                );
                                            }
                                        )}

                                    </div>
                                );
                            }
                        )}

                    </div>

                    {campaigns.length === 0 && (
                        <div className="calendar-empty-state">

                            <div className="calendar-empty-icon">
                                <CalendarDays size={25} />
                            </div>

                            <h3>
                                No campaigns yet
                            </h3>

                            <p>
                                Create your first campaign
                                and it will appear here.
                            </p>

                            <Link
                                to="/create-campaign"
                                className="calendar-empty-button"
                            >
                                <Plus size={16} />
                                Create Campaign
                            </Link>

                        </div>
                    )}

                </section>

                <aside className="calendar-sidebar">

                    <div className="calendar-side-card">

                        <div className="calendar-side-card-header">

                            <div>
                                <span className="calendar-small-label">
                                    THIS MONTH
                                </span>

                                <h3>
                                    Your Campaigns
                                </h3>
                            </div>

                            <CalendarDays size={20} />

                        </div>

                        {upcomingCampaigns.length > 0 ? (

                            <div className="upcoming-list">

                                {upcomingCampaigns.map(
                                    (campaign) => {

                                        const date =
                                            getCampaignDate(
                                                campaign
                                            );

                                        return (
                                            <Link
                                                key={
                                                    campaign._id ||
                                                    campaign.id
                                                }
                                                to={
                                                    campaign._id ||
                                                    campaign.id
                                                        ? `/campaign/${
                                                              campaign._id ||
                                                              campaign.id
                                                          }`
                                                        : "/campaign-calendar"
                                                }
                                                className="upcoming-campaign"
                                            >

                                                <div className="upcoming-date">

                                                    <strong>
                                                        {
                                                            date?.getDate()
                                                        }
                                                    </strong>

                                                    <span>
                                                        {date?.toLocaleString(
                                                            "default",
                                                            {
                                                                month: "short"
                                                            }
                                                        )}
                                                    </span>

                                                </div>

                                                <div className="upcoming-details">

                                                    <h4>
                                                        {getCampaignTitle(
                                                            campaign
                                                        )}
                                                    </h4>

                                                    <p>
                                                        <Clock3
                                                            size={13}
                                                        />

                                                        {getCampaignType(
                                                            campaign
                                                        )}
                                                    </p>

                                                    <span className="campaign-type">
                                                        {getCampaignStatus(
                                                            campaign
                                                        )}
                                                    </span>

                                                </div>

                                            </Link>
                                        );
                                    }
                                )}

                            </div>

                        ) : (

                            <div className="calendar-sidebar-empty">

                                <CalendarDays size={22} />

                                <p>
                                    No campaigns scheduled
                                    this month.
                                </p>

                            </div>

                        )}

                    </div>

                    <div className="calendar-side-card calendar-status-card">

                        <div className="calendar-side-card-header">

                            <div>
                                <span className="calendar-small-label">
                                    STATUS
                                </span>

                                <h3>
                                    Campaign Progress
                                </h3>
                            </div>

                            <CheckCircle2 size={20} />

                        </div>

                        <div className="calendar-status-item">

                            <div>
                                <CheckCircle2 size={16} />
                                <span>
                                    Completed
                                </span>
                            </div>

                            <strong>
                                {completedCount}
                            </strong>

                        </div>

                        <div className="calendar-status-item">

                            <div>
                                <Circle size={16} />
                                <span>
                                    Scheduled
                                </span>
                            </div>

                            <strong>
                                {scheduledCount}
                            </strong>

                        </div>

                    </div>

                </aside>

            </div>

        </div>
    );
}

export default CampaignCalendar;