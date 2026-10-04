"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Project,
  ProjectStatus,
  Successor,
  AuditEvent,
  ActiveTab,
  ProtectedAsset,
} from "../types";

interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
}

interface ContinuityContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  projects: Project[];
  activeProject: Project;
  setActiveProjectId: (id: string) => void;
  auditEvents: AuditEvent[];
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  currentRole: string;
  setCurrentRole: (role: string) => void;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage["type"], title: string, message: string) => void;
  removeToast: (id: string) => void;
  
  // Actions
  checkInNow: () => void;
  simulateInactivity: () => void;
  startVerification: () => void;
  approveSuccessor: (successorId: string) => void;
  revokeApproval: (successorId: string) => void;
  startTimelock: () => void;
  advanceTimelock: () => void;
  cancelRecovery: () => void;
  executeRecovery: () => void;
  resetDemo: () => void;
  addSuccessor: (name: string, role: string, wallet: string) => void;
  removeSuccessor: (id: string) => void;
  createProject: (name: string, repository: string, description: string, assets: string[]) => void;
  updatePolicy: (inactivityDays: number, verificationHours: number, requiredApprovals: number) => void;
  
  // Modal states
  isAddSuccessorOpen: boolean;
  setIsAddSuccessorOpen: (open: boolean) => void;
  isCreateProjectOpen: boolean;
  setIsCreateProjectOpen: (open: boolean) => void;
  isExecuteModalOpen: boolean;
  setIsExecuteModalOpen: (open: boolean) => void;
  selectedTx: AuditEvent | null;
  setSelectedTx: (tx: AuditEvent | null) => void;
}

const INITIAL_SUCCESSORS: Successor[] = [
  {
    id: "succ-1",
    name: "Alice Sharma",
    role: "Technical Maintainer",
    wallet: "alice.eth (0x8b32...E109)",
    status: "Accepted",
    addedDate: "12 Aug 2026",
    hasApproved: false,
  },
  {
    id: "succ-2",
    name: "Rohan Mehta",
    role: "Security Maintainer",
    wallet: "rohan.eth (0x1F94...40BC)",
    status: "Accepted",
    addedDate: "14 Aug 2026",
    hasApproved: false,
  },
  {
    id: "succ-3",
    name: "Divyansh Kumar",
    role: "Community Representative",
    wallet: "divyansh.eth (0x93C0...271A)",
    status: "Accepted",
    addedDate: "20 Aug 2026",
    hasApproved: false,
  },
];

const INITIAL_ASSETS: ProtectedAsset[] = [
  {
    key: "Repository Access",
    label: "GitHub Repository Access",
    description: "Organization ownership & administration permissions for core repos",
    integration: "github.com/yashharfode/libsecure",
    status: "Connected",
  },
  {
    key: "Release Signing",
    label: "Cryptographic Release Signing",
    description: "Sigstore keyless OIDC signer & Cosign build attestation keys",
    integration: "Sigstore OIDC Authority (Fulcio/Rekor)",
    status: "Protected",
  },
  {
    key: "Package Registry",
    label: "Package Publishing Tokens",
    description: "Scoped token administration on npmjs.org & crates.io packages",
    integration: "npm: @libsecure/core (v3.2)",
    status: "Connected",
  },
  {
    key: "Infrastructure",
    label: "Production Infrastructure",
    description: "AWS KMS master encryption keys & Cloudflare DNS zones",
    integration: "AWS KMS & Cloudflare DNS",
    status: "Protected",
  },
];

const INITIAL_PROJECT: Project = {
  id: "libsecure",
  name: "libsecure",
  repository: "github.com/yashharfode/libsecure",
  description: "Critical cryptographic utility library used by 18,000+ production services",
  maintainer: {
    name: "Yash Harfode",
    handle: "@yashharfode",
    wallet: "0x4A8F...7D2F",
    lastCheckIn: "2 days ago",
    lastCheckInDate: new Date(Date.now() - 2 * 24 * 3600 * 1000),
  },
  status: "ACTIVE",
  policy: {
    inactivityPeriodDays: 30,
    verificationPeriodHours: 48,
    requiredApprovals: 2,
    totalSuccessors: 3,
    timelockPeriodMinutes: 1, // 60s demo mode
    timelockPeriodDisplay: "24 hours (Demo Mode: 60s)",
    protectedAssets: ["Repository Access", "Release Signing", "Package Registry", "Infrastructure"],
  },
  successors: INITIAL_SUCCESSORS,
  assets: INITIAL_ASSETS,
  recoverySession: {
    reason: "Maintainer inactive for 30+ days",
    timelockSecondsRemaining: 60,
    timelockInitialSeconds: 60,
    isTimelockRunning: false,
    canMaintainerCancel: true,
    verificationChecks: [
      {
        id: "check-1",
        title: "Independent verification",
        description: "Verified zero GitHub commits, signed releases, or telemetry in 30 days",
        verified: true,
        verifiedAt: "Today, 10:00 AM",
        type: "oracle",
      },
      {
        id: "check-2",
        title: "Inactivity condition",
        description: "Zero on-chain heartbeat transactions received within 30-day window",
        verified: true,
        verifiedAt: "Today, 09:58 AM",
        type: "heartbeat",
      },
      {
        id: "check-3",
        title: "Policy requirement",
        description: "On-chain contract confirms threshold parameter set to 2-of-3 successors",
        verified: true,
        verifiedAt: "Today, 10:01 AM",
        type: "multisig",
      },
    ],
  },
};

const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: "tx-4",
    txHash: "0x3f12b7a9e5210c49887766554433221100aabbccddee3344",
    title: "Maintainer Heartbeat Check-in",
    description: "Yash Harfode submitted cryptographic proof of active maintenance.",
    timestamp: "2026-10-02 11:20:14 UTC",
    relativeTime: "2 days ago",
    category: "checkin",
    actor: "0x4A8F...7D2F",
    status: "confirmed",
    blockNumber: 19482103,
  },
  {
    id: "tx-3",
    txHash: "0x93da7710cba48392ef01a88b43290918ca128456",
    title: "Successor Credentials Accepted",
    description: "Alice Sharma, Rohan Mehta, and Divyansh Kumar accepted multi-sig authority delegation.",
    timestamp: "2026-08-20 14:15:00 UTC",
    relativeTime: "45 days ago",
    category: "approval",
    actor: "0x8b32...E109",
    status: "confirmed",
    blockNumber: 19302194,
  },
  {
    id: "tx-2",
    txHash: "0x82bc44a19e2308fa45129038ba541098ec142109",
    title: "Recovery Policy Configured",
    description: "Threshold set to 2/3 successors. Inactivity configured to 30 days. Timelock set to 24 hours.",
    timestamp: "2026-08-11 09:30:10 UTC",
    relativeTime: "54 days ago",
    category: "policy",
    actor: "0x4A8F...7D2F",
    status: "confirmed",
    blockNumber: 19280041,
  },
  {
    id: "tx-1",
    txHash: "0x1a8f9038bc421940e8129048bac76120489e1349",
    title: "Project Registered on Continuity Contract",
    description: "Repository github.com/yashharfode/libsecure bound to Open Continuity contract 0x0C77...91A0.",
    timestamp: "2026-08-10 16:04:22 UTC",
    relativeTime: "55 days ago",
    category: "state_change",
    actor: "0x4A8F...7D2F",
    status: "confirmed",
    blockNumber: 19275812,
  },
];

const ContinuityContext = createContext<ContinuityContextType | undefined>(undefined);

export const ContinuityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [projects, setProjects] = useState<Project[]>([INITIAL_PROJECT]);
  const [activeProjectId, setActiveProjectId] = useState<string>("libsecure");
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(INITIAL_AUDIT_EVENTS);
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<string>("Maintainer (Yash Harfode)");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isAddSuccessorOpen, setIsAddSuccessorOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isExecuteModalOpen, setIsExecuteModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<AuditEvent | null>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const addToast = (type: ToastMessage["type"], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateActiveProject = (updater: (prev: Project) => Project) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === activeProject.id) {
          return updater(p);
        }
        return p;
      })
    );
  };

  const createAuditEvent = (
    title: string,
    description: string,
    category: AuditEvent["category"],
    actor = "0x4A8F...7D2F"
  ) => {
    const randomHex = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    const newTx: AuditEvent = {
      id: `tx-${Date.now()}`,
      txHash: `0x${randomHex}`,
      title,
      description,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
      relativeTime: "Just now",
      category,
      actor,
      status: "confirmed",
      blockNumber: 19482104 + auditEvents.length,
    };
    setAuditEvents((prev) => [newTx, ...prev]);
  };

  // 1. Maintainer Check-in
  const checkInNow = () => {
    updateActiveProject((prev) => ({
      ...prev,
      status: "ACTIVE",
      maintainer: {
        ...prev.maintainer,
        lastCheckIn: "Just now",
        lastCheckInDate: new Date(),
      },
      recoverySession: {
        ...prev.recoverySession!,
        isTimelockRunning: false,
        timelockSecondsRemaining: 60,
      },
      successors: prev.successors.map((s) => ({ ...s, hasApproved: false })),
    }));
    createAuditEvent(
      "Maintainer Heartbeat Check-in Recorded",
      "Yash Harfode submitted cryptographic proof of liveness. Continuity timer reset to 30 days.",
      "checkin",
      "0x4A8F...7D2F"
    );
    addToast("success", "Check-in recorded successfully", "Project continuity is confirmed active on-chain.");
  };

  // 2. Inactivity Simulation
  const simulateInactivity = () => {
    updateActiveProject((prev) => ({
      ...prev,
      status: "INACTIVITY_DETECTED",
      maintainer: {
        ...prev.maintainer,
        lastCheckIn: "30 days ago",
        lastCheckInDate: new Date(Date.now() - 30 * 24 * 3600 * 1000),
      },
    }));
    createAuditEvent(
      "Inactivity Condition Detected",
      "Maintainer Yash Harfode has not submitted heartbeat for 30 consecutive days. Inactivity alert emitted.",
      "state_change",
      "Oracle Watcher"
    );
    addToast(
      "warning",
      "Inactivity condition reached",
      "Maintainer inactive for 30 days. Recovery verification can now be initiated."
    );
  };

  // 3. Start Verification
  const startVerification = () => {
    updateActiveProject((prev) => ({
      ...prev,
      status: "VERIFYING",
    }));
    createAuditEvent(
      "Verification Process Initiated",
      "Independent telemetry verification check passed. Oracle ping dispatched to maintainer.",
      "state_change",
      "0x2D90...5F8B"
    );
    addToast("info", "Verification initiated", "Autonomous condition validation completed. Awaiting multisig approvals.");
    // After brief verification step, move to THRESHOLD_APPROVAL
    setTimeout(() => {
      updateActiveProject((prev) => {
        if (prev.status === "VERIFYING") {
          return { ...prev, status: "THRESHOLD_APPROVAL" };
        }
        return prev;
      });
    }, 1200);
  };

  // 4. Approve Successor
  const approveSuccessor = (successorId: string) => {
    updateActiveProject((prev) => {
      const updatedSuccessors = prev.successors.map((s) => {
        if (s.id === successorId) {
          return { ...s, hasApproved: true, approvalTimestamp: "Just now" };
        }
        return s;
      });

      const approvedCount = updatedSuccessors.filter((s) => s.hasApproved).length;
      const targetSucc = prev.successors.find((s) => s.id === successorId);

      createAuditEvent(
        `Multisig Approval by ${targetSucc?.name || "Successor"}`,
        `Cryptographic approval signature confirmed (${approvedCount} of ${prev.policy.requiredApprovals} required).`,
        "approval",
        targetSucc?.wallet || "0x8b32...E109"
      );

      return {
        ...prev,
        status: "THRESHOLD_APPROVAL",
        successors: updatedSuccessors,
      };
    });

    addToast("success", "Successor Approval Confirmed", "Cryptographic signature registered on recovery contract.");
  };

  // Revoke approval
  const revokeApproval = (successorId: string) => {
    updateActiveProject((prev) => ({
      ...prev,
      successors: prev.successors.map((s) =>
        s.id === successorId ? { ...s, hasApproved: false } : s
      ),
    }));
    addToast("info", "Approval Revoked", "Signature withdrawn from recovery queue.");
  };

  // 5. Start Timelock
  const startTimelock = () => {
    updateActiveProject((prev) => ({
      ...prev,
      status: "TIMELOCK_ACTIVE",
      recoverySession: {
        ...prev.recoverySession!,
        isTimelockRunning: true,
        timelockSecondsRemaining: 60,
      },
    }));
    createAuditEvent(
      "Recovery Timelock Started",
      "Threshold of 2/3 approvals verified on-chain. 60-second execution timelock initialized.",
      "state_change",
      "0x9620...1C4E"
    );
    addToast("warning", "Timelock Started (60s)", "Safety buffer active. Maintainer may cancel at any moment.");
  };

  // Timelock countdown hook
  useEffect(() => {
    if (activeProject.status !== "TIMELOCK_ACTIVE" || !activeProject.recoverySession?.isTimelockRunning) {
      return;
    }

    const interval = setInterval(() => {
      updateActiveProject((prev) => {
        if (!prev.recoverySession || !prev.recoverySession.isTimelockRunning) return prev;
        const currentRemaining = prev.recoverySession.timelockSecondsRemaining;
        if (currentRemaining <= 1) {
          clearInterval(interval);
          return {
            ...prev,
            recoverySession: {
              ...prev.recoverySession,
              timelockSecondsRemaining: 0,
              isTimelockRunning: false,
            },
          };
        }
        return {
          ...prev,
          recoverySession: {
            ...prev.recoverySession,
            timelockSecondsRemaining: currentRemaining - 1,
          },
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeProject.status, activeProject.recoverySession?.isTimelockRunning]);

  // Demo: Advance timelock to 0
  const advanceTimelock = () => {
    updateActiveProject((prev) => ({
      ...prev,
      recoverySession: {
        ...prev.recoverySession!,
        timelockSecondsRemaining: 0,
        isTimelockRunning: false,
      },
    }));
    addToast("info", "Timelock Advanced", "Timelock countdown completed. Recovery is ready for execution.");
  };

  // Cancel Recovery (Safety feature)
  const cancelRecovery = () => {
    updateActiveProject((prev) => ({
      ...prev,
      status: "ACTIVE",
      maintainer: {
        ...prev.maintainer,
        lastCheckIn: "Just now (Cancellation Proof)",
        lastCheckInDate: new Date(),
      },
      successors: prev.successors.map((s) => ({ ...s, hasApproved: false })),
      recoverySession: {
        ...prev.recoverySession!,
        isTimelockRunning: false,
        timelockSecondsRemaining: 60,
      },
    }));
    createAuditEvent(
      "Recovery Cancelled by Maintainer",
      "Maintainer Yash Harfode proved liveness and revoked pending multisig recovery authorization.",
      "state_change",
      "0x4A8F...7D2F"
    );
    addToast("success", "Recovery Cancelled", "Project restored to ACTIVE. All successor approvals reset.");
  };

  // 6. Execute Recovery
  const executeRecovery = () => {
    updateActiveProject((prev) => ({
      ...prev,
      status: "RECOVERED",
      assets: prev.assets.map((asset) => ({
        ...asset,
        status: "Transferred",
        transferredTo: "Successor Multisig (0x7c1...9e3a)",
      })),
      recoverySession: {
        ...prev.recoverySession!,
        isTimelockRunning: false,
        timelockSecondsRemaining: 0,
      },
    }));
    createAuditEvent(
      "Recovery Executed: Authority Transferred",
      "All configured protected assets (Repo, Release Signing, Registry, Infra) transferred to successor multisig.",
      "execution",
      "0x4A8F...7D2F"
    );
    setIsExecuteModalOpen(false);
    addToast("success", "Recovery Executed", "Project control transferred to configured successor multisig.");
  };

  // Reset Demo to initial state
  const resetDemo = () => {
    setProjects([INITIAL_PROJECT]);
    setActiveProjectId("libsecure");
    setAuditEvents(INITIAL_AUDIT_EVENTS);
    addToast("info", "Demo State Reset", "Project 'libsecure' restored to original ACTIVE state.");
  };

  // Add Successor
  const addSuccessor = (name: string, role: string, wallet: string) => {
    const newSuccessor: Successor = {
      id: `succ-${Date.now()}`,
      name,
      role,
      wallet,
      status: "Accepted",
      addedDate: "Today",
      hasApproved: false,
    };
    updateActiveProject((prev) => ({
      ...prev,
      successors: [...prev.successors, newSuccessor],
      policy: {
        ...prev.policy,
        totalSuccessors: prev.successors.length + 1,
      },
    }));
    createAuditEvent(
      `New Successor Added: ${name}`,
      `Authorized successor wallet ${wallet} registered with role ${role}.`,
      "policy"
    );
    setIsAddSuccessorOpen(false);
    addToast("success", "Successor Added", `${name} added to authorized recovery multisig.`);
  };

  // Remove Successor
  const removeSuccessor = (id: string) => {
    const succ = activeProject.successors.find((s) => s.id === id);
    if (!succ) return;
    updateActiveProject((prev) => ({
      ...prev,
      successors: prev.successors.filter((s) => s.id !== id),
      policy: {
        ...prev.policy,
        totalSuccessors: Math.max(1, prev.successors.length - 1),
      },
    }));
    createAuditEvent(
      `Successor Revoked: ${succ.name}`,
      `Authority revoked for wallet ${succ.wallet}.`,
      "policy"
    );
    addToast("info", "Successor Removed", `${succ.name} has been removed.`);
  };

  // Create Project
  const createProject = (
    name: string,
    repository: string,
    description: string,
    selectedAssets: string[]
  ) => {
    const newProj: Project = {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name,
      repository,
      description: description || "Protected open-source infrastructure",
      maintainer: {
        name: "Yash Harfode",
        handle: "@yashharfode",
        wallet: "0x4A8F...7D2F",
        lastCheckIn: "Just now",
        lastCheckInDate: new Date(),
      },
      status: "ACTIVE",
      policy: {
        inactivityPeriodDays: 30,
        verificationPeriodHours: 48,
        requiredApprovals: 2,
        totalSuccessors: 3,
        timelockPeriodMinutes: 1,
        timelockPeriodDisplay: "24 hours (Demo Mode: 60s)",
        protectedAssets: (selectedAssets.length > 0
          ? selectedAssets
          : ["Repository Access", "Release Signing"]) as any,
      },
      successors: INITIAL_SUCCESSORS.map((s) => ({ ...s, hasApproved: false })),
      assets: INITIAL_ASSETS.filter((a) =>
        selectedAssets.includes(a.key)
      ),
      recoverySession: {
        reason: "Maintainer inactive for 30+ days",
        timelockSecondsRemaining: 60,
        timelockInitialSeconds: 60,
        isTimelockRunning: false,
        canMaintainerCancel: true,
        verificationChecks: INITIAL_PROJECT.recoverySession!.verificationChecks,
      },
    };

    setProjects((prev) => [...prev, newProj]);
    setActiveProjectId(newProj.id);
    createAuditEvent(
      `Project Registered: ${name}`,
      `Repository ${repository} bound to Open Continuity smart contract.`,
      "state_change"
    );
    setIsCreateProjectOpen(false);
    addToast("success", "Project Created", `${name} is now protected by Open Continuity.`);
    setActiveTab("overview");
  };

  // Update Policy
  const updatePolicy = (
    inactivityDays: number,
    verificationHours: number,
    requiredApprovals: number
  ) => {
    updateActiveProject((prev) => ({
      ...prev,
      policy: {
        ...prev.policy,
        inactivityPeriodDays: inactivityDays,
        verificationPeriodHours: verificationHours,
        requiredApprovals: requiredApprovals,
      },
    }));
    createAuditEvent(
      "Recovery Policy Parameters Updated",
      `New configuration: ${requiredApprovals}/${activeProject.successors.length} threshold, ${inactivityDays}d inactivity, ${verificationHours}h verification.`,
      "policy"
    );
    addToast("success", "Policy Saved", "On-chain recovery parameters updated successfully.");
  };

  return (
    <ContinuityContext.Provider
      value={{
        activeTab,
        setActiveTab,
        projects,
        activeProject,
        setActiveProjectId,
        auditEvents,
        demoMode,
        setDemoMode,
        currentRole,
        setCurrentRole,
        toasts,
        addToast,
        removeToast,
        checkInNow,
        simulateInactivity,
        startVerification,
        approveSuccessor,
        revokeApproval,
        startTimelock,
        advanceTimelock,
        cancelRecovery,
        executeRecovery,
        resetDemo,
        addSuccessor,
        removeSuccessor,
        createProject,
        updatePolicy,
        isAddSuccessorOpen,
        setIsAddSuccessorOpen,
        isCreateProjectOpen,
        setIsCreateProjectOpen,
        isExecuteModalOpen,
        setIsExecuteModalOpen,
        selectedTx,
        setSelectedTx,
      }}
    >
      {children}
    </ContinuityContext.Provider>
  );
};

export const useContinuity = () => {
  const context = useContext(ContinuityContext);
  if (!context) {
    throw new Error("useContinuity must be used within a ContinuityProvider");
  }
  return context;
};
