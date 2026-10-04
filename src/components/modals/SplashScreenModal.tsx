"use client";

import React from "react";
import { Logo } from "../common/Logo";
import { X, ShieldCheck, KeyRound, Clock, ArrowRight, GitFork, Check } from "lucide-react";

interface SplashScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SplashScreenModal: React.FC<SplashScreenModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#111318] border border-[#2D333F] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-surface border border-border-subtle text-secondary-muted hover:text-primary-text transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Banner Header */}
        <div className="p-6 sm:p-8 border-b border-border-subtle bg-gradient-to-b from-surface-raised/40 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <Logo size="lg" subtitle="Protocol Overview & Prototype Walkthrough" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-primary-text tracking-tight mt-2">
            What happens if a critical maintainer goes silent?
          </h2>

          <p className="text-xs sm:text-sm text-secondary-text mt-2 leading-relaxed max-w-xl">
            Open-source infrastructure powers global industry, yet emergency authority often relies on
            a single person. <span className="text-primary-text font-semibold">Open Continuity</span> provides
            a programmable, opt-in fail-safe so projects never get locked or hijacked.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-secondary-muted font-semibold">
            How The Continuity Layer Works
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-1.5">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Clock className="w-4 h-4" />
                <span>1. Inactivity Oracle</span>
              </div>
              <p className="text-[11px] text-secondary-text leading-relaxed">
                Detects 30 consecutive days of silence or zero commit heartbeats.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-1.5">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <KeyRound className="w-4 h-4" />
                <span>2. Multisig Quorum</span>
              </div>
              <p className="text-[11px] text-secondary-text leading-relaxed">
                2 of 3 pre-authorized successors must co-sign to authorize transfer.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-1.5">
              <div className="flex items-center gap-2 text-status-amber font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>3. Timelock Buffer</span>
              </div>
              <p className="text-[11px] text-secondary-text leading-relaxed">
                Mandatory delay. Active maintainers can cancel anytime if false alarm.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-surface-raised rounded-xl border border-border-subtle flex items-center justify-between text-xs text-secondary-text">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-green" />
              <span>Target Prototype Demo: <strong className="text-primary-text">libsecure</strong> (4 protected assets)</span>
            </div>
            <span className="text-[10px] font-mono text-secondary-muted">2-Min Presentation Mode</span>
          </div>

          {/* Action Call */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
            >
              <span>Enter Interactive Prototype Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
