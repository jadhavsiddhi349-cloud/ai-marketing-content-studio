import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    User,
    Mail,
    Brain,
    Save,
    CheckCircle,
    LogOut,
    SlidersHorizontal
} from "lucide-react";

function Settings() {
    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("brandai_current_user") || "null"
    );

    const savedBrand = currentUser
        ? JSON.parse(
            localStorage.getItem(
                `brandai_brand_${currentUser.id}`
            ) || "null"
        )
        : null;

    const savedPreferences = currentUser
        ? JSON.parse(
            localStorage.getItem(
                `brandai_preferences_${currentUser.id}`
            ) || "{}"
        )
        : {};

    const [name, setName] = useState(
        currentUser?.name || ""
    );

    const [email, setEmail] = useState(
        currentUser?.email || ""
    );

    const [dashboardStartup, setDashboardStartup] =
        useState(
            savedPreferences.dashboardStartup ?? true
        );

    const [saveConversations, setSaveConversations] =
        useState(
            savedPreferences.saveConversations ?? true
        );

    const [savedMessage, setSavedMessage] = useState("");

    if (!currentUser) {
        navigate("/login");
        return null;
    }

    const handleSaveAccount = (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedName || !trimmedEmail) {
            return;
        }

        const accounts = JSON.parse(
            localStorage.getItem("brandai_accounts") || "[]"
        );

        const updatedAccounts = accounts.map((account) => {
            if (account.id === currentUser.id) {
                return {
                    ...account,
                    name: trimmedName,
                    email: trimmedEmail
                };
            }

            return account;
        });

        localStorage.setItem(
            "brandai_accounts",
            JSON.stringify(updatedAccounts)
        );

        const updatedUser = {
            ...currentUser,
            name: trimmedName,
            email: trimmedEmail
        };

        localStorage.setItem(
            "brandai_current_user",
            JSON.stringify(updatedUser)
        );

        setSavedMessage("Account details saved.");

        setTimeout(() => {
            setSavedMessage("");
        }, 2500);
    };

    const handleSavePreferences = () => {
        const preferences = {
            dashboardStartup,
            saveConversations
        };

        localStorage.setItem(
            `brandai_preferences_${currentUser.id}`,
            JSON.stringify(preferences)
        );

        setSavedMessage("Preferences saved.");

        setTimeout(() => {
            setSavedMessage("");
        }, 2500);
    };

    const handleLogout = () => {
        localStorage.removeItem("brandai_current_user");
        navigate("/login");
    };

    return (
        <main className="settings-page">

            {/* Header */}
            <div className="settings-header">

                <Link
                    to="/dashboard"
                    className="settings-back-link"
                >
                    <ArrowLeft size={16} />
                    Dashboard
                </Link>

                <div className="settings-title">
                    <div className="settings-title-icon">
                        <SlidersHorizontal size={24} />
                    </div>

                    <div>
                        <div className="small-badge">
                            ACCOUNT SETTINGS
                        </div>

                        <h1>
                            Manage your
                            <span> BrandAI.</span>
                        </h1>

                        <p>
                            Update your account information and
                            application preferences.
                        </p>
                    </div>
                </div>

            </div>

            {/* Success Message */}
            {savedMessage && (
                <div className="settings-success">
                    <CheckCircle size={17} />
                    {savedMessage}
                </div>
            )}

            <div className="settings-layout">

                {/* Main Settings */}
                <div className="settings-main">

                    {/* Account */}
                    <section className="settings-card">

                        <div className="settings-card-header">
                            <div className="settings-card-icon">
                                <User size={19} />
                            </div>

                            <div>
                                <h2>Account</h2>

                                <p>
                                    Manage your personal account
                                    information.
                                </p>
                            </div>
                        </div>

                        <form
                            className="settings-form"
                            onSubmit={handleSaveAccount}
                        >

                            <div className="settings-field">
                                <label>
                                    Full Name
                                </label>

                                <div className="settings-input-wrapper">
                                    <User size={16} />

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

                            <div className="settings-field">
                                <label>
                                    Email
                                </label>

                                <div className="settings-input-wrapper">
                                    <Mail size={16} />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="settings-save-button"
                            >
                                <Save size={16} />
                                Save Account Changes
                            </button>

                        </form>

                    </section>

                    {/* Brand Brain */}
                    <section className="settings-card">

                        <div className="settings-card-header">
                            <div className="settings-card-icon">
                                <Brain size={19} />
                            </div>

                            <div>
                                <h2>Brand Brain</h2>

                                <p>
                                    Your brand information is used
                                    throughout BrandAI.
                                </p>
                            </div>
                        </div>

                        {savedBrand ? (
                            <div className="settings-brand-box">

                                <div>
                                    <span>
                                        Current Brand
                                    </span>

                                    <strong>
                                        {savedBrand.brandName}
                                    </strong>
                                </div>

                                {savedBrand.industry && (
                                    <div>
                                        <span>
                                            Industry
                                        </span>

                                        <strong>
                                            {savedBrand.industry}
                                        </strong>
                                    </div>
                                )}

                                <Link
                                    to="/brand-brain"
                                    className="settings-secondary-button"
                                >
                                    Edit Brand Brain
                                    <ArrowLeft
                                        size={14}
                                        className="settings-arrow"
                                    />
                                </Link>

                            </div>
                        ) : (
                            <div className="settings-empty-brand">

                                <Brain size={22} />

                                <div>
                                    <strong>
                                        Brand Brain not set up
                                    </strong>

                                    <p>
                                        Add your brand information
                                        to personalize BrandAI.
                                    </p>
                                </div>

                                <Link
                                    to="/brand-brain"
                                    className="settings-secondary-button"
                                >
                                    Set Up Brand Brain
                                </Link>

                            </div>
                        )}

                    </section>

                    {/* Preferences */}
                    <section className="settings-card">

                        <div className="settings-card-header">
                            <div className="settings-card-icon">
                                <SlidersHorizontal size={19} />
                            </div>

                            <div>
                                <h2>Preferences</h2>

                                <p>
                                    Control how BrandAI behaves
                                    for your account.
                                </p>
                            </div>
                        </div>

                        <div className="settings-preferences">

                            <div className="settings-preference-row">

                                <div>
                                    <strong>
                                        Dashboard startup
                                    </strong>

                                    <p>
                                        Keep the dashboard as the
                                        main workspace after login.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={
                                        dashboardStartup
                                            ? "settings-toggle active"
                                            : "settings-toggle"
                                    }
                                    onClick={() =>
                                        setDashboardStartup(
                                            !dashboardStartup
                                        )
                                    }
                                    aria-label="Toggle dashboard startup"
                                >
                                    <span></span>
                                </button>

                            </div>

                            <div className="settings-preference-row">

                                <div>
                                    <strong>
                                        Save conversations
                                    </strong>

                                    <p>
                                        Keep your AI Assistant
                                        conversations in this browser.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={
                                        saveConversations
                                            ? "settings-toggle active"
                                            : "settings-toggle"
                                    }
                                    onClick={() =>
                                        setSaveConversations(
                                            !saveConversations
                                        )
                                    }
                                    aria-label="Toggle save conversations"
                                >
                                    <span></span>
                                </button>

                            </div>

                        </div>

                        <button
                            type="button"
                            className="settings-save-button"
                            onClick={handleSavePreferences}
                        >
                            <Save size={16} />
                            Save Preferences
                        </button>

                    </section>

                    {/* Logout */}
                    <section className="settings-card settings-danger-card">

                        <div className="settings-card-header">
                            <div className="settings-card-icon">
                                <LogOut size={19} />
                            </div>

                            <div>
                                <h2>Sign Out</h2>

                                <p>
                                    Sign out of your BrandAI account
                                    on this device.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="settings-logout-button"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>

                    </section>

                </div>

                {/* Side Information */}
                <aside className="settings-sidebar">

                    <div className="settings-profile-card">

                        <div className="settings-avatar">
                            {currentUser.name
                                ?.charAt(0)
                                .toUpperCase()}
                        </div>

                        <h3>
                            {currentUser.name}
                        </h3>

                        <p>
                            {currentUser.email}
                        </p>

                    </div>

                    <div className="settings-info-card">

                        <Brain size={20} />

                        <h3>
                            Your Brand Brain
                        </h3>

                        <p>
                            BrandAI uses your saved brand
                            information to keep your campaigns,
                            content, and assistant experience
                            consistent.
                        </p>

                        <Link to="/brand-brain">
                            Manage Brand Brain
                        </Link>

                    </div>

                </aside>

            </div>

        </main>
    );
}

export default Settings;