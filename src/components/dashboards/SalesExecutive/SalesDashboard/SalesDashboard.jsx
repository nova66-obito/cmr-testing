import { useState } from 'react';
import { 
  Phone, 
  Calendar, 
  Clock, 
  UserCheck, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Plus, 
  TrendingUp, 
  Target,
  Menu,
  X
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import MakeACall from '../../../common/MakeACall';
import SalesEmailModal from '../salesLead/sales-lead-compo/lead-mail';
import SalesWhatsAppModal from '../salesLead/sales-lead-compo/lead-whatsup';
import Navbar from '../../../common/Navbar/nav';
import SalesDasboards from '../Sidebar/SalesSidebar';
const SalesExecutiveDashboard = ({ userName, onNavigate }) => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data - replace with your actual data
  const karthikData = {
    leadsAssigned: 24,
    callsToday: 9,
    talkTimeToday: 45,
    todayFollowUps: [
      { time: '10:00 AM', name: 'Priya Sharma', note: 'Discuss payment options' },
      { time: '2:30 PM', name: 'Rajesh Kumar', note: 'Send contract details' },
      { time: '4:00 PM', name: 'Anita Desai', note: 'Product demo follow-up' }
    ],
    leads: [
      { id: '1', name: 'Priya Sharma', source: 'Website', status: 'Hot', lastContact: '2 hours ago', followUp: 'Today 10:00 AM' },
      { id: '2', name: 'Rajesh Kumar', source: 'Referral', status: 'Warm', lastContact: '3 hours ago', followUp: 'Today 2:30 PM' },
      { id: '3', name: 'Anita Desai', source: 'Social Media', status: 'Cold', lastContact: '1 day ago', followUp: 'Today 4:00 PM' },
      { id: '4', name: 'Vikram Singh', source: 'Website', status: 'Hot', lastContact: '2 days ago', followUp: 'Tomorrow 11:00 AM' }
    ]
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const kpis = [
    { label: 'Leads Assigned', value: karthikData.leadsAssigned.toString(), icon: UserCheck, color: 'bg-blue-50 text-blue-600', change: '+4 this week' },
    { label: 'Calls Today', value: karthikData.callsToday.toString(), icon: Phone, color: 'bg-green-50 text-green-600', change: '67% answer rate' },
    { label: 'Talk Time Today', value: `${karthikData.talkTimeToday} min`, icon: Clock, color: 'bg-purple-50 text-purple-600', change: '+15% vs avg' },
    { label: 'Today\'s Follow-ups', value: karthikData.todayFollowUps.length.toString(), icon: Calendar, color: 'bg-orange-50 text-orange-600', change: '3 remaining' },
  ];

  const leads = karthikData.leads;

  const activities = [
    { type: 'call', title: 'Called Priya Sharma', time: '2 hours ago', result: 'Interested - Follow up needed' },
    { type: 'email', title: 'Sent payment link to Rajesh Kumar', time: '3 hours ago', result: 'Email opened' },
    { type: 'whatsapp', title: 'WhatsApp message to Anita Desai', time: '4 hours ago', result: 'Read' },
    { type: 'call', title: 'Called Vikram Singh', time: '5 hours ago', result: 'Not picked - Will try later' },
  ];

  // Funnel Data for Recharts
  const funnelData = [
    { stage: 'Leads', count: 24, color: '#3B82F6' },
    { stage: 'Contacted', count: 18, color: '#8B5CF6' },
    { stage: 'Payment Sent', count: 12, color: '#F59E0B' },
    { stage: 'Paid', count: 6, color: '#10B981' },
  ];

  // Performance Data for Line Chart
  const performanceData = [
    { day: 'Mon', calls: 8, leads: 5, conversions: 2 },
    { day: 'Tue', calls: 12, leads: 7, conversions: 3 },
    { day: 'Wed', calls: 10, leads: 6, conversions: 4 },
    { day: 'Thu', calls: 15, leads: 9, conversions: 5 },
    { day: 'Fri', calls: 9, leads: 5, conversions: 3 },
    { day: 'Sat', calls: 6, leads: 3, conversions: 1 },
    { day: 'Sun', calls: 4, leads: 2, conversions: 1 },
  ];

  // Lead Source Data for Pie Chart
  const leadSourceData = [
    { name: 'Website', value: 12, color: '#3B82F6' },
    { name: 'Referral', value: 6, color: '#10B981' },
    { name: 'Social Media', value: 4, color: '#F59E0B' },
    { name: 'Google Ads', value: 2, color: '#EF4444' },
  ];

  // Status Distribution Data
  const statusData = [
    { status: 'Hot', count: 8, color: '#EF4444' },
    { status: 'Warm', count: 10, color: '#F59E0B' },
    { status: 'Cold', count: 6, color: '#3B82F6' },
  ];

  const todayGoal = {
    target: 15,
    completed: karthikData.callsToday,
    percentage: Math.round((karthikData.callsToday / 15) * 100),
  };

  const followUps = [
    { date: '11', day: 'Today', count: 3, isToday: true },
    { date: '12', day: 'Tue', count: 3 },
    { date: '13', day: 'Wed', count: 5 },
    { date: '14', day: 'Thu', count: 2 },
    { date: '15', day: 'Fri', count: 4 },
  ];

  const handleCall = (lead) => {
    setSelectedLead(lead);
    setIsCallModalOpen(true);
  };

  const handleWhatsApp = (lead) => {
    setSelectedLead(lead);
    setIsWhatsAppModalOpen(true);
  };

  const handleEmail = (lead) => {
    setSelectedLead(lead);
    setIsEmailModalOpen(true);
  };

  const handleFollowUp = (lead) => {
    setSelectedLead(lead);
    setIsFollowUpModalOpen(true);
  };

  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Simple modal component for follow-up
  const FollowUpModal = ({ isOpen, onClose, lead }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold">Schedule Follow-up</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <p>Schedule follow-up for <strong>{lead?.name}</strong></p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                <input type="datetime-local" className="w-full border border-gray-300 rounded-lg p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 min-h-[80px]"
                  placeholder="Add notes..."
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
     <main>
       <Navbar/>

      <div className="min-h-screen bg-gray-50">
        <SalesDasboards/>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500 text-sm">Hi, {userName} 👋</p>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 space-y-2">
            <button
              onClick={() => onNavigate('leads')}
              className="w-full text-left p-3 rounded-lg border bg-gray-50 hover:bg-gray-100"
            >
              View All Leads
            </button>
          </div>
        )}
      </div>

      <div className="container mx-auto p-4 lg:p-6 space-y-6">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500 mt-1">Hi, {userName} 👋 · {getTodayDate()}</p>
          </div>
          <button
            onClick={() => onNavigate('leads')}
            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            View All Leads
          </button>
        </div>

        {/* Today's Goal Banner */}
        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Today's Call Goal</h3>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">
                  {todayGoal.completed} of {todayGoal.target} calls completed · {getCurrentTime()}
                </p>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-2xl lg:text-3xl font-semibold text-gray-900">{todayGoal.percentage}%</p>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-2 mx-auto lg:mx-0">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${todayGoal.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 ${kpi.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="text-xl font-semibold text-gray-900 mt-2">{kpi.value}</p>
                <p className="text-xs text-gray-600 mt-2">{kpi.change}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Quick View */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 lg:p-6 border-b">
                <h2 className="text-lg lg:text-xl font-semibold">Lead Quick View</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 text-sm font-medium text-gray-900">Lead Name</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-900 hidden sm:table-cell">Source</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-900">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-900 hidden lg:table-cell">Last Contact</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-900 hidden xl:table-cell">Follow-up</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <button
                            onClick={() => onNavigate('lead-detail', lead.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                          >
                            {lead.name}
                          </button>
                        </td>
                        <td className="p-4 text-gray-600 hidden sm:table-cell">{lead.source}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              lead.status === 'Hot'
                                ? 'bg-red-100 text-red-800'
                                : lead.status === 'Warm'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600 hidden lg:table-cell">{lead.lastContact}</td>
                        <td className="p-4 text-gray-600 hidden xl:table-cell">{lead.followUp}</td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleCall(lead)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Make Call"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEmail(lead)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleWhatsApp(lead)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Send WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleFollowUp(lead)}
                              className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Schedule Follow-up"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Funnel Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Lead Conversion Funnel</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="calls" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Lead Source Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Lead Sources</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {leadSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Lead Status Distribution</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={statusData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="status" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Follow-ups */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 lg:p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Today's Follow-ups</h2>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {karthikData.todayFollowUps.length} Scheduled
                  </span>
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <div className="space-y-3">
                  {karthikData.todayFollowUps.map((followUp, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg gap-3">
                      <div className="flex items-center gap-3">
                        <div className="text-center min-w-[60px]">
                          <div className="text-sm font-medium text-orange-900">{followUp.time}</div>
                        </div>
                        <div className="hidden sm:block w-px h-10 bg-orange-200"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{followUp.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{followUp.note}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCall(karthikData.leads.find(l => l.name === followUp.name))}
                        className="px-3 py-1.5 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm"
                      >
                        Call
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* This Week */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 lg:p-6 border-b">
                <h2 className="text-lg font-semibold">This Week's Schedule</h2>
              </div>
              <div className="p-4 lg:p-6">
                <div className="space-y-3">
                  {followUps.map((day, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        day.isToday ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-center min-w-[40px]">
                          <div className={`font-medium ${day.isToday ? 'text-blue-900' : 'text-gray-900'}`}>
                            {day.date}
                          </div>
                          <div className={`text-xs ${day.isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                            {day.day}
                          </div>
                        </div>
                        <div className={`w-px h-10 ${day.isToday ? 'bg-blue-200' : 'bg-gray-200'}`}></div>
                        <div>
                          <p className={`text-sm ${day.isToday ? 'text-gray-900' : 'text-gray-900'}`}>
                            {day.count} follow-ups
                          </p>
                        </div>
                      </div>
                      {day.isToday && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 lg:p-6 border-b">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
              </div>
              <div className="p-4 lg:p-6">
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'call' ? 'bg-green-50 text-green-600' :
                        activity.type === 'email' ? 'bg-blue-50 text-blue-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {activity.type === 'call' && <Phone className="w-4 h-4" />}
                        {activity.type === 'email' && <Mail className="w-4 h-4" />}
                        {activity.type === 'whatsapp' && <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        <p className="text-xs text-gray-600 mt-1 truncate">{activity.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Call Button */}
      <button
        onClick={() => setIsCallModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-40"
      >
        <PhoneCall className="w-6 h-6" />
      </button>

      {/* Use the actual imported components */}
      <MakeACall 
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        lead={selectedLead}
      />

      <SalesEmailModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        lead={selectedLead}
      />

      <SalesWhatsAppModal 
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        lead={selectedLead}
      />

      <FollowUpModal 
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        lead={selectedLead}
      />
    </div>
     </main>
  );
};

export default SalesExecutiveDashboard;