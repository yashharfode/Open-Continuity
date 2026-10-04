"use client";

import React, { useState } from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { X, ShieldAlert, Users } from "lucide-react";

export const AddSuccessorModal: React.FC = () => {
  const { isAddSuccessorOpen, setIsAddSuccessorOpen, addSuccessor } = useContinuity();

  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");
  const [role, setRole] = useState("Technical Maintainer");

  if (!isAddSuccessorOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wallet.trim()) return;
    addSuccessor(name.trim(), role, wallet.trim());
    setName("");
    setWallet("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-surface-raised border border-border-default rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-surface border border-border-subtle flex items-center justify-center text-accent">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-text">Add Successor</h3>
              <p className="text-[11px] text-secondary-muted">
                Authorize a new keyholder for recovery threshold voting
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddSuccessorOpen(false)}
            className="text-secondary-muted hover:text-primary-text transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-secondary-text mb-1.5">
              Full Name or Moniker
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Joshi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-xs text-primary-text focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary-text mb-1.5">
              Wallet Address or ENS
            </label>
            <input
              type="text"
              required
              placeholder="0x... or name.eth"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-xs text-primary-text font-mono focus:outline-none focus:border-accent transition-colors"
            />
            <p className="mt-1 text-[10px] text-secondary-muted">
              Must be an Ethereum-compatible wallet or Gnosis Safe contract.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary-text mb-1.5">
              Assigned Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-xs text-primary-text focus:outline-none focus:border-accent transition-colors"
            >
              <option value="Technical Maintainer">Technical Maintainer</option>
              <option value="Security Maintainer">Security Maintainer</option>
              <option value="Community Representative">Community Representative</option>
              <option value="Foundation Trustee">Foundation Trustee</option>
              <option value="Legal & Compliance Custodian">Legal & Compliance Custodian</option>
            </select>
          </div>

          <div className="p-3 bg-surface/50 border border-border-subtle rounded-md text-[11px] text-secondary-muted leading-relaxed">
            The successor will receive an on-chain invitation to co-sign the recovery multisig.
            They will only hold authority if inactivity and verification conditions are met.
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsAddSuccessorOpen(false)}
              className="px-3.5 py-1.5 rounded-md border border-border-subtle bg-surface text-secondary-text hover:text-primary-text text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
