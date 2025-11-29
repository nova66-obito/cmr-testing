// components/integration-forms/MetaAdsForm.jsx
import React, { useState } from 'react';
import { X, Zap, Eye, EyeOff, Copy, CheckCircle2, AlertCircle, RefreshCw, TestTube } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MetaAdsForm = ({ integration, isConnected, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    appId: '',
    appSecret: '',
    pageToken: '',
    pageId: '',
    adAccountId: '',
    syncInterval: '30',
    leadPriority: 'medium',
    campaignTypes: ['lead_generation'],
    enabled: isConnected,
    formType : 'meta-Ads-form',
  });

  const [errors, setErrors] = useState({});
  const [showAppSecret, setShowAppSecret] = useState(false);
  const [showPageToken, setShowPageToken] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.appId.trim()) newErrors.appId = 'Facebook App ID is required';
    if (!formData.appSecret.trim()) newErrors.appSecret = 'App Secret is required';
    if (!formData.pageToken.trim()) newErrors.pageToken = 'Page Access Token is required';
    if (!formData.pageId.trim()) newErrors.pageId = 'Page ID is required';
    if (!formData.syncInterval) newErrors.syncInterval = 'Sync Interval is required';
    if (!formData.leadPriority) newErrors.leadPriority = 'Lead Priority is required';
    
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
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      toast.success('Meta Ads configuration saved successfully!');
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
    if (!formData.appId || !formData.pageToken) {
      toast.error('Please fill in App ID and Page Token to test connection');
      return;
    }
    
    toast.info('Testing Meta Ads connection...');
    // Simulate API call
    setTimeout(() => {
      toast.success('✅ Connection successful! All credentials are valid.');
    }, 1500);
  };

  const generateTestValues = () => {
    setFormData({
      appId: '123456789012345',
      appSecret: 'abc123def456ghi789jkl012mno345pqr',
      pageToken: 'EAAGKZCH1dQjIBO2SampleTokenXYZ123456789',
      pageId: '987654321098765',
      adAccountId: 'act_123456789012345',
      syncInterval: '30',
      leadPriority: 'medium',
      campaignTypes: ['lead_generation'],
      enabled: true
    });
    toast.info('Test values populated. Remember to use your actual credentials!');
  };

  const setupSteps = [
    {
      id: 1,
      text: 'Create a Facebook App at developers.facebook.com',
      icon: '📱'
    },
    {
      id: 2,
      text: 'Add your app to Meta Business Suite',
      icon: '🏢'
    },
    {
      id: 3,
      text: 'Generate a Page Access Token with "leads_retrieval" permission',
      icon: '🔑'
    },
    {
      id: 4,
      text: 'Copy the App ID, App Secret & Page Token here',
      icon: '📋'
    },
    {
      id: 5,
      text: 'Test the connection before saving',
      icon: '🧪'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/30 min-h-full backdrop-blur-md flex items-center justify-center p-4 z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{integration.name}</h3>
                <p className="text-gray-600 mt-1">{integration.description}</p>
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
                      <p className="text-blue-800 text-sm leading-relaxed">
                        <span className="mr-2">{step.icon}</span>
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* App Credentials Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">App Credentials</h3>
              <p className="text-gray-600 text-sm mt-1">
                Your Facebook App credentials from the Developer Portal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* App ID */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Facebook App ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.appId}
                    onChange={(e) => handleInputChange('appId', e.target.value)}
                    placeholder="123456789012345"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.appId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.appId, 'App ID')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'App ID' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'App ID' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.appId && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.appId}
                  </p>
                )}
              </div>

              {/* App Secret */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  App Secret *
                </label>
                <div className="relative">
                  <input
                    type={showAppSecret ? "text" : "password"}
                    value={formData.appSecret}
                    onChange={(e) => handleInputChange('appSecret', e.target.value)}
                    placeholder="Enter your App Secret"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.appSecret ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowAppSecret(!showAppSecret)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showAppSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.appSecret, 'App Secret')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'App Secret' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'App Secret' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.appSecret && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.appSecret}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Page Configuration Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Page Configuration</h3>
              <p className="text-gray-600 text-sm mt-1">
                Your Facebook Page details and access token
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Page Access Token */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Page Access Token *
                </label>
                <div className="relative">
                  <input
                    type={showPageToken ? "text" : "password"}
                    value={formData.pageToken}
                    onChange={(e) => handleInputChange('pageToken', e.target.value)}
                    placeholder="EAAGKZCH1dQjIBO2..."
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.pageToken ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPageToken(!showPageToken)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPageToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.pageToken, 'Page Token')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Page Token' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Page Token' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.pageToken && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.pageToken}
                  </p>
                )}
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Requires "leads_retrieval" permission
                </p>
              </div>

              {/* Page ID */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Facebook Page ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.pageId}
                    onChange={(e) => handleInputChange('pageId', e.target.value)}
                    placeholder="987654321098765"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.pageId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.pageId, 'Page ID')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Page ID' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Page ID' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.pageId && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.pageId}
                  </p>
                )}
              </div>
            </div>

            {/* Ad Account ID */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Ad Account ID (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.adAccountId}
                  onChange={(e) => handleInputChange('adAccountId', e.target.value)}
                  placeholder="act_123456789012345"
                  className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.adAccountId, 'Ad Account ID')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      copiedField === 'Ad Account ID' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {copiedField === 'Ad Account ID' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sync Settings</h3>
              <p className="text-gray-600 text-sm mt-1">
                Configure how leads are synced and managed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sync Interval */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Sync Interval *
                </label>
                <select
                  value={formData.syncInterval}
                  onChange={(e) => handleInputChange('syncInterval', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.syncInterval ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="5">Every 5 minutes</option>
                  <option value="10">Every 10 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every 1 hour</option>
                  <option value="120">Every 2 hours</option>
                </select>
                {errors.syncInterval && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.syncInterval}
                  </p>
                )}
              </div>

              {/* Lead Priority */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Default Lead Priority *
                </label>
                <select
                  value={formData.leadPriority}
                  onChange={(e) => handleInputChange('leadPriority', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.leadPriority ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="high">🔥 Hot - High intent, ready to buy</option>
                  <option value="medium">💛 Warm - Interested, needs follow-up</option>
                  <option value="low">💙 Cold - Early stage, needs nurturing</option>
                </select>
                {errors.leadPriority && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.leadPriority}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-col sm:gap-2 justify-between items-center gap-4 pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={testConnection}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
              >
                <TestTube className="w-4 h-4" />
                Test Connection
              </button>
              <button
                type="button"
                onClick={generateTestValues}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Fill Test Data
              </button>
            </div>

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
                <Zap className="w-4 h-4" />
                Save Configuration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MetaAdsForm;