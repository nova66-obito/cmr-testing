import { useMemo, useRef, useState } from "react";
import {
  Phone,
  Clock,
  TrendingUp,
  PhoneCall,
  ChevronDown,
} from "lucide-react";

import ExportButton from "../Calls/TeamleadExport";
import MakeACall from "../Calls/TeamleadMakeCall";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* --------------------- small reusable UI helpers --------------------- */

const StatCard = ({ title, value, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-xs text-green-600">+12%</span>
        </div>
      </div>
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBg} ${iconColor} rounded-xl flex items-center justify-center`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </div>
  </div>
);

const FilterSelect = ({ value, onChange, options, placeholder }) => (
  <div className="relative flex-1 min-w-[140px] sm:min-w-[200px] sm:max-w-[220px]">
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-gray-100 text-gray-800 rounded-full px-5 py-3 pr-10 text-sm font-medium outline-none appearance-none focus:ring-2 focus:ring-green-200 focus:bg-white"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
  </div>
);

const CallsTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="text-sm text-green-600 mt-1">calls : {payload[0].value}</p>
    </div>
  );
};

/* --------------------- main component --------------------- */

export function TeamLeadCallsModule() {
  const printableRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState("all");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const [dateRange, setDateRange] = useState("");
  const [executiveFilter, setExecutiveFilter] = useState("all");
  const [callTypeFilter, setCallTypeFilter] = useState("all");

  const [calls, setCalls] = useState([
    {
      id: "1",
      leadName: "Priya Sharma",
      phone: "+91 98765 43210",
      duration: "8:32",
      time: "10:30 AM",
      date: "today",
      result: "Interested",
      type: "outbound",
      executive: "Karthik",
    },
    {
      id: "2",
      leadName: "Rajesh Kumar",
      phone: "+91 98765 43211",
      duration: "5:12",
      time: "11:45 AM",
      date: "today",
      result: "Call Back",
      type: "outbound",
      executive: "Priya",
    },
    {
      id: "3",
      leadName: "Anita Desai",
      phone: "+91 98765 43212",
      duration: "0:00",
      time: "2:15 PM",
      date: "today",
      result: "Not Picked",
      type: "outbound",
      executive: "Arjun",
    },
  ]);

  const callsByHour = [
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

  const tabItems = [
    { key: "all", label: "All Calls" },
    { key: "answered", label: "Answered" },
    { key: "missed", label: "Missed" },
  ];

  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      if (selectedTab === "answered" && call.duration === "0:00") return false;
      if (selectedTab === "missed" && call.duration !== "0:00") return false;
      if (dateRange && call.date !== dateRange) return false;
      if (
        executiveFilter !== "all" &&
        call.executive.toLowerCase() !== executiveFilter
      )
        return false;
      if (callTypeFilter !== "all" && call.type !== callTypeFilter)
        return false;
      return true;
    });
  }, [calls, selectedTab, dateRange, executiveFilter, callTypeFilter]);

  const handleMakeCall = (call = null) => {
    setSelectedCall(call);
    setIsCallModalOpen(true);
  };

  const handleAddCallToDashboard = (newCall) =>
    setCalls((prev) => [newCall, ...prev]);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* EXPORT AREA */}
      <div
        ref={printableRef}
        className="max-w-7xl mx-auto space-y-6 p-3 sm:p-6 bg-white"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Calls
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Track all call activities and performance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <ExportButton
              targetRef={printableRef}
              fileName="calls-dashboard.pdf"
            />
            <button
              onClick={() => handleMakeCall()}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4" />
              Make Call
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <StatCard
            title="Total Calls Today"
            value={calls.length}
            icon={Phone}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Avg Talk Time"
            value="6:32 min"
            icon={Clock}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Answer Rate"
            value="78%"
            icon={Phone}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            title="Total Talk Time"
            value="5.2 hrs"
            icon={Clock}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
          />
        </div>

        {/* Filters (ROW always + wrap on small screens) */}
        <div className="bg-white border border-gray-200 rounded-2xl px-3 sm:px-6 py-4">
          <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-4">
            <FilterSelect
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              placeholder="Date Range"
              options={[
                { value: "today", label: "Today" },
                { value: "this week", label: "This Week" },
                { value: "this month", label: "This Month" },
              ]}
            />
            <FilterSelect
              value={executiveFilter}
              onChange={(e) => setExecutiveFilter(e.target.value)}
              options={[
                { value: "all", label: "Executive" },
                { value: "all", label: "All Executives" },
                { value: "karthik", label: "Karthik" },
                { value: "priya", label: "Priya" },
                { value: "arjun", label: "Arjun" },
              ]}
            />
            <FilterSelect
              value={callTypeFilter}
              onChange={(e) => setCallTypeFilter(e.target.value)}
              options={[
                { value: "all", label: "Call Type" },
                { value: "all", label: "All Types" },
                { value: "outbound", label: "Outbound" },
                { value: "inbound", label: "Inbound" },
              ]}
            />
          </div>
        </div>

        {/* Tabs Desktop */}
        <nav className="hidden sm:block w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex w-full">
            {tabItems.map((tab, idx) => {
              const active = selectedTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={[
                    "flex-1 px-4 py-3 text-sm font-semibold transition-colors border-b-2",
                    active
                      ? "bg-green-50 text-green-700 border-green-500"
                      : "bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900",
                    idx !== tabItems.length - 1
                      ? "border-r border-gray-200"
                      : "",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Tabs Mobile Dropdown */}
        <div className="sm:hidden relative w-full">
          <select
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-semibold outline-none appearance-none focus:ring-2 focus:ring-green-200"
          >
            {tabItems.map((tab) => (
              <option key={tab.key} value={tab.key}>
                {tab.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] table-auto">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {[
                    "Lead Name",
                    "Phone",
                    "Duration",
                    "Time",
                    "Result",
                    "Executive",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {call.leadName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {call.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {call.duration}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {call.time}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          call.result === "Interested"
                            ? "bg-green-100 text-green-800"
                            : call.result === "Not Picked"
                            ? "bg-red-100 text-red-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {call.result}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {call.executive}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => handleMakeCall(call)}
                        className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCalls.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      No calls in this filter/tab.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart bottom */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Calls by Hour
          </h3>

          <div className="w-full flex justify-center">
            <div className="w-full max-w-2xl h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={callsByHour}
                  margin={{ top: 10, right: 10, left: -10, bottom: 35 }}
                  barCategoryGap="22%"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical horizontal />
                  <YAxis
                    domain={[0, 24]}
                    ticks={[0, 6, 12, 18, 24]}
                    axisLine
                    tickLine={false}
                    fontSize={12}
                  />
                  <XAxis
  dataKey="hour"
  interval={0}
  angle={-45}
  textAnchor="end"
  height={45}
  axisLine={false}   // ✅ hides baseline so bottom curve shows
  tickLine={false}
  fontSize={12}
/>

                  <Tooltip
                    content={<CallsTooltip />}
                    cursor={{ fill: "rgba(0,0,0,0.12)" }}
                  />
                 <Bar
  dataKey="calls"
  fill="#10b981"
  barSize={55}
  radius={[14, 14, 0, 0]}   // ✅ top rounded, bottom rectangle
/>


                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <MakeACall
        isOpen={isCallModalOpen}
        onClose={() => {
          setIsCallModalOpen(false);
          setSelectedCall(null);
        }}
        lead={selectedCall}
        onSubmit={handleAddCallToDashboard}
      />
    </div>
  );
}

export function Calls() {
  return <CallsModule />;
}
