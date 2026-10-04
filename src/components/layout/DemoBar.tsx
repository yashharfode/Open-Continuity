"use client";

import React from "react";
import { useContinuity } from "../../context/ContinuityContext";
import {
  Play,
  RotateCcw,
  UserCheck,
  FastForward,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export const DemoBar: React.FC = () => {
  const {
    demoMode,
    activeProject,
    simulateInactivity,
    startVerification,
    approveSuccessor,
    startTimelock,
    advanceTimelock,
    setIsExecuteModalOpen,
    resetDemo,
    setActiveTab,
  } = useContinuity();

  if (!demoMode) return null;

  const status = activeProject.status;
  const alice = activeProject.successors.find((s) => s.name.includes("Alice"));
  const rohan = activeProject.successors.find((s) => s.name.includes("Rohan"));
  const approvedCount = activeProject.successors.filter((s) => s.hasApproved).length;

  return (
    <div className="bg-[#111318] border-b border-border-default px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-accent/15 border border-accent/30 text-accent font-semibold text-[11px] font-mono uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          <span>Demo Controls</span>
        </div>
        <span className="text-secondary-muted text-[11px] hidden xl:inline">
          Ideathon 2-Minute Guided Walkthrough:
        </span>
      </div>

      {/* Action Buttons based on lifecycle */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Step 1: Simulate Inactivity */}
        {status === "ACTIVE" && (
          <button
            onClick={() => {
              simulateInactivity();
              setActiveTab("recovery-flow");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-status-red/10 border border-status-red/30 hover:bg-status-red/20 text-status-red font-medium transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>1. Simulate 30d Inactivity</span>
          </button>
        )}

        {/* Step 2: Start Verification */}
        {status === "INACTIVITY_DETECTED" && (
          <button
            onClick={() => {
              startVerification();
              setActiveTab("recovery-flow");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-status-amber/10 border border-status-amber/30 hover:bg-status-amber/20 text-status-amber font-medium transition-colors animate-subtle-pulse"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>2. Start Verification</span>
          </button>
        )}

        {/* Step 3: Successor Approvals */}
        {(status === "VERIFYING" || status === "THRESHOLD_APPROVAL") && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => alice && approveSuccessor(alice.id)}
              disabled={alice?.hasApproved}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-colors ${
                alice?.hasApproved
                  ? "bg-status-green/10 border-status-green/30 text-status-green cursor-default"
                  : "bg-surface hover:bg-surface-raised border-border-default text-primary-text"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{alice?.hasApproved ? "✓ Alice Approved" : "3. Approve (Alice)"}</span>
            </button>

            <button
              onClick={() => rohan && approveSuccessor(rohan.id)}
              disabled={rohan?.hasApproved}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-colors ${
                rohan?.hasApproved
                  ? "bg-status-green/10 border-status-green/30 text-status-green cursor-default"
                  : "bg-surface hover:bg-surface-raised border-border-default text-primary-text"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{rohan?.hasApproved ? "✓ Rohan Approved" : "4. Approve (Rohan)"}</span>
            </button>

            {approvedCount >= 2 && status !== "TIMELOCK_ACTIVE" && (
              <button
                onClick={() => {
                  startTimelock();
                  setActiveTab("recovery-flow");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-white font-medium hover:bg-accent-hover transition-colors shadow-sm animate-pulse"
              >
                <span>5. Start Timelock (2/3 met)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Step 4: Timelock in progress */}
        {status === "TIMELOCK_ACTIVE" && (
          <div className="flex items-center gap-2">
            <button
              onClick={advanceTimelock}
              disabled={activeProject.recoverySession?.timelockSecondsRemaining === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-status-amber/15 border border-status-amber/35 text-status-amber font-medium hover:bg-status-amber/25 transition-colors"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Fast-Forward to 00:00</span>
            </button>

            {activeProject.recoverySession?.timelockSecondsRemaining === 0 && (
              <button
                onClick={() => setIsExecuteModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-status-green text-black font-semibold hover:bg-green-400 transition-colors shadow-sm animate-pulse"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Execute Recovery</span>
              </button>
            )}
          </div>
        )}

        {/* Step 5: Recovered state */}
        {status === "RECOVERED" && (
          <div className="flex items-center gap-2 text-status-green font-medium">
            <CheckCircle className="w-4 h-4" />
            <span>Successor Multisig Authorized</span>
          </div>
        )}

        {/* Reset Demo button always available */}
        <button
          onClick={resetDemo}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-surface border border-border-subtle hover:border-border-default text-secondary-text hover:text-primary-text transition-colors"
          title="Reset project state to initial Active condition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Project</span>
        </button>
      </div>
    </div>
  );
};
