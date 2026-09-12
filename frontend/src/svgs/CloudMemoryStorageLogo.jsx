import React from "react";

const CloudMemoryStorageLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 450"
      className="w-full h-auto max-w-2xl mx-auto"
    >
      <defs>
        {/* Cloud Outline Gradient */}
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00c6ff" />
          <stop offset="100%" stopColor="#0072ff" />
        </linearGradient>

        {/* Text Gradient */}
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#0072ff" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* --- ICON MARK --- */}
      <g id="LogoMark">
        {/* Outer Cloud Boundary */}
        <path
          d="M 310 160 
             A 50 50 0 0 1 380 90 
             A 70 70 0 0 1 500 100 
             A 55 55 0 0 1 550 160 
             A 45 45 0 0 1 530 230 
             L 280 230 
             A 40 40 0 0 1 310 160 Z"
          fill="none"
          stroke="url(#cloudGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Integrated Circuit / RAM Chip Base */}
        <path
          d="M 340 230 V 185 A 15 15 0 0 1 355 170 H 445 A 15 15 0 0 1 460 185 V 230 Z"
          fill="#0f172a"
        />

        {/* Circuit Traces inside Cloud */}
        <g stroke="#00c6ff" strokeWidth="3" fill="none" strokeLinecap="round">
          {/* Central Trace */}
          <path d="M 400 170 V 130" />
          <circle cx="400" cy="124" r="4" fill="#00c6ff" />

          {/* Left Trace */}
          <path d="M 370 170 V 145 L 350 130" />
          <circle cx="345" cy="126" r="4" fill="#00c6ff" />

          {/* Right Trace */}
          <path d="M 430 170 V 145 L 450 130" />
          <circle cx="455" cy="126" r="4" fill="#00c6ff" />
        </g>

        {/* Memory Chip Module Nodes (RAM Blocks) */}
        <g fill="#00c6ff">
          <rect x="360" y="188" width="20" height="26" rx="3" />
          <rect x="390" y="188" width="20" height="26" rx="3" fill="#ffffff" />
          <rect x="420" y="188" width="20" height="26" rx="3" />
        </g>

        {/* Gold Memory Pins at Bottom */}
        <g fill="#00c6ff" opacity="0.9">
          <rect x="350" y="224" width="8" height="12" rx="1" />
          <rect x="365" y="224" width="8" height="12" rx="1" />
          <rect x="380" y="224" width="8" height="12" rx="1" />
          <rect x="412" y="224" width="8" height="12" rx="1" />
          <rect x="427" y="224" width="8" height="12" rx="1" />
          <rect x="442" y="224" width="8" height="12" rx="1" />
        </g>
      </g>

      {/* --- TYPOGRAPHY --- */}
      <g id="LogoText" textAnchor="middle">
        {/* Primary Title */}
        <text
          x="400"
          y="310"
          fill="url(#textGrad)"
          fontSize="36"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="2"
        >
          CLOUD MEMORY
        </text>

        {/* Subtitle */}
        <text
          x="400"
          y="348"
          fill="#0072ff"
          fontSize="20"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="10"
          opacity="0.9"
        >
          STORAGE
        </text>
      </g>
    </svg>
  );
};

export default CloudMemoryStorageLogo;
