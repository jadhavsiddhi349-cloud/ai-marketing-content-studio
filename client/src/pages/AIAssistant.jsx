import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Bot,
    Brain,
    Send,
    Sparkles,
    Trash2,
    User
} from "lucide-react";


function AIAssistant() {

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


    const conversationKey = currentUser
        ? `brandai_ai_chat_${currentUser.id}`
        : null;


    const [messages, setMessages] = useState(() => {

        if (!conversationKey) {
            return [];
        }

        return JSON.parse(
            localStorage.getItem(conversationKey) || "[]"
        );

    });


    const [input, setInput] = useState("");


    /* =========================================================
       LOGIN CHECK
    ========================================================= */

    useEffect(() => {

        if (!currentUser) {
            navigate("/login");
        }

    }, [currentUser, navigate]);


    /* =========================================================
       SAVE CONVERSATION
    ========================================================= */

    useEffect(() => {

        if (!conversationKey) {
            return;
        }

        localStorage.setItem(
            conversationKey,
            JSON.stringify(messages)
        );

    }, [messages, conversationKey]);


    /* =========================================================
       SEND MESSAGE
    ========================================================= */

    const handleSend = (e) => {

        e.preventDefault();

        const trimmedMessage = input.trim();

        if (!trimmedMessage) {
            return;
        }


        const userMessage = {

            id:
                `user-${Date.now()}`,

            role:
                "user",

            content:
                trimmedMessage,

            createdAt:
                new Date().toISOString()

        };


        setMessages((previous) => [

            ...previous,

            userMessage

        ]);


        setInput("");

    };


    /* =========================================================
       QUICK PROMPT
    ========================================================= */

    const handleQuickPrompt = (prompt) => {

        setInput(prompt);

    };


    /* =========================================================
       CLEAR CHAT
    ========================================================= */

    const clearConversation = () => {

        setMessages([]);

        if (conversationKey) {

            localStorage.removeItem(
                conversationKey
            );

        }

    };


    /* =========================================================
       ENTER KEY
    ========================================================= */

    const handleKeyDown = (e) => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            handleSend(e);

        }

    };


    if (!currentUser) {
        return null;
    }


    return (

        <main className="ai-assistant-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="ai-assistant-header">

                <div>

                    <Link
                        to="/dashboard"
                        className="ai-back-link"
                    >
                        <ArrowLeft size={16} />
                        Dashboard
                    </Link>


                    <div className="ai-title-row">

                        <div className="ai-title-icon">
                            <Bot size={25} />
                        </div>


                        <div>

                            <div className="small-badge">

                                <Sparkles size={14} />

                                AI ASSISTANT

                            </div>


                            <h1>
                                Your marketing
                                <span> assistant.</span>
                            </h1>


                            <p>
                                Ask questions, explore ideas,
                                and work through your marketing
                                strategy with BrandAI.
                            </p>

                        </div>

                    </div>

                </div>


                {messages.length > 0 && (

                    <button
                        type="button"
                        className="ai-clear-button"
                        onClick={clearConversation}
                    >

                        <Trash2 size={16} />

                        Clear Chat

                    </button>

                )}

            </div>


            {/* =================================================
                MAIN LAYOUT
            ================================================= */}

            <div className="ai-assistant-layout">


                {/* =================================================
                    CHAT
                ================================================= */}

                <section className="ai-chat-card">


                    <div className="ai-chat-header">

                        <div className="ai-chat-agent">

                            <div className="ai-agent-avatar">
                                <Bot size={19} />
                            </div>


                            <div>

                                <strong>
                                    BrandAI Assistant
                                </strong>

                                <span>
                                    Ready to help
                                </span>

                            </div>

                        </div>


                        <div className="ai-online-status">

                            <span></span>

                            AI Assistant

                        </div>

                    </div>


                    {/* =================================================
                        MESSAGES
                    ================================================= */}

                    <div className="ai-messages">

                        {messages.length === 0 ? (

                            <div className="ai-empty-state">

                                <div className="ai-empty-icon">
                                    <Sparkles size={27} />
                                </div>


                                <h2>
                                    What are you working on?
                                </h2>


                                <p>
                                    Start a conversation with BrandAI.
                                    Ask about your campaign ideas,
                                    content strategy, audience,
                                    positioning, or anything else
                                    related to your brand.
                                </p>


                                <div className="ai-quick-prompts">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuickPrompt(
                                                "Give me some campaign ideas for my brand."
                                            )
                                        }
                                    >
                                        Campaign ideas
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuickPrompt(
                                                "Help me improve my content strategy."
                                            )
                                        }
                                    >
                                        Content strategy
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuickPrompt(
                                                "Help me understand my target audience."
                                            )
                                        }
                                    >
                                        Target audience
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuickPrompt(
                                                "Give me ideas for promoting my product."
                                            )
                                        }
                                    >
                                        Promotion ideas
                                    </button>

                                </div>

                            </div>

                        ) : (

                            messages.map((message) => (

                                <div
                                    key={message.id}
                                    className={
                                        message.role === "user"
                                            ? "ai-message-row user-message-row"
                                            : "ai-message-row"
                                    }
                                >

                                    <div className="ai-message-avatar">

                                        {message.role === "user"
                                            ? <User size={16} />
                                            : <Bot size={16} />
                                        }

                                    </div>


                                    <div className="ai-message-bubble">

                                        <div className="ai-message-name">

                                            {message.role === "user"
                                                ? currentUser.name
                                                : "BrandAI"
                                            }

                                        </div>


                                        <div className="ai-message-text">

                                            {message.content}

                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>


                    {/* =================================================
                        INPUT
                    ================================================= */}

                    <form
                        className="ai-input-area"
                        onSubmit={handleSend}
                    >

                        <div className="ai-input-wrapper">

                            <textarea
                                value={input}
                                onChange={(e) =>
                                    setInput(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Ask BrandAI something..."
                                rows="1"
                            />


                            <button
                                type="submit"
                                className="ai-send-button"
                                disabled={!input.trim()}
                            >

                                <Send size={18} />

                            </button>

                        </div>


                        <div className="ai-input-note">

                            <Sparkles size={13} />

                            Press Enter to send · Shift + Enter
                            for a new line

                        </div>

                    </form>

                </section>


                {/* =================================================
                    BRAND CONTEXT
                ================================================= */}

                <aside className="ai-context-card">


                    <div className="ai-context-header">

                        <div className="ai-context-icon">
                            <Brain size={19} />
                        </div>


                        <div>

                            <h2>
                                Brand Context
                            </h2>

                            <p>
                                Your Brand Brain
                            </p>

                        </div>

                    </div>


                    {savedBrand ? (

                        <div className="ai-brand-context">

                            <div className="ai-brand-name">

                                {savedBrand.brandName}

                            </div>


                            {savedBrand.industry && (

                                <div className="ai-context-item">

                                    <span>
                                        Industry
                                    </span>

                                    <strong>
                                        {savedBrand.industry}
                                    </strong>

                                </div>

                            )}


                            {savedBrand.audience && (

                                <div className="ai-context-item">

                                    <span>
                                        Audience
                                    </span>

                                    <strong>
                                        {savedBrand.audience}
                                    </strong>

                                </div>

                            )}


                            {savedBrand.tone && (

                                <div className="ai-context-item">

                                    <span>
                                        Tone
                                    </span>

                                    <strong>
                                        {savedBrand.tone}
                                    </strong>

                                </div>

                            )}


                            {savedBrand.products && (

                                <div className="ai-context-item">

                                    <span>
                                        Products / Services
                                    </span>

                                    <strong>
                                        {savedBrand.products}
                                    </strong>

                                </div>

                            )}


                            <Link
                                to="/brand-brain"
                                className="ai-edit-brand"
                            >

                                Edit Brand Brain

                                <ArrowLeft
                                    size={14}
                                    className="ai-edit-arrow"
                                />

                            </Link>

                        </div>

                    ) : (

                        <div className="ai-no-brand">

                            <div className="ai-no-brand-icon">
                                <Brain size={20} />
                            </div>


                            <h3>
                                Brand Brain not set up
                            </h3>


                            <p>
                                Add your brand information so
                                BrandAI can use it when helping
                                with your marketing.
                            </p>


                            <Link
                                to="/brand-brain"
                                className="ai-setup-brand"
                            >
                                Set Up Brand Brain
                            </Link>

                        </div>

                    )}


                    {/* =================================================
                        CAPABILITIES
                    ================================================= */}

                    <div className="ai-capabilities">

                        <h3>
                            You can ask about
                        </h3>


                        <div className="ai-capability">

                            <Sparkles size={15} />

                            Campaign ideas

                        </div>


                        <div className="ai-capability">

                            <Sparkles size={15} />

                            Content planning

                        </div>


                        <div className="ai-capability">

                            <Sparkles size={15} />

                            Audience research

                        </div>


                        <div className="ai-capability">

                            <Sparkles size={15} />

                            Marketing strategy

                        </div>

                    </div>

                </aside>

            </div>

        </main>

    );

}


export default AIAssistant;