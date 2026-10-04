"use client";

import React, { useState } from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { Settings, Shield, Bell, Key, Network, Check, ExternalLink } from "lucide-react";

export const SettingsView: React.FC = () => {
  const { activeProject, addToast } = useContinuity();
  const [notifyEmail, setNotifyEmail] = useState("yash@opencontinuity.dev");
  const [discordWebhook, setDiscordWebhook] = useState("https://discord.com/api/webhooks/12984.../continuity-alerts");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border-subtle pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-primary-text">
          Settings & Integrations
        </h1>
        <p className="text-xs text-secondary-text mt-1">
          Configure notification dispatchers, connected signing keys, and network parameters.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {/* Maintainer Wallet Card */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
              Primary Maintainer Identity
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle">
              <div className="text-secondary-muted text-[11px]">Authorized Signer Name</div>
              <div className="font-semibold text-primary-text mt-0.5">{activeProject.maintainer.name}</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle">
              <div className="text-secondary-muted text-[11px]">Primary Ethereum Address</div>
              <div className="font-mono text-primary-text text-[11px] mt-0.5">{activeProject.maintainer.wallet}</div>
            </div>
          </div>
        </div>

        {/* Notifications & Heartbeat Relays */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
              Inactivity Warning Dispatchers
            </h3>
          </div>
          <p className="text-secondary-muted text-[11px] leading-relaxed">
            Multi-channel telemetry alerts sent 14 days and 48 hours prior to inactivity trigger.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-secondary-text text-[11px] mb-1 font-medium">
                Emergency Contact Email
              </label>
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="w-full px-3 py-2 bg-surface-raised border border-border-default rounded-md text-xs text-primary-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-secondary-text text-[11px] mb-1 font-medium">
                Security Discord / Slack Alert Webhook
              </label>
              <input
                type="text"
                value={discordWebhook}
                onChange={(e) => setDiscordWebhook(e.target.value)}
                className="w-full px-3 py-2 bg-surface-raised border border-border-default rounded-md text-xs text-primary-text font-mono focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => addToast("success", "Settings Saved", "Alert dispatchers updated.")}
              className="px-4 py-1.5 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors"
            >
              Save Dispatchers
            </button>
          </div>
        </div>

        {/* Network & Smart Contract Bindings */}
        <div className="bg-surface border border-border-subtle rounded-xl p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
              On-Chain Infrastructure
            </h3>
          </div>
          <div className="space-y-2 text-[11px] font-mono">
            <div className="p-2.5 rounded bg-surface-raised border border-border-subtle flex items-center justify-between">
              <span className="text-secondary-muted">Chain:</span>
              <span className="text-primary-text font-sans font-medium">Ethereum Sepolia (ChainID: 11155111)</span>
            </div>
            <div className="p-2.5 rounded bg-surface-raised border border-border-subtle flex items-center justify-between">
              <span className="text-secondary-muted">Factory Contract:</span>
              <span className="text-accent">0x0C77F5B6...91A0410</span>
            </div>
            <div className="p-2.5 rounded bg-surface-raised border border-border-subtle flex items-center justify-between">
              <span className="text-secondary-muted">Oracle Provider:</span>
              <span className="text-primary-text font-sans">Chainlink Automation + Decentralized Keepers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
