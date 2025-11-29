import React, { useState } from "react";
import { X, Send, MessageCircle, User, Phone, Copy } from "lucide-react";

const templates = {
  introduction: "Hi {name}! 👋 Just wanted to introduce myself and connect with you.",
  followup: "Hi {name}! Following up on our last conversation. How can I assist you further?",
  payment: "Hi {name}! Here is your payment link: https://payment.com/link\n\nLet me know if you need any help!",
  custom: ""
};

export default function SalesWhatsAppModal({ isOpen, onClose, lead }) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleTemplateClick = (type) => {
    setSelectedTemplate(type);
    const templateMessage = templates[type] || "";
    const personalizedMessage = templateMessage.replace(/{name}/g, lead?.name || "there");
    setMessage(personalizedMessage);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    alert(`Message sent to ${lead?.name}!`);
    onClose();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">WhatsApp Message</h2>
                <p className="text-green-100 text-sm mt-1">Send a message directly to {lead?.name}</p>
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

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Lead Card */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{lead?.name || "Lead Name"}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{lead?.phone || "+1 234 567 8900"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Templates Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Quick Templates
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries({
                introduction: "Introduction",
                followup: "Follow-up",
                payment: "Payment Link",
                custom: "Custom"
              }).map(([key, label]) => (
                <button
                  key={key}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                    selectedTemplate === key
                      ? "bg-green-50 border-green-500 text-green-700 shadow-sm scale-95"
                      : "border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-25 hover:scale-105"
                  } active:scale-95`}
                  onClick={() => handleTemplateClick(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Editor */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Your Message
              </h3>
              <button
                onClick={copyToClipboard}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 border-2 border-gray-200 rounded-xl p-4 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 resize-none bg-gray-50 hover:bg-white"
                placeholder="Type your WhatsApp message here... You can use emojis to make it more engaging! 😊"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {message.length} characters
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Preview
            </h3>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 min-h-[80px]">
              {message ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">{message}</div>
                  <div className="text-xs text-green-600 font-medium">✓ Ready to send via WhatsApp</div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm italic flex items-center justify-center h-16">
                  Your message preview will appear here...
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!message.trim() || isSending}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}