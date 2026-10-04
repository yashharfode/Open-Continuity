"use client";

import React from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { StatusBadge } from "../common/StatusBadge";
import { Plus, FolderGit2, ExternalLink, ShieldCheck, Check, Clock } from "lucide-react";

export const ProjectsView: React.FC = () => {
  const {
    projects,
    activeProject,
    setActiveProjectId,
    setIsCreateProjectOpen,
    setActiveTab,
  } = useContinuity();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-text">
            Protected Projects
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Open-source repositories and infrastructure environments registered under Open Continuity.
          </p>
        </div>

        <button
          onClick={() => setIsCreateProjectOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => {
          const isSelected = proj.id === activeProject.id;
          return (
            <div
              key={proj.id}
              onClick={() => {
                setActiveProjectId(proj.id);
              }}
              className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-surface-raised border-accent shadow-md shadow-accent/5"
                  : "bg-surface border-border-subtle hover:border-border-default"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-surface border border-border-subtle flex items-center justify-center text-accent">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-primary-text flex items-center gap-2">
                        <span>{proj.name}</span>
                        {isSelected && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-accent/20 text-accent font-semibold">
                            ACTIVE CONTEXT
                          </span>
                        )}
                      </div>
                      <a
                        href={`https://${proj.repository}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] text-secondary-muted font-mono hover:text-accent flex items-center gap-1"
                      >
                        <span>{proj.repository}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                  <StatusBadge status={proj.status} size="sm" />
                </div>

                <p className="text-xs text-secondary-text leading-relaxed">
                  {proj.description}
                </p>

                {/* Protected Assets summary */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted font-semibold">
                    Protected Assets:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.assets.map((asset) => (
                      <span
                        key={asset.key}
                        className="text-[11px] px-2 py-0.5 rounded bg-surface border border-border-subtle text-secondary-text font-mono flex items-center gap-1"
                      >
                        <Check className="w-2.5 h-2.5 text-status-green" />
                        <span>{asset.key}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-border-subtle/80 flex items-center justify-between text-[11px] text-secondary-muted">
                <div>
                  Maintainer: <span className="text-primary-text">{proj.maintainer.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProjectId(proj.id);
                    setActiveTab("overview");
                  }}
                  className="text-accent hover:underline font-medium"
                >
                  Open Dashboard &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
