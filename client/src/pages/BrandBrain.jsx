import { useState } from "react";
import { createBrand } from "../services/api";
import { Sparkles, Save } from "lucide-react";

function BrandBrain() {

    const [form, setForm] = useState({
        brandName: "",
        description: "",
        tone: "",
        targetAudience: "",
        productName: "",
        productDescription: "",
        offers: "",
        preferredStyle: "",
        preferredLanguage: "English"
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            await createBrand({

                brandName: form.brandName,

                description: form.description,

                tone: form.tone,

                targetAudience: form.targetAudience,

                products: [
                    {
                        name: form.productName,
                        description: form.productDescription
                    }
                ],

                offers: form.offers,

                preferredStyle: form.preferredStyle,

                preferredLanguage: form.preferredLanguage

            });

            setMessage("Brand Brain saved successfully! ✨");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="app-page">

            <div className="page-heading">

                <div className="small-badge">
                    <Sparkles size={14} />
                    BRAND INTELLIGENCE
                </div>

                <h1>
                    Build your <span>Brand Brain.</span>
                </h1>

                <p>
                    Give BrandAI the information it needs to
                    understand your brand.
                </p>

            </div>


            <form
                className="glass-form"
                onSubmit={handleSubmit}
            >

                <div className="form-grid">

                    <div className="input-group">
                        <label>Brand Name</label>

                        <input
                            name="brandName"
                            value={form.brandName}
                            onChange={handleChange}
                            placeholder="e.g. FreshBite"
                            required
                        />
                    </div>


                    <div className="input-group">
                        <label>Brand Tone</label>

                        <input
                            name="tone"
                            value={form.tone}
                            onChange={handleChange}
                            placeholder="Friendly, Modern..."
                            required
                        />
                    </div>


                    <div className="input-group full">
                        <label>Brand Description</label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Tell us about your brand..."
                        />
                    </div>


                    <div className="input-group">
                        <label>Target Audience</label>

                        <input
                            name="targetAudience"
                            value={form.targetAudience}
                            onChange={handleChange}
                            placeholder="College students"
                            required
                        />
                    </div>


                    <div className="input-group">
                        <label>Product Name</label>

                        <input
                            name="productName"
                            value={form.productName}
                            onChange={handleChange}
                            placeholder="Protein Bowl"
                            required
                        />
                    </div>


                    <div className="input-group full">
                        <label>Product Description</label>

                        <textarea
                            name="productDescription"
                            value={form.productDescription}
                            onChange={handleChange}
                            placeholder="Describe your product..."
                        />
                    </div>


                    <div className="input-group">
                        <label>Offers</label>

                        <input
                            name="offers"
                            value={form.offers}
                            onChange={handleChange}
                            placeholder="20% off"
                        />
                    </div>


                    <div className="input-group">
                        <label>Preferred Style</label>

                        <input
                            name="preferredStyle"
                            value={form.preferredStyle}
                            onChange={handleChange}
                            placeholder="Modern and minimal"
                        />
                    </div>


                    <div className="input-group">
                        <label>Language</label>

                        <select
                            name="preferredLanguage"
                            value={form.preferredLanguage}
                            onChange={handleChange}
                        >
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Marathi</option>
                        </select>
                    </div>

                </div>


                <button
                    className="primary-btn form-button"
                    disabled={loading}
                >

                    <Save size={18} />

                    {loading
                        ? "Saving..."
                        : "Save Brand Brain"
                    }

                </button>


                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

            </form>

        </main>

    );
}

export default BrandBrain;