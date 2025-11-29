import React, { useState } from "react";
import { X, TrendingUp, User, Flag, FileText, Calendar, ChevronDown, ChevronUp } from "lucide-react";

export default function SalesUpdateLead({ isOpen, onClose, lead }) {
  const [newStatus, setNewStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    priority: true,
    notes: true
  });

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};
    if (!newStatus) {
      newErrors.newStatus = "Please select a new status";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsUpdating(true);
    const payload = {
      lead: lead?.name,
      newStatus,
      priority,
      notes,
    };
    console.log("Status Updated:", payload);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsUpdating(false);
    onClose();
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const statusOptions = [
    { value: "Interested", label: "Interested", color: "text-green-600", bg: "bg-green-100" },
    { value: "Follow-up", label: "Follow-up", color: "text-blue-600", bg: "bg-blue-100" },
    { value: "Converted", label: "Converted", color: "text-purple-600", bg: "bg-purple-100" },
    { value: "Not Interested", label: "Not Interested", color: "text-red-600", bg: "bg-red-100" },
  ];

  const priorityOptions = [
    { value: "High", label: "High", color: "text-red-600", bg: "bg-red-100" },
    { value: "Medium", label: "Medium", color: "text-yellow-600", bg: "bg-yellow-100" },
    { value: "Low", label: "Low", color: "text-blue-600", bg: "bg-blue-100" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">
        
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Update Lead Status</h2>
                <p className="text-blue-100 text-sm mt-1">Track progress and update lead information</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white hover:text-gray-200" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Lead Information Card */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{lead?.name || "Lead Name"}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Today
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lead?.status === "New" ? "bg-green-100 text-green-800" :
                    lead?.status === "Follow-up" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    Current: {lead?.status || "New"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-4">
            {/* New Status Section - Collapsible */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('status')}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  New Status <span className="text-red-500">*</span>
                </div>
                {expandedSections.status ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSections.status && (
                <div className="p-4 space-y-3">
                  <select
                    className={`w-full p-3 rounded-lg border-2 transition-all duration-200 bg-white
                      ${errors.newStatus 
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                        : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    value={newStatus}
                    onChange={(e) => {
                      setNewStatus(e.target.value);
                      if (errors.newStatus) {
                        setErrors({ ...errors, newStatus: "" });
                      }
                    }}
                  >
                    <option value="">Select new status</option>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.newStatus && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      ⚠️ {errors.newStatus}
                    </p>
                  )}
                  {newStatus && (
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                            newStatus === option.value
                              ? `${option.bg} ${option.color} border-2 border-current`
                              : "bg-gray-100 text-gray-600 opacity-50"
                          }`}
                          onClick={() => setNewStatus(option.value)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Priority Section - Collapsible */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('priority')}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Priority Level
                </div>
                {expandedSections.priority ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSections.priority && (
                <div className="p-4 space-y-3">
                  <select
                    className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="">Select priority (optional)</option>
                    {priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} Priority
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex flex-wrap gap-2">
                    {priorityOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          priority === option.value
                            ? `${option.bg} ${option.color} border-2 border-current`
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setPriority(option.value)}
                      >
                        <Flag className="w-4 h-4" />
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes Section - Collapsible */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('notes')}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Update Notes
                </div>
                {expandedSections.notes ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSections.notes && (
                <div className="p-4 space-y-3">
                  <div className="relative">
                    <textarea
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white resize-none"
                      placeholder="Add reason for status change, next steps, or important notes..."
                      rows="4"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      maxLength={500}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {notes.length}/500
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Add context for this status update
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              💡 Status Update Tips
            </h4>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• Be specific about why the status is changing</li>
              <li>• Note any key conversations or decisions</li>
              <li>• Set clear next steps for follow-up</li>
            </ul>
          </div>
        </div>

        {/* Fixed Footer with Actions */}
        <div className="flex-shrink-0 border-t border-gray-200 p-6 bg-white rounded-b-2xl">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUpdating || !newStatus}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Update Status
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}