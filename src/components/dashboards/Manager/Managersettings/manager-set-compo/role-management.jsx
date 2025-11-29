import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

export default function RoleManagement  ({ roles, onUpdateRole, onAddRole, onDeleteRole }) {
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const permissionsList = [
    'user_management',
    'lead_management',
    'call_management',
    'payment_processing',
    'report_viewing',
    'settings_management'
  ];

  const handlePermissionToggle = (permission) => {
    if (editingRole) {
      const updatedPermissions = editingRole.permissions.includes(permission)
        ? editingRole.permissions.filter(p => p !== permission)
        : [...editingRole.permissions, permission];
      setEditingRole({...editingRole, permissions: updatedPermissions});
    }
  };

  const handleNewPermissionToggle = (permission) => {
    const updatedPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter(p => p !== permission)
      : [...newRole.permissions, permission];
    setNewRole({...newRole, permissions: updatedPermissions});
  };

  const handleAddRole = () => {
    if (newRole.name && newRole.description) {
      onAddRole(newRole);
      setNewRole({
        name: '',
        description: '',
        permissions: []
      });
      setShowAddForm(false);
    }
  };

  const handleSaveRole = (role) => {
    onUpdateRole(role);
    setEditingRole(null);
  };

  const getPermissionBadgeStyle = (permission) => {
    const styles = {
      user_management: 'bg-purple-100 text-purple-700 border border-purple-200',
      lead_management: 'bg-blue-100 text-blue-700 border border-blue-200',
      call_management: 'bg-green-100 text-green-700 border border-green-200',
      payment_processing: 'bg-amber-100 text-amber-700 border border-amber-200',
      report_viewing: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
      settings_management: 'bg-red-100 text-red-700 border border-red-200'
    };
    return styles[permission] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const formatPermissionName = (permission) => {
    return permission.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Role Management</h3>
          <p className="text-gray-600 mt-2">Define roles and permissions for your team</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add Role
        </button>
      </div>

      {/* Add Role Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Create New Role</h4>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter role name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter role description"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {permissionsList.map(permission => (
                  <label key={permission} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newRole.permissions.includes(permission)}
                      onChange={() => handleNewPermissionToggle(permission)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{formatPermissionName(permission)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddRole}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Create Role
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{role.name}</h4>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEditingRole(editingRole?.id === role.id ? null : { ...role })}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDeleteRole(role.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {editingRole?.id === role.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={editingRole.description}
                  onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Permissions:</label>
                  <div className="flex flex-wrap gap-1">
                    {permissionsList.map(permission => (
                      <label key={permission} className="flex items-center gap-1 text-xs">
                        <input
                          type="checkbox"
                          checked={editingRole.permissions.includes(permission)}
                          onChange={() => handlePermissionToggle(permission)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        {formatPermissionName(permission)}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleSaveRole(editingRole)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setEditingRole(null)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{role.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Users with this role:</span>
                    <span className="font-semibold text-gray-900">{role.userCount || 0}</span>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">Permissions:</span>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map(permission => (
                        <span 
                          key={permission}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPermissionBadgeStyle(permission)}`}
                        >
                          {formatPermissionName(permission)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};