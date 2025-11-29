import React, { useState } from 'react';
import { Zap, Globe, Phone, Mail, CreditCard, MessageSquare, Edit2 } from 'lucide-react';
import WhatsAppForm from './integration-form/whatsApp-form';
import MetaAdsForm from './integration-form/fb-ads-form';
import LinkedInAdsForm from './integration-form/linkedin-ads-form';
import TwilioForm from './integration-form/twilio-form';
import PaymentForm from './integration-form/razorpay-form';
import WebsiteWebhooksForm from './integration-form/web-hooks-form';

// Simple fallback component if forms are missing
const DefaultForm = ({ integration, onSave, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 className="text-lg font-semibold mb-4">Configure {integration.name}</h3>
      <p className="text-gray-600 mb-4">Configuration form for {integration.name}</p>
      <div className="flex gap-2 justify-end">
        <button 
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button 
          onClick={() => onSave({})}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

export default function IntegrationsTab() {
  const integrations = [
    {
      id: 'website',
      name: 'Website Webhooks',
      description: 'Capture leads from your website forms',
      icon: Globe,
      connected: true,
      color: 'from-blue-500 to-cyan-500',
      form: WebsiteWebhooksForm
    },
    {
      id: 'meta',
      name: 'Meta Ads',
      description: 'Import leads from Facebook & Instagram ads',
      icon: Zap,
      connected: true,
      color: 'from-indigo-500 to-purple-500',
      form: MetaAdsForm
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Ads',
      description: 'Sync leads from LinkedIn campaigns',
      icon: Zap,
      connected: false,
      color: 'from-blue-600 to-blue-800',
      form: LinkedInAdsForm
    },
    {
      id: 'twilio',
      name: 'Twilio',
      description: 'Make calls directly from the CRM',
      icon: Phone,
      connected: true,
      color: 'from-red-500 to-pink-500',
      form: TwilioForm
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Send messages via WhatsApp API',
      icon: MessageSquare,
      connected: true,
      color: 'from-green-500 to-emerald-500',
      form: WhatsAppForm
    },
    {
      id: 'payment',
      name: 'Razorpay ',
      description: 'Process payments and generate links',
      icon: CreditCard,
      connected: true,
      color: 'from-blue-600 to-indigo-600',
      form: PaymentForm
    },
    //   {
    //   id: 'payment',
    //   name: 'Stripe',
    //   description: 'alternative payments Process and generate links',
    //   icon: CreditCard,
    //   connected: true,
    //   color: 'from-blue-600 to-indigo-600',
    //   form: PaymentForm
    // },
  ];

  const [integrationStates, setIntegrationStates] = useState(
    integrations.reduce((acc, integration) => {
      acc[integration.id] = integration.connected;
      return acc;
    }, {})
  );

  const [activeForm, setActiveForm] = useState(null);

  const handleIntegrationToggle = (integrationId) => {
    setIntegrationStates(prev => ({
      ...prev,
      [integrationId]: !prev[integrationId]
    }));
  };

  const handleConfigure = (integration) => {
    setActiveForm(integration);
  };

  const handleCloseForm = () => {
    setActiveForm(null);
  };

  const handleSaveForm = (integrationId, data) => {
    console.log(`Saving ${integrationId}:`, data);
    setActiveForm(null);
  };

  const ActiveFormComponent = activeForm?.form || DefaultForm;

  return (
    <div className="space-y-6">
      {/* Active Form Modal */}
      {activeForm && (
        <ActiveFormComponent
          integration={activeForm}
          isConnected={integrationStates[activeForm.id]}
          onSave={(data) => handleSaveForm(activeForm.id, data)}
          onClose={handleCloseForm}
        />
      )}
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Connected Services</h3>
        <p className="text-gray-600 mt-2">Manage your third-party integrations and APIs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const isConnected = integrationStates[integration.id];
          
          return (
            <div key={integration.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${integration.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <button
                  onClick={() => handleIntegrationToggle(integration.id)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    isConnected ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-lg ${
                      isConnected ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{integration.name}</h4>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{integration.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  isConnected ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
                
                {isConnected && (
                  <button 
                    onClick={() => handleConfigure(integration)}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                    Configure
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




