import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Award,
  Bell,
  Calendar,
  Plus
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import Navbar from '../../common/Navbar/nav';
import AdminDasboards from './a-dasboard/a-dasboard';
// Mock data - replace with your actual data
const managerData = {
  totalRevenue: 450000,
  todayRevenue: 85000,
  leadsConverted: 124,
  paymentsVerified: 89,
  todayPayments: 12,
  pendingApprovals: 8,
  pendingVerifications: [
    {
      lead: 'Sanjay Kumar',
      executive: 'Rahul',
      type: 'Full',
      amount: '₹45,000',
      time: '2 hours ago'
    },
    {
      lead: 'Priya Singh',
      executive: 'Sneha',
      type: 'EMI',
      amount: '₹1,20,000',
      time: '1 hour ago'
    }
  ],
  criticalAlerts: [
    {
      type: 'payment',
      priority: 'high',
      message: '3 high-value payments pending verification'
    },
    {
      type: 'lead',
      priority: 'medium',
      message: '15 leads awaiting follow-up from sales team'
    }
  ],
  topPerformersToday: [
    { name: 'Rahul', conversions: 8, revenue: '₹85,000' },
    { name: 'Priya', conversions: 6, revenue: '₹72,000' },
    { name: 'Karthik', conversions: 5, revenue: '₹58,000' }
  ]
};

const getTodayDate = () => {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Mock toast function - replace with your actual toast implementation
const toast = {
  success: (message) => console.log('Success:', message),
  error: (message) => console.log('Error:', message)
};

export function AdminDashboard({ onNavigate }) {
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

  const kpis = [
    {
      label: 'Total Revenue',
      value: `₹${(managerData.totalRevenue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'bg-green-50 text-green-600',
      trend: '+18%',
      subtext: `₹${(managerData.todayRevenue / 100000).toFixed(1)}L today`
    },
    {
      label: 'Leads Converted',
      value: managerData.leadsConverted.toString(),
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-600',
      trend: '+12%',
      subtext: 'This month'
    },
    {
      label: 'Payments Verified',
      value: managerData.paymentsVerified.toString(),
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-600',
      trend: '+8%',
      subtext: `${managerData.todayPayments} verified today`
    },
    {
      label: 'Pending Approvals',
      value: managerData.pendingApprovals.toString(),
      icon: AlertCircle,
      color: 'bg-orange-50 text-orange-600',
      trend: '-5%',
      subtext: 'Needs attention'
    },
  ];

  const payments = [
    { lead: 'Priya Sharma', executive: 'Karthik', type: 'Full', amount: '₹45,000', status: 'verified' },
    { lead: 'Rajesh Kumar', executive: 'Priya', type: 'EMI', amount: '₹1,20,000', status: 'unverified' },
    { lead: 'Anita Desai', executive: 'Arjun', type: 'Full', amount: '₹38,000', status: 'verified' },
    { lead: 'Vikram Singh', executive: 'Sneha', type: 'Loan', amount: '₹95,000', status: 'unverified' },
    { lead: 'Meera Patel', executive: 'Rahul', type: 'Credit', amount: '₹52,000', status: 'verified' },
  ];

  const revenueData = [
    { month: 'Jun', revenue: 8.5 },
    { month: 'Jul', revenue: 9.2 },
    { month: 'Aug', revenue: 10.1 },
    { month: 'Sep', revenue: 9.8 },
    { month: 'Oct', revenue: 11.2 },
    { month: 'Nov', revenue: 12.4 },
  ];

  const paymentTypeData = [
    { name: 'Full Payment', value: 45, color: '#10B981' },
    { name: 'EMI', value: 30, color: '#3B82F6' },
    { name: 'Loan', value: 15, color: '#F59E0B' },
    { name: 'Credit', value: 10, color: '#8B5CF6' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Rahul', conversions: 18, revenue: '₹2.4L' },
    { rank: 2, name: 'Priya', conversions: 16, revenue: '₹2.1L' },
    { rank: 3, name: 'Karthik', conversions: 14, revenue: '₹1.8L' },
    { rank: 4, name: 'Sneha', conversions: 12, revenue: '₹1.6L' },
    { rank: 5, name: 'Arjun', conversions: 10, revenue: '₹1.4L' },
  ];

  return (
    <>
      <main className=''>
        {/* <DashboardLayout/> */}
        <Navbar/>
        <AdminDasboards/>
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manager Overview</h1>
                <p className="text-gray-500 mt-1 text-sm md:text-base">Hey Rajesh! · {getTodayDate()}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('reports')}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Reports
                </button>
                <button
                  onClick={() => setIsApprovalModalOpen(true)}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white relative transition-colors text-sm md:text-base"
                >
                  Approve Payments
                  {managerData.pendingVerifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-600 rounded-full w-6 h-6 p-0 flex items-center justify-center text-xs text-white">
                      {managerData.pendingVerifications.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Critical Alerts */}
            {managerData.criticalAlerts.length > 0 && (
              <div className="space-y-3">
                {managerData.criticalAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border p-6 ${alert.priority === 'high'
                        ? 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50'
                        : 'border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50'
                      }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 ${alert.priority === 'high' ? 'bg-red-600' : 'bg-orange-600'
                            } rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          {alert.type === 'payment' ? (
                            <AlertCircle className="w-6 h-6 text-white" />
                          ) : (
                            <Bell className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <span
                            className={`inline-block px-2 py-1 rounded-lg text-xs font-medium text-white mb-2 ${alert.priority === 'high'
                                ? 'bg-red-600'
                                : 'bg-orange-600'
                              }`}
                          >
                            {alert.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                          </span>
                          <p className="text-gray-900 text-sm md:text-base">{alert.message}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (alert.type === 'payment') {
                            setIsApprovalModalOpen(true);
                          } else {
                            onNavigate('leads');
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-white text-sm md:text-base ${alert.priority === 'high' ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'
                          } transition-colors flex-shrink-0`}
                      >
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Today's Performance */}
            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg md:text-xl">Today's Revenue</h3>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                      ₹{(managerData.todayRevenue / 100000).toFixed(1)}L
                    </p>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                      {managerData.todayPayments} payments verified today
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-600">Top Performer Today</p>
                  <p className="text-gray-900 mt-1 font-semibold">{managerData.topPerformersToday[0].name}</p>
                  <p className="text-sm text-gray-600 mt-1">{managerData.topPerformersToday[0].revenue}</p>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${kpi.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-xs ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {kpi.trend}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{kpi.label}</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                    <p className="text-xs text-gray-600 mt-2">{kpi.subtext}</p>
                  </div>
                );
              })}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Finance Table and Revenue Trend */}
              <div className="lg:col-span-2 space-y-6">
                {/* Finance Table */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Finance Overview</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">Lead</th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">Sales Exec</th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">Payment Type</th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">Amount</th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment, index) => (
                          <tr key={index} className="border-b border-gray-100 last:border-b-0">
                            <td className="py-3 px-2 text-sm text-gray-900">{payment.lead}</td>
                            <td className="py-3 px-2 text-sm text-gray-600">{payment.executive}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2 py-1 rounded-lg text-xs ${payment.type === 'Full'
                                    ? 'bg-green-50 text-green-600'
                                    : payment.type === 'EMI'
                                      ? 'bg-blue-50 text-blue-600'
                                      : payment.type === 'Loan'
                                        ? 'bg-orange-50 text-orange-600'
                                        : 'bg-purple-50 text-purple-600'
                                  }`}
                              >
                                {payment.type}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-900">{payment.amount}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2 py-1 rounded-lg text-xs ${payment.status === 'verified'
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-orange-50 text-orange-600'
                                  }`}
                              >
                                {payment.status === 'verified' ? 'Verified' : 'Unverified'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Revenue Trend */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Revenue Trend (Last 6 Months)</h2>
                  <div className="h-64 md:h-80 rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 5, strokeWidth: 2, fill: "#3b82f6" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Today's Top Performers */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">Today's Top Performers</h2>
                    <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs">Live</span>
                  </div>
                  <div className="space-y-3">
                    {managerData.topPerformersToday.map((member, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg ${index === 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                          }`}
                      >
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${index === 0
                              ? 'bg-yellow-500 text-white'
                              : index === 1
                                ? 'bg-gray-400 text-white'
                                : 'bg-orange-400 text-white'
                            }`}
                        >
                          {index === 0 ? <Award className="w-4 h-4 md:w-5 md:h-5" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{member.conversions} conversions today</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{member.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Verifications Quick View */}
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">Pending Verifications</h2>
                    <span className="bg-orange-600 text-white px-2 py-1 rounded-lg text-xs">
                      {managerData.pendingVerifications.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {managerData.pendingVerifications.map((payment, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white border border-orange-200 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">{payment.lead}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {payment.type} - {payment.amount}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{payment.time}</p>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setIsApprovalModalOpen(true)}
                      className="w-full bg-orange-600 hover:bg-orange-700 rounded-xl text-white py-2 px-4 transition-colors text-sm md:text-base"
                    >
                      Review All
                    </button>
                  </div>
                </div>

                {/* Payment Type Breakdown */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Payment Type Breakdown</h2>
                  <div className="h-48 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentTypeData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={80}
                          paddingAngle={5}
                        >
                          {paymentTypeData.map((item, index) => (
                            <Cell key={index} fill={item.color} />
                          ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Modal */}
          {isApprovalModalOpen && (
            <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Approve Payments</h2>
                  <p className="text-gray-600 mt-1">
                    Review and approve pending payment verifications ({managerData.pendingVerifications.length} pending)
                  </p>
                </div>
                <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
                  {managerData.pendingVerifications.map((payment, index) => (
                    <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <p className="text-sm font-medium text-gray-900">{payment.lead}</p>
                            <span
                              className={`inline-block px-2 py-1 rounded-lg text-xs ${payment.type === 'Full'
                                  ? 'bg-green-50 text-green-600'
                                  : payment.type === 'EMI'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'bg-orange-50 text-orange-600'
                                }`}
                            >
                              {payment.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">Executive: {payment.executive}</p>
                          <p className="text-xs text-gray-600 mt-1">Amount: {payment.amount}</p>
                          <p className="text-xs text-gray-500 mt-1">Submitted: {payment.time}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              toast.error('Payment rejected');
                            }}
                            className="px-3 py-1 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => {
                              toast.success(`Payment of ${payment.amount} approved for ${payment.lead}`);
                            }}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-colors"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-3">
                  <button
                    onClick={() => {
                      toast.success('All payments approved!');
                      setIsApprovalModalOpen(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                    Approve All
                  </button>
                  <button
                    onClick={() => setIsApprovalModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>

  );
}

export default AdminDashboard;