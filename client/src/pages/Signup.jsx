import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    User
} from "lucide-react";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        const name = form.name.trim();
        const email = form.email.trim().toLowerCase();

        if (
            !name ||
            !email ||
            !form.password ||
            !form.confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (form.password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        const accounts = JSON.parse(
            localStorage.getItem("brandai_accounts") || "[]"
        );

        const existingAccount = accounts.find(
            (account) =>
                account.email.toLowerCase() === email
        );

        if (existingAccount) {
            setLoading(false);
            setError(
                "An account with this email already exists."
            );
            return;
        }

        const newAccount = {
            id: Date.now(),
            name,
            email,
            password: form.password
        };

        accounts.push(newAccount);

        localStorage.setItem(
            "brandai_accounts",
            JSON.stringify(accounts)
        );

        const currentUser = {
            id: newAccount.id,
            name: newAccount.name,
            email: newAccount.email
        };

        localStorage.setItem(
            "brandai_current_user",
            JSON.stringify(currentUser)
        );

        setLoading(false);

        navigate("/brand-brain");
    };

    return (
        <main className="signup-page">

            {/* Background */}
            <div className="signup-bg-glow signup-bg-glow-one"></div>
            <div className="signup-bg-glow signup-bg-glow-two"></div>

            {/* Main content */}
            <section className="signup-content">

                <div className="signup-heading">

                    <span className="signup-overline">
                        BRAND WORKSPACE
                    </span>

                    <h1>
                        Create your
                        <span> BrandAI account.</span>
                    </h1>

                    <p>
                        Set up your workspace and start building
                        smarter, brand-consistent campaigns.
                    </p>

                </div>

                <div className="signup-card">

                    <form
                        className="signup-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="signup-field">
                            <label htmlFor="signup-name">
                                Full name
                            </label>

                            <div className="signup-input-wrap">

                                <User
                                    size={17}
                                    className="signup-input-icon"
                                />

                                <input
                                    id="signup-name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                />

                            </div>
                        </div>


                        <div className="signup-field">
                            <label htmlFor="signup-email">
                                Email address
                            </label>

                            <div className="signup-input-wrap">

                                <Mail
                                    size={17}
                                    className="signup-input-icon"
                                />

                                <input
                                    id="signup-email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />

                            </div>
                        </div>


                        <div className="signup-field">
                            <label htmlFor="signup-password">
                                Password
                            </label>

                            <div className="signup-input-wrap">

                                <Lock
                                    size={17}
                                    className="signup-input-icon"
                                />

                                <input
                                    id="signup-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    className="signup-password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            (value) => !value
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>

                            </div>
                        </div>


                        <div className="signup-field">
                            <label htmlFor="signup-confirm-password">
                                Confirm password
                            </label>

                            <div className="signup-input-wrap">

                                <Lock
                                    size={17}
                                    className="signup-input-icon"
                                />

                                <input
                                    id="signup-confirm-password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    className="signup-password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (value) => !value
                                        )
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>

                            </div>
                        </div>


                        <div className="signup-password-note">
                            <span className="signup-note-dot"></span>

                            Use at least 6 characters for your password.
                        </div>


                        {error && (
                            <div
                                className="signup-error"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="signup-submit"
                            disabled={loading}
                        >

                            {loading ? (
                                <span>
                                    Creating your account...
                                </span>
                            ) : (
                                <>
                                    <span>
                                        Create account
                                    </span>

                                    <span className="signup-submit-icon">
                                        <ArrowRight size={16} />
                                    </span>
                                </>
                            )}

                        </button>

                    </form>


                    <div className="signup-divider">
                        <span></span>

                        <p>
                            Already have an account?
                        </p>

                        <span></span>
                    </div>


                    <Link
                        to="/login"
                        className="signup-login-link"
                    >
                        Sign in to BrandAI

                        <ArrowRight size={15} />
                    </Link>

                </div>


                <p className="signup-bottom-text">
                    Your workspace. Your brand. Your campaigns.
                </p>

            </section>

        </main>
    );
}

export default Signup;