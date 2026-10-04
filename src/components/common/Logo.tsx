"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  subtitle?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  subtitle = "Continuity Layer",
  className = "",
}) => {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-7 h-7",
    lg: "w-9 h-9",
    xl: "w-12 h-12",
  }[size];

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-semibold",
    xl: "text-lg font-bold",
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Precision Geometric SVG Brandmark: Interlocking Continuity Knot */}
      <div
        className={`${iconSizes} rounded-lg bg-[#15181E] border border-[#2D333F] flex items-center justify-center flex-shrink-0 shadow-sm relative group`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[62%] h-[62%]"
        >
          {/* Outer continuous orbit */}
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
            stroke="#6D5EF5"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Inner interlocking key nexus */}
          <path
            d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z"
            stroke="#F5F7FA"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          {/* Center immutable threshold core */}
          <circle cx="12" cy="12" r="2.25" fill="#6D5EF5" />
          {/* Continuity bridge link */}
          <path
            d="M18 9L21 6M21 6H17M21 6V10"
            stroke="#F5F7FA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-semibold tracking-[-0.015em] text-[#F5F7FA] ${textSizes} leading-tight`}
            >
              Open Continuity
            </span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#1D2128] border border-[#2D333F] text-[#9CA3AF]">
              PROT
            </span>
          </div>
          {subtitle && (
            <span className="text-[10.5px] font-mono text-[#737B87] tracking-tight leading-tight mt-0.5 truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
