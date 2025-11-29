import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SalesFollowUpScheduler() {
  // Follow-up form state
  const [followUpForm, setFollowUpForm] = useState({
    date: '',
    time: '',
    notes: ''
  });
  
  const [followUpErrors, setFollowUpErrors] = useState({});
  
  // Upcoming follow-ups state
  const [upcomingFollowUps, setUpcomingFollowUps] = useState([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      time: '16:00',
      notes: 'Discuss pricing options',
      datetime: new Date(new Date().setHours(16, 0, 0, 0))
    },
    {
      id: 2,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '11:00',
      notes: 'Follow up on payment link',
      datetime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000)
    }
  ]);

  // Follow-up form validation
  const validateFollowUpForm = () => {
    const errors = {};
    
    if (!followUpForm.date) {
      errors.date = 'Date is required';
    } else {
      const selectedDate = new Date(followUpForm.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.date = 'Date cannot be in the past';
      }
    }
    
    if (!followUpForm.time) {
      errors.time = 'Time is required';
    }
    
    if (!followUpForm.notes.trim()) {
      errors.notes = 'Notes are required';
    } else if (followUpForm.notes.trim().length < 5) {
      errors.notes = 'Notes must be at least 5 characters long';
    }
    
    setFollowUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle follow-up form submission
  const handleFollowUpSubmit = (e) => {
    e.preventDefault();
    
    if (validateFollowUpForm()) {
      const newFollowUp = {
        id: Date.now(), // Simple ID generation
        date: followUpForm.date,
        time: followUpForm.time,
        notes: followUpForm.notes,
        datetime: new Date(`${followUpForm.date}T${followUpForm.time}`)
      };
      
      // Add to upcoming follow-ups
      setUpcomingFollowUps(prev => [...prev, newFollowUp].sort((a, b) => a.datetime - b.datetime));
      
      // Reset form
      setFollowUpForm({
        date: '',
        time: '',
        notes: ''
      });
      
      setFollowUpErrors({});
      
      toast.success('Follow-up scheduled successfully! 🗓️');
    } else {
      toast.error('Please fix the form errors before submitting.');
    }
  };

  // Handle input changes
  const handleFollowUpChange = (field, value) => {
    setFollowUpForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (followUpErrors[field]) {
      setFollowUpErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Delete follow-up
  const handleDeleteFollowUp = (id) => {
    setUpcomingFollowUps(prev => prev.filter(followUp => followUp.id !== id));
    toast.info('Follow-up deleted successfully!');
  };

  // Format date for display
  const formatFollowUpDate = (dateString, timeString) => {
    const date = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${formatTime(timeString)}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${formatTime(timeString)}`;
    } else {
      return `${date.toLocaleDateString()}, ${formatTime(timeString)}`;
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Check if follow-up is today
  const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if follow-up is overdue
  const isOverdue = (dateString, timeString) => {
    const followUpDateTime = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    return followUpDateTime < now;
  };

  return (
    <div className="space-y-6">
      {/* Schedule Follow-up Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Follow-up</h3>
        <form className="space-y-4" onSubmit={handleFollowUpSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input 
              type="date" 
              value={followUpForm.date}
              onChange={(e) => handleFollowUpChange('date', e.target.value)}
              className={`w-full p-2 border rounded-xl ${
                followUpErrors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              min={new Date().toISOString().split('T')[0]}
            />
            {followUpErrors.date && (
              <p className="mt-1 text-sm text-red-600">{followUpErrors.date}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input 
              type="time" 
              value={followUpForm.time}
              onChange={(e) => handleFollowUpChange('time', e.target.value)}
              className={`w-full p-2 border rounded-xl ${
                followUpErrors.time ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {followUpErrors.time && (
              <p className="mt-1 text-sm text-red-600">{followUpErrors.time}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              placeholder="Add follow-up notes..."
              value={followUpForm.notes}
              onChange={(e) => handleFollowUpChange('notes', e.target.value)}
              className={`w-full p-2 border rounded-xl ${
                followUpErrors.notes ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              rows={4}
            />
            {followUpErrors.notes && (
              <p className="mt-1 text-sm text-red-600">{followUpErrors.notes}</p>
            )}
          </div>
          
          <button 
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!followUpForm.date || !followUpForm.time || !followUpForm.notes}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Follow-up
          </button>
        </form>
      </div>

      {/* Upcoming Follow-ups List */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Follow-ups</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
            {upcomingFollowUps.length} scheduled
          </span>
        </div>
        <div className="space-y-3">
          {upcomingFollowUps.map((followUp) => {
            const isOverdueFollowUp = isOverdue(followUp.date, followUp.time);
            const isTodayFollowUp = isToday(followUp.date);
            
            return (
              <div 
                key={followUp.id} 
                className={`p-3 rounded-lg group relative ${
                  isOverdueFollowUp 
                    ? 'bg-red-50 border border-red-200' 
                    : isTodayFollowUp 
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      isOverdueFollowUp ? 'text-red-900' : 'text-gray-900'
                    }`}>
                      {formatFollowUpDate(followUp.date, followUp.time)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{followUp.notes}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {isOverdueFollowUp && (
                      <span className="inline-block px-2 py-1 bg-red-600 text-white rounded-lg text-xs">
                        Overdue
                      </span>
                    )}
                    {isTodayFollowUp && !isOverdueFollowUp && (
                      <span className="inline-block px-2 py-1 bg-blue-600 text-white rounded-lg text-xs">
                        Today
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteFollowUp(followUp.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete follow-up"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Progress indicator for today's follow-ups */}
                {isTodayFollowUp && !isOverdueFollowUp && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            ((new Date() - new Date(followUp.date + 'T00:00:00')) / 
                            (new Date(followUp.date + 'T' + followUp.time) - new Date(followUp.date + 'T00:00:00'))) * 100, 
                            100
                          )}%`
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {upcomingFollowUps.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No upcoming follow-ups scheduled</p>
              <p className="text-xs text-gray-400 mt-1">Schedule your first follow-up above</p>
            </div>
          )}
        </div>
        
        {/* Statistics */}
        {upcomingFollowUps.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-center">
                <p className="text-gray-600">Today</p>
                <p className="font-semibold text-gray-900">
                  {upcomingFollowUps.filter(f => isToday(f.date)).length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Overdue</p>
                <p className="font-semibold text-red-600">
                  {upcomingFollowUps.filter(f => isOverdue(f.date, f.time)).length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}