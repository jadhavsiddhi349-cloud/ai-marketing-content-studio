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

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        setError("");


        /* =========================================
           VALIDATION
        ========================================= */

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


        if (form.password !== form.confirmPassword) {

            setError("Passwords do not match.");

            return;
        }


        /* =========================================
           GET EXISTING ACCOUNTS
        ========================================= */

        const accounts = JSON.parse(
            localStorage.getItem("brandai_accounts") || "[]"
        );


        /* =========================================
           CHECK EXISTING EMAIL
        ========================================= */

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


        /* =========================================
           CREATE ACCOUNT
        ========================================= */

        const newAccount = {

            id: Date.now(),

            name: form.name.trim(),

            email: form.email.trim().toLowerCase(),

            password: form.password

        };


        /* =========================================
           SAVE ACCOUNT
        ========================================= */

        accounts.push(newAccount);


        localStorage.setItem(
            "brandai_accounts",
            JSON.stringify(accounts)
        );


        /* =========================================
           CREATE LOGIN SESSION
        ========================================= */

        const currentUser = {

            id: newAccount.id,

            name: newAccount.name,

            email: newAccount.email

        };


        localStorage.setItem(
            "brandai_current_user",
            JSON.stringify(currentUser)
        );


        /* =========================================
           GO TO BRAND BRAIN
        ========================================= */

        navigate("/brand-brain");

    };


    return (

        <main className="auth-page">

            <div className="auth-card">


                {/* =====================================
                    ICON
                ===================================== */}

                <div className="auth-icon">

                    <UserPlus size={28} />

                </div>


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="auth-header">

                    <div className="small-badge">

                        <Sparkles size={14} />

                        BRANDAI

                    </div>


                    <h1>

                        Create your

                        <span>
                            {" "}account.
                        </span>

                    </h1>


                    <p>

                        Create your BrandAI account and start
                        building AI-powered campaigns.

                    </p>

                </div>


                {/* =====================================
                    FORM
                ===================================== */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >


                    {/* NAME */}

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


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>


                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                        />

                    </div>


                    {/* PASSWORD */}

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


                    {/* CONFIRM PASSWORD */}

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


                    {/* ERROR */}

                    {error && (

                        <div className="auth-error">

                            {error}

                        </div>

                    )}


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="primary-btn auth-submit"
                    >

                        Create Account

                        <ArrowRight size={18} />

                    </button>


                </form>


                {/* =====================================
                    FOOTER
                ===================================== */}

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