"use client";

import React, { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | ReactNode;
  subValue?: string;
  badge?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  badge,
  icon,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-border-subtle rounded-lg p-4 transition-all duration-150 ${
        onClick ? "cursor-pointer hover:border-border-default hover:bg-surface-raised" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-secondary-muted uppercase tracking-wider">
          {label}
        </span>
        {icon && <div className="text-secondary-muted">{icon}</div>}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-xl font-semibold text-primary-text tracking-tight">
          {value}
        </div>
        {badge && <div>{badge}</div>}
      </div>
      {subValue && (
        <div className="mt-1.5 text-xs text-secondary-text truncate">
          {subValue}
        </div>
      )}
    </div>
  );
};
