import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    ArrowLeft,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    ShieldCheck,
    Sparkles,
    RotateCcw
} from "lucide-react";

function ContentChecker() {
    const [content, setContent] = useState("");
    const [platform, setPlatform] = useState("Instagram");
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        const storedUser = localStorage.getItem(
            "brandai_current_user"
        );

        if (!storedUser) {
            setHistory([]);
            return;
        }

        try {
            const user = JSON.parse(storedUser);

            const savedHistory = JSON.parse(
                localStorage.getItem(
                    `brandai_content_checks_${user.id}`
                ) || "[]"
            );

            setHistory(
                Array.isArray(savedHistory)
                    ? savedHistory
                    : []
            );
        } catch {
            setHistory([]);
        }
    };

    const saveHistory = (newCheck) => {
        const storedUser = localStorage.getItem(
            "brandai_current_user"
        );

        if (!storedUser) {
            return;
        }

        try {
            const user = JSON.parse(storedUser);

            const updatedHistory = [
                newCheck,
                ...history
            ].slice(0, 10);

            localStorage.setItem(
                `brandai_content_checks_${user.id}`,
                JSON.stringify(updatedHistory)
            );

            setHistory(updatedHistory);
        } catch {
            // Ignore local storage errors
        }
    };

    const analyzeContent = () => {
        const text = content.trim();

        if (!text) {
            return;
        }

        const words = text
            .split(/\s+/)
            .filter(Boolean);

        const wordCount = words.length;
        const characterCount = text.length;

        const issues = [];
        const suggestions = [];

        if (wordCount < 5) {
            issues.push({
                type: "warning",
                title: "Content is very short",
                description:
                    "Add more context so your audience understands the message."
            });
        }

        if (wordCount > 300) {
            issues.push({
                type: "warning",
                title: "Content is quite long",
                description:
                    "Consider shortening the message for easier reading."
            });
        }

        if (
            /!!{2,}/.test(text) ||
            /\?{2,}/.test(text)
        ) {
            issues.push({
                type: "warning",
                title: "Too much punctuation",
                description:
                    "Multiple exclamation or question marks can make the copy feel less polished."
            });
        }

        if (/[A-Z]{6,}/.test(text)) {
            issues.push({
                type: "warning",
                title: "Excessive capitalization",
                description:
                    "Avoid large sections written in capital letters."
            });
        }

        const urlCount =
            (text.match(/https?:\/\/\S+/gi) || [])
                .length;

        if (urlCount > 2) {
            issues.push({
                type: "warning",
                title: "Many links detected",
                description:
                    "Multiple links may make the content harder to scan."
            });
        }

        const promotionalWords = [
            "buy now",
            "limited time",
            "act now",
            "click here",
            "best ever",
            "guaranteed"
        ];

        const promotionalMatches =
            promotionalWords.filter((phrase) =>
                text.toLowerCase().includes(phrase)
            );

        if (promotionalMatches.length > 0) {
            issues.push({
                type: "warning",
                title: "Strong promotional language",
                description:
                    "Review promotional claims and make sure they are accurate and appropriate for your brand."
            });
        }

        if (!/[.!?]$/.test(text)) {
            suggestions.push(
                "Consider ending the content with clear punctuation."
            );
        }

        if (wordCount >= 5 && wordCount <= 300) {
            suggestions.push(
                "The content has a readable length."
            );
        }

        if (!text.includes("#") && platform === "Instagram") {
            suggestions.push(
                "Consider adding relevant hashtags if they fit your content strategy."
            );
        }

        if (!/[!?]/.test(text)) {
            suggestions.push(
                "Consider adding a clear call-to-action if your goal requires one."
            );
        }

        let score = 100;

        score -= issues.length * 10;

        if (score < 0) {
            score = 0;
        }

        let status = "Good";

        if (score < 70) {
            status = "Needs Attention";
        } else if (score < 90) {
            status = "Could Be Improved";
        }

        const newResult = {
            id: Date.now(),
            content: text,
            platform,
            score,
            status,
            wordCount,
            characterCount,
            issues,
            suggestions,
            checkedAt: new Date().toISOString()
        };

        setResult(newResult);
        saveHistory(newResult);
    };

    const clearChecker = () => {
        setContent("");
        setResult(null);
    };

    const getResultIcon = (score) => {
        if (score >= 90) {
            return <CheckCircle2 size={25} />;
        }

        if (score >= 70) {
            return <AlertTriangle size={25} />;
        }

        return <XCircle size={25} />;
    };

    return (
        <div className="checker-page">

            <div className="checker-page-header">

                <div>
                    <Link
                        to="/dashboard"
                        className="page-back-link"
                    >
                        <ArrowLeft size={17} />
                        Dashboard
                    </Link>

                    <h1>Content Checker</h1>

                    <p>
                        Review your content before publishing it.
                    </p>
                </div>

                <div className="checker-header-icon">
                    <ShieldCheck size={23} />
                </div>

            </div>

            <div className="checker-layout">

                <section className="checker-editor-card">

                    <div className="checker-card-header">

                        <div>
                            <span className="checker-label">
                                CONTENT
                            </span>

                            <h2>
                                Check your content
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={clearChecker}
                            className="checker-clear-button"
                        >
                            <RotateCcw size={15} />
                            Clear
                        </button>

                    </div>

                    <div className="checker-form">

                        <label>
                            Platform
                        </label>

                        <select
                            value={platform}
                            onChange={(e) =>
                                setPlatform(e.target.value)
                            }
                        >
                            <option>Instagram</option>
                            <option>Facebook</option>
                            <option>LinkedIn</option>
                            <option>YouTube</option>
                            <option>WhatsApp</option>
                            <option>Email</option>
                            <option>Website</option>
                        </select>

                        <label>
                            Content
                        </label>

                        <textarea
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            placeholder="Paste or write the content you want to check..."
                        />

                        <div className="checker-input-footer">

                            <span>
                                {content.length} characters
                            </span>

                            <span>
                                {
                                    content.trim()
                                        ? content
                                              .trim()
                                              .split(/\s+/)
                                              .length
                                        : 0
                                } words
                            </span>

                        </div>

                        <button
                            type="button"
                            onClick={analyzeContent}
                            disabled={!content.trim()}
                            className="checker-submit-button"
                        >
                            <Sparkles size={17} />
                            Check Content
                        </button>

                    </div>

                </section>

                <section className="checker-result-card">

                    {!result ? (

                        <div className="checker-empty-state">

                            <div className="checker-empty-icon">
                                <ShieldCheck size={30} />
                            </div>

                            <h2>
                                No content checked yet
                            </h2>

                            <p>
                                Enter your own content on the left
                                and run a check to see the results.
                            </p>

                        </div>

                    ) : (

                        <div className="checker-result">

                            <div className="checker-result-top">

                                <div>
                                    <span className="checker-label">
                                        RESULT
                                    </span>

                                    <h2>
                                        Content Analysis
                                    </h2>
                                </div>

                                <div
                                    className={`checker-score checker-score-${result.score >= 90
                                        ? "good"
                                        : result.score >= 70
                                            ? "medium"
                                            : "low"
                                    }`}
                                >
                                    {getResultIcon(result.score)}

                                    <strong>
                                        {result.score}
                                    </strong>

                                    <span>
                                        / 100
                                    </span>
                                </div>

                            </div>

                            <div className="checker-result-summary">

                                <div>
                                    <span>Status</span>
                                    <strong>
                                        {result.status}
                                    </strong>
                                </div>

                                <div>
                                    <span>Platform</span>
                                    <strong>
                                        {result.platform}
                                    </strong>
                                </div>

                                <div>
                                    <span>Words</span>
                                    <strong>
                                        {result.wordCount}
                                    </strong>
                                </div>

                            </div>

                            <div className="checker-section">

                                <h3>
                                    Issues Found
                                </h3>

                                {result.issues.length === 0 ? (

                                    <div className="checker-success">
                                        <CheckCircle2 size={18} />

                                        <span>
                                            No obvious issues were found
                                            by the current checker.
                                        </span>
                                    </div>

                                ) : (

                                    <div className="checker-issues">

                                        {result.issues.map(
                                            (issue, index) => (
                                                <div
                                                    className="checker-issue"
                                                    key={index}
                                                >
                                                    <AlertTriangle
                                                        size={17}
                                                    />

                                                    <div>
                                                        <strong>
                                                            {issue.title}
                                                        </strong>

                                                        <p>
                                                            {
                                                                issue.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}

                                    </div>

                                )}

                            </div>

                            <div className="checker-section">

                                <h3>
                                    Suggestions
                                </h3>

                                <div className="checker-suggestions">

                                    {result.suggestions.map(
                                        (suggestion, index) => (
                                            <div
                                                key={index}
                                                className="checker-suggestion"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                />

                                                <span>
                                                    {suggestion}
                                                </span>
                                            </div>
                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                    )}

                </section>

            </div>

            <section className="checker-history-card">

                <div className="checker-history-header">

                    <div>
                        <span className="checker-label">
                            HISTORY
                        </span>

                        <h2>
                            Your recent checks
                        </h2>
                    </div>

                    <span className="checker-history-count">
                        {history.length}
                    </span>

                </div>

                {history.length === 0 ? (

                    <div className="checker-history-empty">
                        <p>
                            You haven't checked any content yet.
                        </p>
                    </div>

                ) : (

                    <div className="checker-history-list">

                        {history.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                className="checker-history-item"
                                onClick={() => {
                                    setContent(item.content);
                                    setPlatform(item.platform);
                                    setResult(item);
                                }}
                            >

                                <div>
                                    <strong>
                                        {item.content.slice(
                                            0,
                                            70
                                        )}
                                        {item.content.length > 70
                                            ? "..."
                                            : ""}
                                    </strong>

                                    <span>
                                        {item.platform}
                                    </span>
                                </div>

                                <div className="checker-history-score">
                                    {item.score}
                                </div>

                            </button>
                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default ContentChecker;