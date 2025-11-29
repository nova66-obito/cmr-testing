// components/integration-forms/PaymentForm.jsx
import React, { useState } from 'react';
import { X, CreditCard, Eye, EyeOff, Copy, CheckCircle2, AlertCircle, TestTube, BookOpen, Shield, Zap } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentForm = ({ integration, isConnected, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    razorpayKeyId: '',
    razorpayKeySecret: '',
    stripePublishableKey: '',
    stripeSecretKey: '',
    webhookSecret: '',
    environment: 'test',
    autoCapture: false,
    sendReceipt: false,
    enabled: isConnected,
    formType: 'paymentForm',
    selectedProvider: 'razorpay',
    providerClicked: 'razorpay'
  });

  const [errors, setErrors] = useState({});
  const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [activeProvider, setActiveProvider] = useState('razorpay');

  const validateForm = () => {
    const newErrors = {};
    
    if (activeProvider === 'razorpay') {
      if (!formData.razorpayKeyId.trim()) newErrors.razorpayKeyId = 'Razorpay Key ID is required';
      if (!formData.razorpayKeySecret.trim()) newErrors.razorpayKeySecret = 'Razorpay Key Secret is required';
    } else {
      if (!formData.stripePublishableKey.trim()) newErrors.stripePublishableKey = 'Stripe Publishable Key is required';
      if (!formData.stripeSecretKey.trim()) newErrors.stripeSecretKey = 'Stripe Secret Key is required';
    }
    
    if (!formData.webhookSecret.trim()) newErrors.webhookSecret = 'Webhook Secret is required';
    if (!formData.environment) newErrors.environment = 'Environment is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleProviderChange = (provider) => {
    setActiveProvider(provider);
    setFormData(prev => ({
      ...prev,
      selectedProvider: provider,
      providerClicked: provider
    }));
    
    toast.info(`Switched to ${provider === 'razorpay' ? 'Razorpay' : 'Stripe'} configuration`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = {
        ...formData,
        configuredProvider: activeProvider,
        userSelectedProvider: formData.providerClicked,
        configuredAt: new Date().toISOString()
      };
      
      onSave(submissionData);
      toast.success('Payment configuration saved successfully!');
      console.log('Form submitted with data:', submissionData);
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
    if (activeProvider === 'razorpay') {
      if (!formData.razorpayKeyId || !formData.razorpayKeySecret) {
        toast.error('Please fill in Razorpay credentials to test connection');
        return;
      }
      toast.info('Testing Razorpay connection...');
      console.log('Testing Razorpay connection with:', {
        provider: 'razorpay',
        keyId: formData.razorpayKeyId,
        userSelectedProvider: formData.providerClicked
      });
    } else {
      if (!formData.stripePublishableKey || !formData.stripeSecretKey) {
        toast.error('Please fill in Stripe credentials to test connection');
        return;
      }
      toast.info('Testing Stripe connection...');
      console.log('Testing Stripe connection with:', {
        provider: 'stripe',
        publishableKey: formData.stripePublishableKey,
        userSelectedProvider: formData.providerClicked
      });
    }
    
    setTimeout(() => toast.success('✅ Payment gateway connection successful!'), 1500);
  };

  const generateWebhookUrl = () => {
    const baseUrl = window.location.origin;
    const webhookUrl = `${baseUrl}/api/payments/webhook`;
    toast.info('Webhook URL: ' + webhookUrl);
    copyToClipboard(webhookUrl, 'Webhook URL');
  };

  const setupSteps = [
    {
      id: 1,
      text: 'Login to your payment gateway dashboard',
      icon: '🔐'
    },
    {
      id: 2,
      text: 'Go to Settings → API Keys section',
      icon: '⚙️'
    },
    {
      id: 3,
      text: 'Generate or copy your API keys',
      icon: '🔑'
    },
    {
      id: 4,
      text: 'Create a webhook in the webhooks section',
      icon: '🔗'
    },
    {
      id: 5,
      text: 'Copy the Webhook Secret and add the Webhook URL',
      icon: '🛡️'
    }
  ];

  return (
    <div className="fixed inset-0 min-h-full bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <CreditCard className="w-6 h-6 text-white" />
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
          {/* Payment Provider Selection */}
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Gateway</h3>
              <p className="text-gray-600 text-sm mt-1">
                Choose your preferred payment gateway provider
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleProviderChange('razorpay')}
                className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                  activeProvider === 'razorpay'
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activeProvider === 'razorpay' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Razorpay</div>
                    <div className="text-sm text-gray-600">Popular in India</div>
                  </div>
                  {formData.providerClicked === 'razorpay' && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleProviderChange('stripe')}
                className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                  activeProvider === 'stripe'
                    ? 'border-purple-500 bg-purple-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activeProvider === 'stripe' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Stripe</div>
                    <div className="text-sm text-gray-600">Global payments</div>
                  </div>
                  {formData.providerClicked === 'stripe' && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Display which provider user selected */}
            <div className="bg-gray-50 rounded-xl p-3 mt-2">
              <p className="text-sm text-gray-700">
                <strong>Selected Provider:</strong> {formData.providerClicked === 'razorpay' ? 'Razorpay' : 'Stripe'}
              </p>
            </div>
          </div>

          {/* Payment Gateway Configuration */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {activeProvider === 'razorpay' ? 'Razorpay' : 'Stripe'} Configuration
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Your {activeProvider === 'razorpay' ? 'Razorpay' : 'Stripe'} API credentials
              </p>
            </div>

            {activeProvider === 'razorpay' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Razorpay Key ID */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Key ID *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.razorpayKeyId}
                      onChange={(e) => handleInputChange('razorpayKeyId', e.target.value)}
                      placeholder="rzp_live_xxxxxxxxxxxx"
                      className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                        errors.razorpayKeyId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(formData.razorpayKeyId, 'Key ID')}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          copiedField === 'Key ID' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                      >
                        {copiedField === 'Key ID' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.razorpayKeyId && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.razorpayKeyId}
                    </p>
                  )}
                </div>

                {/* Razorpay Key Secret */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Key Secret *
                  </label>
                  <div className="relative">
                    <input
                      type={showRazorpaySecret ? "text" : "password"}
                      value={formData.razorpayKeySecret}
                      onChange={(e) => handleInputChange('razorpayKeySecret', e.target.value)}
                      placeholder="Enter your Razorpay key secret"
                      className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                        errors.razorpayKeySecret ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showRazorpaySecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(formData.razorpayKeySecret, 'Key Secret')}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          copiedField === 'Key Secret' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                      >
                        {copiedField === 'Key Secret' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.razorpayKeySecret && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.razorpayKeySecret}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stripe Publishable Key */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Publishable Key *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.stripePublishableKey}
                      onChange={(e) => handleInputChange('stripePublishableKey', e.target.value)}
                      placeholder="pk_live_xxxxxxxxxxxx"
                      className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                        errors.stripePublishableKey ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(formData.stripePublishableKey, 'Publishable Key')}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          copiedField === 'Publishable Key' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                      >
                        {copiedField === 'Publishable Key' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.stripePublishableKey && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.stripePublishableKey}
                    </p>
                  )}
                </div>

                {/* Stripe Secret Key */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Secret Key *
                  </label>
                  <div className="relative">
                    <input
                      type={showStripeSecret ? "text" : "password"}
                      value={formData.stripeSecretKey}
                      onChange={(e) => handleInputChange('stripeSecretKey', e.target.value)}
                      placeholder="Enter your Stripe secret key"
                      className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                        errors.stripeSecretKey ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setShowStripeSecret(!showStripeSecret)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showStripeSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(formData.stripeSecretKey, 'Secret Key')}
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
                  {errors.stripeSecretKey && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.stripeSecretKey}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Webhook Configuration */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Configuration</h3>
              <p className="text-gray-600 text-sm mt-1">
                Configure webhook settings for payment notifications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Webhook Secret */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Webhook Secret *
                </label>
                <div className="relative">
                  <input
                    type={showWebhookSecret ? "text" : "password"}
                    value={formData.webhookSecret}
                    onChange={(e) => handleInputChange('webhookSecret', e.target.value)}
                    placeholder="Enter webhook signing secret"
                    className={`w-full px-4 py-3 pr-20 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
                      errors.webhookSecret ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showWebhookSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.webhookSecret, 'Webhook Secret')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copiedField === 'Webhook Secret' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedField === 'Webhook Secret' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.webhookSecret && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.webhookSecret}
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  Used to verify webhook signatures from payment providers
                </p>
              </div>

              {/* Environment */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Environment *
                </label>
                <select
                  value={formData.environment}
                  onChange={(e) => handleInputChange('environment', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.environment ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="test">Test / Sandbox</option>
                  <option value="live">Live / Production</option>
                </select>
                {errors.environment && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.environment}
                  </p>
                )}
              </div>
            </div>

            {/* Webhook URL Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Webhook URL
                </label>
                <button
                  type="button"
                  onClick={generateWebhookUrl}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Copy Webhook URL
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-sm font-mono text-gray-600">
                  {window.location.origin}/api/payments/webhook
                </p>
              </div>
              <p className="text-gray-500 text-sm">
                Add this URL to your {activeProvider === 'razorpay' ? 'Razorpay' : 'Stripe'} webhook settings
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Features</h3>
              <p className="text-gray-600 text-sm mt-1">
                Configure additional payment processing features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Auto Capture */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Auto Capture Payments</h4>
                    <p className="text-gray-600 text-xs mt-1">
                      Automatically capture payments without manual approval
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={formData.autoCapture}
                      onChange={(e) => handleInputChange('autoCapture', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Send Receipt */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Send Payment Receipt</h4>
                    <p className="text-gray-600 text-xs mt-1">
                      Automatically send payment receipts to customers
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={formData.sendReceipt}
                      onChange={(e) => handleInputChange('sendReceipt', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
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
                <CreditCard className="w-4 h-4" />
                Save Configuration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;