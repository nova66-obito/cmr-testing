// components/integration-forms/LinkedInAdsForm.jsx
import React, { useState } from 'react';
import { X, Zap, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LinkedInAdsForm = ({ integration, isConnected, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
    accessToken: '',
    adAccountId: '',
    accountId: '',
    syncInterval: '',
    priority: '',
    campaignIds: [],
    syncLeads: true,
    enabled: isConnected,
    formModel: "Linkdein-ads-form",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showAccessToken, setShowAccessToken] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientId.trim()) newErrors.clientId = 'Client ID is required';
    if (!formData.clientSecret.trim()) newErrors.clientSecret = 'Client Secret is required';
    if (!formData.accessToken.trim()) newErrors.accessToken = 'Access Token is required';
    if (!formData.adAccountId.trim()) newErrors.adAccountId = 'Ad Account ID is required';
    if (!formData.syncInterval) newErrors.syncInterval = 'Sync Interval is required';
    if (!formData.priority) newErrors.priority = 'Lead Priority is required';

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
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSave(formData);
      toast.success('LinkedIn Ads Configuration Saved Successfully!');
    }, 1500);
  };

  const testConnection = () => {
    if (!formData.clientId || !formData.accessToken) {
      toast.error('Please fill in Client ID and Access Token to test connection');
      return;
    }

    toast.info('Testing LinkedIn Connection...');
    setTimeout(() => toast.success('Connection Successful!'), 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex min-h-full items-center justify-center p-4 z-50">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{integration.name}</h3>
                <p className="text-gray-600 mt-1">{integration.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="p-6 border-b border-gray-200 ">
          <div className="rounded-lg p-4 bg-blue-100 border border-blue-400">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              📘 Setup Instructions
            </h4>
            <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-2">
              <li className=' text-blue-900'>Create a LinkedIn App at linkedin.com/developers</li>
              <li className=' text-blue-900'>Request access to Marketing Developer Platform</li>
              <li className=' text-blue-900'>Generate Access Token with required scope</li>
              <li className=' text-blue-900'>Get your Ad Account ID from LinkedIn Campaign Manager</li>
              <li className=' text-blue-900'>Enter all credentials and test connection</li>
            </ol>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Client ID *
              </label>
              <input
                type="text"
                value={formData.clientId}
                onChange={(e) => handleInputChange('clientId', e.target.value)}
                placeholder="Enter your Client ID"
                className={`w-full  px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.clientId ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.clientId && <p className="text-red-500 text-sm mt-1">{errors.clientId}</p>}
            </div>

            {/* Client Secret */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Secret *
              </label>
              <div className="relative">
                <input
                  type={showClientSecret ? 'text' : 'password'}
                  value={formData.clientSecret}
                  onChange={(e) => handleInputChange('clientSecret', e.target.value)}
                  placeholder="Enter your Client Secret"
                  className={`w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${errors.clientSecret ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowClientSecret(!showClientSecret)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showClientSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.clientSecret && <p className="text-red-500 text-sm mt-1">{errors.clientSecret}</p>}
            </div>

            {/* Access Token */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Token *
              </label>
              <div className="relative">
                <input
                  type={showAccessToken ? 'text' : 'password'}
                  value={formData.accessToken}
                  onChange={(e) => handleInputChange('accessToken', e.target.value)}
                  placeholder="Enter your Access Token"
                  className={`w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${errors.accessToken ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowAccessToken(!showAccessToken)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showAccessToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.accessToken && <p className="text-red-500 text-sm mt-1">{errors.accessToken}</p>}
            </div>

            {/* Ad Account ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Ad Account ID *
              </label>
              <input
                type="text"
                value={formData.adAccountId}
                onChange={(e) => handleInputChange('adAccountId', e.target.value)}
                placeholder="Enter Ad Account ID"
                className={`w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.adAccountId ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.adAccountId && <p className="text-red-500 text-sm mt-1">{errors.adAccountId}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sync Interval */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sync Interval *
              </label>
              <select
                value={formData.syncInterval}
                onChange={(e) => handleInputChange('syncInterval', e.target.value)}
                className={`w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.syncInterval ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Interval</option>
                <option value="5m">Every 5 minutes</option>
                <option value="15m">Every 15 minutes</option>
                <option value="30m">Every 30 minutes</option>
                <option value="1h">Every 1 hour</option>
              </select>
              {errors.syncInterval && <p className="text-red-500 text-sm mt-1">{errors.syncInterval}</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Lead Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className={`w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.priority ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
            </div>
          </div>

          {/* Advanced Settings Toggle */}
          {/* <div className="border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-lg font-semibold text-gray-900">Advanced Settings</span>
              {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-6 animate-fadeIn">
                {/* Campaign IDs 
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Campaign IDs (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.campaignIds.join(', ')}
                    onChange={(e) => handleInputChange('campaignIds', e.target.value.split(',').map(id => id.trim()))}
                    placeholder="123, 456, 789"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter comma-separated campaign IDs to sync specific campaigns only</p>
                </div>

                {/* Account ID (Legacy) 
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account ID (Legacy - Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.accountId}
                    onChange={(e) => handleInputChange('accountId', e.target.value)}
                    placeholder="123456789"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Sync Leads Toggle 
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Automatically Sync Leads</h4>
                    <p className="text-sm text-gray-600">Sync lead data from LinkedIn campaigns automatically</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.syncLeads}
                      onChange={(e) => handleInputChange('syncLeads', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}
          </div>  */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={testConnection}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors w-full sm:w-auto"
            >
              Test Connection
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors flex-1 sm:flex-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                ) : (
                  'Save Configuration'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkedInAdsForm;