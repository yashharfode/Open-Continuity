"use client";

import React from "react";
import { Layers, ShieldCheck, Lock, Key, Server, GitFork, ArrowDown, ArrowUp } from "lucide-react";

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border-subtle pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-primary-text">
          Architecture & Security Model
        </h1>
        <p className="text-xs text-secondary-text mt-1">
          How Open Continuity separates immutable cryptographic authorization rules from runtime credential access.
        </p>
      </div>

      {/* Layer Diagram (Requirement #20) */}
      <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            System Topology
          </span>
          <h2 className="text-base font-semibold text-primary-text mt-0.5">
            Decoupled Authorization & Integration Stack
          </h2>
        </div>

        {/* Stack Visual */}
        <div className="max-w-2xl mx-auto space-y-3 font-mono text-xs">
          {/* Top Layer: Project Assets */}
          <div className="p-4 rounded-xl bg-surface-raised border border-border-default space-y-2">
            <div className="flex items-center justify-between text-secondary-muted font-sans text-xs">
              <span className="font-semibold text-primary-text">TARGET OPEN-SOURCE ECOSYSTEM</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-surface border border-border-subtle">
                End Systems
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-sans text-xs">
              <div className="p-2 rounded bg-surface border border-border-subtle text-center">
                GitHub Orgs
              </div>
              <div className="p-2 rounded bg-surface border border-border-subtle text-center">
                npm / Crates.io
              </div>
              <div className="p-2 rounded bg-surface border border-border-subtle text-center">
                Sigstore OIDC
              </div>
              <div className="p-2 rounded bg-surface border border-border-subtle text-center">
                AWS KMS / DNS
              </div>
            </div>
          </div>

          {/* Connection */}
          <div className="flex justify-center text-secondary-muted py-0.5">
            <div className="flex items-center gap-2 text-[11px]">
              <ArrowUp className="w-3.5 h-3.5 text-accent" />
              <span>Cryptographic Attestation Claims & Webhooks</span>
              <ArrowDown className="w-3.5 h-3.5 text-accent" />
            </div>
          </div>

          {/* Middle Layer: Integration Layer */}
          <div className="p-4 rounded-xl bg-surface-raised border border-border-default space-y-2">
            <div className="flex items-center justify-between text-secondary-muted font-sans text-xs">
              <span className="font-semibold text-primary-text">INTEGRATION & RELAY LAYER</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-surface border border-border-subtle text-accent">
                Zero-Knowledge Proofs / OIDC
              </span>
            </div>
            <p className="text-[11.5px] font-sans text-secondary-text leading-relaxed">
              Decentralized oracle nodes and GitHub Apps verify timelock completion without holding
              long-lived maintainer credentials or storing master secrets.
            </p>
          </div>

          {/* Connection */}
          <div className="flex justify-center text-secondary-muted py-0.5">
            <div className="flex items-center gap-2 text-[11px]">
              <ArrowUp className="w-3.5 h-3.5 text-accent" />
              <span>Smart Contract Authority Queries</span>
              <ArrowDown className="w-3.5 h-3.5 text-accent" />
            </div>
          </div>

          {/* Bottom Layer: Smart Contract */}
          <div className="p-4 rounded-xl bg-surface-raised border border-accent/40 space-y-2 shadow-lg shadow-accent/5">
            <div className="flex items-center justify-between text-secondary-muted font-sans text-xs">
              <span className="font-semibold text-primary-text flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-status-green" />
                OPEN CONTINUITY ON-CHAIN CORE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent">
                0x0C77...91A0
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2 rounded bg-surface border border-border-subtle">
                <div className="text-secondary-muted text-[10px]">Policy</div>
                <div className="text-primary-text font-semibold">On-chain</div>
              </div>
              <div className="p-2 rounded bg-surface border border-border-subtle">
                <div className="text-secondary-muted text-[10px]">Approvals</div>
                <div className="text-primary-text font-semibold">On-chain</div>
              </div>
              <div className="p-2 rounded bg-surface border border-border-subtle">
                <div className="text-secondary-muted text-[10px]">Timelock</div>
                <div className="text-primary-text font-semibold">On-chain</div>
              </div>
              <div className="p-2 rounded bg-surface border border-border-subtle">
                <div className="text-secondary-muted text-[10px]">Audit Record</div>
                <div className="text-primary-text font-semibold">On-chain</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Representation (Requirement #28) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-status-green" />
            <h3 className="font-semibold text-primary-text text-sm">
              Authorization vs. Credential Custody
            </h3>
          </div>
          <p className="text-secondary-text leading-relaxed">
            Open Continuity strictly manages <span className="text-primary-text font-medium">Authorization Logic</span>,
            not raw credential custody. The system never accepts, stores, or transmits private keys, GitHub personal
            access tokens, or AWS root credentials.
          </p>
          <div className="p-3 bg-surface-raised rounded-md font-mono text-[11px] text-secondary-muted space-y-1">
            <div className="text-status-green font-semibold">✓ Zero Private Key Exposure</div>
            <div>✓ Ephemeral OIDC Identity Federation</div>
            <div>✓ Hardware-backed Multisig Thresholds</div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-primary-text text-sm">
              Timelock Cancellation Invariant
            </h3>
          </div>
          <p className="text-secondary-text leading-relaxed">
            Security guarantees dictate that even if successors collude or malicious approval signatures are
            submitted, the mandatory 24-hour timelock (60s demo) guarantees the genuine maintainer can
            unconditionally revoke the recovery sequence at any time prior to execution.
          </p>
          <div className="p-3 bg-surface-raised rounded-md font-mono text-[11px] text-secondary-muted space-y-1">
            <div className="text-accent font-semibold">Invariant: Maintainer Primacy</div>
            <div>Active Heartbeat &gt; Pending Multisig Quorum</div>
          </div>
        </div>
      </div>
    </div>
  );
};
