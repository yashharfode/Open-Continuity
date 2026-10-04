"use client";

import React from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { StatusBadge } from "../common/StatusBadge";
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  UserCheck,
  FastForward,
  RotateCcw,
  ExternalLink,
  Shield,
  KeyRound,
  GitBranch,
  Lock,
  Boxes,
} from "lucide-react";

export const OverviewDashboard: React.FC = () => {
  const {
    activeProject,
    checkInNow,
    simulateInactivity,
    startVerification,
    approveSuccessor,
    revokeApproval,
    startTimelock,
    advanceTimelock,
    cancelRecovery,
    setIsExecuteModalOpen,
    resetDemo,
    auditEvents,
    setSelectedTx,
    setActiveTab,
  } = useContinuity();

  const status = activeProject.status;
  const approvedCount = activeProject.successors.filter((s) => s.hasApproved).length;
  const requiredCount = activeProject.policy.requiredApprovals;
  const isThresholdMet = approvedCount >= requiredCount;
  const timelockSeconds = activeProject.recoverySession?.timelockSecondsRemaining ?? 60;
  const timelockDisplay = `00:${timelockSeconds < 10 ? "0" : ""}${timelockSeconds}`;

  // Stepper definition
  const steps = [
    { id: "active", label: "1. Healthy", isCurrent: status === "ACTIVE", isPassed: status !== "ACTIVE" },
    {
      id: "inactivity",
      label: "2. Inactivity (30d)",
      isCurrent: status === "INACTIVITY_DETECTED",
      isPassed: ["VERIFYING", "THRESHOLD_APPROVAL", "TIMELOCK_ACTIVE", "RECOVERED"].includes(status),
    },
    {
      id: "approval",
      label: "3. Approvals (2/3)",
      isCurrent: status === "VERIFYING" || status === "THRESHOLD_APPROVAL",
      isPassed: ["TIMELOCK_ACTIVE", "RECOVERED"].includes(status),
    },
    {
      id: "timelock",
      label: "4. Timelock",
      isCurrent: status === "TIMELOCK_ACTIVE",
      isPassed: status === "RECOVERED",
    },
    {
      id: "recovered",
      label: "5. Transferred",
      isCurrent: status === "RECOVERED",
      isPassed: false,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Welcome & Demo Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-border-subtle rounded-xl p-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider font-mono">
              Open Continuity
            </span>
            <span className="text-secondary-muted text-xs">&bull;</span>
            <span className="text-xs text-secondary-text font-medium">{activeProject.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary-text tracking-tight">
            Project Continuity Dashboard
          </h1>
          <p className="text-xs text-secondary-text mt-0.5">
            Automated, shared-authorization fail-safe for critical open-source repositories.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={resetDemo}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-raised border border-border-default hover:border-border-active text-xs font-medium text-secondary-text hover:text-primary-text transition-colors"
            title="Reset demo back to Active state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* 5-Step Visual Stepper Bar */}
      <div className="bg-surface border border-border-subtle rounded-xl p-4 sm:p-5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-secondary-muted font-semibold mb-3 flex items-center justify-between">
          <span>Demo Lifecycle Pipeline</span>
          <span className="text-accent text-[11px] font-sans font-medium">Click buttons below to progress</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {steps.map((st) => (
            <div
              key={st.id}
              className={`p-2.5 rounded-lg border text-center transition-all ${
                st.isCurrent
                  ? "bg-accent/15 border-accent text-primary-text font-semibold shadow-sm"
                  : st.isPassed
                  ? "bg-surface-raised border-status-green/30 text-status-green font-medium"
                  : "bg-surface-raised/40 border-border-subtle text-secondary-muted"
              }`}
            >
              <div className="text-xs flex items-center justify-center gap-1.5">
                {st.isPassed && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                <span className="truncate">{st.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Action Console Card (Core Interactive Demo Hub) */}
      <div
        className={`rounded-xl border p-6 transition-all duration-200 ${
          status === "ACTIVE"
            ? "bg-surface border-border-default"
            : status === "INACTIVITY_DETECTED"
            ? "bg-status-red/10 border-status-red/30"
            : status === "TIMELOCK_ACTIVE"
            ? "bg-status-amber/10 border-status-amber/30"
            : status === "RECOVERED"
            ? "bg-status-green/10 border-status-green/30"
            : "bg-accent/10 border-accent/30"
        }`}
      >
        {/* Stage 1: ACTIVE */}
        {status === "ACTIVE" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-status-green/15 text-status-green flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-primary-text">Status: Healthy & Active</h2>
                    <StatusBadge status="ACTIVE" size="sm" />
                  </div>
                  <p className="text-xs text-secondary-text mt-0.5">
                    Maintainer <span className="text-primary-text font-medium">{activeProject.maintainer.name}</span> checked
                    in {activeProject.maintainer.lastCheckIn}. All 4 protected assets are secure.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={checkInNow}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-raised border border-border-default hover:border-status-green text-xs font-semibold text-primary-text transition-colors shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 text-status-green" />
                <span>Check in now (Proof of Life)</span>
              </button>

              <button
                onClick={simulateInactivity}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-status-red/20 border border-status-red/40 hover:bg-status-red/30 text-xs font-semibold text-status-red transition-colors shadow-sm"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate 30-Day Silence (Start Demo) &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* Stage 2: INACTIVITY DETECTED */}
        {status === "INACTIVITY_DETECTED" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-status-red/20 text-status-red flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-status-red">Inactivity Detected (30 Days Silent)</h2>
                  <StatusBadge status="INACTIVITY_DETECTED" size="sm" />
                </div>
                <p className="text-xs text-secondary-text mt-0.5">
                  No heartbeat or commits recorded for 30 days. The recovery verification process can now begin.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={startVerification}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-status-amber text-black text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm animate-pulse"
              >
                <span>Start Verification & Collect Approvals &rarr;</span>
              </button>

              <button
                onClick={checkInNow}
                className="px-4 py-2.5 rounded-lg bg-surface border border-border-subtle text-xs text-secondary-text hover:text-primary-text transition-colors"
              >
                Maintainer Checked In (Cancel Alert)
              </button>
            </div>
          </div>
        )}

        {/* Stage 3: APPROVALS (VERIFYING / THRESHOLD_APPROVAL) */}
        {(status === "VERIFYING" || status === "THRESHOLD_APPROVAL") && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-primary-text">
                    Multisig Quorum: {approvedCount} of {requiredCount} Signatures
                  </h2>
                  <StatusBadge status="THRESHOLD_APPROVAL" size="sm" />
                </div>
                <p className="text-xs text-secondary-text mt-0.5">
                  Click the approve buttons below to simulate authorized successors signing the recovery action.
                </p>
              </div>

              {isThresholdMet && (
                <button
                  onClick={startTimelock}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-xs font-bold hover:bg-accent-hover transition-colors shadow-md animate-pulse self-start sm:self-auto"
                >
                  <span>Start 60s Timelock Buffer &rarr;</span>
                </button>
              )}
            </div>

            {/* 3 Simple Successor Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {activeProject.successors.map((succ) => {
                return (
                  <div
                    key={succ.id}
                    className={`p-3.5 rounded-lg border flex flex-col justify-between space-y-3 ${
                      succ.hasApproved
                        ? "bg-status-green/10 border-status-green/40"
                        : "bg-surface-raised border-border-default"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-primary-text">{succ.name}</div>
                      <div className="text-[11px] text-secondary-muted mt-0.5">{succ.role}</div>
                      <div className="text-[10px] font-mono text-secondary-muted mt-1">{succ.wallet.split(" ")[0]}</div>
                    </div>

                    <div>
                      {succ.hasApproved ? (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-xs text-status-green font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Signed ✓</span>
                          </span>
                          <button
                            onClick={() => revokeApproval(succ.id)}
                            className="text-[10px] text-secondary-muted hover:underline"
                          >
                            Undo
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => approveSuccessor(succ.id)}
                          className="w-full py-1.5 px-2.5 rounded bg-surface border border-border-default hover:border-accent text-xs font-semibold text-primary-text transition-colors flex items-center justify-center gap-1.5"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-accent" />
                          <span>Approve as {succ.name.split(" ")[0]}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stage 4: TIMELOCK */}
        {status === "TIMELOCK_ACTIVE" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-primary-text">Timelock Active (Safety Buffer)</h2>
                  <StatusBadge status="TIMELOCK_ACTIVE" size="sm" />
                </div>
                <p className="text-xs text-secondary-text mt-0.5">
                  Mandatory safety delay. The maintainer can cancel anytime if this is a mistake.
                </p>
              </div>

              <div className="text-3xl font-mono font-bold text-status-amber">
                {timelockDisplay}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-surface-raised overflow-hidden border border-border-subtle">
              <div
                className="h-full bg-status-amber transition-all duration-1000"
                style={{ width: `${((60 - timelockSeconds) / 60) * 100}%` }}
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {timelockSeconds > 0 ? (
                  <button
                    onClick={advanceTimelock}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface border border-border-default hover:border-status-amber text-xs font-semibold text-status-amber transition-colors"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Fast-Forward to 00:00 (Demo)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExecuteModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-status-green text-black text-xs font-bold hover:bg-green-400 transition-colors shadow-md animate-pulse"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Timelock Complete &bull; Execute Recovery &rarr;</span>
                  </button>
                )}
              </div>

              <button
                onClick={cancelRecovery}
                className="px-3.5 py-2 rounded-lg bg-surface border border-status-red/30 hover:bg-status-red/15 text-xs font-semibold text-status-red transition-colors"
              >
                Cancel Recovery (Maintainer is Alive)
              </button>
            </div>
          </div>
        )}

        {/* Stage 5: RECOVERED */}
        {status === "RECOVERED" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-status-green/20 text-status-green flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-status-green">✓ Recovery Executed Successfully</h2>
                  <StatusBadge status="RECOVERED" size="sm" />
                </div>
                <p className="text-xs text-secondary-text mt-0.5">
                  Authority has been safely transferred to Successor Multisig (<span className="font-mono text-accent">0x7c1...9e3a</span>).
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={resetDemo}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-raised border border-border-default hover:border-border-active text-xs font-semibold text-primary-text transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo to Start</span>
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className="px-4 py-2.5 rounded-lg bg-surface border border-border-subtle text-xs text-secondary-text hover:text-primary-text transition-colors"
              >
                View On-Chain Audit Proof &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4 Protected Assets Grid (Clear & Visual) */}
      <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-primary-text">Protected Assets</h3>
            <p className="text-xs text-secondary-text mt-0.5">
              Authorities configured for automated continuity handover.
            </p>
          </div>
          <span className="text-[11px] font-mono text-secondary-muted">4 Assets Bound</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {activeProject.assets.map((asset) => (
            <div
              key={asset.key}
              className={`p-3.5 rounded-lg border flex flex-col justify-between space-y-2 transition-colors ${
                asset.status === "Transferred"
                  ? "bg-status-green/10 border-status-green/40"
                  : "bg-surface-raised border-border-subtle"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-primary-text">{asset.key}</span>
                  <StatusBadge status={asset.status} size="sm" />
                </div>
                <div className="text-[11px] text-secondary-text line-clamp-2">
                  {asset.description}
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle/60 text-[10px] font-mono text-secondary-muted truncate">
                {asset.integration}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Summary Cards (Simple & Focused) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <div className="text-[11px] font-mono uppercase text-secondary-muted font-semibold">
            Inactivity Trigger
          </div>
          <div className="text-xl font-bold text-primary-text mt-1">30 Days</div>
          <div className="text-xs text-secondary-text mt-0.5">
            Automatic alert if maintainer doesn&apos;t check in
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <div className="text-[11px] font-mono uppercase text-secondary-muted font-semibold">
            Successor Threshold
          </div>
          <div className="text-xl font-bold text-primary-text mt-1">2 of 3 Signatures</div>
          <div className="text-xs text-secondary-text mt-0.5">
            Alice, Rohan, and Divyansh
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-xl p-4">
          <div className="text-[11px] font-mono uppercase text-secondary-muted font-semibold">
            Safety Timelock
          </div>
          <div className="text-xl font-bold text-primary-text mt-1">60 Seconds</div>
          <div className="text-xs text-secondary-text mt-0.5">
            Maintainer cancellation window
          </div>
        </div>
      </div>

      {/* Recent On-Chain Audit Proofs */}
      <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-primary-text">Recent On-Chain Activity</h3>
          <button
            onClick={() => setActiveTab("activity")}
            className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
          >
            <span>View Full Ledger</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="divide-y divide-border-subtle">
          {auditEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedTx(event)}
              className="py-2.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-raised px-2 rounded transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-status-green flex-shrink-0" />
                <div className="truncate">
                  <span className="font-semibold text-primary-text">{event.title}</span>
                  <span className="text-secondary-muted text-[11px] ml-2 font-mono hidden sm:inline">
                    {event.txHash.substring(0, 14)}...
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 text-secondary-muted font-mono text-[11px]">
                <span>{event.relativeTime}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
