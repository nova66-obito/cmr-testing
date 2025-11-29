// components/TelephonyTab.jsx
import React, { useState } from 'react';
import { Plus, Phone, Shield, Bell, Users, Edit2, X, Save } from 'lucide-react';

export default function TelephonyTab() {
  const [phoneNumbers, setPhoneNumbers] = useState([
    { id: 1, number: '+91 98765 12345', assignedTo: 'Karthik', status: 'active', type: 'Primary' },
    { id: 2, number: '+91 98765 12346', assignedTo: 'Priya', status: 'active', type: 'Secondary' },
    { id: 3, number: '+91 98765 12347', assignedTo: 'Arjun', status: 'active', type: 'Backup' },
    { id: 4, number: '+91 98765 12348', assignedTo: 'Unassigned', status: 'inactive', type: 'Spare' },
  ]);

  const [callRecording, setCallRecording] = useState(true);
  const [voicemailDetection, setVoicemailDetection] = useState(true);
  const [callNotifications, setCallNotifications] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);
  const [formData, setFormData] = useState({
    number: '',
    assignedTo: '',
    type: 'Secondary',
    status: 'active'
  });
  const [errors, setErrors] = useState({});

  // Phone number validation regex
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(number);
  };

  const validateForm = () => {
    const newErrors = {};

    // Phone number validation
    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.number)) {
      newErrors.number = 'Please enter a valid phone number';
    } else if (phoneNumbers.some(phone => 
      phone.number === formData.number && phone.id !== editingPhone?.id
    )) {
      newErrors.number = 'This phone number already exists';
    }

    // Assigned to validation
    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned to is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddNumber = () => {
    if (validateForm()) {
      const newPhone = {
        id: Math.max(...phoneNumbers.map(p => p.id)) + 1,
        number: formData.number,
        assignedTo: formData.assignedTo,
        type: formData.type,
        status: formData.status
      };
      
      setPhoneNumbers(prev => [...prev, newPhone]);
      setFormData({
        number: '',
        assignedTo: '',
        type: 'Secondary',
        status: 'active'
      });
      setShowAddForm(false);
      setErrors({});
      console.log()
    }
  };

  const handleEditClick = (phone) => {
    setEditingPhone(phone);
    setFormData({
      number: phone.number,
      assignedTo: phone.assignedTo,
      type: phone.type,
      status: phone.status
    });
  };

  const handleSaveEdit = () => {
    if (validateForm()) {
      setPhoneNumbers(prev => prev.map(phone => 
        phone.id === editingPhone.id 
          ? { ...phone, ...formData }
          : phone
      ));
      setEditingPhone(null);
      setFormData({
        number: '',
        assignedTo: '',
        type: 'Secondary',
        status: 'active'
      });
      setErrors({});
    }
  };

  const handleCancelEdit = () => {
    setEditingPhone(null);
    setFormData({
      number: '',
      assignedTo: '',
      type: 'Secondary',
      status: 'active'
    });
    setErrors({});
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setFormData({
      number: '',
      assignedTo: '',
      type: 'Secondary',
      status: 'active'
    });
    setErrors({});
  };

  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'Primary':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Secondary':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'Backup':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getStatusBadgeStyle = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-700 border border-green-200' 
      : 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Telephony Settings</h3>
          <p className="text-gray-600 mt-2">Manage phone numbers and call configurations</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add Number
        </button>
      </div>

      {/* Add Phone Number Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Add New Phone Number</h4>
            <button 
              onClick={handleCancelAdd}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => handleInputChange('number', e.target.value)}
                placeholder="+91 98765 43210"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.number ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned To *
              </label>
              <input
                type="text"
                value={formData.assignedTo}
                onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                placeholder="Enter name"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.assignedTo ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.assignedTo && (
                <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Backup">Backup</option>
                <option value="Spare">Spare</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddNumber}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Add Number
            </button>
            <button
              onClick={handleCancelAdd}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Phone Numbers Table */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Phone Numbers</h4>
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Phone Number</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Assigned To</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Type</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {phoneNumbers.map((phone) => (
                <tr key={phone.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      {editingPhone?.id === phone.id ? (
                        <input
                          type="text"
                          value={formData.number}
                          onChange={(e) => handleInputChange('number', e.target.value)}
                          className={`px-3 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.number ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      ) : (
                        <span className="font-medium text-gray-900">{phone.number}</span>
                      )}
                    </div>
                    {editingPhone?.id === phone.id && errors.number && (
                      <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingPhone?.id === phone.id ? (
                      <div>
                        <input
                          type="text"
                          value={formData.assignedTo}
                          onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                          className={`w-full px-3 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.assignedTo ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.assignedTo && (
                          <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-600">{phone.assignedTo}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingPhone?.id === phone.id ? (
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Primary">Primary</option>
                        <option value="Secondary">Secondary</option>
                        <option value="Backup">Backup</option>
                        <option value="Spare">Spare</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeStyle(phone.type)}`}>
                        {phone.type}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingPhone?.id === phone.id ? (
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(phone.status)}`}>
                        {phone.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {editingPhone?.id === phone.id ? (
                        <>
                          <button 
                            onClick={handleSaveEdit}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleEditClick(phone)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call Settings */}
      <div className="bg-white rounded-2xl border border-gray-200/60 p-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-6">Call Settings</h4>
        <div className="space-y-6">
          {[
            {
              icon: Shield,
              label: 'Call Recording',
              description: 'Automatically record all calls for quality and training purposes',
              state: callRecording,
              setState: setCallRecording
            },
            {
              icon: Bell,
              label: 'Voicemail Detection',
              description: 'Intelligently detect and skip voicemails to optimize calling time',
              state: voicemailDetection,
              setState: setVoicemailDetection
            },
            {
              icon: Users,
              label: 'Call Notifications',
              description: 'Notify team members about missed calls and important call events',
              state: callNotifications,
              setState: setCallNotifications
            }
          ].map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-900 block">{setting.label}</label>
                    <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setting.setState(!setting.state)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ml-4 ${
                    setting.state ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-lg ${
                      setting.state ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}