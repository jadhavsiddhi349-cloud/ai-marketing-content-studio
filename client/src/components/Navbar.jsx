import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sparkles, LogOut, LayoutDashboard } from "lucide-react";

function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(
            localStorage.getItem("brandai_current_user") || "null"
        )
    );

    const handleLogout = () => {

        localStorage.removeItem(
            "brandai_current_user"
        );

        setUser(null);

        navigate("/");
    };

    return (
        <header className="navbar">

            <div className="navbar-inner">

                {/* LOGO */}

                <Link
                    to="/"
                    className="navbar-logo"
                >
                    <div className="logo-icon">
                        <Sparkles size={20} />
                    </div>

                    <span>
                        Brand<span>AI</span>
                    </span>
                </Link>


                {/* CENTER NAVIGATION */}

                <nav className="navbar-links">

                    <Link to="/">
                        Home
                    </Link>

                    <a href="/#features">
                        Features
                    </a>

                </nav>


                {/* RIGHT SIDE */}

                <div className="navbar-actions">

                    {user ? (

                        <>
                            <Link
                                to="/dashboard"
                                className="navbar-dashboard"
                            >
                                <LayoutDashboard size={17} />
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="navbar-logout"
                            >
                                <LogOut size={17} />
                                Logout
                            </button>
                        </>

                    ) : (

                        <Link
                            to="/login"
                            className="navbar-signin"
                        >
                            Sign In
                        </Link>

                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;