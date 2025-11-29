import {
  Users,
  Phone,
  Clock,
  Send,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Award,
  UserPlus,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { toast } from "react-toastify";
import { useState } from "react";
import AssignLeads from "../Dashboard/AssignLead"; // ✅ adjust path if needed
import Navbar from '../../../common/Navbar/nav';
import TlDasboards from "../SideBar/TlDashboard";
// Mock data (replace with API later)
const arunTeamData = {
  totalLeads: 156,
  unassignedLeads: { hot: 8, warm: 12, cold: 15 },
  teamCallsToday: 89,
  avgTalkTime: 7.2,
  paymentLinksSent: 23,
  todayHighlights: [
    { executive: "Priya Sharma", achievement: "Closed 3 premium accounts", time: "10:30 AM" },
    { executive: "Rahul Kumar", achievement: "Highest talk time: 45 mins", time: "11:15 AM" },
    { executive: "Anita Patel", achievement: "5 successful demos completed", time: "2:45 PM" },
  ],
  team: [
    { id: 1, name: "Priya Sharma", leads: 23, calls: 15, talkTime: 45, conversion: 32, status: "active" },
    { id: 2, name: "Rahul Kumar", leads: 18, calls: 12, talkTime: 38, conversion: 28, status: "active" },
    { id: 3, name: "Anita Patel", leads: 21, calls: 14, talkTime: 42, conversion: 35, status: "active" },
    { id: 4, name: "Vikram Singh", leads: 15, calls: 9, talkTime: 28, conversion: 22, status: "inactive" },
  ],
};

const getTodayDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ✅ Mock Leads for Assign Modal */
const mockLeads = [
  { id: "l1", name: "Rohan Mehta", status: "hot", source: "Meta Ads", lastSeen: "10 mins ago" },
  { id: "l2", name: "Kavya Reddy", status: "hot", source: "LinkedIn", lastSeen: "30 mins ago" },
  { id: "l3", name: "Sanjay Gupta", status: "hot", source: "Website", lastSeen: "45 mins ago" },
  { id: "l4", name: "Neha Verma", status: "warm", source: "Referral", lastSeen: "1 hr ago" },
  { id: "l5", name: "Akash Rao", status: "warm", source: "Website", lastSeen: "2 hrs ago" },
  { id: "l6", name: "Prateek Jain", status: "cold", source: "Other", lastSeen: "Yesterday" },
];

/* ✅ Mock Executives for Assign Modal */
const mockExecutives = [
  {
    id: "e1",
    name: "Karthik",
    leadsAssigned: 24,
    leadsLimit: 30,
    priority: "high",
    avatarColor: "#2563EB",
  },
  {
    id: "e2",
    name: "Priya",
    leadsAssigned: 28,
    leadsLimit: 30,
    priority: "very high",
    avatarColor: "#9333EA",
  },
  {
    id: "e3",
    name: "Arjun",
    leadsAssigned: 22,
    leadsLimit: 30,
    priority: "medium",
    avatarColor: "#16A34A",
  },
  {
    id: "e4",
    name: "Sneha",
    leadsAssigned: 26,
    leadsLimit: 30,
    priority: "high",
    avatarColor: "#F97316",
  },
  {
    id: "e5",
    name: "Rahul",
    leadsAssigned: 30,
    leadsLimit: 30,
    priority: "high",
    avatarColor: "#DC2626",
  },
];

export function TeamLeadDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("hot");

  // ✅ NEW: modal open state
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const kpis = [
    {
      label: "Total Leads",
      value: arunTeamData.totalLeads.toString(),
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      trend: "+12%",
      subtext: `${
        arunTeamData.unassignedLeads.hot +
        arunTeamData.unassignedLeads.warm +
        arunTeamData.unassignedLeads.cold
      } unassigned`,
    },
    {
      label: "Team Calls Today",
      value: arunTeamData.teamCallsToday.toString(),
      icon: Phone,
      color: "bg-green-50 text-green-600",
      trend: "+8%",
      subtext: "Above daily target",
    },
    {
      label: "Avg Talk Time",
      value: `${arunTeamData.avgTalkTime} min`,
      icon: Clock,
      color: "bg-purple-50 text-purple-600",
      trend: "+15%",
      subtext: "Team average",
    },
    {
      label: "Payment Links Sent",
      value: arunTeamData.paymentLinksSent.toString(),
      icon: Send,
      color: "bg-orange-50 text-orange-600",
      trend: "+22%",
      subtext: "Today only",
    },
  ];

  const teamMembers = arunTeamData.team;

  const sourceData = [
    { name: "Meta Ads", value: 45, color: "#3B82F6" },
    { name: "LinkedIn", value: 28, color: "#8B5CF6" },
    { name: "Website", value: 35, color: "#F59E0B" },
    { name: "Referral", value: 22, color: "#10B981" },
    { name: "Other", value: 26, color: "#6B7280" },
  ];

  const heatmapData = [
    { hour: "9 AM", calls: 5 },
    { hour: "10 AM", calls: 12 },
    { hour: "11 AM", calls: 18 },
    { hour: "12 PM", calls: 8 },
    { hour: "1 PM", calls: 4 },
    { hour: "2 PM", calls: 15 },
    { hour: "3 PM", calls: 22 },
    { hour: "4 PM", calls: 19 },
    { hour: "5 PM", calls: 14 },
    { hour: "6 PM", calls: 9 },
  ];

  // ✅ Assign callback passed into modal
  const handleAssign = async (lead, exec) => {
    // you can call API here
    console.log("Assigning lead:", lead, "to exec:", exec);

    toast.success(`${lead.name} assigned to ${exec.name}`);
    return true;
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <Navbar/>
      <TlDasboards/>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Team Lead Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Hey Arun! · {getTodayDate()}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigate?.("leads")}
            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Lead Overview
          </button>

          <button
            onClick={() => onNavigate?.("reports")}
            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Team Performance
          </button>

          {/* ✅ OPEN MODAL */}
          <button
            onClick={() => setIsAssignOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white flex items-center transition-colors text-sm font-medium"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Assign Leads
          </button>
        </div>
      </div>

      {/* Today's Highlights */}
      <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Today's Team Highlights
            </h3>
            <div className="mt-3 space-y-2">
              {arunTeamData.todayHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">
                      {highlight.executive}
                    </span>
                    : {highlight.achievement}{" "}
                    <span className="text-gray-500">
                      · {highlight.time}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Required Banner */}
      <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Action Required
              </h3>
              <p className="text-gray-600 mt-1">
                {arunTeamData.unassignedLeads.hot} hot leads unassigned · Needs immediate attention
              </p>
            </div>
          </div>

          {/* ✅ OPEN MODAL */}
          <button
            onClick={() => setIsAssignOpen(true)}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl text-white transition-colors text-sm font-medium whitespace-nowrap"
          >
            Assign Now
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 ${kpi.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">{kpi.trend}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="text-xl font-semibold text-gray-900 mt-2">
                {kpi.value}
              </p>
              <p className="text-xs text-gray-600 mt-2">{kpi.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Team Overview
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-900">Sales Executive</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-900">Leads</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-900">Calls</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-900">Talk Time</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-900">Conversion</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium text-gray-900">{member.name}</td>
                      <td className="py-3 px-2 text-gray-600">{member.leads}</td>
                      <td className="py-3 px-2 text-gray-600">{member.calls}</td>
                      <td className="py-3 px-2 text-gray-600">{member.talkTime}</td>
                      <td className="py-3 px-2 text-gray-600">{member.conversion}%</td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            member.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calls Heatmap */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Calls by Hour
            </h2>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {heatmapData.map((item, index) => {
                const intensity = Math.min(item.calls / 25, 1);
                return (
                  <div
                    key={index}
                    className="aspect-square rounded-lg flex flex-col items-center justify-center relative group cursor-pointer"
                    style={{
                      backgroundColor: `rgba(59,130,246,${0.1 + intensity * 0.7})`,
                    }}
                  >
                    <span className="text-xs text-gray-600">{item.hour.split(" ")[0]}</span>
                    <span className="text-xs font-medium text-gray-900 mt-1">{item.calls}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Lead Sources */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Lead Sources
            </h2>

            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Assign */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Assign
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg">
                {["hot", "warm", "cold"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsAssignOpen(true)}
                className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-colors font-medium"
              >
                Open Assign Panel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ASSIGN LEADS POPUP MODAL */}
      <AssignLeads
        open={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        leads={mockLeads}
        executives={mockExecutives}
        aiRecommendation={{
          message:
            "Based on availability and performance, we recommend assigning to Arjun or Karthik",
          execIds: ["e1", "e3"],
        }}
        onAssign={handleAssign}
      />
    </div>
  );
}
