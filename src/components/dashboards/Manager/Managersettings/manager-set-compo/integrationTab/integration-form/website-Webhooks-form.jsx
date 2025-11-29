// components/integration-forms/WebsiteWebhooksForm.jsx
import React, { useState, useEffect } from 'react';
import { X, Globe, Shield, Users, Target, Copy, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WebsiteWebhooksForm = ({ 
  integration, 
  isConnected, 
  onSave, 
  onClose,
  isModal = true 
}) => {
  // Generate default values
  const generateDefaultWebhookUrl = () => {
    const baseUrl = window.location.origin;
    const randomId = Math.random().toString(36).substring(2, 10);
    return `${baseUrl}/api/webhooks/leads/${randomId}`;
  };

  const generateDefaultSecretKey = () => {
    return `whsk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
  };

  const [formData, setFormData] = useState({
    webhookUrl: '',
    secretKey: '',
    allowedDomains: '',
    events: ['lead_submission', 'form_submission'],
    autoAssign: false,
    priority: 'warm',
    enabled: isConnected,
    formType : 'websit-WebHooks-Form'
  });

  const [errors, setErrors] = useState({});
  const [copiedField, setCopiedField] = useState('');

  // Set default values on component mount
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      webhookUrl: generateDefaultWebhookUrl(),
      secretKey: generateDefaultSecretKey(),
      allowedDomains: window.location.hostname
    }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.webhookUrl.trim()) {
      newErrors.webhookUrl = 'Webhook URL is required';
    } else if (!formData.webhookUrl.startsWith('https://') && !formData.webhookUrl.startsWith('http://')) {
      newErrors.webhookUrl = 'Webhook URL must start with https:// or http://';
    }
    
    if (!formData.secretKey.trim()) {
      newErrors.secretKey = 'Secret key is required';
    }

    if (!formData.allowedDomains.trim()) {
      newErrors.allowedDomains = 'Allowed domains are required';
    }

    if (!formData.priority.trim()) {
      newErrors.priority = 'Default priority is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      toast.success('Webhook configuration saved successfully!');
    }
  };

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied to clipboard!`);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const regenerateWebhookUrl = () => {
    setFormData(prev => ({
      ...prev,
      webhookUrl: generateDefaultWebhookUrl()
    }));
    toast.info('New webhook URL generated');
  };

  const regenerateSecretKey = () => {
    setFormData(prev => ({
      ...prev,
      secretKey: generateDefaultSecretKey()
    }));
    toast.info('New secret key generated');
  };

  const setupSteps = [
    {
      id: 1,
      text: 'Copy the webhook URL and add it to your website form configuration',
      icon: Copy
    },
    {
      id: 2,
      text: 'Include the secret key in your webhook requests header as "X-Webhook-Secret"',
      icon: Shield
    },
    {
      id: 3,
      text: 'Configure allowed domains to restrict incoming webhook sources',
      icon: Globe
    },
    {
      id: 4,
      text: 'Test the integration by submitting a form on your website',
      icon: CheckCircle2
    }
  ];

  // Form content that can be used in both modal and full-page layouts
  const formContent = (
    <>
      <ToastContainer />
      <div className="space-y-8 ">
        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
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
                    <p className="text-blue-800 text-sm leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Webhook Configuration</h3>
            <p className="text-gray-600 text-sm mt-1">
              Configure your webhook endpoint and security settings
            </p>
          </div>

          {/* Webhook URL */}
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Webhook URL *
              </label>
              <button
                type="button"
                onClick={regenerateWebhookUrl}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                Regenerate
              </button>
            </div>
            <div className="relative">
              <input
                type="url"
                value={formData.webhookUrl}
                onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                placeholder="https://yourwebsite.com/api/webhooks/leads"
                className={`w-full px-4 py-3 pr-24 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
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
            {errors.webhookUrl ? (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.webhookUrl}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                This is the endpoint where we'll send your form submissions
              </p>
            )}
          </div>

          {/* Secret Key */}
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Secret Key *
              </label>
              <button
                type="button"
                onClick={regenerateSecretKey}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                Regenerate
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={formData.secretKey}
                onChange={(e) => handleInputChange('secretKey', e.target.value)}
                placeholder="Enter a secure secret key for webhook verification"
                className={`w-full px-4 py-3 pr-24 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                  errors.secretKey ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <button
                  type="button"
                  onClick={() => copyToClipboard(formData.secretKey, 'Secret Key')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    copiedField === 'Secret Key' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {copiedField === 'Secret Key' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {errors.secretKey ? (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.secretKey}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Use this key in the "X-Webhook-Secret" header of your requests
              </p>
            )}
          </div>

          {/* Allowed Domains */}
          <div className="grid grid-cols-1 gap-2">
            <label className="block text-sm font-semibold text-gray-700">
              Allowed Domains *
            </label>
            <textarea
              value={formData.allowedDomains}
              onChange={(e) => handleInputChange('allowedDomains', e.target.value)}
              placeholder="example.com&#10;yourdomain.com&#10;*.subdomain.com"
              rows={3}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none font-mono text-sm ${
                errors.allowedDomains ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.allowedDomains ? (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.allowedDomains}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Enter one domain per line. Use * for wildcard subdomains. Webhooks will only be accepted from these domains.
              </p>
            )}
          </div>
        </div>

        {/* Lead Management Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Lead Management</h3>
            <p className="text-gray-600 text-sm mt-1">
              Configure how incoming leads should be handled
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Auto-assign Toggle */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Auto-assign Leads</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Automatically assign incoming leads to team members
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoAssign}
                    onChange={(e) => handleInputChange('autoAssign', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {formData.autoAssign && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">
                    Leads will be automatically assigned using your team's round-robin system
                  </p>
                </div>
              )}
            </div>

            {/* Priority Selection */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Default Lead Priority *
              </label>
              <div className="space-y-3">
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.priority ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="hot">🔥 Hot - High intent, ready to buy</option>
                  <option value="warm">💛 Warm - Interested, needs follow-up</option>
                  <option value="cold">💙 Cold - Early stage, needs nurturing</option>
                </select>
                {errors.priority && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.priority}
                  </p>
                )}
                {formData.priority && (
                  <div className={`text-sm p-3 rounded-lg ${
                    formData.priority === 'hot' ? 'bg-red-50 text-red-800 border border-red-200' :
                    formData.priority === 'warm' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
                    'bg-blue-50 text-blue-800 border border-blue-200'
                  }`}>
                    {formData.priority === 'hot' && 'Hot leads will be prioritized and contacted immediately'}
                    {formData.priority === 'warm' && 'Warm leads will be followed up within 24 hours'}
                    {formData.priority === 'cold' && 'Cold leads will be added to your nurturing sequence'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Copy Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Copy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Webhook URL</span>
                <button
                  onClick={() => copyToClipboard(formData.webhookUrl, 'Webhook URL')}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  {copiedField === 'Webhook URL' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 font-mono truncate">{formData.webhookUrl}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Secret Key</span>
                <button
                  onClick={() => copyToClipboard(formData.secretKey, 'Secret Key')}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  {copiedField === 'Secret Key' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 font-mono truncate">{formData.secretKey}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Shield className="w-5 h-5" />
            Save Configuration
          </button>
          {isModal && (
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );

  // Modal version
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center min-h-full justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{integration.name}</h3>
                  <p className="text-gray-600 mt-1">{integration.description}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors duration-200 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {formContent}
          </form>
        </div>
      </div>
    );
  }

  // Full-page version
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Configure Website Webhooks</h1>
                <p className="text-blue-100 mt-1">
                  Set up webhook endpoints to receive lead data from your websites
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {formContent}
          </form>
        </div>
      </div>
    </div>
  );
};

export default WebsiteWebhooksForm;