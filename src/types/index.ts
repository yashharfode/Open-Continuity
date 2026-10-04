export type ProjectStatus =
  | "ACTIVE"
  | "INACTIVITY_DETECTED"
  | "VERIFYING"
  | "THRESHOLD_APPROVAL"
  | "TIMELOCK_ACTIVE"
  | "RECOVERED";

export interface Successor {
  id: string;
  name: string;
  role: string;
  wallet: string;
  status: "Accepted" | "Pending" | "Declined";
  addedDate: string;
  hasApproved: boolean;
  approvalTimestamp?: string;
}

export type ProtectedAssetKey =
  | "Repository Access"
  | "Release Signing"
  | "Package Registry"
  | "Infrastructure"
  | "Treasury";

export interface ProtectedAsset {
  key: ProtectedAssetKey;
  label: string;
  description: string;
  integration: string;
  status: "Connected" | "Protected" | "Transferred" | "Unconfigured";
  transferredTo?: string;
}

export interface RecoveryPolicy {
  inactivityPeriodDays: number;
  verificationPeriodHours: number;
  requiredApprovals: number;
  totalSuccessors: number;
  timelockPeriodMinutes: number; // in production 24h (1440m), in demo default 1m (60s)
  timelockPeriodDisplay: string;
  protectedAssets: ProtectedAssetKey[];
}

export interface VerificationRequirement {
  id: string;
  title: string;
  description: string;
  verified: boolean;
  verifiedAt?: string;
  type: "oracle" | "heartbeat" | "multisig";
}

export interface AuditEvent {
  id: string;
  txHash: string;
  title: string;
  description: string;
  timestamp: string;
  relativeTime: string;
  category: "state_change" | "approval" | "policy" | "execution" | "checkin";
  actor: string;
  status: "confirmed" | "pending";
  blockNumber: number;
}

export interface Project {
  id: string;
  name: string;
  repository: string;
  description: string;
  maintainer: {
    name: string;
    handle: string;
    wallet: string;
    lastCheckIn: string;
    lastCheckInDate: Date;
    avatarUrl?: string;
  };
  status: ProjectStatus;
  policy: RecoveryPolicy;
  successors: Successor[];
  assets: ProtectedAsset[];
  recoverySession?: {
    initiatedAt?: string;
    reason: string;
    timelockSecondsRemaining: number;
    timelockInitialSeconds: number;
    isTimelockRunning: boolean;
    verificationChecks: VerificationRequirement[];
    canMaintainerCancel: boolean;
  };
}

export type ActiveTab =
  | "overview"
  | "recovery-flow"
  | "projects"
  | "successors"
  | "policy"
  | "activity"
  | "architecture"
  | "settings";
