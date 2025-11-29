import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const EmailTemplateModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  template = null, 
  isCreateModalOpen = true 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    content: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when template changes
  useEffect(() => {
    if (template) {
      setFormData({
        title: template.title || '',
        description: template.description || '',
        subject: template.subject || '',
        content: template.content || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        subject: '',
        content: ''
      });
    }
    setErrors({});
  }, [template, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Template title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Email subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long';
    }

    // Content validation
    if (!formData.content.trim()) {
      newErrors.content = 'Email content is required';
    } else if (formData.content.trim().length < 20) {
      newErrors.content = 'Content must be at least 20 characters long';
    } else if (!formData.content.includes('[Name]')) {
      newErrors.content = 'Content should include at least [Name] placeholder';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSave({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        subject: formData.subject.trim(),
        content: formData.content.trim()
      });
    } catch (error) {
      console.error('Error saving template:', error);
      setErrors({ submit: 'Failed to save template. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setErrors({});
    onClose();
  };

  const addPlaceholder = (placeholder) => {
    const newContent = formData.content + ` ${placeholder}`;
    setFormData(prev => ({ ...prev, content: newContent }));
    
    // Focus on content textarea
    const contentTextarea = document.getElementById('content');
    if (contentTextarea) {
      contentTextarea.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {isCreateModalOpen ? 'Create New Template' : 'Edit Template'}
            </h3>
            {template && (
              <p className="text-sm text-gray-500 mt-1">
                Editing: {template.title}
              </p>
            )}
          </div>
          <button
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Template Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
              } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              placeholder="Enter template title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>•</span>
                {errors.title}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isSubmitting}
              rows="2"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
              } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              placeholder="Describe what this template is used for"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>•</span>
                {errors.description}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Email Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
              } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              placeholder="Enter email subject line"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>•</span>
                {errors.subject}
              </p>
            )}
          </div>

          {/* Content Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Email Content *
              </label>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => addPlaceholder('[Name]')}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                  disabled={isSubmitting}
                >
                  Add [Name]
                </button>
                <button
                  type="button"
                  onClick={() => addPlaceholder('[Company Name]')}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                  disabled={isSubmitting}
                >
                  Add [Company]
                </button>
                <button
                  type="button"
                  onClick={() => addPlaceholder('[Email]')}
                  className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                  disabled={isSubmitting}
                >
                  Add [Email]
                </button>
                <button
                  type="button"
                  onClick={() => addPlaceholder('[Phone]')}
                  className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                  disabled={isSubmitting}
                >
                  Add [Phone]
                </button>
              </div>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              disabled={isSubmitting}
              rows="6"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300'
              } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              placeholder="Write your email content here..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>•</span>
                {errors.content}
              </p>
            )}
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>Use placeholders like <code className="bg-gray-100 px-1 py-0.5 rounded">[Name]</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">[Company Name]</code> for dynamic content</p>
              <p>Available placeholders: <code className="bg-gray-100 px-1 py-0.5 rounded">[Name]</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">[Email]</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">[Company Name]</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">[Phone]</code></p>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : (isCreateModalOpen ? 'Create Template' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailTemplateModal;