import React, { useState } from 'react';
import { Plus, Edit2, FileText } from 'lucide-react';
import EmailTemplateModal from './email-form';
import EmailTemplatePreview from './emailpreview';

export default function EmailTemplatesTab() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: 'Welcome Email',
      description: 'Sent when a new lead is created to welcome them',
      subject: 'Welcome to [Company Name]',
      content: 'Hi [Name],\n\nThank you for your interest in our services. We are excited to help you achieve your goals and look forward to working with you.\n\nBest regards,\n[Company Name] Team',
      usage: 'Used 245 times'
    },
    {
      id: 2,
      title: 'Payment Link Email',
      description: 'Sent when generating payment links for customers',
      subject: 'Complete Your Payment - [Company Name]',
      content: 'Hi [Name],\n\nPlease use the following secure link to complete your payment:\n\nPayment Link: [Payment Link]\nAmount: [Amount]\nDue Date: [Date]\n\nIf you have any questions, please don\'t hesitate to contact us.\n\nThank you,\n[Company Name] Team',
      usage: 'Used 189 times'
    },
    {
      id: 3,
      title: 'Follow-up Reminder',
      description: 'Automated follow-up for pending conversations',
      subject: 'Following Up - [Company Name]',
      content: 'Hi [Name],\n\nI wanted to follow up on our recent conversation and see if you have any questions about our services. We\'re here to help you find the best solution for your needs.\n\nLooking forward to hearing from you.\n\nBest regards,\n[Company Name] Team',
      usage: 'Used 567 times'
    },
    {
      id: 4,
      title: 'Service Onboarding',
      description: 'Guide new customers through the onboarding process',
      subject: 'Get Started with [Company Name]',
      content: 'Welcome aboard [Name]!\n\nWe are thrilled to have you as a customer. Here is how to get started:\n\n1. Access your account at [Login Link]\n2. Complete your profile setup\n3. Schedule your onboarding call\n4. Start using our services\n\nOur team is here to support you every step of the way.\n\nBest regards,\n[Company Name] Team',
      usage: 'Used 134 times'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleCreate = () => {
    setEditingTemplate(null);
    setIsModalOpen(true);
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleSaveTemplate = (templateData) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(prev => prev.map(template =>
        template.id === editingTemplate.id
          ? { ...template, ...templateData }
          : template
      ));
    } else {
      // Create new template
      const newTemplate = {
        id: Date.now(),
        ...templateData,
        usage: 'Used 0 times'
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
    
    setIsModalOpen(false);
    setEditingTemplate(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTemplate(null);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewTemplate(null);
  };

  return (
    <div className="space-y-6">
      {/* Email Template Modal */}
      <EmailTemplateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTemplate}
        template={editingTemplate}
        isCreateModalOpen={!editingTemplate}
      />

      {/* Email Preview Modal */}
      <EmailTemplatePreview
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        template={previewTemplate}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Email Templates</h3>
          <p className="text-gray-600 mt-2">Manage your email templates and automation</p>
        </div>
        <button 
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Create Template
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{template.title}</h4>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {template.usage}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{template.description}</p>
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-2">Subject: {template.subject}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleEdit(template)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
              >
                <Edit2 className="w-4 h-4" />
                Edit Template
              </button>
              <button 
                onClick={() => handlePreview(template)}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
              >
                <FileText className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}