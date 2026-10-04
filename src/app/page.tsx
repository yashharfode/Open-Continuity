"use client";

import React, { useState } from "react";
import { ContinuityProvider, useContinuity } from "../context/ContinuityContext";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { ToastContainer } from "../components/common/Toast";
import { OverviewDashboard } from "../components/views/OverviewDashboard";
import { RecoveryFlowHero } from "../components/views/RecoveryFlowHero";
import { SuccessorsView } from "../components/views/SuccessorsView";
import { PolicyView } from "../components/views/PolicyView";
import { ProjectsView } from "../components/views/ProjectsView";
import { TransactionsView } from "../components/views/TransactionsView";
import { ArchitectureView } from "../components/views/ArchitectureView";
import { SettingsView } from "../components/views/SettingsView";
import { AddSuccessorModal } from "../components/modals/AddSuccessorModal";
import { CreateProjectModal } from "../components/modals/CreateProjectModal";
import { ExecuteRecoveryModal } from "../components/modals/ExecuteRecoveryModal";
import { ExplorerModal } from "../components/modals/ExplorerModal";
import { SplashScreenModal } from "../components/modals/SplashScreenModal";
import { Menu, X } from "lucide-react";

const MainContent: React.FC = () => {
  const { activeTab } = useContinuity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSplashOpen, setIsSplashOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-primary-text">
      {/* Desktop Sidebar (Fixed left, width 60 = 240px) */}
      <div className="hidden lg:block w-60 flex-shrink-0">
        <Sidebar onOpenSplash={() => setIsSplashOpen(true)} />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-60 max-w-[80vw] z-50 h-full">
            <Sidebar onOpenSplash={() => {
              setMobileMenuOpen(false);
              setIsSplashOpen(true);
            }} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1 rounded bg-surface border border-border-subtle text-secondary-muted"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile menu toggle */}
        <div className="lg:hidden h-12 border-b border-border-subtle bg-background-secondary px-4 flex items-center justify-between z-20">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded bg-surface border border-border-subtle text-primary-text flex items-center gap-2 text-xs"
          >
            <Menu className="w-4 h-4 text-accent" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Open Continuity</span>
          </button>
        </div>

        {/* Topbar */}
        <Topbar />

        {/* View Viewport */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl w-full mx-auto animate-in fade-in duration-150">
          {activeTab === "overview" && <OverviewDashboard />}
          {activeTab === "recovery-flow" && <RecoveryFlowHero />}
          {activeTab === "projects" && <ProjectsView />}
          {activeTab === "successors" && <SuccessorsView />}
          {activeTab === "policy" && <PolicyView />}
          {activeTab === "activity" && <TransactionsView />}
          {activeTab === "architecture" && <ArchitectureView />}
          {activeTab === "settings" && <SettingsView />}
        </main>

        {/* Minimal Clean Footer */}
        <footer className="border-t border-border-subtle px-6 py-4 text-center text-secondary-muted text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-2 bg-background-secondary/40">
          <div>Open Continuity &bull; Programmable Fail-Safe for Open Source</div>
          <div>Inactivity &rarr; Multisig Quorum &rarr; Timelock &rarr; Recovery</div>
        </footer>
      </div>

      {/* Global Modals & Toasts */}
      <AddSuccessorModal />
      <CreateProjectModal />
      <ExecuteRecoveryModal />
      <ExplorerModal />
      <SplashScreenModal isOpen={isSplashOpen} onClose={() => setIsSplashOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export default function Page() {
  return (
    <ContinuityProvider>
      <MainContent />
    </ContinuityProvider>
  );
}
