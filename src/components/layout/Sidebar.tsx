"use client";

import React, { useState } from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { ActiveTab } from "../../types";
import { Logo } from "../common/Logo";
import {
  LayoutDashboard,
  GitPullRequest,
  Users2,
  Sliders,
  History,
  Layers,
  Settings,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC<{ onOpenSplash?: () => void }> = ({ onOpenSplash }) => {
  const {
    activeTab,
    setActiveTab,
    activeProject,
    currentRole,
    resetDemo,
  } = useContinuity();

  const navItems: NavItem[] = [
    {
      id: "overview",
      label: "Dashboard & Demo",
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: activeProject.status !== "ACTIVE" ? activeProject.status.split("_")[0] : undefined,
    },
    {
      id: "recovery-flow",
      label: "Recovery Pipeline",
      icon: <GitPullRequest className="w-4 h-4" />,
    },
    {
      id: "successors",
      label: "Successors (3)",
      icon: <Users2 className="w-4 h-4" />,
    },
    {
      id: "policy",
      label: "Recovery Policy",
      icon: <Sliders className="w-4 h-4" />,
    },
    {
      id: "activity",
      label: "Audit Trail",
      icon: <History className="w-4 h-4" />,
    },
    {
      id: "architecture",
      label: "Architecture",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-60 bg-background-secondary border-r border-border-subtle flex flex-col h-screen fixed left-0 top-0 z-40 select-none">
      {/* Brand Header with Bespoke Vector Logo */}
      <div className="p-4 border-b border-border-subtle">
        <Logo size="md" subtitle="Shared Authorization Layer" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-wider text-secondary-muted font-semibold">
          Platform
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-surface-raised text-primary-text border border-border-default font-semibold shadow-sm"
                  : "text-secondary-text hover:text-primary-text hover:bg-surface/60"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? "text-accent" : "text-secondary-muted"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-status-amber/20 text-status-amber border border-status-amber/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Pitch / Executive Splash trigger */}
        {onOpenSplash && (
          <div className="pt-3 mt-2 border-t border-border-subtle/70">
            <button
              onClick={onOpenSplash}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-secondary-muted hover:text-accent hover:bg-surface/50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Executive Briefing</span>
            </button>
          </div>
        )}
      </nav>

      {/* Signer & Role Footer */}
      <div className="p-3 border-t border-border-subtle bg-surface/20 space-y-2">
        <div className="bg-surface border border-border-subtle rounded-lg p-2.5">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-secondary-muted">Connected Signer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
          </div>
          <div className="font-mono text-xs text-primary-text font-medium truncate">
            0x4A8F...7D2F
          </div>
          <div className="mt-1 text-[11px] text-secondary-muted">
            Role: <span className="text-primary-text font-medium">Maintainer (Yash)</span>
          </div>
        </div>

        <button
          onClick={resetDemo}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-surface-raised border border-border-subtle hover:border-border-default text-secondary-text hover:text-primary-text text-[11px] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo State</span>
        </button>
      </div>
    </aside>
  );
};
