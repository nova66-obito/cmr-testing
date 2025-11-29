import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageSquare,
  User,
  MapPin,
  Edit
} from 'lucide-react';
import WhatsAppModal from '../lead-components/lead-whatsup';
import MakeACall from '../lead-components/makecall';
import EmailModal from '../lead-components/lead-mail';
import LeadForm from '../lead-components/add-Lead-form';
import UpdateLead from '../lead-components/lead-update';
import GeneratePaymentLinkModal from '../lead-components/lead-payment';
import LeadActivity from './lead-details-compo/lead-activity';
import LeadPayments from './lead-details-compo/lead-payment';
import LeadNotes from './lead-details-compo/lead-notes';
import FollowUpScheduler from './lead-details-compo/followSchedule';
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function LeadDetail({ leadId, onNavigate, userRole }) {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isStatusUpdateModalOpen, setIsStatusUpdateModalOpen] = useState(false);
  const [isPaymentLinkModalOpen, setIsPaymentLinkModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { lead, column } = location.state || {};

  const leadData = lead || {
    id: id || '1',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    source: 'Meta Ads',
    status: 'Hot',
    assignedTo: 'Karthik',
    location: 'Mumbai, Maharashtra',
    utmSource: 'facebook',
    utmMedium: 'cpc',
    utmCampaign: 'winter-sale-2024',
  };

  const [activeTab, setActiveTab] = useState('overview');

  // Handle lead update from LeadForm
  const handleUpdateLead = (updatedLeadData, isEdit = false) => {
    console.log('Lead updated:', updatedLeadData);
    setIsEditLeadModalOpen(false);
  };

  // Handle call submission from MakeACall
  const handleCallSubmit = (callData) => {
    console.log('Call data:', callData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('leads')}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Leads
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setIsEditLeadModalOpen(true)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Lead
            </button>
            <button
              onClick={() => setIsStatusUpdateModalOpen(true)}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Update Status
            </button>
            <button
              onClick={() => setIsPaymentLinkModalOpen(true)}
              className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
            >
              Generate Payment Link
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Lead Info + Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Info Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{leadData.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-block px-2 py-1 bg-red-50 text-red-600 rounded-lg text-sm">
                      {leadData.status}
                    </span>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm">
                      {leadData.source}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCallModalOpen(true)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsEmailModalOpen(true)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsWhatsAppModalOpen(true)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{leadData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{leadData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Assigned to: {leadData.assignedTo}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{leadData.location}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 border-b-2 text-sm font-medium transition-colors ${activeTab === 'overview'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`px-4 py-3 border-b-2 text-sm font-medium transition-colors ${activeTab === 'activity'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Activity
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-4 py-3 border-b-2 text-sm font-medium transition-colors ${activeTab === 'notes'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('payment')}
                    className={`px-4 py-3 border-b-2 text-sm font-medium transition-colors ${activeTab === 'payment'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Payment Info
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">UTM Parameters</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Source:</span>
                          <span className="text-gray-900">{leadData.utmSource}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Medium:</span>
                          <span className="text-gray-900">{leadData.utmMedium}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Campaign:</span>
                          <span className="text-gray-900">{leadData.utmCampaign}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <LeadActivity />
                )}

                {activeTab === 'notes' && (
                  <LeadNotes lead={lead} />
                )}

                {activeTab === 'payment' && (
                  <LeadPayments />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Follow-up Scheduler */}
          <FollowUpScheduler />
        </div>
      </div>

      {/* Modals */}
      <MakeACall
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        lead={leadData}
        onSubmit={handleCallSubmit}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        lead={leadData}
      />

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        lead={leadData}
      />

      <LeadForm
        isOpen={isEditLeadModalOpen}
        onClose={() => setIsEditLeadModalOpen(false)}
        onSave={handleUpdateLead}
        editLead={leadData}
        title="Edit Lead"
        description="Update the lead details below"
      />

      <UpdateLead
        isOpen={isStatusUpdateModalOpen}
        onClose={() => setIsStatusUpdateModalOpen(false)}
        lead={leadData}
      />

      <GeneratePaymentLinkModal
        isOpen={isPaymentLinkModalOpen}
        onClose={() => setIsPaymentLinkModalOpen(false)}
        leadName={leadData.name}
      />
    </div>
  );
}