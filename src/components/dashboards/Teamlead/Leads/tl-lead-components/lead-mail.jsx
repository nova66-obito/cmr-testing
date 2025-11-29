import { useState } from "react";
import { X, Paperclip, Send, User, FileText } from "lucide-react";

export default function EmailModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    template: "",
    to: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.to.trim()) newErrors.to = "Recipient email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.to)) newErrors.to = "Invalid email format";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    alert("Email sent successfully!");
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Compose Email</h2>
                <p className="text-blue-100 text-sm">Send a new email message</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white hover:text-gray-200" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Template Selector */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-500" />
                Email Template
              </label>
              <select
                name="template"
                value={formData.template}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300"
              >
                <option value="">Choose a template (optional)</option>
                <option value="welcome">🎉 Welcome Template</option>
                <option value="followup">📧 Follow-Up Template</option>
                <option value="newsletter">📰 Newsletter Template</option>
              </select>
            </div>

            {/* Recipient Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 text-green-500" />
                To <span className="text-red-500">*</span>
              </label>
              <input
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="recipient@example.com"
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300
                  ${errors.to ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
              />
              {errors.to && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  ⚠️ {errors.to}
                </p>
              )}
            </div>

            {/* Subject Field */}
            <div className="group">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter email subject..."
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300
                  ${errors.subject ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  ⚠️ {errors.subject}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="group">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your email message here... You can use rich text formatting to make your message more engaging."
                rows="6"
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300 resize-none
                  ${errors.message ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  ⚠️ {errors.message}
                </p>
              )}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {formData.message.length} characters
                </span>
                <span className="text-xs text-gray-500">
                  ⚡ Write with clarity and purpose
                </span>
              </div>
            </div>

            {/* Attachment Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors duration-200">
              <button
                type="button"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 w-full justify-center group"
              >
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                  <Paperclip className="w-5 h-5 text-blue-500" />
                </div>
                <span className="font-medium">Add Attachment</span>
                <span className="text-gray-400 text-sm">(Max 25MB)</span>
              </button>
              <p className="text-center text-xs text-gray-500 mt-2">
                Supported formats: PDF, DOC, JPG, PNG
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Email
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}