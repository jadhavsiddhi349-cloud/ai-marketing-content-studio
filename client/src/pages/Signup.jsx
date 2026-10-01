import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    UserPlus,
    ArrowRight,
    Sparkles,
    Eye,
    EyeOff
} from "lucide-react";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (
            !form.name.trim() ||
            !form.email.trim() ||
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

        if (
            form.password !==
            form.confirmPassword
        ) {
            setError("Passwords do not match.");
            return;
        }

        const accounts = JSON.parse(
            localStorage.getItem(
                "brandai_accounts"
            ) || "[]"
        );

        const existingAccount = accounts.find(
            (account) =>
                account.email.toLowerCase() ===
                form.email.trim().toLowerCase()
        );

        if (existingAccount) {
            setError(
                "An account with this email already exists."
            );
            return;
        }

        const newAccount = {
            id: Date.now(),
            name: form.name.trim(),
            email: form.email
                .trim()
                .toLowerCase(),
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

        navigate("/brand-brain");
    };

    return (
        <main className="auth-page">

            <div className="auth-background-glow"></div>

            <div className="auth-card">

                {/* ================================
                    HEADER
                ================================= */}

                <div className="auth-header">

                    <div className="auth-icon">
                        <UserPlus size={21} />
                    </div>

                    <div>
                        <div className="auth-badge">
                            <Sparkles size={12} />
                            BRANDAI
                        </div>

                        <h1>
                            Create your account
                        </h1>

                        <p>
                            Start building smarter campaigns
                            with BrandAI.
                        </p>
                    </div>

                </div>


                {/* ================================
                    FORM
                ================================= */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* NAME */}

                    <div className="auth-field">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoComplete="name"
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="auth-field">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="auth-field">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-input-wrapper">

                            <input
                                id="password"
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
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


                    {/* CONFIRM PASSWORD */}

                    <div className="auth-field">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="password-input-wrapper">

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={
                                    form.confirmPassword
                                }
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
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


                    {/* ERROR */}

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="auth-submit"
                    >
                        <span>
                            Create Account
                        </span>

                        <ArrowRight size={16} />
                    </button>

                </form>


                {/* ================================
                    LOGIN LINK
                ================================= */}

                <div className="auth-footer">

                    <span>
                        Already have an account?
                    </span>

                    <Link to="/login">
                        Login
                    </Link>

                </div>

            </div>

        </main>
    );
}

export default Signup;