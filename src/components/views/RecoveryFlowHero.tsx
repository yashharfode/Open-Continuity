"use client";

import React from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { StatusBadge } from "../common/StatusBadge";
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  KeyRound,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Check,
  RefreshCw,
  FastForward,
  UserCheck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { ProjectStatus } from "../../types";

export const RecoveryFlowHero: React.FC = () => {
  const {
    activeProject,
    simulateInactivity,
    startVerification,
    approveSuccessor,
    revokeApproval,
    startTimelock,
    advanceTimelock,
    cancelRecovery,
    setIsExecuteModalOpen,
    resetDemo,
    checkInNow,
  } = useContinuity();

  const status = activeProject.status;
  const currentStepIndex = (() => {
    switch (status) {
      case "ACTIVE":
        return 0;
      case "INACTIVITY_DETECTED":
        return 1;
      case "VERIFYING":
        return 2;
      case "THRESHOLD_APPROVAL":
        return 3;
      case "TIMELOCK_ACTIVE":
        return 4;
      case "RECOVERED":
        return 5;
      default:
        return 0;
    }
  })();

  const steps = [
    {
      id: "active",
      label: "ACTIVE",
      subLabel: "Maintainer Operational",
      statusValue: "ACTIVE" as ProjectStatus,
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: "inactivity",
      label: "INACTIVITY",
      subLabel: "30-Day Silence Condition",
      statusValue: "INACTIVITY_DETECTED" as ProjectStatus,
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      id: "verifying",
      label: "VERIFYING",
      subLabel: "Autonomous Checks",
      statusValue: "VERIFYING" as ProjectStatus,
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "approval",
      label: "2/3 APPROVAL",
      subLabel: "Successor Multisig Quorum",
      statusValue: "THRESHOLD_APPROVAL" as ProjectStatus,
      icon: <KeyRound className="w-4 h-4" />,
    },
    {
      id: "timelock",
      label: "TIMELOCK",
      subLabel: "60s Safety Window",
      statusValue: "TIMELOCK_ACTIVE" as ProjectStatus,
      icon: <Lock className="w-4 h-4" />,
    },
    {
      id: "recovered",
      label: "RECOVERED",
      subLabel: "Authority Reassigned",
      statusValue: "RECOVERED" as ProjectStatus,
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  const approvedCount = activeProject.successors.filter((s) => s.hasApproved).length;
  const isThresholdMet = approvedCount >= activeProject.policy.requiredApprovals;
  const timelockSeconds = activeProject.recoverySession?.timelockSecondsRemaining ?? 60;
  const timelockFormatted = `00:${timelockSeconds < 10 ? "0" : ""}${timelockSeconds}`;

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold px-2 py-0.5 rounded bg-accent/15 border border-accent/30">
              Interactive Execution Pipeline
            </span>
            <span className="text-secondary-muted text-xs">&bull; Target: {activeProject.name}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-text mt-1.5">
            Recovery Flow Architecture
          </h1>
          <p className="text-xs text-secondary-text mt-1 max-w-3xl leading-relaxed">
            A deterministic, opt-in recovery state machine for critical open-source software.
            Watch how authority transitions safely without trusting any single individual or custodial third party.
          </p>
        </div>

        <button
          onClick={resetDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-border-subtle hover:border-border-default text-secondary-text hover:text-primary-text text-xs transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Flow Demo</span>
        </button>
      </div>

      {/* Connected Visual Step Pipeline (Requirement #32) */}
      <div className="bg-surface border border-border-subtle rounded-xl p-6 overflow-x-auto">
        <div className="min-w-[780px]">
          <div className="grid grid-cols-6 gap-2 relative">
            {/* Step Track Line */}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-border-subtle z-0" />

            {steps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isFuture = idx > currentStepIndex;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                  {/* Step Bubble */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      isCurrent
                        ? "bg-surface-raised border-accent text-accent shadow-lg shadow-accent/20 scale-110"
                        : isPast
                        ? "bg-surface-raised border-status-green text-status-green"
                        : "bg-surface border-border-subtle text-secondary-muted"
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : step.icon}
                  </div>

                  {/* Step Labels */}
                  <div className="mt-3">
                    <div
                      className={`text-xs font-mono font-bold tracking-wider ${
                        isCurrent
                          ? "text-primary-text"
                          : isPast
                          ? "text-status-green"
                          : "text-secondary-muted"
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="text-[10px] text-secondary-muted mt-0.5 font-sans">
                      {step.subLabel}
                    </div>
                  </div>

                  {/* Sub Indicator */}
                  <div className="mt-2">
                    {isCurrent && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-accent/20 text-accent font-semibold animate-subtle-pulse">
                        Current Stage
                      </span>
                    )}
                    {isPast && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-status-green/10 text-status-green">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Stage Interactive Panel */}
      <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-6">
        {/* Stage 1: ACTIVE */}
        {status === "ACTIVE" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-status-green font-semibold">
                  Stage 1 &bull; Normal Operation
                </span>
                <h3 className="text-base font-semibold text-primary-text mt-0.5">
                  Maintainer Heartbeat Active &bull; No Intervention Required
                </h3>
              </div>
              <StatusBadge status="ACTIVE" size="sm" />
            </div>

            <p className="text-xs text-secondary-text leading-relaxed max-w-2xl">
              Under normal circumstances, the primary maintainer ({activeProject.maintainer.name})
              submits periodic heartbeats or GitHub commits. As long as activity is recorded within 30 days,
              the recovery rules remain dormant.
            </p>

            <div className="p-4 rounded-lg bg-surface-raised border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-secondary-muted">Current Heartbeat Status:</div>
                <div className="text-sm font-semibold text-primary-text font-mono mt-0.5">
                  Last recorded: {activeProject.maintainer.lastCheckIn}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={checkInNow}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-surface border border-border-default hover:border-status-green text-xs font-semibold text-primary-text transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-status-green" />
                  <span>Check in now</span>
                </button>
                <button
                  onClick={simulateInactivity}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-status-red/10 border border-status-red/30 hover:bg-status-red/20 text-xs font-semibold text-status-red transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Simulate 30 Days Inactivity &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: INACTIVITY DETECTED */}
        {status === "INACTIVITY_DETECTED" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-status-red font-semibold">
                  Stage 2 &bull; Inactivity Trigger Reached
                </span>
                <h3 className="text-base font-semibold text-status-red mt-0.5 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Maintainer Has Not Checked In for 30 Consecutive Days
                </h3>
              </div>
              <StatusBadge status="INACTIVITY_DETECTED" size="sm" />
            </div>

            <p className="text-xs text-secondary-text leading-relaxed max-w-2xl">
              The continuous heartbeat watchdog oracle has confirmed zero activity signatures from maintainer
              wallet <span className="font-mono text-primary-text">0x4A8F...7D2F</span>. The contract will now
              permit starting the independent verification window.
            </p>

            <div className="p-4 rounded-lg bg-surface-raised border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs text-secondary-muted">Next Required Step:</div>
                <div className="text-sm font-semibold text-primary-text">
                  Initiate 48-hour autonomous verification & oracle cross-check
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={checkInNow}
                  className="px-3 py-2 rounded-md bg-surface border border-border-subtle text-secondary-text hover:text-primary-text text-xs"
                >
                  Maintainer Alive (Cancel)
                </button>
                <button
                  onClick={startVerification}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-status-amber text-black font-semibold text-xs hover:bg-amber-400 transition-colors shadow-sm animate-pulse"
                >
                  <span>Start Verification &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: VERIFYING */}
        {status === "VERIFYING" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-status-amber font-semibold">
                  Stage 3 &bull; Autonomous Verification
                </span>
                <h3 className="text-base font-semibold text-primary-text mt-0.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-status-amber" />
                  Verifying Multi-Condition Signals
                </h3>
              </div>
              <StatusBadge status="VERIFYING" size="sm" />
            </div>

            {/* Checklist of verification checks */}
            <div className="space-y-2">
              {activeProject.recoverySession?.verificationChecks.map((check) => (
                <div
                  key={check.id}
                  className="p-3 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-status-green/15 text-status-green flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary-text">{check.title}</div>
                      <div className="text-[11px] text-secondary-muted">{check.description}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-status-green">{check.verifiedAt}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-surface-raised/50 border border-border-subtle rounded-md text-[11px] text-secondary-muted">
              Signals verified. Transitioning to Successor Multisig Approval Quorum...
            </div>
          </div>
        )}

        {/* Stage 4: THRESHOLD_APPROVAL (Requirements #12, #13) */}
        {status === "THRESHOLD_APPROVAL" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                  Stage 4 &bull; Multisig Approval
                </span>
                <h3 className="text-base font-semibold text-primary-text mt-0.5">
                  Recovery Approval: {activeProject.policy.requiredApprovals} of {activeProject.policy.totalSuccessors} Approvals Required
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-secondary-muted">Quorum:</span>
                <span className="text-xs font-mono font-bold text-accent px-2 py-0.5 rounded bg-accent/15 border border-accent/30">
                  {approvedCount} / {activeProject.policy.requiredApprovals} Met
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-secondary-muted">
                <span>Successor Threshold Progress</span>
                <span className="font-mono">{approvedCount} of 3 signatures</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-raised overflow-hidden border border-border-subtle">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${(approvedCount / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Successor Approval Cards (Requirement #13) */}
            <div className="space-y-2.5">
              {activeProject.successors.map((succ) => {
                const isApproved = succ.hasApproved;
                return (
                  <div
                    key={succ.id}
                    className="p-3.5 rounded-lg bg-surface-raised border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-primary-text">{succ.name}</span>
                        <span className="text-[11px] text-secondary-muted font-mono">{succ.wallet}</span>
                      </div>
                      <div className="text-[11px] text-secondary-text mt-0.5">{succ.role}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isApproved ? (
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-status-green font-semibold">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Approved</span>
                          </span>
                          <button
                            onClick={() => revokeApproval(succ.id)}
                            className="text-[10px] text-secondary-muted hover:text-secondary-text underline ml-1"
                          >
                            Revoke
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => approveSuccessor(succ.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-border-default hover:border-accent text-xs font-semibold text-primary-text transition-colors"
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

            {/* Threshold Reached Banner & Start Timelock Trigger */}
            {isThresholdMet ? (
              <div className="p-4 rounded-lg bg-status-green-subtle border border-status-green-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
                <div>
                  <div className="text-xs font-bold text-status-green flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Threshold reached ({approvedCount}/3 approvals).</span>
                  </div>
                  <div className="text-xs text-secondary-text mt-0.5">
                    Recovery can now proceed to the safety timelock period.
                  </div>
                </div>
                <button
                  onClick={startTimelock}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-white font-semibold text-xs hover:bg-accent-hover transition-colors shadow-sm animate-pulse flex-shrink-0"
                >
                  <span>Start Timelock &rarr;</span>
                </button>
              </div>
            ) : (
              <div className="p-3 bg-surface-raised/40 border border-border-subtle rounded-md text-xs text-secondary-muted">
                Waiting for at least {activeProject.policy.requiredApprovals - approvedCount} more
                successor signature(s) before timelock can be initiated.
              </div>
            )}
          </div>
        )}

        {/* Stage 5: TIMELOCK (Requirement #14) */}
        {status === "TIMELOCK_ACTIVE" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-status-amber font-semibold">
                  Stage 5 &bull; Timelock Active
                </span>
                <h3 className="text-base font-semibold text-primary-text mt-0.5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-status-amber" />
                  Recovery Approved &bull; Mandatory Buffer Active
                </h3>
              </div>
              <StatusBadge status="TIMELOCK_ACTIVE" size="sm" />
            </div>

            <p className="text-xs text-secondary-text leading-relaxed max-w-2xl">
              Recovery has received sufficient multisig threshold approvals. Final execution will become
              available after the timelock period expires.
            </p>

            {/* Timelock Countdown Display (Requirement #14) */}
            <div className="p-6 rounded-xl bg-surface-raised border border-border-default flex flex-col items-center justify-center text-center space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-secondary-muted">
                Execution Buffer Remaining (Demo: 60s)
              </div>
              <div className="text-5xl font-mono font-bold text-primary-text tracking-wider">
                {timelockFormatted}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md h-2 rounded-full bg-surface overflow-hidden border border-border-subtle">
                <div
                  className="h-full bg-status-amber transition-all duration-1000"
                  style={{ width: `${((60 - timelockSeconds) / 60) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                {timelockSeconds > 0 ? (
                  <button
                    onClick={advanceTimelock}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-border-subtle hover:border-status-amber/40 text-xs text-status-amber font-medium transition-colors"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Advance to 00:00 (Demo Shortcut)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExecuteModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-status-green text-black font-semibold text-xs hover:bg-green-400 transition-colors shadow-lg shadow-status-green/20 animate-pulse"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Recovery Ready &bull; Execute Recovery &rarr;</span>
                  </button>
                )}
              </div>
            </div>

            {/* Maintainer Cancellation Safety Notice (Requirement #14) */}
            <div className="p-4 rounded-lg bg-status-red-subtle border border-status-red-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-status-red flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Maintainer Safety Window</span>
                </div>
                <div className="text-xs text-secondary-text mt-0.5">
                  Maintainer can still cancel recovery during this period if this was a false alarm.
                </div>
              </div>
              <button
                onClick={cancelRecovery}
                className="px-4 py-2 rounded-md bg-surface border border-status-red/40 hover:bg-status-red/20 text-status-red font-semibold text-xs transition-colors flex-shrink-0"
              >
                Cancel Recovery
              </button>
            </div>
          </div>
        )}

        {/* Stage 6: RECOVERED (Requirement #16) */}
        {status === "RECOVERED" && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-status-green font-semibold">
                  Stage 6 &bull; Recovery Executed
                </span>
                <h3 className="text-base font-semibold text-status-green mt-0.5 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  ✓ RECOVERY EXECUTED
                </h3>
              </div>
              <StatusBadge status="RECOVERED" size="sm" />
            </div>

            <p className="text-xs text-secondary-text leading-relaxed max-w-2xl">
              Project control has been safely transferred to the configured successor multisig (
              <span className="font-mono text-accent">0x7c1...9e3a</span>). The project retains complete
              operational continuity without central repository or signing single points of failure.
            </p>

            {/* List of transferred authorities (Requirement #16) */}
            <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-secondary-muted font-semibold">
                Transferred Operational Authorities:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProject.assets.map((asset) => (
                  <div
                    key={asset.key}
                    className="p-3 rounded-lg bg-surface border border-status-green-border flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-primary-text">{asset.key}</div>
                      <div className="text-[11px] text-secondary-muted font-mono">{asset.integration}</div>
                    </div>
                    <span className="text-xs font-semibold text-status-green px-2 py-0.5 rounded bg-status-green/10 border border-status-green/30">
                      Transferred
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-surface border border-border-subtle rounded-md text-[11px] text-secondary-muted flex items-center justify-between">
              <span>Status: Authorization Ready &bull; Integration Action Simulated</span>
              <button
                onClick={resetDemo}
                className="text-xs text-accent hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo to Start</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Bottom: Protected Assets Row (Requirement #32) */}
      <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-primary-text font-semibold">
              Protected Assets Under Continuity Policy
            </h3>
          </div>
          <span className="text-[11px] text-secondary-muted font-mono">
            Cryptographic Authority Bindings
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {activeProject.assets.map((asset) => (
            <div
              key={asset.key}
              className="p-3.5 rounded-lg bg-surface-raised border border-border-subtle flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold text-primary-text">{asset.key}</span>
                  <StatusBadge status={asset.status} size="sm" />
                </div>
                <div className="text-[11px] text-secondary-text leading-tight">{asset.description}</div>
              </div>
              <div className="pt-2 border-t border-border-subtle/80 text-[10px] font-mono text-secondary-muted truncate">
                {asset.integration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
