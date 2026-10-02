import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createCampaign,
    getBrands
} from "../services/api";

import {
    Sparkles,
    Mail,
    MessageCircle,
    Upload,
    X,
    CheckCircle2
} from "lucide-react";

function CreateCampaign() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [currentUser, setCurrentUser] = useState(null);
    const [brands, setBrands] = useState([]);

    const [form, setForm] = useState({
        brandId: "",
        campaignName: "",
        goal: "",
        product: "",
        audience: "",
        tone: "Professional"
    });

    const [platforms, setPlatforms] = useState([]);

    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ================================
    // LOAD USER + BRANDS
    // ================================

    useEffect(() => {
        const storedUser = JSON.parse(
            localStorage.getItem("brandai_current_user") || "null"
        );

        if (!storedUser) {
            navigate("/login");
            return;
        }

        setCurrentUser(storedUser);

        loadBrands();
    }, [navigate]);

    const loadBrands = async () => {
        try {
            const response = await getBrands();

            console.log("Brands API response:", response.data);

            const brandsData = Array.isArray(response.data)
                ? response.data
                : response.data?.brands || [];

            setBrands(brandsData);

        } catch (error) {
            console.error("Could not load brands:", error);

            setBrands([]);

            setError(
                error.response?.data?.message ||
                "Failed to load brands."
            );
        }
    };

    // ================================
    // INPUT CHANGE
    // ================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

        if (error) {
            setError("");
        }
    };

    // ================================
    // PLATFORM CHANGE
    // ================================

    const togglePlatform = (platform) => {
        setPlatforms((previous) =>
            previous.includes(platform)
                ? previous.filter(
                    (item) => item !== platform
                )
                : [...previous, platform]
        );

        if (error) {
            setError("");
        }
    };

    // ================================
    // IMAGE CHANGE
    // ================================

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setError("");

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            setError(
                "Please upload a JPG, PNG, or WEBP image."
            );

            e.target.value = "";
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError(
                "Product image must be smaller than 5 MB."
            );

            e.target.value = "";
            return;
        }

        setProductImage(file);

        const reader = new FileReader();

        reader.onload = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    // ================================
    // REMOVE IMAGE
    // ================================

    const removeProductImage = () => {
        setProductImage(null);
        setImagePreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // ================================
    // UPLOAD BUTTON
    // ================================

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // ================================
    // CREATE CAMPAIGN
    // ================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!currentUser) {
            navigate("/login");
            return;
        }

        // ----------------------------
        // VALIDATION
        // ----------------------------

        if (!form.brandId) {
            setError(
                "Please select a brand before creating the campaign."
            );
            return;
        }

        if (!form.campaignName.trim()) {
            setError(
                "Please enter a campaign name."
            );
            return;
        }

        if (!form.goal.trim()) {
            setError(
                "Please enter the campaign goal."
            );
            return;
        }

        if (!form.product.trim()) {
            setError(
                "Please enter the product or service."
            );
            return;
        }

        if (!form.audience.trim()) {
            setError(
                "Please enter your target audience."
            );
            return;
        }

        if (!form.tone) {
            setError(
                "Please select a content tone."
            );
            return;
        }

        if (platforms.length === 0) {
            setError(
                "Please select at least one platform."
            );
            return;
        }

        // ----------------------------
        // START LOADING
        // ----------------------------

        setLoading(true);

        try {

            // ----------------------------
            // SEND TO BACKEND
            // ----------------------------

            const response = await createCampaign({

                brandId: form.brandId,

                campaignName:
                    form.campaignName.trim(),

                goal:
                    form.goal.trim(),

                product:
                    form.product.trim(),

                audience:
                    form.audience.trim(),

                tone:
                    form.tone,

                platforms:
                    platforms
            });

            console.log(
                "Campaign created:",
                response.data
            );

            // ==================================================
            // IMPORTANT
            // BACKEND RESPONSE:
            //
            // {
            //   success: true,
            //   message: "...",
            //   campaign: {
            //       _id: "...",
            //       ...
            //   }
            // }
            //
            // ==================================================

            const backendCampaign =
                response.data?.campaign;

            console.log(
                "Backend Campaign:",
                backendCampaign
            );

            // Get MongoDB _id ONLY
            const campaignId =
                backendCampaign?._id;

            console.log(
                "MongoDB Campaign ID:",
                campaignId
            );

            // ==================================================
            // NEVER USE Date.now() FOR CAMPAIGN ID
            // ==================================================

            if (!campaignId) {
                throw new Error(
                    "Campaign ID was not returned by the server."
                );
            }

            // ==================================================
            // CHECK MONGODB OBJECT ID
            // ==================================================

            if (
                typeof campaignId !== "string" ||
                !/^[0-9a-fA-F]{24}$/.test(campaignId)
            ) {
                throw new Error(
                    `Invalid MongoDB Campaign ID received: ${campaignId}`
                );
            }

            // ==================================================
            // SAVE CAMPAIGN LOCALLY
            // ==================================================

            const savedCampaigns =
                JSON.parse(
                    localStorage.getItem("campaigns") ||
                    "[]"
                );

            const newCampaign = {
                ...backendCampaign,

                // Both use MongoDB ID
                id: campaignId,
                _id: campaignId,

                // Keep frontend image information
                productImage:
                    imagePreview || null,

                productImageName:
                    productImage?.name || null,

                productImageType:
                    productImage?.type || null
            };

            const updatedCampaigns = [
                newCampaign,
                ...savedCampaigns
            ];

            localStorage.setItem(
                "campaigns",
                JSON.stringify(updatedCampaigns)
            );

            // ==================================================
            // SAVE ACTIVITY
            // ==================================================

            const activities =
                JSON.parse(
                    localStorage.getItem("activities") ||
                    "[]"
                );

            const newActivity = {
                // Date.now() is OK HERE.
                // This is ONLY activity ID.
                id: Date.now(),

                type: "campaign",

                title:
                    form.campaignName.trim(),

                description:
                    "Campaign generated successfully",

                createdAt:
                    new Date().toISOString()
            };

            localStorage.setItem(
                "activities",
                JSON.stringify([
                    newActivity,
                    ...activities
                ])
            );

            // ==================================================
            // DASHBOARD UPDATE
            // ==================================================

            window.dispatchEvent(
                new Event("campaignsUpdated")
            );

            // ==================================================
            // FINAL NAVIGATION
            // ==================================================
            //
            // ONLY ONE navigate()
            //
            // MongoDB _id is used.
            //
            // ==================================================

            navigate(
                `/campaign/${campaignId}`
            );

        } catch (error) {

            console.error(
                "Create campaign error:",
                error
            );

            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to generate campaign.";

            setError(errorMessage);

        } finally {

            setLoading(false);

        }
    };

    // ======================================================
    // UI
    // ======================================================

    return (
        <main className="app-page">

            {/* =========================
                PAGE HEADER
            ========================== */}

            <div className="page-heading">

                <div className="small-badge">

                    <Sparkles size={12} />

                    CAMPAIGN WORKSPACE

                </div>

                <h1>
                    Create your next{" "}
                    <span>campaign.</span>
                </h1>

                <p>
                    Define your campaign, add your product,
                    upload a product image, and choose where
                    your content will be published.
                </p>

            </div>

            {/* =========================
                FORM
            ========================== */}

            <form
                className="glass-form"
                onSubmit={handleSubmit}
            >

                <div className="form-grid">

                    {/* =========================
                        BRAND
                    ========================== */}

                    <div className="input-group">

                        <label htmlFor="brandId">
                            Brand
                        </label>

                        <select
                            id="brandId"
                            name="brandId"
                            value={form.brandId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select your brand
                            </option>

                            {brands.map((brand) => (

                                <option
                                    key={brand._id}
                                    value={brand._id}
                                >
                                    {brand.brandName}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* =========================
                        CAMPAIGN NAME
                    ========================== */}

                    <div className="input-group">

                        <label htmlFor="campaignName">
                            Campaign name
                        </label>

                        <input
                            id="campaignName"
                            type="text"
                            name="campaignName"
                            value={form.campaignName}
                            onChange={handleChange}
                            placeholder="e.g. Summer Launch Campaign"
                            required
                        />

                    </div>

                    {/* =========================
                        GOAL
                    ========================== */}

                    <div className="input-group full">

                        <label htmlFor="goal">
                            Campaign goal
                        </label>

                        <input
                            id="goal"
                            type="text"
                            name="goal"
                            value={form.goal}
                            onChange={handleChange}
                            placeholder="e.g. Increase product awareness and generate sales"
                            required
                        />

                    </div>

                    {/* =========================
                        PRODUCT
                    ========================== */}

                    <div className="input-group">

                        <label htmlFor="product">
                            Product or service
                        </label>

                        <input
                            id="product"
                            type="text"
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            placeholder="e.g. Organic Face Serum"
                            required
                        />

                    </div>

                    {/* =========================
                        AUDIENCE
                    ========================== */}

                    <div className="input-group">

                        <label htmlFor="audience">
                            Target audience
                        </label>

                        <input
                            id="audience"
                            type="text"
                            name="audience"
                            value={form.audience}
                            onChange={handleChange}
                            placeholder="e.g. Women aged 20–35"
                            required
                        />

                    </div>

                    {/* =========================
                        TONE
                    ========================== */}

                    <div className="input-group full">

                        <label htmlFor="tone">
                            Content tone
                        </label>

                        <select
                            id="tone"
                            name="tone"
                            value={form.tone}
                            onChange={handleChange}
                            required
                        >

                            <option value="Professional">
                                Professional
                            </option>

                            <option value="Friendly">
                                Friendly
                            </option>

                            <option value="Casual">
                                Casual
                            </option>

                            <option value="Fun">
                                Fun
                            </option>

                            <option value="Inspirational">
                                Inspirational
                            </option>

                            <option value="Luxury">
                                Luxury
                            </option>

                            <option value="Bold">
                                Bold
                            </option>

                        </select>

                    </div>

                    {/* =========================
                        PRODUCT IMAGE
                    ========================== */}

                    <div className="input-group full">

                        <div className="product-image-heading">

                            <div>

                                <label>
                                    Product image
                                </label>

                                <p>
                                    Upload an image of your product
                                    for AI-powered campaign understanding.
                                </p>

                            </div>

                            <span className="product-image-ai-badge">

                                <Sparkles size={11} />

                                AI READY

                            </span>

                        </div>

                        {!imagePreview ? (

                            <button
                                type="button"
                                className="product-upload-area"
                                onClick={handleUploadClick}
                            >

                                <div className="product-upload-icon">

                                    <Upload size={21} />

                                </div>

                                <div className="product-upload-content">

                                    <strong>
                                        Upload product image
                                    </strong>

                                    <span>
                                        Click to browse from your computer
                                    </span>

                                    <small>
                                        JPG, PNG or WEBP · Maximum 5 MB
                                    </small>

                                </div>

                                <div className="product-upload-action">

                                    Choose image

                                </div>

                            </button>

                        ) : (

                            <div className="product-image-preview">

                                <div className="product-image-preview-media">

                                    <img
                                        src={imagePreview}
                                        alt="Product preview"
                                    />

                                </div>

                                <div className="product-image-preview-info">

                                    <div className="product-image-success">

                                        <div className="product-image-success-icon">

                                            <CheckCircle2 size={15} />

                                        </div>

                                        <div>

                                            <strong>
                                                Product image uploaded
                                            </strong>

                                            <span>
                                                {productImage?.name}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="product-image-preview-actions">

                                        <button
                                            type="button"
                                            onClick={handleUploadClick}
                                        >
                                            Replace image
                                        </button>

                                        <button
                                            type="button"
                                            className="product-image-remove"
                                            onClick={removeProductImage}
                                        >

                                            <X size={14} />

                                            Remove

                                        </button>

                                    </div>

                                </div>

                            </div>

                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            className="product-image-file-input"
                        />

                    </div>

                </div>

                {/* =========================
                    PLATFORMS
                ========================== */}

                <div className="platform-heading">

                    Where do you want to publish?

                </div>

                <div className="platform-select">

                    <button
                        type="button"
                        className={
                            platforms.includes("Instagram")
                                ? "platform-choice selected"
                                : "platform-choice"
                        }
                        onClick={() =>
                            togglePlatform("Instagram")
                        }
                    >

                        <span>◎</span>
                        <span>Instagram</span>

                    </button>

                    <button
                        type="button"
                        className={
                            platforms.includes("Facebook")
                                ? "platform-choice selected"
                                : "platform-choice"
                        }
                        onClick={() =>
                            togglePlatform("Facebook")
                        }
                    >

                        <span>f</span>
                        <span>Facebook</span>

                    </button>

                    <button
                        type="button"
                        className={
                            platforms.includes("LinkedIn")
                                ? "platform-choice selected"
                                : "platform-choice"
                        }
                        onClick={() =>
                            togglePlatform("LinkedIn")
                        }
                    >

                        <span>in</span>
                        <span>LinkedIn</span>

                    </button>

                    <button
                        type="button"
                        className={
                            platforms.includes("YouTube")
                                ? "platform-choice selected"
                                : "platform-choice"
                        }
                        onClick={() =>
                            togglePlatform("YouTube")
                        }
                    >

                        <span>▶</span>
                        <span>YouTube</span>

                    </button>

                    <button
                        type="button"
                        className={
                            platforms.includes("WhatsApp")
                                ? "platform-choice selected"
                                : "platform-choice"
                        }
                        onClick={() =>
                            togglePlatform("WhatsApp")
                        }
                    >

                        <MessageCircle size={22} />

                        <span>
                            WhatsApp
                        </span>

                    </button>

                    <button
                        type="button"
                        className={
                            platforms.includes("Email")
                                ? "platform-choice selected"
                                : "platform-choice"
                        }
                        onClick={() =>
                            togglePlatform("Email")
                        }
                    >

                        <Mail size={22} />

                        <span>
                            Email
                        </span>

                    </button>

                </div>

                {/* =========================
                    SUBMIT
                ========================== */}

                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >

                    {loading ? (

                        <>
                            <Sparkles size={16} />
                            Creating campaign...
                        </>

                    ) : (

                        <>
                            <Sparkles size={16} />
                            Generate Campaign
                        </>

                    )}

                </button>

                {/* =========================
                    ERROR
                ========================== */}

                {error && (

                    <div className="error-message">

                        {error}

                    </div>

                )}

            </form>

        </main>
    );
}

export default CreateCampaign;