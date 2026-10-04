"use client";

import React from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useContinuity();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-accent" />;
        let borderColor = "border-border-default";

        if (toast.type === "success") {
          icon = <CheckCircle2 className="w-4 h-4 text-status-green flex-shrink-0" />;
          borderColor = "border-status-green/30";
        } else if (toast.type === "warning") {
          icon = <AlertTriangle className="w-4 h-4 text-status-amber flex-shrink-0" />;
          borderColor = "border-status-amber/30";
        } else if (toast.type === "error") {
          icon = <AlertCircle className="w-4 h-4 text-status-red flex-shrink-0" />;
          borderColor = "border-status-red/30";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-surface-raised border ${borderColor} rounded-lg shadow-xl text-primary-text transition-all duration-200 animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold tracking-tight">{toast.title}</div>
              <div className="text-xs text-secondary-text mt-0.5 leading-relaxed">
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-secondary-muted hover:text-primary-text transition-colors p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
