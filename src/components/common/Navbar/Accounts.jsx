import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Pencil,
  Save,
  X,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Accounts() {
  const navigate = useNavigate();

  // ----- initial data (later you can replace with API) -----
  const initialUser = useMemo(
    () => ({
      fullName: "Karthik",
      email: "karthik@crmcompany.com",
      phone: "+91 98765 43210",
      role: "Manager",
      lastLogin: "Nov 19, 2025 at 9:30 AM",
    }),
    []
  );

  const [form, setForm] = useState(initialUser);
  const [draft, setDraft] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  // toast state
  const [toast, setToast] = useState({ open: false, msg: "" });

  // hide toast automatically
  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false, msg: "" }), 2000);
    return () => clearTimeout(t);
  }, [toast.open]);

  const onEdit = () => {
    setIsEditing(true);
    setDraft(form); // copy current form
  };

  const onCancel = () => {
    setDraft(form); // reset draft to saved data
    setIsEditing(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setForm(draft); // persist draft
    setIsEditing(false);

    // show toast
    setToast({ open: true, msg: "Account details updated successfully!" });
  };

  const onChange = (key) => (e) => {
    setDraft((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="px-4 sm:px-6 lg:px-10 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Left title */}
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                My Account
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your account information
              </p>
            </div>
          </div>

          {/* Right edit button */}
          {!isEditing && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              <Pencil className="w-4 h-4" />
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-10 pb-10 space-y-6">
        {/* Account Information card */}
        <form
          onSubmit={onSave}
          className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Account Information
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Your personal and professional details
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full name */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Full Name
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">{form.fullName}</p>
              ) : (
                <input
                  value={draft.fullName}
                  onChange={onChange("fullName")}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Email Address
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">{form.email}</p>
              ) : (
                <input
                  type="email"
                  value={draft.email}
                  onChange={onChange("email")}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Phone Number
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">{form.phone}</p>
              ) : (
                <input
                  value={draft.phone}
                  onChange={onChange("phone")}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-semibold text-gray-900">Role</label>
              {!isEditing ? (
                <div className="mt-2 inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                  {form.role}
                </div>
              ) : (
                <select
                  value={draft.role}
                  onChange={onChange("role")}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                >
                  <option>Sales Executive</option>
                  <option>Team Lead</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              )}
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Last login */}
          <div>
            <label className="text-sm font-semibold text-gray-900">
              Last Login
            </label>
            <p className="mt-2 text-gray-700">{form.lastLogin}</p>
          </div>

          {/* Save / Cancel row */}
          {isEditing && (
            <div className="mt-7 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-50 transition"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </form>

        {/* Security card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your password and security settings
          </p>

          <button
            className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition"
            onClick={() => alert("Open change password modal/page")}
            type="button"
          >
            <Lock className="w-5 h-5 text-gray-700" />
            Change Password
          </button>
        </div>
      </div>

      {/* ✅ Toast Popup */}
      {toast.open && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
          <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-900">
              {toast.msg}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
