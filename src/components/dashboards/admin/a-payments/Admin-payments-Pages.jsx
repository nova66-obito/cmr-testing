import { useEffect, useMemo, useRef, useState } from "react";
import { Download, CheckCircle, XCircle } from "lucide-react";
import ExportButton from "../../../common/Exports";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";

export function PaymentsModule({ userRole = "viewer" }) {
  const printableRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState("all");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [barSize, setBarSize] = useState(70); // ✅ responsive bars

  const [checklist, setChecklist] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  // ✅ Make bar width responsive
  useEffect(() => {
    const updateBarSize = () => {
      const w = window.innerWidth;
      if (w < 420) setBarSize(28);
      else if (w < 640) setBarSize(40);
      else if (w < 1024) setBarSize(55);
      else setBarSize(70);
    };
    updateBarSize();
    window.addEventListener("resize", updateBarSize);
    return () => window.removeEventListener("resize", updateBarSize);
  }, []);

  const hasPermission = (role, permission) => {
    const permissions = {
      admin: ["canVerifyPayments", "canExportData"],
      manager: ["canVerifyPayments", "canExportData"],
      executive: ["canExportData"],
      viewer: [],
    };
    return permissions[role]?.includes(permission) || false;
  };

  const canVerifyPayments = hasPermission(userRole, "canVerifyPayments");
  const canExportData = hasPermission(userRole, "canExportData");

  const payments = [
    {
      id: "1",
      lead: "Priya Sharma",
      executive: "Karthik",
      amount: "₹45,000",
      type: "Full",
      source: "Meta Ads",
      verified: true,
      date: "Nov 10, 2024",
      status: "all",
    },
    {
      id: "2",
      lead: "Rajesh Kumar",
      executive: "Priya",
      amount: "₹1,20,000",
      type: "EMI",
      source: "LinkedIn",
      verified: false,
      date: "Nov 11, 2024",
      status: "pending",
    },
    {
      id: "3",
      lead: "Anita Desai",
      executive: "Arjun",
      amount: "₹38,000",
      type: "Full",
      source: "Website",
      verified: true,
      date: "Nov 09, 2024",
      status: "verified",
    },
    {
      id: "4",
      lead: "Vikram Singh",
      executive: "Sneha",
      amount: "₹95,000",
      type: "Loan",
      source: "Referral",
      verified: false,
      date: "Nov 11, 2024",
      status: "pending",
    },
    {
      id: "5",
      lead: "Meera Patel",
      executive: "Rahul",
      amount: "₹52,000",
      type: "Credit",
      source: "Meta Ads",
      verified: true,
      date: "Nov 08, 2024",
      status: "verified",
    },
    {
      id: "6",
      lead: "Amit Verma",
      executive: "Karthik",
      amount: "₹28,000",
      type: "Full",
      source: "Website",
      verified: false,
      date: "Nov 10, 2024",
      status: "failed",
    },
  ];

  const paymentTypeData = [
    { type: "Full", count: 45 },
    { type: "EMI", count: 30 },
    { type: "Loan", count: 15 },
    { type: "Credit", count: 10 },
  ];

  const revenueData = [
    { month: "Jun", revenue: 8.5 },
    { month: "Jul", revenue: 9.2 },
    { month: "Aug", revenue: 10.1 },
    { month: "Sep", revenue: 9.8 },
    { month: "Oct", revenue: 11.2 },
    { month: "Nov", revenue: 12.4 },
  ];

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (selectedTab === "all") return true;
      if (selectedTab === "pending") return !p.verified && p.status !== "failed";
      if (selectedTab === "verified") return p.verified;
      if (selectedTab === "failed") return p.status === "failed";
      return true;
    });
  }, [payments, selectedTab]);

  const handleVerifyPayment = () => {
    console.log("Payment verified successfully");
    setIsVerifyModalOpen(false);
    setSelectedPayment(null);
    setChecklist({ check1: false, check2: false, check3: false, check4: false });
  };

  const handleChecklistChange = (key) =>
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));

  const VerifyModal = ({ isOpen, onClose, payment }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Verify Payment</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Review and verify payment details for {payment?.lead}
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    ["Lead Name", payment?.lead],
                    ["Amount", payment?.amount],
                    ["Payment Type", payment?.type],
                    ["Date", payment?.date],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <label className="text-xs text-gray-500 block">{label}</label>
                      <p className="text-sm text-gray-900 mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900 block">
                  Verification Checklist
                </label>
                {[
                  { id: "check1", label: "Payment receipt verified" },
                  { id: "check2", label: "Bank transaction confirmed" },
                  { id: "check3", label: "Amount matches invoice" },
                  { id: "check4", label: "Customer details verified" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={checklist[item.id]}
                      onChange={() => handleChecklistChange(item.id)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded"
                    />
                    <label htmlFor={item.id} className="text-sm text-gray-700">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyPayment}
                className="flex-1 bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Verify Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BarTip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-blue-600 mt-1">count : {payload[0].value}</p>
      </div>
    );
  };

  return (
    <div ref={printableRef} className="space-y-6 p-3 sm:p-6">
      {/* Header ✅ mobile fixed */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Track and manage payment transactions
          </p>
        </div>

        {canExportData && (
          <div className="w-full sm:w-auto">
            <ExportButton targetRef={printableRef} fileName="payments-dashboard.pdf">
              {/* ✅ full width on mobile */}
              <div className="w-full sm:w-auto flex justify-center items-center gap-2 border border-gray-200 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition">
                <Download className="w-4 h-4" />
                <span className="font-medium">Export</span>
              </div>
            </ExportButton>
          </div>
        )}
      </div>

      {/* Stats ✅ tighter mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[
          ["Total Revenue", "₹12.4L", "text-green-600", "+18% From Last Month"],
          ["Verified", "72", "text-green-600", "+8% From Last Month"],
          ["Pending", "14", "text-orange-600", "Needs Verification"],
          ["Failed", "5", "text-red-600", "Requires Attention"],
        ].map(([title, value, c, sub]) => (
          <div key={title} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-2">{value}</p>
            <p className={`text-xs mt-2 ${c}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs ✅ scroll-safe */}
      <div className="bg-white border border-gray-200 rounded-xl inline-flex w-full overflow-x-auto">
        {[
          ["all", "All Payments"],
          ["pending", "Pending"],
          ["verified", "Verified"],
          ["failed", "Failed"],
        ].map(([key, label], i) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              i === 0 ? "rounded-l-xl" : i === 3 ? "rounded-r-xl" : ""
            } ${
              selectedTab === key
                ? "bg-green-50 text-green-600 border border-green-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden space-y-3">
        {filteredPayments.map((p) => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-gray-900 font-medium">{p.lead}</p>
                <p className="text-sm text-gray-600">Executive: {p.executive}</p>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  p.verified
                    ? "bg-green-100 text-green-800"
                    : p.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {p.verified ? "Verified" : p.status === "failed" ? "Failed" : "Pending"}
              </span>
            </div>

            <p className="text-gray-900 font-semibold">{p.amount}</p>
            <p className="text-sm text-gray-600 mt-1">
              {p.type} • {p.source}
            </p>
            <p className="text-sm text-gray-600 mt-1">Date: {p.date}</p>

            {canVerifyPayments && !p.verified && p.status !== "failed" && (
              <button
                onClick={() => {
                  setSelectedPayment(p);
                  setIsVerifyModalOpen(true);
                }}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                Verify Payment
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b bg-gray-50">
                {["Lead", "Amount", "Payment Type", "Source", "Executive", "Date", "Status"].map(
                  (h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  )
                )}
                {canVerifyPayments && (
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3 whitespace-nowrap">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{p.lead}</td>
                  <td className="px-4 py-3 text-sm">{p.amount}</td>
                  <td className="px-4 py-3 text-sm">{p.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.source}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.executive}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.verified
                          ? "bg-green-100 text-green-800"
                          : p.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {p.verified ? "Verified" : p.status === "failed" ? "Failed" : "Pending"}
                    </span>
                  </td>

                  {canVerifyPayments && (
                    <td className="px-4 py-3">
                      {!p.verified && p.status !== "failed" && (
                        <button
                          onClick={() => {
                            setSelectedPayment(p);
                            setIsVerifyModalOpen(true);
                          }}
                          className="border border-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-50 text-sm"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts ✅ fully responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payments by Type</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentTypeData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} tickLine={false} />
                <XAxis dataKey="type" tickLine={false} />
                <Tooltip content={<BarTip />} cursor={{ fill: "rgba(0,0,0,0.06)" }} />
                <Bar dataKey="count" fill="#3b82f6" barSize={barSize} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Growth</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[0, 16]} ticks={[0, 4, 8, 12, 16]} tickLine={false} />
                <XAxis dataKey="month" tickLine={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  name="Revenue (₹L)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <VerifyModal
        isOpen={isVerifyModalOpen}
        onClose={() => {
          setIsVerifyModalOpen(false);
          setSelectedPayment(null);
          setChecklist({ check1: false, check2: false, check3: false, check4: false });
        }}
        payment={selectedPayment}
      />
    </div>
  );
}