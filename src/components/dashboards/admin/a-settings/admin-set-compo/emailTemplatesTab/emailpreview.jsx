// components/EmailTemplatePreview.jsx
import React from 'react';
import { X, Mail, Send } from 'lucide-react';

export default function EmailTemplatePreview({ 
  isOpen, 
  onClose, 
  template 
}) {
  if (!isOpen || !template) return null;

  // Function to replace placeholders with sample data
  const getPreviewContent = (content) => {
    return content
      .replace(/\[Name\]/g, 'John Doe')
      .replace(/\[Company Name\]/g, 'Acme Inc')
      .replace(/\[Date\]/g, new Date().toLocaleDateString())
      .replace(/\[Email\]/g, 'john.doe@example.com')
      .replace(/\[Phone\]/g, '+1 (555) 123-4567')
      .replace(/\[Product Name\]/g, 'Premium Service')
      .replace(/\[Amount\]/g, '$299.00')
      .replace(/\[Payment Link\]/g, 'https://pay.acme-inc.com/inv-12345')
      .replace(/\[Login Link\]/g, 'https://app.acme-inc.com/login');
  };

  const handleSendTest = () => {
    // You can implement test email sending logic here
    alert('Test email sent successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{template.title}</h3>
              <p className="text-gray-600 text-sm">{template.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Email Preview Content */}
        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Email Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-lg">Subject: {template.subject}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">From:</span>
                      <span>noreply@company.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">To:</span>
                      <span>customer@example.com</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-8">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base">
                  {getPreviewContent(template.content)}
                </div>
              </div>
            </div>

            {/* Email Footer */}
            <div className="bg-gray-50 border-t border-gray-200 p-6">
              <div className="text-center">
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">Best regards,</p>
                  <p className="font-semibold text-gray-900">The Team at Acme Inc</p>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Acme Inc • 123 Business Street, Suite 100, San Francisco, CA 94105</p>
                  <p>contact@acme-inc.com • www.acme-inc.com • +1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder Reference */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-3">Placeholder Reference</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {[
                { placeholder: '[Name]', value: 'John Doe' },
                { placeholder: '[Company Name]', value: 'Acme Inc' },
                { placeholder: '[Date]', value: new Date().toLocaleDateString() },
                { placeholder: '[Email]', value: 'john.doe@example.com' },
                { placeholder: '[Phone]', value: '+1 (555) 123-4567' },
                { placeholder: '[Product Name]', value: 'Premium Service' },
                { placeholder: '[Amount]', value: '$299.00' },
                { placeholder: '[Payment Link]', value: 'Secure payment link' },
                { placeholder: '[Login Link]', value: 'Account login link' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                  <code className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {item.placeholder}
                  </code>
                  <span className="text-gray-600 text-xs">→ {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            This is a preview with sample data. Placeholders will be replaced with actual data when sent.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors duration-200"
            >
              Close Preview
            </button>
            <button
              onClick={handleSendTest}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
              Send Test Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}