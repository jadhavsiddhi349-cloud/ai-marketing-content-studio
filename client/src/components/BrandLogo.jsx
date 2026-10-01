function BrandLogo({ compact = false }) {
    return (
        <div className="brand-logo">
            <div className="brand-logo-symbol">

                <svg
                    viewBox="0 0 40 40"
                    className="brand-logo-b"
                    aria-hidden="true"
                >
                    {/* Main folded B shape */}
                    <path
                        d="M11 8
                           H19
                           C26 8 30 11 30 16
                           C30 19 28 21 25 22
                           C29 23 32 26 32 29
                           C32 34 27 37 20 37
                           H11
                           V30
                           H19
                           C22 30 24 29 24 27
                           C24 25 22 24 19 24
                           H11
                           V18
                           H19
                           C21 18 23 17 23 15
                           C23 13 21 12 19 12
                           H11
                           Z"
                        fill="url(#brandGradient)"
                    />

                    {/* Folded cut */}
                    <path
                        d="M11 18
                           H19
                           C21 18 23 17 23 15
                           C23 13 21 12 19 12
                           H11
                           Z"
                        fill="#c8c0ff"
                        opacity="0.9"
                    />

                    {/* Lower fold highlight */}
                    <path
                        d="M11 30
                           H19
                           C22 30 24 29 24 27
                           C24 25 22 24 19 24
                           H11
                           Z"
                        fill="#7560ed"
                        opacity="0.9"
                    />

                    <defs>
                        <linearGradient
                            id="brandGradient"
                            x1="8"
                            y1="7"
                            x2="33"
                            y2="37"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop
                                offset="0"
                                stopColor="#d8d1ff"
                            />
                            <stop
                                offset="0.45"
                                stopColor="#9d8aff"
                            />
                            <stop
                                offset="1"
                                stopColor="#6248e8"
                            />
                        </linearGradient>
                    </defs>
                </svg>

            </div>

            {!compact && (
                <div className="brand-logo-text">
                    <span>Brand</span>
                    <strong>AI</strong>
                </div>
            )}
        </div>
    );
}

export default BrandLogo;