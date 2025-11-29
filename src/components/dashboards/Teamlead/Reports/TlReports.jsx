import { useRef, useState } from "react";
import { Download, TrendingUp, Award } from "lucide-react";
import ExportButton from '../Calls/TeamleadExport'
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart as RBarChart,
  Bar,
  LineChart as RLineChart,
  Line,
  PieChart as RPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export function TeamLeadReportsModule({ userRole = "viewer" }) {
  const printableRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState("leads");

  // ---------- PERMISSIONS ----------
  const hasPermission = (role, permission) => {
    const permissions = {
      admin: ["canExportData"],
      manager: ["canExportData"],
      executive: ["canExportData"],
      viewer: [],
    };
    return permissions[role]?.includes(permission) || false;
  };

  const canExportData = hasPermission(userRole, "canExportData");

  // ---------- DATA ----------
  const funnelData = [
    { stage: "Total Leads", count: 250, color: "#3B82F6" },
    { stage: "Contacted", count: 180, color: "#8B5CF6" },
    { stage: "Payment Sent", count: 120, color: "#F59E0B" },
    { stage: "Paid", count: 84, color: "#10B981" },
  ];

  const callsPerDayData = [
    { day: "Mon", calls: 45 },
    { day: "Tue", calls: 52 },
    { day: "Wed", calls: 48 },
    { day: "Thu", calls: 61 },
    { day: "Fri", calls: 55 },
    { day: "Sat", calls: 38 },
    { day: "Sun", calls: 28 },
  ];

  const leadSourcesData = [
    { name: "LinkedIn", value: 25, color: "#8B5CF6" },
    { name: "Meta Ads", value: 35, color: "#3B82F6" },
    { name: "Other", value: 5, color: "#6B7280" },
    { name: "Referral", value: 15, color: "#10B981" },
    { name: "Website", value: 20, color: "#F59E0B" },
  ];

  const conversionTrendData = [
    { month: "Jun", rate: 28 },
    { month: "Jul", rate: 32 },
    { month: "Aug", rate: 30 },
    { month: "Sep", rate: 35 },
    { month: "Oct", rate: 33 },
    { month: "Nov", rate: 38 },
  ];

  const executivePerformance = [
    { rank: 1, name: "Rahul", leads: 48, calls: 156, talkTime: "12.5h", conversions: 18, revenue: "₹2.4L" },
    { rank: 2, name: "Priya", leads: 45, calls: 148, talkTime: "11.2h", conversions: 16, revenue: "₹2.1L" },
    { rank: 3, name: "Karthik", leads: 42, calls: 142, talkTime: "10.8h", conversions: 14, revenue: "₹1.8L" },
    { rank: 4, name: "Sneha", leads: 38, calls: 128, talkTime: "9.5h", conversions: 12, revenue: "₹1.6L" },
    { rank: 5, name: "Arjun", leads: 35, calls: 118, talkTime: "8.9h", conversions: 10, revenue: "₹1.4L" },
  ];

  // ---------- TOOLTIP ----------
  const NiceTip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-700 mt-1">
          {payload[0].name} : {payload[0].value}
        </p>
      </div>
    );
  };

  return (
    <div ref={printableRef} className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Analytics and performance insights
          </p>
        </div>
<div className="w-full sm:w-auto">
  <ExportButton targetRef={printableRef} fileName="payments-dashboard.pdf">
    <div className=" w-full sm:w-auto flex justify-center items-center gap-2 border border-gray-200 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition">
      <Download className="w-4 h-4" />
      <span className="font-medium">Export</span>
    </div>
  </ExportButton>
</div>
 
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col md:flex-row gap-3">
          <select className="w-full md:w-48 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="month">This Month</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select className="w-full md:w-48 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All TLs</option>
            <option value="arun">Arun</option>
            <option value="meena">Meena</option>
          </select>
          <select className="w-full md:w-48 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Teams</option>
            <option value="sales">Sales Team</option>
            <option value="support">Support Team</option>
          </select>
        </div>
      </div>

      {/* Tabs FULL WIDTH */}
      <div className="bg-white border border-gray-200 rounded-xl w-full flex overflow-x-auto">
        {[
          ["leads", "Leads"],
          ["calls", "Calls"],
          ["payments", "Payments"],
          ["executives", "Executives"],
        ].map(([key, label], i, arr) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key)}
            className={[
              "flex-1 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              i === 0 ? "rounded-l-xl" : "",
              i === arr.length - 1 ? "rounded-r-xl" : "",
              selectedTab === key
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "text-gray-500 hover:text-gray-700",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* -------- LEADS TAB (NO CALL BAR CHART BELOW) -------- */}
      {selectedTab === "leads" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funnel Horizontal */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Lead Conversion Funnel
              </h3>

              <div className="h-72 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RBarChart
                    data={funnelData}
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: 30, bottom: 10 }}
                    barCategoryGap={22}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 260]} ticks={[0, 65, 130, 195, 260]} />
                    <YAxis type="category" dataKey="stage" width={110} />
                    <Tooltip content={<NiceTip />} />
                    <Bar dataKey="count" radius={[0, 12, 12, 0]}>
                      {funnelData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </RBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Pie */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Lead Sources Distribution
              </h3>

              <div className="h-72 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RPieChart>
                    <Pie
                      data={leadSourcesData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="55%"
                      outerRadius="80%"
                      paddingAngle={3}
                      stroke="white"
                      strokeWidth={6}
                      label={({ value }) => value}
                    >
                      {leadSourcesData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<NiceTip />} />
                    <Legend verticalAlign="bottom" iconType="square" />
                  </RPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Conversion Trend Line */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Conversion Rate Trend
            </h3>

            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RLineChart data={conversionTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} />
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 7 }}
                  />
                </RLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* -------- CALLS TAB -------- */}
      {selectedTab === "calls" && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calls Per Day</h3>
          <div className="h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RBarChart data={callsPerDayData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[0, 80]} ticks={[0, 20, 40, 60, 80]} />
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar dataKey="calls" fill="#10B981" radius={[10, 10, 0, 0]} barSize={55} />
              </RBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* -------- PAYMENTS TAB -------- */}
      {selectedTab === "payments" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            ["Total Revenue", "₹12.4L", "+18%", "bg-green-50 text-green-600"],
            ["Avg. Deal Size", "₹52,500", "+5%", "bg-blue-50 text-blue-600"],
            ["Payments Today", "8", "₹3.2L collected", "bg-purple-50 text-purple-600"],
          ].map(([title, value, sub, badge]) => (
            <div key={title} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
                  <p className="text-xs text-gray-600 mt-2">{sub}</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${badge}`}>
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------- EXECUTIVES TAB -------- */}
      {selectedTab === "executives" && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Executives</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Rank", "Name", "Leads", "Calls", "Talk Time", "Conversions", "Revenue"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {executivePerformance.map((exec) => (
                  <tr key={exec.rank} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          exec.rank === 1
                            ? "bg-yellow-50 text-yellow-600"
                            : exec.rank === 2
                            ? "bg-gray-100 text-gray-600"
                            : exec.rank === 3
                            ? "bg-orange-50 text-orange-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {exec.rank === 1 ? <Award className="w-4 h-4" /> : exec.rank}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{exec.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{exec.leads}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{exec.calls}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{exec.talkTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{exec.conversions}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{exec.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
