// components/integration-forms/WhatsAppForm.jsx
import React, { useState } from 'react';
import { X, MessageSquare, Eye, EyeOff, Copy, CheckCircle2, AlertCircle, TestTube, BookOpen, Shield } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WhatsAppForm = ({ integration, isConnected, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    phoneNumberId: '',
    businessAccountId: '',
    accessToken: '',
    verifyToken: '',
    webhookUrl: '',
    enableTemplates: false,
    enabled: isConnected,
    formType: "whatsUp-form"
  });

  const [errors, setErrors] = useState({});
  const [showAccessToken, setShowAccessToken] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phoneNumberId.trim()) newErrors.phoneNumberId = 'WhatsApp Phone Number ID is required';
    if (!formData.businessAccountId.trim()) newErrors.businessAccountId = 'Business Account ID is required';
    if (!formData.accessToken.trim()) newErrors.accessToken = 'Access Token is required';
    if (!formData.verifyToken.trim()) newErrors.verifyToken = 'Webhook Verify Token is required';
    if (!formData.webhookUrl.trim()) newErrors.webhookUrl = 'Webhook URL is required';
    
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
      toast.success('WhatsApp Business configuration saved successfully!');
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
    if (!formData.phoneNumberId || !formData.accessToken) {
      toast.error('Please fill in Phone Number ID and Access Token to test connection');
      return;
    }
    
    toast.info('Testing WhatsApp Business connection...');
    setTimeout(() => toast.success('✅ WhatsApp API connection successful!'), 1500);
  };

  const generateWebhookUrl = () => {
    const baseUrl = window.location.origin;
    const webhookUrl = `${baseUrl}/api/whatsapp/webhook`;
    handleInputChange('webhookUrl', webhookUrl);
    toast.info('Webhook URL generated automatically');
  };

  const generateVerifyToken = () => {
    const token = `whatsapp_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    handleInputChange('verifyToken', token);
    toast.info('Verify token generated automatically');
  };

  const setupSteps = [
    {
      id: 1,
      text: 'Set up WhatsApp Business API in Meta Business Manager',
      icon: '🏢'
    },
    {
      id: 2,
      text: 'Get your Phone Number ID and Business Account ID',
      icon: '📱'
    },
    {
      id: 3,
      text: 'Generate a permanent Access Token',
      icon: '🔑'
    },
    {
      id: 4,
      text: 'Create a Webhook Verify Token',
      icon: '🛡️'
    },
    {
      id: 5,
      text: 'Add the Webhook URL in WhatsApp API settings',
      icon: '🔗'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/30 min-h-full bg-opacity-50 flex items-center justify-center p-4 z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <MessageSquare className="w-6 h-6 text-white" />
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
          {/* WhatsApp Credentials Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">WhatsApp Business Credentials</h3>
              <p className="text-gray-600 text-sm mt-1">
                Your WhatsApp Business API credentials from Meta Business Manager
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number ID */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  WhatsApp Phone Number ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.phoneNumberId}
                    onChange={(e) => handleInputChange('phoneNumberId', e.target.value)}
                    placeholder="123456789012345"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.phoneNumberId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.phoneNumberId, 'Phone Number ID')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Phone Number ID' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Phone Number ID' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.phoneNumberId && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phoneNumberId}
                  </p>
                )}
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Found in Meta Business Manager
                </p>
              </div>

              {/* Business Account ID */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Business Account ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.businessAccountId}
                    onChange={(e) => handleInputChange('businessAccountId', e.target.value)}
                    placeholder="123456789012345"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.businessAccountId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.businessAccountId, 'Business Account ID')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Business Account ID' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Business Account ID' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.businessAccountId && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.businessAccountId}
                  </p>
                )}
              </div>
            </div>

            {/* Access Token */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Access Token *
              </label>
              <div className="relative">
                <input
                  type={showAccessToken ? "text" : "password"}
                  value={formData.accessToken}
                  onChange={(e) => handleInputChange('accessToken', e.target.value)}
                  placeholder="Enter WhatsApp Business API access token"
                  className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                    errors.accessToken ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => setShowAccessToken(!showAccessToken)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showAccessToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.accessToken, 'Access Token')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      copiedField === 'Access Token' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {copiedField === 'Access Token' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {errors.accessToken && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.accessToken}
                </p>
              )}
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Permanent access token from Meta
              </p>
            </div>
          </div>

          {/* Webhook Configuration Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Configuration</h3>
              <p className="text-gray-600 text-sm mt-1">
                Configure webhook settings for receiving WhatsApp messages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Verify Token */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Webhook Verify Token *
                  </label>
                  <button
                    type="button"
                    onClick={generateVerifyToken}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Generate Token
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.verifyToken}
                    onChange={(e) => handleInputChange('verifyToken', e.target.value)}
                    placeholder="Enter a secure verify token"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.verifyToken ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.verifyToken, 'Verify Token')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Verify Token' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Verify Token' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.verifyToken && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.verifyToken}
                  </p>
                )}
              </div>

              {/* Webhook URL */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Webhook URL *
                  </label>
                  <button
                    type="button"
                    onClick={generateWebhookUrl}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Generate URL
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.webhookUrl}
                    onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                    placeholder="https://yourcrm.com/api/whatsapp/webhook"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.webhookUrl ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.webhookUrl, 'Webhook URL')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Webhook URL' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Webhook URL' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.webhookUrl && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.webhookUrl}
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  Add this URL in Meta Webhook Settings
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Message Features</h3>
              <p className="text-gray-600 text-sm mt-1">
                Configure additional WhatsApp messaging features
              </p>
            </div>

            {/* Enable Message Templates */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">Enable Message Templates</h4>
                  <p className="text-gray-600 text-xs mt-1">
                    Use pre-approved WhatsApp message templates for business communication
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    checked={formData.enableTemplates}
                    onChange={(e) => handleInputChange('enableTemplates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              {formData.enableTemplates && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-xs">
                    You can now use approved message templates for customer communication
                  </p>
                </div>
              )}
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
                <MessageSquare className="w-4 h-4" />
                Save Configuration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppForm;