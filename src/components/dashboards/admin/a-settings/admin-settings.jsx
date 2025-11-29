import React, { useState } from 'react';
import { Settings, Search } from 'lucide-react';
import UsersRolesTab from './admin-set-compo/user-Role';
import IntegrationsTab from './admin-set-compo/integrationTab/integrationTab'
import TelephonyTab from './admin-set-compo/telepone';
import EmailTemplatesTab from './admin-set-compo/emailTemplatesTab/emailTemplatesTab';
import { FileText, PhoneCall, Zap, Users } from 'lucide-react';
export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { value: 'users', label: 'Users & Roles', icon: Users },
    { value: 'integrations', label: 'Integrations', icon: Zap },
    { value: 'telephony', label: 'Telephony', icon: PhoneCall },
    { value: 'templates', label: 'Email Templates', icon: FileText }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersRolesTab />;
      case 'integrations':
        return <IntegrationsTab />;
      case 'telephony':
        return <TelephonyTab />;
      case 'templates':
        return <EmailTemplatesTab />;
      default:
        return <UsersRolesTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage system configuration, users, and integrations
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200/60 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 flex-shrink-0 ${
                      activeTab === tab.value
                        ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}