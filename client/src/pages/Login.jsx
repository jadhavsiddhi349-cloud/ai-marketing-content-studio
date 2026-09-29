import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ArrowRight, Sparkles } from "lucide-react";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
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

        if (!form.email || !form.password) {
            setError("Please enter your email and password.");
            return;
        }

        const accounts = JSON.parse(
            localStorage.getItem("brandai_accounts") || "[]"
        );

        const account = accounts.find(
            (item) =>
                item.email.toLowerCase() ===
                    form.email.toLowerCase() &&
                item.password === form.password
        );

        if (!account) {
            setError("Invalid email or password.");
            return;
        }

        localStorage.setItem(
            "brandai_current_user",
            JSON.stringify({
                id: account.id,
                name: account.name,
                email: account.email
            })
        );

        navigate("/dashboard");
    };

    return (
        <main className="auth-page">

            <div className="auth-card">

                <div className="auth-icon">
                    <LogIn size={28} />
                </div>

                <div className="auth-header">

                    <div className="small-badge">
                        <Sparkles size={14} />
                        WELCOME BACK
                    </div>

                    <h1>
                        Sign in to
                        <span> BrandAI.</span>
                    </h1>

                    <p>
                        Continue building intelligent,
                        brand-consistent campaigns.
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
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        type="submit"
                        className="primary-btn auth-submit"
                    >
                        Sign In
                        <ArrowRight size={18} />
                    </button>

                </form>

                <div className="auth-footer">

                    <p>
                        Don't have an account?
                    </p>

                    <Link to="/signup">
                        Create Account
                    </Link>

                </div>

            </div>

        </main>
    );
}

export default Login;