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
    Image as ImageIcon,
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
        tone: ""
    });

    const [platforms, setPlatforms] = useState([]);

    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

            const brandList = response.data || [];

            setBrands(brandList);

            if (brandList.length > 0) {
                setForm((previous) => ({
                    ...previous,
                    brandId: brandList[0]._id
                }));
            }
        } catch (err) {
            console.error("Failed to load brands:", err);
            setError(
                "Unable to load your brand information. Please try again."
            );
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        if (error) {
            setError("");
        }
    };

    const togglePlatform = (platform) => {
        setPlatforms((previous) =>
            previous.includes(platform)
                ? previous.filter((item) => item !== platform)
                : [...previous, platform]
        );

        if (error) {
            setError("");
        }
    };

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

    const removeProductImage = () => {
        setProductImage(null);
        setImagePreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!currentUser) {
            navigate("/login");
            return;
        }

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

        setLoading(true);

        try {
            /*
             * The current backend campaign API does not require
             * the product image. We therefore keep the image on
             * the frontend campaign record for now.
             *
             * Later, the image can be sent to an AI vision endpoint
             * without changing this page structure.
             */

            const response = await createCampaign({
                brandId: form.brandId,
                campaignName: form.campaignName.trim(),
                goal: form.goal.trim(),
                product: form.product.trim(),
                audience: form.audience.trim(),
                tone: form.tone,
                platforms
            });

            const backendCampaign = response.data;

            const campaignId =
                backendCampaign?._id ||
                backendCampaign?.id ||
                Date.now().toString();

            /*
             * Save a frontend campaign record for the current user.
             * This allows Dashboard and other frontend pages to show
             * the campaign and product image.
             */

            const campaignStorageKey =
                `brandai_campaigns_${currentUser.id}`;

            const existingCampaigns = JSON.parse(
                localStorage.getItem(campaignStorageKey) || "[]"
            );

            const localCampaign = {
                id: campaignId,
                _id: campaignId,
                brandId: form.brandId,

                campaignName: form.campaignName.trim(),
                goal: form.goal.trim(),
                product: form.product.trim(),
                audience: form.audience.trim(),
                tone: form.tone,

                platforms: [...platforms],

                status: "draft",
                approved: false,

                contentCount: 0,

                productImage: imagePreview || null,

                productImageName:
                    productImage?.name || null,

                productImageType:
                    productImage?.type || null,

                createdAt: new Date().toISOString(),

                updatedAt: new Date().toISOString()
            };

            existingCampaigns.unshift(localCampaign);

            localStorage.setItem(
                campaignStorageKey,
                JSON.stringify(existingCampaigns)
            );

            /*
             * Add dashboard activity.
             */

            const activityStorageKey =
                `brandai_activity_${currentUser.id}`;

            const existingActivities = JSON.parse(
                localStorage.getItem(activityStorageKey) || "[]"
            );

            existingActivities.unshift({
                id: Date.now(),
                type: "campaign",
                title: "Campaign created",
                description:
                    `${form.campaignName.trim()} was created.`,
                createdAt: new Date().toISOString()
            });

            localStorage.setItem(
                activityStorageKey,
                JSON.stringify(
                    existingActivities.slice(0, 20)
                )
            );

            /*
             * Tell the dashboard to refresh.
             */

            window.dispatchEvent(
                new Event("brandai-dashboard-update")
            );

            navigate(`/campaign/${campaignId}`);

        } catch (err) {
            console.error(
                "Campaign creation failed:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Something went wrong while creating the campaign. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="app-page">

            {/* PAGE HEADER */}

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


            {/* FORM */}

            <form
                className="glass-form"
                onSubmit={handleSubmit}
            >

                <div className="form-grid">

                    {/* BRAND */}

                    <div className="input-group">

                        <label htmlFor="brandId">
                            Brand
                        </label>

                        <select
                            id="brandId"
                            name="brandId"
                            value={form.brandId}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select your brand
                            </option>

                            {brands.map((brand) => (
                                <option
                                    key={brand._id}
                                    value={brand._id}
                                >
                                    {brand.name}
                                </option>
                            ))}
                        </select>

                    </div>


                    {/* CAMPAIGN NAME */}

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
                        />

                    </div>


                    {/* GOAL */}

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
                        />

                    </div>


                    {/* PRODUCT */}

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
                        />

                    </div>


                    {/* AUDIENCE */}

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
                        />

                    </div>


                    {/* TONE */}

                    <div className="input-group full">

                        <label htmlFor="tone">
                            Content tone
                        </label>

                        <select
                            id="tone"
                            name="tone"
                            value={form.tone}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select a tone
                            </option>

                            <option value="Professional">
                                Professional
                            </option>

                            <option value="Friendly">
                                Friendly
                            </option>

                            <option value="Bold">
                                Bold
                            </option>

                            <option value="Luxury">
                                Luxury
                            </option>

                            <option value="Playful">
                                Playful
                            </option>

                            <option value="Minimal">
                                Minimal
                            </option>
                        </select>

                    </div>


                    {/* PRODUCT IMAGE */}

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


                {/* PLATFORM */}

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
                        <span>WhatsApp</span>
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
                        <span>Email</span>
                    </button>

                </div>


                {/* SUBMIT */}

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