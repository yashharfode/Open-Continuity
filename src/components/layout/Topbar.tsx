"use client";

import React, { useState } from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { StatusBadge } from "../common/StatusBadge";
import {
  FolderGit2,
  ChevronDown,
  Plus,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface TopbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, isSidebarOpen = true }) => {
  const {
    projects,
    activeProject,
    setActiveProjectId,
    setIsCreateProjectOpen,
    checkInNow,
  } = useContinuity();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-14 border-b border-border-subtle bg-background-secondary/95 px-6 flex items-center justify-between z-20">
      {/* Project Selector & Status */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle (Desktop) */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg bg-surface border border-border-subtle hover:border-border-default text-secondary-muted hover:text-primary-text transition-colors"
            title="Toggle Sidebar"
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
        )}

        {/* Project Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border-subtle hover:border-border-default transition-colors text-xs font-semibold text-primary-text"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-accent" />
            <span>{activeProject.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
            <ChevronDown className="w-3.5 h-3.5 text-secondary-muted" />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-60 bg-surface-raised border border-border-default rounded-lg shadow-xl py-1 z-50 animate-in fade-in">
              <div className="px-3 py-1 text-[10px] font-mono uppercase text-secondary-muted border-b border-border-subtle">
                Monitored Projects
              </div>
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    setActiveProjectId(proj.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-surface transition-colors ${
                    proj.id === activeProject.id ? "text-primary-text font-semibold bg-surface/50" : "text-secondary-text"
                  }`}
                >
                  <span>{proj.name}</span>
                  <StatusBadge status={proj.status} size="sm" />
                </button>
              ))}
              <div className="p-1 border-t border-border-subtle">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsCreateProjectOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-accent hover:bg-accent-subtle transition-colors font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Project</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Repository Link */}
        <a
          href={`https://${activeProject.repository}`}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs text-secondary-muted hover:text-primary-text transition-colors font-mono"
        >
          <span>{activeProject.repository}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Right Side Status & Network */}
      <div className="flex items-center gap-3">
        {/* StatusBadge removed */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-border-subtle font-mono text-[11px] text-secondary-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-status-green"></span>
          <span>Sepolia: 0x0C77...91A0</span>
        </div>
      </div>
    </header>
  );
};
