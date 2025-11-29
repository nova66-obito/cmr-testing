import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Menu,
  Search,
  ChevronDown,

  // notification icons
  Bell,
  Check,
  UserPlus,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Calendar,
  X,

  // profile menu icons
  User,
  CircleUser,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
/* ----------------------- Mock Notifications ----------------------- */

const mockNotifications = [
  {
    id: "1",
    type: "lead",
    title: "New Lead Assigned",
    message: "Sarah Johnson from Tech Corp has been assigned to you",
    timestamp: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "₹45,000 payment received from Acme Industries",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "task",
    title: "Follow-up Reminder",
    message: "Schedule a follow-up call with Global Solutions today",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "achievement",
    title: "Milestone Achieved!",
    message: "You've closed 10 deals this month - Great work!",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "call",
    title: "Missed Call",
    message: "You have 2 missed calls from Michael Chen",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "System Update",
    message: "New features added to the CRM dashboard",
    timestamp: "1 day ago",
    read: true,
  },
];

const getNotificationIcon = (type) => {
  switch (type) {
    case "lead":
      return <UserPlus className="w-4 h-4 text-blue-500" />;
    case "payment":
      return <DollarSign className="w-4 h-4 text-green-500" />;
    case "call":
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    case "task":
      return <Calendar className="w-4 h-4 text-purple-500" />;
    case "achievement":
      return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    case "system":
    default:
      return <Bell className="w-4 h-4 text-gray-500" />;
  }
};

const getNotificationBgColor = (type) => {
  switch (type) {
    case "lead":
      return "bg-blue-50";
    case "payment":
      return "bg-green-50";
    case "call":
      return "bg-orange-50";
    case "task":
      return "bg-purple-50";
    case "achievement":
      return "bg-yellow-50";
    case "system":
    default:
      return "bg-gray-50";
  }
};

/* ----------------------- Notification Menu ----------------------- */

function NotificationMenu({ initialNotifications = mockNotifications }) {
  const [notifications, setNotifications] = useState(
    Array.isArray(initialNotifications) ? initialNotifications : []
  );
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative w-10 h-10 flex items-center justify-center rounded-xl
                   text-gray-600 hover:bg-gray-50 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div
          className="
            fixed md:absolute 
            inset-x-0 md:inset-auto
            bottom-0 md:bottom-auto
            md:right-0 md:top-full
            md:mt-2
            z-50
            w-full md:w-96
            bg-white border border-gray-200
            rounded-t-2xl md:rounded-xl
            shadow-2xl
            max-h-[85vh] md:max-h-[500px]
            flex flex-col
          "
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 mb-2">
            <div>
              <h3 className="text-gray-900 font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">
                  You have {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Bell className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative p-4 hover:bg-gray-50 transition-colors group ${
                      !notification.read ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg ${getNotificationBgColor(
                          notification.type
                        )} flex items-center justify-center`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                              )}
                            </div>

                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1.5">
                              {notification.timestamp}
                            </p>
                          </div>

                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                          >
                            <X className="w-3 h-3 text-gray-500" />
                          </button>
                        </div>

                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="mt-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------- Profile Menu ----------------------- */

function ProfileMenu({
  userName = "Karthik",
  userRole = "Sales Executive",
  onLogout = () => {},
  accountPath = "/accounts",
  profilePath = "/profile",
  settingsPath = "/settings",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
      >
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white font-semibold">
            {userName?.[0]?.toUpperCase() || "U"}
          </span>
        </div>

        <div className="leading-tight hidden sm:block text-left">
          <div className="text-sm font-semibold text-gray-900">{userName}</div>
          <div className="text-xs text-gray-500">{userRole}</div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-500 hidden sm:block transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">My Account</h4>
          </div>

          <div className="py-2">
            <button
              onClick={() => goTo(accountPath)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
            >
              <User className="w-4 h-4 text-gray-600" />
              <span>My Account</span>
            </button>

            <button
              onClick={() => goTo(profilePath)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
            >
              <CircleUser className="w-4 h-4 text-gray-600" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => goTo(settingsPath)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
            >
              <Settings className="w-4 h-4 text-gray-600" />
              <span>Settings</span>
            </button>
          </div>

          <div className="border-t border-gray-200" />

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Navbar ----------------------------- */

export default function Navbar({
  onOpenSidebar = () => {},
  showSidebarToggle = true,
  userName = "Karthik",
  userRole = "Sales Executive",
  initialNotifications = mockNotifications,
  onLogout = () => {},

  // ✅ change these paths anytime
  accountPath = "/accounts",
  profilePath = "/profile",
  settingsPath = "/settings",
}) {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 mt-4">
      <div className="px-3 sm:px-4 md:px-6 py-4 md:py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
          {/* Left */}
          <div className="flex items-center justify-between md:justify-start gap-3 min-w-0">
            <div className="flex items-center gap-3">
              {showSidebarToggle && (
                <button
                  onClick={onOpenSidebar}
                  className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              )}

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">C</span>
              </div>

              <span className="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">
                CRM Pro
              </span>
            </div>

            {/* Mobile right */}
            <div className="flex items-center gap-3 md:hidden">
              <NotificationMenu initialNotifications={initialNotifications} />
              <ProfileMenu
                userName={userName}
                userRole={userRole}
                onLogout={onLogout}
                accountPath={accountPath}
                profilePath={profilePath}
                settingsPath={settingsPath}
              />
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:flex-1 md:flex md:justify-center">
            <div className="relative w-full md:max-w-3xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads, contacts, or deals..."
                className="w-full h-11 pl-12 pr-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none
                           focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4 min-w-[220px] justify-end">
            <NotificationMenu initialNotifications={initialNotifications} />
            <ProfileMenu
              userName={userName}
              userRole={userRole}
              onLogout={onLogout}
              accountPath={accountPath}
              profilePath={profilePath}
              settingsPath={settingsPath}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
