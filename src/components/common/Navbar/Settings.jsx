import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Palette,
  Bell,
  Info,
  Save,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  // ------------------- Form State -------------------
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("IST (India - Kolkata)");

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [desktopNotif, setDesktopNotif] = useState(false);

  // toast popup
  const [toastOpen, setToastOpen] = useState(false);

  const handleSave = () => {
    // here you can call API later
    setToastOpen(true);
  };

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 2000);
    return () => clearTimeout(t);
  }, [toastOpen]);

  // ------------------- UI Helpers -------------------
  const SelectRow = ({ label, desc, value, onChange, options = [] }) => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-5 border-b border-gray-100 last:border-b-0">
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>

      <div className="relative w-full md:w-72">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );

  const ToggleRow = ({ label, desc, value, onChange }) => (
    <div className="flex items-center justify-between gap-4 py-5 border-b border-gray-100 last:border-b-0">
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-7 rounded-full transition ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
        aria-pressed={value}
      >
        <span
          className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* ---------------- Header ---------------- */}
      <div className="sticky top-0 z-20 bg-gray-50/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your app preferences
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-2xl shadow-sm transition text-sm font-semibold"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* ---------------- Body ---------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* -------- Appearance Card -------- */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-7">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Palette className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Appearance</h2>
              <p className="text-sm text-gray-500 mt-1">
                Customize how the app looks for you
              </p>
            </div>
          </div>

          <div>
            <SelectRow
              label="Theme"
              desc="Choose your preferred color scheme"
              value={theme}
              onChange={setTheme}
              options={["Light", "Dark", "System Default"]}
            />
            <SelectRow
              label="Language"
              desc="Select your preferred language"
              value={language}
              onChange={setLanguage}
              options={["English", "Tamil", "Hindi", "Malayalam"]}
            />
            <SelectRow
              label="Timezone"
              desc="Your local timezone for dates and times"
              value={timezone}
              onChange={setTimezone}
              options={[
                "IST (India - Kolkata)",
                "GMT (London)",
                "UTC",
                "EST (New York)",
                "PST (Los Angeles)",
              ]}
            />
          </div>
        </section>

        {/* -------- Notifications Card -------- */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-7">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <Bell className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage how you receive notifications
              </p>
            </div>
          </div>

          <div>
            <ToggleRow
              label="Email Notifications"
              desc="Receive updates and alerts via email"
              value={emailNotif}
              onChange={setEmailNotif}
            />
            <ToggleRow
              label="Push Notifications"
              desc="Get push notifications on your mobile device"
              value={pushNotif}
              onChange={setPushNotif}
            />
            <ToggleRow
              label="Desktop Notifications"
              desc="Show desktop notifications while using the app"
              value={desktopNotif}
              onChange={setDesktopNotif}
            />
          </div>
        </section>

        {/* -------- Info Note -------- */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Changes will take effect immediately after saving. Some settings may
            require you to refresh the page.
          </p>
        </div>
      </div>

      {/* ---------------- Toast Popup ---------------- */}
      {toastOpen && (
        <div className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0">
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-700 font-bold text-sm">✓</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              Settings saved successfully!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
