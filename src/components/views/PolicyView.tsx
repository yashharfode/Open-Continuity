"use client";

import React, { useState } from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { Sliders, Shield, Clock, Check, KeyRound, AlertCircle, Save } from "lucide-react";

export const PolicyView: React.FC = () => {
  const { activeProject, updatePolicy } = useContinuity();

  const [inactivityDays, setInactivityDays] = useState(
    activeProject.policy.inactivityPeriodDays
  );
  const [verificationHours, setVerificationHours] = useState(
    activeProject.policy.verificationPeriodHours
  );
  const [requiredApprovals, setRequiredApprovals] = useState(
    activeProject.policy.requiredApprovals
  );
  const [protectedAssets, setProtectedAssets] = useState<string[]>(
    activeProject.policy.protectedAssets
  );

  const toggleAsset = (key: string) => {
    if (protectedAssets.includes(key)) {
      setProtectedAssets(protectedAssets.filter((k) => k !== key));
    } else {
      setProtectedAssets([...protectedAssets, key]);
    }
  };

  const handleSave = () => {
    updatePolicy(inactivityDays, verificationHours, requiredApprovals);
  };

  const assetOptions = [
    {
      key: "Repository Access",
      label: "Repository Access",
      desc: "GitHub Organization ownership & repository administrative transfer",
    },
    {
      key: "Release Signing",
      label: "Release Signing",
      desc: "Cryptographic cosign & Sigstore OIDC delegation authorities",
    },
    {
      key: "Package Registry",
      label: "Package Registry",
      desc: "Scoped publish tokens for npm, PyPI, and Crates.io packages",
    },
    {
      key: "Infrastructure",
      label: "Infrastructure",
      desc: "Cloudflare root DNS records and AWS KMS cryptographic key policies",
    },
    {
      key: "Treasury",
      label: "Treasury",
      desc: "Smart contract multi-sig treasury balances and bug bounty reserves",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-text">
            Recovery Policy Configuration
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Define programmatic conditions, verification windows, and threshold parameters for project continuity.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-sm self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Policy</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Policy Configuration Parameters */}
        <div className="space-y-4">
          {/* 1. Inactivity */}
          <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
                  Maintainer Inactivity Condition
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-accent px-2 py-0.5 rounded bg-accent/15 border border-accent/30">
                {inactivityDays} days
              </span>
            </div>
            <p className="text-[11px] text-secondary-muted leading-relaxed">
              Minimum duration without maintainer heartbeat or git commits before recovery verification can begin.
            </p>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[14, 30, 60, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => setInactivityDays(days)}
                  className={`py-1.5 px-3 rounded text-xs font-medium border transition-colors ${
                    inactivityDays === days
                      ? "bg-accent/20 border-accent text-primary-text font-bold"
                      : "bg-surface-raised border-border-subtle text-secondary-text hover:border-border-default"
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>

          {/* 2. Verification */}
          <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-status-amber" />
                <h3 className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
                  Verification Period
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-status-amber px-2 py-0.5 rounded bg-status-amber/15 border border-status-amber/30">
                {verificationHours} hours
              </span>
            </div>
            <p className="text-[11px] text-secondary-muted leading-relaxed">
              Autonomous oracle grace window during which maintainer is pinged via multi-channel telemetry.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[24, 48, 72].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setVerificationHours(hours)}
                  className={`py-1.5 px-3 rounded text-xs font-medium border transition-colors ${
                    verificationHours === hours
                      ? "bg-status-amber/20 border-status-amber text-primary-text font-bold"
                      : "bg-surface-raised border-border-subtle text-secondary-text hover:border-border-default"
                  }`}
                >
                  {hours} hours
                </button>
              ))}
            </div>
          </div>

          {/* 3. Approval Threshold */}
          <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
                  Required Approvals Quorum
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-primary-text px-2 py-0.5 rounded bg-surface-raised border border-border-subtle">
                {requiredApprovals} of {activeProject.successors.length} successors
              </span>
            </div>
            <p className="text-[11px] text-secondary-muted leading-relaxed">
              M-of-N multi-signature threshold required from accepted successors to proceed to execution timelock.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[1, 2, 3].map((threshold) => (
                <button
                  key={threshold}
                  disabled={threshold > activeProject.successors.length}
                  onClick={() => setRequiredApprovals(threshold)}
                  className={`py-1.5 px-3 rounded text-xs font-medium border transition-colors ${
                    requiredApprovals === threshold
                      ? "bg-accent/20 border-accent text-primary-text font-bold"
                      : "bg-surface-raised border-border-subtle text-secondary-text hover:border-border-default"
                  }`}
                >
                  {threshold} of {activeProject.successors.length}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Timelock */}
          <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary-muted" />
                <h3 className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
                  Recovery Timelock Buffer
                </h3>
              </div>
              <span className="text-xs font-mono text-secondary-text">
                24 hours (Demo: 60s)
              </span>
            </div>
            <p className="text-[11px] text-secondary-muted leading-relaxed">
              Mandatory safety delay post-approval. During this buffer, the legitimate maintainer can
              immediately cancel any unauthorized succession attempt.
            </p>
          </div>
        </div>

        {/* Protected Assets Selection */}
        <div className="space-y-4">
          <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
                  Covered Recovery Assets
                </h3>
              </div>
              <span className="text-[11px] text-secondary-muted font-mono">
                {protectedAssets.length} selected
              </span>
            </div>

            <div className="space-y-2.5">
              {assetOptions.map((opt) => {
                const isChecked = protectedAssets.includes(opt.key);
                return (
                  <div
                    key={opt.key}
                    onClick={() => toggleAsset(opt.key)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      isChecked
                        ? "bg-surface-raised border-border-default"
                        : "bg-surface/50 border-border-subtle opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isChecked
                            ? "bg-accent border-accent text-white"
                            : "border-border-default bg-surface"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-primary-text">{opt.label}</div>
                        <div className="text-[11px] text-secondary-muted mt-0.5">{opt.desc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small explanation requirement #9 */}
            <div className="p-3.5 bg-surface-raised border border-border-subtle rounded-lg flex items-start gap-2.5 text-xs text-secondary-text">
              <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11.5px]">
                Recovery cannot begin until the configured inactivity condition is reached and the verification
                process is completed. All rules are bound to immutable smart contracts.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-sm"
              >
                Save Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
