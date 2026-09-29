import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, ArrowRight, Sparkles } from "lucide-react";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            email,
            password,
            confirmPassword
        } = form;

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const accounts = JSON.parse(
            localStorage.getItem("brandai_accounts") || "[]"
        );

        const existingAccount = accounts.find(
            (account) =>
                account.email.toLowerCase() === email.toLowerCase()
        );

        if (existingAccount) {
            setError("An account with this email already exists.");
            return;
        }

        const newAccount = {
            id: Date.now(),
            name,
            email,
            password
        };

        accounts.push(newAccount);

        localStorage.setItem(
            "brandai_accounts",
            JSON.stringify(accounts)
        );

        localStorage.setItem(
            "brandai_current_user",
            JSON.stringify({
                id: newAccount.id,
                name: newAccount.name,
                email: newAccount.email
            })
        );

        navigate("/dashboard");
    };

    return (
        <main className="auth-page">

            <div className="auth-card">

                <div className="auth-icon">
                    <UserPlus size={28} />
                </div>

                <div className="auth-header">

                    <div className="small-badge">
                        <Sparkles size={14} />
                        JOIN BRANDAI
                    </div>

                    <h1>
                        Create your
                        <span> account.</span>
                    </h1>

                    <p>
                        Create an account and start building
                        AI-powered marketing campaigns.
                    </p>

                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={form.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        type="submit"
                        className="primary-btn auth-submit"
                    >
                        Create Account
                        <ArrowRight size={18} />
                    </button>

                </form>

                <div className="auth-footer">

                    <p>
                        Already have an account?
                    </p>

                    <Link to="/login">
                        Sign In
                    </Link>

                </div>

            </div>

        </main>
    );
}

export default Signup;