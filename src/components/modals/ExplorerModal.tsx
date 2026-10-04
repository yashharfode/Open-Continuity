"use client";

import React from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { X, ExternalLink, CheckCircle2, Shield, Copy, Check } from "lucide-react";

export const ExplorerModal: React.FC = () => {
  const { selectedTx, setSelectedTx } = useContinuity();
  const [copied, setCopied] = React.useState(false);

  if (!selectedTx) return null;

  const copyHash = () => {
    navigator.clipboard.writeText(selectedTx.txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-surface-raised border border-border-default rounded-xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-surface border border-border-subtle flex items-center justify-center text-accent">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-text">Continuity Block Explorer</h3>
              <p className="text-[11px] text-secondary-muted font-mono">
                Ethereum Sepolia Testnet &bull; Block #{selectedTx.blockNumber}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTx(null)}
            className="text-secondary-muted hover:text-primary-text transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Transaction details */}
        <div className="p-5 space-y-4 text-xs font-mono">
          <div>
            <div className="text-[11px] text-secondary-muted font-sans font-medium mb-1">
              Transaction Hash
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-surface border border-border-subtle text-primary-text">
              <span className="truncate mr-2">{selectedTx.txHash}</span>
              <button
                onClick={copyHash}
                className="text-secondary-muted hover:text-primary-text p-1 flex-shrink-0"
                title="Copy Hash"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-status-green" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-sans">
            <div className="p-3 rounded bg-surface border border-border-subtle">
              <div className="text-[11px] text-secondary-muted">Status</div>
              <div className="mt-1 flex items-center gap-1.5 text-status-green font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Success (Confirmed)</span>
              </div>
            </div>
            <div className="p-3 rounded bg-surface border border-border-subtle">
              <div className="text-[11px] text-secondary-muted">Timestamp</div>
              <div className="mt-1 text-primary-text font-mono text-[11px]">
                {selectedTx.timestamp}
              </div>
            </div>
          </div>

          <div className="space-y-2 font-sans">
            <div className="text-[11px] text-secondary-muted">Action / Event Name</div>
            <div className="p-2.5 rounded bg-surface border border-border-subtle text-primary-text font-medium text-xs">
              {selectedTx.title}
            </div>
          </div>

          <div className="space-y-2 font-sans">
            <div className="text-[11px] text-secondary-muted">Execution Payload Details</div>
            <div className="p-3 rounded bg-surface border border-border-subtle text-secondary-text text-xs leading-relaxed">
              {selectedTx.description}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <span className="text-secondary-muted font-sans">Signer Address: </span>
              <span className="text-primary-text">{selectedTx.actor}</span>
            </div>
            <div>
              <span className="text-secondary-muted font-sans">Contract: </span>
              <span className="text-accent">0x0C77...91A0</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setSelectedTx(null)}
              className="px-4 py-1.5 rounded-md bg-surface border border-border-subtle text-secondary-text hover:text-primary-text text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
