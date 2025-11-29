import React, { useState } from "react";
import { X, Link2, CreditCard, Smartphone, Globe, Wallet, Shield, Zap, ChevronDown, ChevronUp } from "lucide-react";

export default function SalesGeneratePaymentLinkModal({ isOpen, onClose, lead }) {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    amount: true,
    purpose: true,
    paymentMode: true,
    security: true
  });

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!purpose.trim()) {
      newErrors.purpose = "Payment purpose is required";
    }
    if (!paymentMode) {
      newErrors.paymentMode = "Please select a payment mode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    
    const payload = {
      lead: lead?.name,
      amount,
      purpose,
      paymentMode,
    };

    console.log("Generate Payment Link:", payload);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    onClose();
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const paymentMethods = [
    { value: "UPI", label: "UPI", icon: Smartphone, color: "from-purple-500 to-indigo-500", bg: "bg-purple-100" },
    { value: "Card", label: "Credit/Debit Card", icon: CreditCard, color: "from-blue-500 to-cyan-500", bg: "bg-blue-100" },
    { value: "Net Banking", label: "Net Banking", icon: Globe, color: "from-green-500 to-emerald-500", bg: "bg-green-100" },
    { value: "Wallet", label: "Digital Wallet", icon: Wallet, color: "from-orange-500 to-amber-500", bg: "bg-orange-100" },
    { value: "Razorpay", label: "Razorpay All", icon: Zap, color: "from-red-500 to-pink-500", bg: "bg-red-100" },
  ];

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">
        
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Generate Payment Link</h2>
                <p className="text-green-100 text-sm mt-1">Create secure payment link for {lead?.name}</p>
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
          {/* Amount Section - Collapsible */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <button
              onClick={() => toggleSection('amount')}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Amount <span className="text-red-500">*</span>
              </div>
              {expandedSections.amount ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {expandedSections.amount && (
              <div className="p-4 space-y-3">
                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        amount === quickAmount.toString()
                          ? "bg-green-500 text-white shadow-md scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      ₹{quickAmount.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    ₹
                  </div>
                  <input
                    type="number"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 bg-white
                      ${errors.amount 
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                        : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      }`}
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      if (errors.amount) setErrors({ ...errors, amount: "" });
                    }}
                    min="1"
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    ⚠️ {errors.amount}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Payment Purpose Section - Collapsible */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <button
              onClick={() => toggleSection('purpose')}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Payment Purpose <span className="text-red-500">*</span>
              </div>
              {expandedSections.purpose ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {expandedSections.purpose && (
              <div className="p-4">
                <input
                  type="text"
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-200 bg-white
                    ${errors.purpose 
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                  placeholder="e.g., Premium package subscription, Initial deposit, Service fee..."
                  value={purpose}
                  onChange={(e) => {
                    setPurpose(e.target.value);
                    if (errors.purpose) setErrors({ ...errors, purpose: "" });
                  }}
                />
                {errors.purpose && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    ⚠️ {errors.purpose}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Payment Mode Section - Collapsible */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <button
              onClick={() => toggleSection('paymentMode')}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Payment Method <span className="text-red-500">*</span>
              </div>
              {expandedSections.paymentMode ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {expandedSections.paymentMode && (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <button
                        key={method.value}
                        onClick={() => {
                          setPaymentMode(method.value);
                          if (errors.paymentMode) setErrors({ ...errors, paymentMode: "" });
                        }}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          paymentMode === method.value
                            ? `border-purple-500 bg-purple-50 scale-95 shadow-sm`
                            : "border-gray-200 hover:border-purple-300 hover:bg-purple-25 hover:scale-105"
                        } active:scale-95`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${method.bg}`}>
                            <IconComponent className="w-4 h-4 text-gray-700" />
                          </div>
                          <span className="font-medium text-sm">{method.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {errors.paymentMode && (
                  <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
                    ⚠️ {errors.paymentMode}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Security & Info Section - Collapsible */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <button
              onClick={() => toggleSection('security')}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Security & Information
              </div>
              {expandedSections.security ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {expandedSections.security && (
              <div className="p-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">
                        Secure Payment Processing
                      </h4>
                      <p className="text-blue-700 text-xs">
                        Powered by Razorpay • SSL Encrypted • 7-day validity • Multiple payment options available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <h5 className="font-medium text-amber-800 text-sm mb-1">💡 Payment Link Details</h5>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li>• Link will be valid for 7 days</li>
                    <li>• Customer can pay using any method</li>
                    <li>• Real-time payment notifications</li>
                    <li>• Automatic receipt generation</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer with Actions */}
        <div className="flex-shrink-0 border-t border-gray-200 p-6 bg-white rounded-b-2xl">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {amount && (
                <span className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full text-green-700">
                  ₹{parseFloat(amount).toLocaleString()}
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
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    Generate Link
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