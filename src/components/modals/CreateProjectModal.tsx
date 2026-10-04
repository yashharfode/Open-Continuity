"use client";

import React, { useState } from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { X, FolderGit2, Check } from "lucide-react";

export const CreateProjectModal: React.FC = () => {
  const { isCreateProjectOpen, setIsCreateProjectOpen, createProject } = useContinuity();

  const [name, setName] = useState("");
  const [repository, setRepository] = useState("");
  const [description, setDescription] = useState("");
  const [assets, setAssets] = useState<string[]>([
    "Repository Access",
    "Release Signing",
    "Package Registry",
    "Infrastructure",
  ]);

  if (!isCreateProjectOpen) return null;

  const toggleAsset = (assetKey: string) => {
    if (assets.includes(assetKey)) {
      setAssets(assets.filter((a) => a !== assetKey));
    } else {
      setAssets([...assets, assetKey]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !repository.trim()) return;
    createProject(name.trim(), repository.trim(), description.trim(), assets);
    setName("");
    setRepository("");
    setDescription("");
  };

  const assetOptions = [
    { key: "Repository Access", label: "Repository Access (GitHub Org Administration)" },
    { key: "Release Signing", label: "Release Signing (Sigstore OIDC / Cosign Attestations)" },
    { key: "Package Registry", label: "Package Registry (npm / Crates.io tokens)" },
    { key: "Infrastructure", label: "Infrastructure (AWS KMS / Cloudflare DNS zones)" },
    { key: "Treasury", label: "Treasury (Smart Contract Treasury Multisig)" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-surface-raised border border-border-default rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-surface border border-border-subtle flex items-center justify-center text-accent">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-text">Create Project</h3>
              <p className="text-[11px] text-secondary-muted">
                Register an open-source repository under Open Continuity protection
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateProjectOpen(false)}
            className="text-secondary-muted hover:text-primary-text transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-secondary-text mb-1.5">
              Project Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. libsecure"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-xs text-primary-text focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary-text mb-1.5">
              Repository URL
            </label>
            <input
              type="text"
              required
              placeholder="github.com/yashharfode/libsecure"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-xs text-primary-text font-mono focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary-text mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Critical cryptographic utility library"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-xs text-primary-text focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary-text mb-2">
              Protected Assets
            </label>
            <div className="space-y-2">
              {assetOptions.map((opt) => {
                const isSelected = assets.includes(opt.key);
                return (
                  <label
                    key={opt.key}
                    onClick={() => toggleAsset(opt.key)}
                    className={`flex items-center gap-2.5 p-2 rounded-md border text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-surface border-border-default text-primary-text"
                        : "bg-surface/40 border-border-subtle text-secondary-muted"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isSelected
                          ? "bg-accent border-accent text-white"
                          : "border-border-default bg-surface"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateProjectOpen(false)}
              className="px-3.5 py-1.5 rounded-md border border-border-subtle bg-surface text-secondary-text hover:text-primary-text text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
