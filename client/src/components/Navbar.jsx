import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    LogOut,
    ArrowRight
} from "lucide-react";

import BrandLogo from "./BrandLogo";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = JSON.parse(
        localStorage.getItem("brandai_current_user") || "null"
    );

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        localStorage.removeItem("brandai_current_user");
        navigate("/login");
    };

    return (
        <header className="brandai-navbar">

            {/* Background glow */}
            <div className="brandai-navbar-glow"></div>

            <div className="brandai-navbar-inner">

                {/* =================================================
                    BRAND
                ================================================= */}

                <Link
                    to="/"
                    className="brandai-navbar-brand"
                >
                      <BrandLogo />
                </Link>


                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <nav className="brandai-navbar-nav">

                    <Link
                        to="/"
                        className={
                            isActive("/")
                                ? "brandai-nav-link active"
                                : "brandai-nav-link"
                        }
                    >
                        Home
                    </Link>

                    <a
                        href="/#features"
                        className="brandai-nav-link"
                    >
                        Features
                    </a>

                    {currentUser && (
                        <Link
                            to="/dashboard"
                            className={
                                isActive("/dashboard")
                                    ? "brandai-nav-link active"
                                    : "brandai-nav-link"
                            }
                        >
                            <LayoutDashboard size={14} />
                            Dashboard
                        </Link>
                    )}

                </nav>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="brandai-navbar-right">

                    {currentUser ? (
                        <>

                            {/* User */}
                            <div className="brandai-user">

                                <div className="brandai-user-avatar">
                                    {currentUser.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div className="brandai-user-details">

                                    <span>
                                        Welcome back
                                    </span>

                                    <strong>
                                        {currentUser.name}
                                    </strong>

                                </div>

                            </div>


                            {/* Divider */}
                            <div className="brandai-navbar-divider"></div>


                            {/* Logout */}
                            <button
                                type="button"
                                className="brandai-logout"
                                onClick={handleLogout}
                            >
                                <LogOut size={14} />

                                <span>
                                    Logout
                                </span>
                            </button>

                        </>
                    ) : (
                        <>

                            {/* Login */}
                            <Link
                                to="/login"
                                className="brandai-login"
                            >
                                Login
                            </Link>


                            {/* Get Started */}
                            <Link
                                to="/signup"
                                className="brandai-get-started"
                            >
                                <span>
                                    Get Started
                                </span>

                                <ArrowRight size={14} />
                            </Link>

                        </>
                    )}

                </div>

            </div>
        </header>
    );
}

export default Navbar;