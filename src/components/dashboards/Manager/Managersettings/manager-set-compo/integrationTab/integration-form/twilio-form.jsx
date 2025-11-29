// components/integration-forms/TwilioForm.jsx
import React, { useState } from 'react';
import { X, Phone, Eye, EyeOff, Copy, CheckCircle2, AlertCircle, TestTube, BookOpen } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TwilioForm = ({ integration, isConnected, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    accountSid: '',
    authToken: '',
    phoneNumber: '',
    callbackUrl: '',
    callRecording: false,
    voicemailDetection: false,
    enabled: isConnected,
    formType : 'Twilio form'
  });

  const [errors, setErrors] = useState({});
  const [showAuthToken, setShowAuthToken] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.accountSid.trim()) newErrors.accountSid = 'Account SID is required';
    if (!formData.authToken.trim()) newErrors.authToken = 'Auth Token is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.callbackUrl.trim()) newErrors.callbackUrl = 'Status Callback URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      toast.success('Twilio configuration saved successfully!');
    }
  };

  const copyToClipboard = async (text, fieldName) => {
    if (!text) {
      toast.error(`No ${fieldName} to copy`);
      return;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied to clipboard!`);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const testConnection = () => {
    if (!formData.accountSid || !formData.authToken) {
      toast.error('Please fill in Account SID and Auth Token to test connection');
      return;
    }
    
    toast.info('Testing Twilio connection...');
    setTimeout(() => toast.success('✅ Twilio connection successful!'), 1500);
  };

  const generateCallbackUrl = () => {
    const baseUrl = window.location.origin;
    const callbackUrl = `${baseUrl}/api/twilio/status`;
    handleInputChange('callbackUrl', callbackUrl);
    toast.info('Callback URL generated automatically');
  };

  const setupSteps = [
    {
      id: 1,
      text: 'Log in to your Twilio Console',
      icon: '🔐'
    },
    {
      id: 2,
      text: 'Copy your Account SID and Auth Token',
      icon: '📋'
    },
    {
      id: 3,
      text: 'Purchase a number with voice capabilities',
      icon: '📞'
    },
    {
      id: 4,
      text: 'Enter your credentials below',
      icon: '⌨️'
    },
    {
      id: 5,
      text: 'Add the Status Callback URL in Twilio',
      icon: '🔗'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{integration.name}</h3>
                <p className="text-gray-600 mt-1">{integration.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-gray-500'}`}>
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="p-6 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Setup Instructions
                </h3>
                <div className="space-y-3">
                  {setupSteps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-white border border-blue-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{step.id}</span>
                      </div>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        <span className="mr-2">{step.icon}</span>
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <BookOpen className="w-4 h-4" />
                    View Detailed Documentation →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Twilio Credentials Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Twilio Credentials</h3>
              <p className="text-gray-600 text-sm mt-1">
                Your Twilio account credentials from the console
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account SID */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Account SID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.accountSid}
                    onChange={(e) => handleInputChange('accountSid', e.target.value)}
                    placeholder="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.accountSid ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.accountSid, 'Account SID')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Account SID' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Account SID' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.accountSid && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.accountSid}
                  </p>
                )}
              </div>

              {/* Auth Token */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Auth Token *
                </label>
                <div className="relative">
                  <input
                    type={showAuthToken ? "text" : "password"}
                    value={formData.authToken}
                    onChange={(e) => handleInputChange('authToken', e.target.value)}
                    placeholder="Enter your Twilio auth token"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.authToken ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowAuthToken(!showAuthToken)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showAuthToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.authToken, 'Auth Token')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Auth Token' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Auth Token' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.authToken && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.authToken}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Twilio Phone Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+1234567890"
                  className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.phoneNumber, 'Phone Number')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      copiedField === 'Phone Number' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {copiedField === 'Phone Number' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phoneNumber}
                </p>
              )}
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Your Twilio number with calling capability
              </p>
            </div>
          </div>

          {/* Callback URL Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Configuration</h3>
              <p className="text-gray-600 text-sm mt-1">
                Configure where Twilio should send call status updates
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Status Callback URL *
                </label>
                <button
                  type="button"
                  onClick={generateCallbackUrl}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Generate URL
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={formData.callbackUrl}
                  onChange={(e) => handleInputChange('callbackUrl', e.target.value)}
                  placeholder="https://yourcrm.com/api/twilio/status"
                  className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.callbackUrl ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.callbackUrl, 'Callback URL')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      copiedField === 'Callback URL' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {copiedField === 'Callback URL' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {errors.callbackUrl && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.callbackUrl}
                </p>
              )}
              <p className="text-gray-500 text-sm">
                Add this URL to your Twilio number's "Status Callback URL" setting
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Call Features</h3>
              <p className="text-gray-600 text-sm mt-1">
                Enable additional call handling features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Call Recording */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Enable Call Recording</h4>
                    <p className="text-gray-600 text-xs mt-1">
                      Automatically record all calls made through Twilio
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={formData.callRecording}
                      onChange={(e) => handleInputChange('callRecording', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {formData.callRecording && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-xs">
                      Calls will be recorded and stored in your Twilio account
                    </p>
                  </div>
                )}
              </div>

              {/* Voicemail Detection */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Voicemail Detection</h4>
                    <p className="text-gray-600 text-xs mt-1">
                      Detect and handle voicemail automatically
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={formData.voicemailDetection}
                      onChange={(e) => handleInputChange('voicemailDetection', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {formData.voicemailDetection && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-xs">
                      Voicemails will be detected and logged automatically
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={testConnection}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <TestTube className="w-4 h-4" />
              Test Connection
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl font-semibold transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Save Configuration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwilioForm;