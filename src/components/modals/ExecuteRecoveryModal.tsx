"use client";

import React from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { X, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";

export const ExecuteRecoveryModal: React.FC = () => {
  const { isExecuteModalOpen, setIsExecuteModalOpen, executeRecovery, activeProject } = useContinuity();

  if (!isExecuteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-surface-raised border border-border-default rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-status-amber/15 border border-status-amber/30 flex items-center justify-center text-status-amber">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-text">Execute Recovery?</h3>
              <p className="text-[11px] text-secondary-muted font-mono">
                Contract method: executeContinuityTransfer()
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExecuteModalOpen(false)}
            className="text-secondary-muted hover:text-primary-text transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-secondary-text leading-relaxed">
            This action will transfer the configured project authorities for{" "}
            <span className="font-semibold text-primary-text">{activeProject.name}</span> to the
            authorized successor multisig (<span className="font-mono text-accent">0x7c1...9e3a</span>).
          </p>

          <div className="p-3.5 bg-surface border border-border-subtle rounded-lg space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-secondary-muted font-semibold">
              Protected Assets to Reassign:
            </div>
            <div className="space-y-1.5">
              {activeProject.policy.protectedAssets.map((asset) => (
                <div key={asset} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-surface-raised border border-border-subtle">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-status-green flex-shrink-0" />
                    <span className="text-primary-text font-medium">{asset}</span>
                  </div>
                  <span className="text-[11px] text-secondary-muted font-mono">
                    Delegation Ready
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-surface/50 border border-border-subtle rounded-md text-[11px] text-secondary-muted leading-relaxed">
            <span className="text-primary-text font-medium">Integration Note:</span> In accordance with
            production protocol specifications, authorization tokens and OIDC claim delegates are
            simulated for this environment. No raw credentials are exposed.
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsExecuteModalOpen(false)}
              className="px-3.5 py-1.5 rounded-md border border-border-subtle bg-surface text-secondary-text hover:text-primary-text text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={executeRecovery}
              className="px-4 py-1.5 rounded-md bg-status-green text-black font-semibold text-xs hover:bg-green-400 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Execute Recovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
