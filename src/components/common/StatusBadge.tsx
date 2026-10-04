"use client";

import React from "react";
import { ProjectStatus } from "../../types";

interface StatusBadgeProps {
  status: ProjectStatus | string;
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
  showDot = true,
}) => {
  const normalized = status.toUpperCase();

  let label = status;
  let bgClass = "bg-[#1A1D23] border-[#343942] text-[#F5F7FA]";
  let dotClass = "bg-secondary-text";

  switch (normalized) {
    case "ACTIVE":
      label = "Active";
      bgClass = "bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]";
      dotClass = "bg-[#22C55E]";
      break;

    case "INACTIVITY_DETECTED":
      label = "Inactivity Detected";
      bgClass = "bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]";
      dotClass = "bg-[#EF4444] animate-subtle-pulse";
      break;

    case "VERIFYING":
      label = "Verifying Conditions";
      bgClass = "bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B]";
      dotClass = "bg-[#F59E0B] animate-subtle-pulse";
      break;

    case "THRESHOLD_APPROVAL":
      label = "Multisig Approval";
      bgClass = "bg-[#6D5EF5]/15 border-[#6D5EF5]/35 text-[#A59DF7]";
      dotClass = "bg-[#6D5EF5]";
      break;

    case "TIMELOCK_ACTIVE":
      label = "Timelock Active";
      bgClass = "bg-[#F59E0B]/15 border-[#F59E0B]/35 text-[#FBBF24]";
      dotClass = "bg-[#F59E0B] animate-pulse";
      break;

    case "RECOVERED":
      label = "Recovery Executed";
      bgClass = "bg-[#22C55E]/15 border-[#22C55E]/40 text-[#4ADE80]";
      dotClass = "bg-[#22C55E]";
      break;

    case "CONNECTED":
      label = "Connected";
      bgClass = "bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]";
      dotClass = "bg-[#22C55E]";
      break;

    case "PROTECTED":
      label = "Protected";
      bgClass = "bg-[#6D5EF5]/10 border-[#6D5EF5]/30 text-[#A59DF7]";
      dotClass = "bg-[#6D5EF5]";
      break;

    case "TRANSFERRED":
      label = "Transferred";
      bgClass = "bg-[#22C55E]/15 border-[#22C55E]/40 text-[#4ADE80]";
      dotClass = "bg-[#22C55E]";
      break;

    case "ACCEPTED":
      label = "Accepted";
      bgClass = "bg-[#22C55E]/10 border-[#22C55E]/25 text-[#22C55E]";
      dotClass = "bg-[#22C55E]";
      break;

    case "PENDING":
      label = "Pending";
      bgClass = "bg-[#F59E0B]/10 border-[#F59E0B]/25 text-[#F59E0B]";
      dotClass = "bg-[#F59E0B]";
      break;

    case "UNCONFIGURED":
      label = "Optional / Inactive";
      bgClass = "bg-[#1A1D23] border-[#292D34] text-[#737B87]";
      dotClass = "bg-[#737B87]";
      break;

    default:
      label = status;
      break;
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-md tracking-tight ${sizeClasses} ${bgClass}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotClass}`}
        />
      )}
      <span>{label}</span>
    </span>
  );
};
