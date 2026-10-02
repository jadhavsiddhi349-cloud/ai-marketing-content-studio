import { useState } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail
} from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
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

        const email = form.email.trim().toLowerCase();
        const password = form.password;

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        const accounts = JSON.parse(
            localStorage.getItem("brandai_accounts") || "[]"
        );

        const account = accounts.find(
            (item) =>
                item.email.toLowerCase() === email &&
                item.password === password
        );

        if (!account) {
            setLoading(false);
            setError(
                "The email or password you entered is incorrect."
            );
            return;
        }

        const currentUser = {
            id: account.id,
            name: account.name,
            email: account.email
        };

        localStorage.setItem(
            "brandai_current_user",
            JSON.stringify(currentUser)
        );

        setLoading(false);

        const destination =
    location.state?.from?.pathname ||
    "/dashboard";

navigate(destination, {
    replace: true
});
    };

    return (
        <main className="login-page">

            <div className="login-card">

                <div className="login-card-header">
                    <h1>
                        Welcome back
                    </h1>

                    <p>
                        Sign in to continue to your BrandAI workspace.
                    </p>
                </div>


                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    {/* EMAIL */}

                    <div className="login-field">

                        <label htmlFor="login-email">
                            Email address
                        </label>

                        <div className="login-input-wrap">

                            <Mail
                                className="login-input-icon"
                                size={17}
                            />

                            <input
                                id="login-email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                autoComplete="email"
                            />

                        </div>

                    </div>


                    {/* PASSWORD */}

                    <div className="login-field">

                        <label htmlFor="login-password">
                            Password
                        </label>

                        <div className="login-input-wrap">

                            <Lock
                                className="login-input-icon"
                                size={17}
                            />

                            <input
                                id="login-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />

                            <button
                                type="button"
                                className="login-eye-button"
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


                    {/* ERROR */}

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <span>
                                Signing in...
                            </span>
                        ) : (
                            <>
                                <span>
                                    Sign in
                                </span>

                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>

                </form>


                {/* SIGN UP */}

                <div className="login-signup">

                    <span>
                        Don't have an account?
                    </span>

                    <Link to="/signup">
                        Create an account
                    </Link>

                </div>

            </div>

        </main>
    );
}

export default Login;