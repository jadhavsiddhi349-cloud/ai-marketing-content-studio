import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBrand } from "../services/api";

import {
    Brain,
    Sparkles,
    ArrowRight,
    Users,
    MessageCircle,
    Package,
    Palette,
    Building2
} from "lucide-react";


function BrandBrain() {

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


    const [form, setForm] = useState(
        savedBrand || {
            brandName: "",
            industry: "",
            audience: "",
            tone: "",
            products: "",
            description: "",
            colors: ""
        }
    );


    const [error, setError] = useState("");


    const [savedMessage, setSavedMessage] = useState(
        Boolean(savedBrand)
    );


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setSavedMessage(false);
    };


    // const handleSubmit = (e) => {

    //     e.preventDefault();

    //     setError("");
    //     setSavedMessage(false);


    //     if (!currentUser) {
    //         navigate("/login");
    //         return;
    //     }


    //     if (
    //         !form.brandName.trim() ||
    //         !form.industry.trim() ||
    //         !form.audience.trim() ||
    //         !form.tone ||
    //         !form.products.trim() ||
    //         !form.description.trim()
    //     ) {

    //         setError(
    //             "Please complete all required brand information."
    //         );

    //         return;
    //     }


    //     /*
    //      * SAVE BRAND FOR THIS SPECIFIC USER
    //      */

    //     localStorage.setItem(
    //         `brandai_brand_${currentUser.id}`,
    //         JSON.stringify(form)
    //     );


    //     /*
    //      * MARK BRAND SETUP AS COMPLETED
    //      */

    //     localStorage.setItem(
    //         `brandai_brand_setup_${currentUser.id}`,
    //         "completed"
    //     );


    //     /*
    //      * LET OTHER PAGES KNOW THAT
    //      * THE BRAND INFORMATION CHANGED
    //      */

    //     window.dispatchEvent(
    //         new Event("brandai-dashboard-update")
    //     );


    //     setSavedMessage(true);


    //     /*
    //      * RETURN TO DASHBOARD
    //      */

    //     setTimeout(() => {
    //         navigate("/dashboard");
    //     }, 500);

    // };
    const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSavedMessage(false);

    if (!currentUser) {
        navigate("/login");
        return;
    }

    if (
        !form.brandName.trim() ||
        !form.industry.trim() ||
        !form.audience.trim() ||
        !form.tone ||
        !form.products.trim() ||
        !form.description.trim()
    ) {
        setError("Please complete all required brand information.");
        return;
    }

    try {
        // Prepare data according to backend Brand schema
        const brandData = {
            brandName: form.brandName,
            description: form.description,
            tone: form.tone,
            targetAudience: form.audience,

            products: [
                {
                    name: form.products,
                    description: ""
                }
            ],

            offers: "",
            preferredStyle: form.colors,
            preferredLanguage: "English"
        };

        // Save brand to MongoDB
        const response = await createBrand(brandData);

        console.log("Brand created:", response.data);

        // Keep localStorage also, if you want Brand Brain
        // information to remain available on the frontend
        localStorage.setItem(
            `brandai_brand_${currentUser.id}`,
            JSON.stringify(form)
        );

        localStorage.setItem(
            `brandai_brand_setup_${currentUser.id}`,
            "completed"
        );

        window.dispatchEvent(
            new Event("brandai-dashboard-update")
        );

        setSavedMessage(true);

        // Go back to dashboard
        setTimeout(() => {
            navigate("/dashboard");
        }, 500);

    } catch (error) {
        console.error("Create brand error:", error);

        setError(
            error.response?.data?.message ||
            "Failed to save brand. Please try again."
        );
    }
};


    return (

        <main className="brand-brain-page">

            <div className="brand-brain-container">


                {/* HEADER */}

                <div className="brand-brain-header">

                    <div className="brand-brain-icon">

                        <Brain size={30} />

                    </div>


                    <div>

                        <div className="small-badge">

                            <Sparkles size={14} />

                            BRAND INTELLIGENCE

                        </div>


                        <h1>

                            {savedBrand
                                ? "Your"
                                : "Build your"}

                            <span>
                                {" "}Brand Brain.
                            </span>

                        </h1>


                        <p>

                            {savedBrand
                                ? "Your saved brand information is shown below. You can update it whenever your brand changes."
                                : "Tell BrandAI about your brand. We'll remember it every time you return."
                            }

                        </p>

                    </div>

                </div>


                {/* FORM */}

                <form
                    className="brand-brain-form"
                    onSubmit={handleSubmit}
                >


                    <div className="brand-form-grid">


                        {/* BRAND NAME */}

                        <div className="brand-form-group">

                            <label>

                                <Building2 size={17} />

                                Brand Name

                            </label>


                            <input
                                type="text"
                                name="brandName"
                                placeholder="e.g. TrendyWear"
                                value={form.brandName}
                                onChange={handleChange}
                            />

                        </div>


                        {/* INDUSTRY */}

                        <div className="brand-form-group">

                            <label>

                                <Package size={17} />

                                Industry

                            </label>


                            <input
                                type="text"
                                name="industry"
                                placeholder="e.g. Fashion & Lifestyle"
                                value={form.industry}
                                onChange={handleChange}
                            />

                        </div>


                        {/* AUDIENCE */}

                        <div className="brand-form-group">

                            <label>

                                <Users size={17} />

                                Target Audience

                            </label>


                            <input
                                type="text"
                                name="audience"
                                placeholder="e.g. College Students"
                                value={form.audience}
                                onChange={handleChange}
                            />

                        </div>


                        {/* TONE */}

                        <div className="brand-form-group">

                            <label>

                                <MessageCircle size={17} />

                                Brand Tone

                            </label>


                            <select
                                name="tone"
                                value={form.tone}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select brand tone
                                </option>

                                <option value="Fun & Friendly">
                                    Fun & Friendly
                                </option>

                                <option value="Professional">
                                    Professional
                                </option>

                                <option value="Modern">
                                    Modern
                                </option>

                                <option value="Bold">
                                    Bold
                                </option>

                                <option value="Luxury">
                                    Luxury
                                </option>

                                <option value="Minimal">
                                    Minimal
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* PRODUCTS */}

                    <div className="brand-form-group">

                        <label>

                            <Package size={17} />

                            Products / Services

                        </label>


                        <textarea
                            name="products"
                            placeholder="Example: Clothing, accessories, footwear..."
                            value={form.products}
                            onChange={handleChange}
                            rows="3"
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="brand-form-group">

                        <label>

                            <Brain size={17} />

                            About Your Brand

                        </label>


                        <textarea
                            name="description"
                            placeholder="Describe your brand, what makes it different, and what you want customers to remember..."
                            value={form.description}
                            onChange={handleChange}
                            rows="5"
                        />

                    </div>


                    {/* COLORS */}

                    <div className="brand-form-group">

                        <label>

                            <Palette size={17} />

                            Brand Colors

                        </label>


                        <input
                            type="text"
                            name="colors"
                            placeholder="Example: Purple, Blue, White"
                            value={form.colors}
                            onChange={handleChange}
                        />

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="auth-error">

                            {error}

                        </div>

                    )}


                    {/* SUCCESS */}

                    {savedMessage && (

                        <div className="brand-saved-message">

                            <Sparkles size={16} />

                            Your Brand Brain is saved for this account.

                        </div>

                    )}


                    {/* ACTIONS */}

                    <div className="brand-brain-actions">


                        <div className="save-info">

                            <Sparkles size={17} />

                            <span>

                                {savedBrand
                                    ? "These details are saved to your BrandAI account and can be updated anytime."
                                    : "BrandAI will remember this information for your future campaigns."
                                }

                            </span>

                        </div>


                        <button
                            type="submit"
                            className="primary-btn"
                        >

                            {savedBrand
                                ? "Save Changes"
                                : "Save Brand Brain"
                            }

                            <ArrowRight size={19} />

                        </button>

                    </div>

                </form>

            </div>

        </main>

    );

}


export default BrandBrain;