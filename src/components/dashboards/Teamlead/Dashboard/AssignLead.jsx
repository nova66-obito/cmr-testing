import React, { useMemo, useState, useEffect } from "react";
import {
  X,
  Search,
  Clock,
  UserPlus,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AssignLeads({
  open,
  onClose,
  leads = [],
  executives = [],
  aiRecommendation,
  onAssign,
  loading = false,
}) {
  const [searchLead, setSearchLead] = useState("");
  const [filter, setFilter] = useState("hot");
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedExecId, setSelectedExecId] = useState(null);

  const [localLoading, setLocalLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const isBusy = loading || localLoading;

  useEffect(() => {
    if (!open) {
      setSearchLead("");
      setFilter("hot");
      setSelectedLeadId(null);
      setSelectedExecId(null);
      setToastMsg(null);
      setLocalLoading(false);
    }
  }, [open]);

  const counts = useMemo(() => {
    const c = { hot: 0, warm: 0, cold: 0 };
    leads.forEach((l) => (c[l.status] = (c[l.status] || 0) + 1));
    return c;
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const q = searchLead.trim().toLowerCase();
    return leads
      .filter((l) => l.status === filter)
      .filter((l) => !q || l.name.toLowerCase().includes(q));
  }, [leads, filter, searchLead]);

  const selectedLead = leads.find((l) => l.id === selectedLeadId);
  const selectedExec = executives.find((e) => e.id === selectedExecId);

  const handleAssign = async () => {
    if (!selectedLead || !selectedExec || !onAssign) return;
    try {
      setLocalLoading(true);
      await onAssign(selectedLead, selectedExec);

      setToastMsg(`${selectedLead.name} assigned to ${selectedExec.name}`);

      setTimeout(() => {
        setLocalLoading(false);
        onClose?.();
      }, 900);
    } catch (err) {
      console.error(err);
      setLocalLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-50 flex justify-center items-start p-3 sm:p-6 overflow-y-auto">
        {/* Modal */}
        <div className="w-[95vw] sm:w-full sm:max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between p-4 sm:p-5 border-b border-gray-200">
            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-xl bg-blue-50 grid place-items-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Assign Lead to Sales Executive
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Select a lead and choose a sales executive to assign.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Body (scrollable) */}
          <div className="p-4 sm:p-5 max-h-[75vh] overflow-y-auto">
            {/* ✅ ALWAYS STACKED (NO SIDE BY SIDE) */}
            <div className="grid grid-cols-1 gap-6">
              {/* Leads Section */}
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Step 1: Select Lead to Assign
                </h3>

                {/* Search */}
                <div className="relative mt-3">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    placeholder="Search leads..."
                    className="w-full h-11 sm:h-12 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none
                               focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-sm"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="mt-4 bg-gray-100 rounded-2xl p-1 flex gap-2">
                  {["hot", "warm", "cold"].map((t) => {
                    const active = filter === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`flex-1 h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition
                          ${
                            active
                              ? "bg-white shadow text-gray-900"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                      >
                        <span className="capitalize">{t}</span>
                        <span className="ml-2 inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[10px] sm:text-xs border bg-gray-50">
                          {counts[t] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Leads List */}
                <div className="mt-4 border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="max-h-[260px] overflow-y-auto divide-y divide-gray-100">
                    {filteredLeads.length === 0 ? (
                      <div className="p-5 text-sm text-gray-500 text-center">
                        No leads found.
                      </div>
                    ) : (
                      filteredLeads.map((lead) => {
                        const active = selectedLeadId === lead.id;
                        return (
                          <button
                            key={lead.id}
                            onClick={() => setSelectedLeadId(lead.id)}
                            className={`w-full text-left p-3 sm:p-4 flex items-center justify-between transition
                              ${
                                active
                                  ? "bg-blue-50 border-l-4 border-blue-600"
                                  : "hover:bg-gray-50"
                              }`}
                          >
                            <div>
                              <div className="text-sm sm:text-base font-medium text-gray-900">
                                {lead.name}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-500">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold
                                  ${
                                    lead.status === "hot"
                                      ? "bg-red-50 text-red-600"
                                      : lead.status === "warm"
                                      ? "bg-yellow-50 text-yellow-700"
                                      : "bg-blue-50 text-blue-700"
                                  }`}
                                >
                                  {lead.status.toUpperCase()}
                                </span>
                                <span>{lead.source}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {lead.lastSeen}
                                </span>
                              </div>
                            </div>

                            {active && (
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 grid place-items-center">
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Executives Section */}
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Step 2: Select Sales Executive
                </h3>

                <div className="mt-3 space-y-3">
                  {executives.map((ex) => {
                    const active = selectedExecId === ex.id;
                    const pct = Math.min(
                      100,
                      Math.round((ex.leadsAssigned / ex.leadsLimit) * 100)
                    );

                    const barColor =
                      pct >= 95
                        ? "bg-red-500"
                        : pct >= 80
                        ? "bg-orange-500"
                        : "bg-green-500";

                    return (
                      <button
                        key={ex.id}
                        onClick={() => setSelectedExecId(ex.id)}
                        className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-2xl border transition
                          ${
                            active
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full grid place-items-center text-white font-semibold text-sm sm:text-base"
                            style={{
                              backgroundColor: ex.avatarColor || "#9CA3AF",
                            }}
                          >
                            {ex.name?.[0]?.toUpperCase()}
                          </div>

                          <div className="text-left">
                            <div className="text-sm sm:text-base font-semibold text-gray-900">
                              {ex.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-2">
                              <span>
                                {ex.leadsAssigned}/{ex.leadsLimit} leads
                              </span>
                              <span>•</span>
                              <span className="capitalize">{ex.priority}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right min-w-[110px] sm:min-w-[140px]">
                          <div className="w-24 sm:w-28 h-2 rounded-full bg-gray-200 overflow-hidden ml-auto">
                            <div
                              className={`${barColor} h-full`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-600 mt-2">
                            {pct}% capacity
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* AI Recommendation */}
                {(aiRecommendation?.message || aiRecommendation?.execIds) && (
                  <div className="mt-4 border border-purple-200 bg-purple-50 rounded-2xl p-4 flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 grid place-items-center">
                      <Sparkles className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-purple-900">
                        AI Recommendation
                      </div>
                      <p className="text-sm text-purple-700 mt-1">
                        {aiRecommendation?.message ||
                          "Based on availability and performance, we recommend assigning to top candidates."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 p-4 sm:p-5 border-t border-gray-200 bg-white">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 h-11 rounded-xl border border-gray-200 bg-white font-semibold text-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleAssign}
              disabled={!selectedLeadId || !selectedExecId || isBusy}
              className={`w-full sm:w-auto px-6 h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition
                ${
                  selectedLeadId && selectedExecId && !isBusy
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              <UserPlus className="w-4 h-4" />
              {isBusy ? "Assigning..." : "Assign Lead"}
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-black grid place-items-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm font-medium text-gray-900">{toastMsg}</div>
          </div>
        </div>
      )}
    </>
  );
}
