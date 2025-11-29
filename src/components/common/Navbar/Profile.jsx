import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Pencil,
  Upload,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  // ---- initial data (replace with API later) ----
  const initialProfile = useMemo(
    () => ({
      username: "karthik.sales",
      displayName: "Karthik",
      bio:
        "Sales Executive with 3+ years of experience in B2B sales. " +
        "Passionate about building customer relationships and exceeding targets.",
      avatarUrl: "", // keep empty to show initial letter
      stats: {
        leadsHandled: 156,
        conversions: 42,
        callsMade: 328,
        avgResponse: "2.5h",
      },
    }),
    []
  );

  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  // toast
  const [toast, setToast] = useState({ open: false, msg: "" });

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false, msg: "" }), 2000);
    return () => clearTimeout(t);
  }, [toast.open]);

  const onEdit = () => {
    setIsEditing(true);
    setDraft(profile);
  };

  const onCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setProfile(draft);
    setIsEditing(false);
    setToast({ open: true, msg: "Profile updated successfully!" });
  };

  const onChange = (key) => (e) => {
    setDraft((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // ---- image upload (local preview only) ----
  const onPickAvatar = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview in browser
    const url = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, avatarUrl: url }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-10 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Left */}
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Profile
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your public profile information
              </p>
            </div>
          </div>

          {/* Right Edit button */}
          {!isEditing && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <form onSubmit={onSave} className="px-4 sm:px-6 lg:px-10 pb-10 space-y-6">
        {/* Profile Picture */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Picture
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Upload a professional photo for your profile
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
              {draft.avatarUrl ? (
                <img
                  src={draft.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-4xl font-semibold">
                  {draft.displayName?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* Upload button */}
            {isEditing && (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onPickAvatar}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition w-fit"
                >
                  <Upload className="w-5 h-5" />
                  Upload Photo
                </button>

                <p className="text-xs text-gray-500">
                  JPG, PNG or GIF. Max size 2MB.
                </p>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Information
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your profile details visible to team members
          </p>

          <div className="mt-6 space-y-6">
            {/* Username */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Username
              </label>

              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.username}
                </p>
              ) : (
                <input
                  value={draft.username}
                  onChange={onChange("username")}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* Display Name */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Display Name
              </label>

              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.displayName}
                </p>
              ) : (
                <input
                  value={draft.displayName}
                  onChange={onChange("displayName")}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Bio / About
              </label>

              {!isEditing ? (
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {profile.bio}
                </p>
              ) : (
                <textarea
                  rows={4}
                  value={draft.bio}
                  onChange={onChange("bio")}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Stats
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Your activity and achievements
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Leads Handled"
              value={profile.stats.leadsHandled}
              variant="blue"
            />
            <StatCard
              title="Conversions"
              value={profile.stats.conversions}
              variant="green"
            />
            <StatCard
              title="Calls Made"
              value={profile.stats.callsMade}
              variant="purple"
            />
            <StatCard
              title="Avg Response"
              value={profile.stats.avgResponse}
              variant="orange"
            />
          </div>
        </div>

        {/* Save / Cancel */}
        {isEditing && (
          <div className="flex items-center gap-3">
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

      {/* Toast */}
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

/* -------------------------- Stat Card -------------------------- */

function StatCard({ title, value, variant = "blue" }) {
  const variantMap = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className={`rounded-2xl p-5 ${variantMap[variant] || variantMap.blue}`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
