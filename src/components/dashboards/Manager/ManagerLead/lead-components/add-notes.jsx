import React, { useState } from "react";
import { X, FileText, Tag, Clock, Zap, User } from "lucide-react";

const categories = [
  { name: "General", icon: "📝", color: "bg-gray-100 text-gray-700" },
  { name: "Follow-up", icon: "🔄", color: "bg-blue-100 text-blue-700" },
  { name: "Reminder", icon: "⏰", color: "bg-orange-100 text-orange-700" },
  { name: "Approval", icon: "✅", color: "bg-green-100 text-green-700" },
  { name: "Meeting", icon: "👥", color: "bg-purple-100 text-purple-700" },
];

const quickNotes = [
  "Customer is interested in our premium plan",
  "Needs more information about pricing",
  "Budget approved for Q4 project",
  "Decision pending from management team",
  "Follow up next week with demo",
  "Very responsive and engaged",
  "Requested case studies",
  "Interested in enterprise features",
];

export default function AddNoteModal({ isOpen, onClose, leadName = "Priya Sharma" }) {
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!note.trim()) {
      setError("Please enter a note before saving");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate API call
    const payload = { 
      category, 
      note,
      timestamp: new Date().toISOString(),
      leadName 
    };
    
    console.log("Saving note:", payload);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onClose();
  };

  const handleQuickNoteClick = (quickNote) => {
    setNote(quickNote);
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">
        
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Add New Note</h2>
                <p className="text-blue-100 text-sm mt-1">Document important information and updates</p>
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
          {/* Lead Information */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{leadName}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Tag className="w-4 h-4 text-blue-500" />
              Note Category
              <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    category === cat.name
                      ? "border-blue-500 bg-blue-50 scale-95"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-25 hover:scale-105"
                  } active:scale-95`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="font-medium text-sm">{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Notes */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Zap className="w-4 h-4 text-yellow-500" />
              Quick Notes
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickNotes.map((qn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickNoteClick(qn)}
                  className="p-3 text-left rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-sm text-gray-700 hover:text-gray-900 hover:scale-105 active:scale-95"
                >
                  {qn}
                </button>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <FileText className="w-4 h-4 text-green-500" />
              Your Note
              <span className="text-red-500">*</span>
            </label>
            
            <div className="relative">
              <textarea
                rows={5}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 resize-none bg-gray-50 hover:bg-white focus:bg-white
                  ${error 
                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                placeholder="Type your detailed note here... 
• What was discussed?
• What are the next steps?
• Any important decisions or insights?"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setError("");
                }}
                maxLength={1000}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {note.length}/1000
              </div>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {error}
              </p>
            )}
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
              💡 Note Writing Tips
            </h4>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Be specific about conversations and decisions</li>
              <li>• Include action items and next steps</li>
              <li>• Note any objections or concerns raised</li>
              <li>• Record important dates and deadlines</li>
            </ul>
          </div>
        </div>

        {/* Fixed Footer with Actions */}
        <div className="flex-shrink-0 border-t border-gray-200 p-6 bg-white rounded-b-2xl">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {category && (
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Category: <span className="font-medium text-gray-700">{category}</span>
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !note.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Save Note
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}