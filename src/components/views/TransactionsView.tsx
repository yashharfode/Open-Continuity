"use client";

import React, { useState } from "react";
import { useContinuity } from "../../context/ContinuityContext";
import { History, ExternalLink, Filter, Search, Shield, CheckCircle2 } from "lucide-react";
import { AuditEvent } from "../../types";

export const TransactionsView: React.FC = () => {
  const { auditEvents, setSelectedTx } = useContinuity();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filteredEvents = auditEvents.filter((ev) => {
    if (filter !== "all" && ev.category !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.txHash.toLowerCase().includes(q) ||
        ev.actor.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-text">
            On-Chain Audit Trail
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Chronological cryptographic log of all state transitions, check-in heartbeats, approvals, and recovery execution events.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-secondary-muted px-3 py-1.5 rounded-md bg-surface border border-border-subtle self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
          <span>Network: Sepolia Testnet</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface border border-border-subtle rounded-xl p-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-secondary-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by event, hash, signer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-surface-raised border border-border-default rounded-md text-xs text-primary-text focus:outline-none focus:border-accent font-sans"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "all", label: "All Events" },
            { id: "state_change", label: "State Changes" },
            { id: "approval", label: "Approvals" },
            { id: "checkin", label: "Heartbeats" },
            { id: "policy", label: "Policy" },
            { id: "execution", label: "Execution" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                filter === tab.id
                  ? "bg-surface-raised border border-border-default text-primary-text font-semibold"
                  : "text-secondary-muted hover:text-secondary-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden shadow-sm">
        <div className="divide-y divide-border-subtle">
          {filteredEvents.length === 0 ? (
            <div className="py-12 text-center text-secondary-muted text-xs">
              No transactions found matching criteria.
            </div>
          ) : (
            filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => setSelectedTx(ev)}
                className="p-4 hover:bg-surface-raised/60 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-surface-raised border border-border-subtle flex items-center justify-center text-status-green flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-primary-text">{ev.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border-subtle text-secondary-muted uppercase">
                        {ev.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-secondary-text mt-0.5 leading-relaxed">
                      {ev.description}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-secondary-muted">
                      <span>Tx: {ev.txHash.substring(0, 16)}...</span>
                      <span>&bull;</span>
                      <span>Signer: {ev.actor}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle/50">
                  <div className="text-right">
                    <div className="text-[11px] font-mono text-primary-text">{ev.relativeTime}</div>
                    <div className="text-[10px] text-secondary-muted font-mono">{ev.timestamp.substring(0, 10)}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTx(ev);
                    }}
                    className="flex items-center gap-1 text-xs text-accent hover:underline font-medium px-2 py-1 rounded hover:bg-accent/10 transition-colors"
                  >
                    <span>View on Explorer</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
