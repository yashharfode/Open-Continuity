"use client";

import React, { useState } from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { StatusBadge } from "../common/StatusBadge";
import {
  Users2,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Info,
} from "lucide-react";

export const SuccessorsView: React.FC = () => {
  const { activeProject, setIsAddSuccessorOpen, removeSuccessor, addToast } = useContinuity();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-text">
            Trusted Successors
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            People and autonomous signer contracts authorized to participate in recovery threshold voting.
          </p>
        </div>

        <button
          onClick={() => setIsAddSuccessorOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Successor</span>
        </button>
      </div>

      {/* Threshold Status Banner */}
      <div className="p-4 rounded-xl bg-surface border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center text-accent">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-primary-text">
              Active Multisig Quorum: {activeProject.policy.requiredApprovals} of{" "}
              {activeProject.successors.length} Threshold
            </div>
            <div className="text-[11px] text-secondary-muted mt-0.5">
              Requires at least {activeProject.policy.requiredApprovals} independent successor signatures
              after verified maintainer inactivity.
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-secondary-muted">
          Contract: <span className="text-primary-text">0x0C77...91A0</span>
        </div>
      </div>

      {/* Successors Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-raised border-b border-border-subtle text-secondary-muted font-mono uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Successor</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Wallet / ENS</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Added Date</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {activeProject.successors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-secondary-muted">
                    No successors configured. Add trusted successors to enable recovery quorum.
                  </td>
                </tr>
              ) : (
                activeProject.successors.map((succ) => (
                  <tr key={succ.id} className="hover:bg-surface-raised/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-primary-text">{succ.name}</div>
                      <div className="text-[11px] text-secondary-muted font-mono sm:hidden">
                        {succ.wallet}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-secondary-text font-medium">{succ.role}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-primary-text">
                      <div className="flex items-center gap-1.5">
                        <span>{succ.wallet}</span>
                        <a
                          href={`https://etherscan.io/address/${succ.wallet.split(" ")[0]}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-secondary-muted hover:text-accent"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={succ.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-secondary-muted font-mono text-[11px]">
                      {succ.addedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            addToast("info", "Edit Successor", `Editing permissions for ${succ.name}`);
                          }}
                          className="p-1 rounded text-secondary-muted hover:text-primary-text transition-colors"
                          title="Edit role or permissions"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeSuccessor(succ.id)}
                          className="p-1 rounded text-secondary-muted hover:text-status-red transition-colors"
                          title="Remove successor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Successor Security & Cryptographic Note */}
      <div className="p-4 rounded-xl bg-surface border border-border-subtle flex items-start gap-3 text-xs text-secondary-text">
        <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-primary-text">Successor Security Model</div>
          <p className="leading-relaxed">
            Successors do not possess secret keys or access privileges during normal operation.
            Their signing credentials are held solely as authorized public keys in the Open Continuity
            smart contract. Only upon verified inactivity and 2/3 multisig consensus can their keys unlock
            transition delegation claims.
          </p>
        </div>
      </div>
    </div>
  );
};
