// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
//   GitBranch,
//   Phone,
//   CreditCard,
//   BarChart3,
//   Zap,
//   Settings,
//   ChevronDown,
// } from "lucide-react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import Navbar from "../../../common/Navbar/nav";
// export default function AdminDashboardLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [role, setRole] = useState("Sales Executive");

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//     { id: "leads", label: "Leads", icon: Users, path: "/leads" },
//     { id: "pipeline", label: "Pipeline", icon: GitBranch, path: "/pipeline" },
//     { id: "calls", label: "Calls", icon: Phone, path: "/calls" },
//     { id: "payments", label: "Payments", icon: CreditCard, path: "/payments" },
//     { id: "reports", label: "Reports", icon: BarChart3, path: "/reports" },
//     { id: "automations", label: "Automations", icon: Zap, path: "/automations" },
//     { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
//   ];

//   const activeId =
//     menuItems.find((m) => location.pathname.startsWith(m.path))?.id || "dashboard";

//   const Sidebar = () => (
//     <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
//       <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeId === item.id;

//           return (
//             <button
//               key={item.id}
//               onClick={() => {
//                 navigate(item.path);
//                 setMobileOpen(false);
//               }}
//               className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition
//                 ${isActive
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-gray-700 hover:bg-gray-50"
//                 }`}
//             >
//               <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-600"}`} />
//               <span className="text-[17px] font-medium">{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>

//       {/* Role dropdown bottom */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="relative">
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 text-[15px] font-semibold outline-none"
//           >
//             <option>Sales Executive</option>
//             <option>Team Lead</option>
//             <option>Manager</option>
//             <option>Admin</option>
//           </select>
//           <ChevronDown className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
//         </div>
//       </div>
//     </aside>
//   );

//   return (
//     <div className="h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
//       {/* ✅ FULL WIDTH NAVBAR */}
//       <Navbar
//         onOpenSidebar={() => setMobileOpen(true)}
//         userRole={role}
//       />

//       {/* Body under navbar */}
//       <div className="flex flex-1 min-h-0">
//         {/* Desktop sidebar */}
//         <div className="hidden lg:flex h-full">
//           <Sidebar />
//         </div>

//         {/* Mobile sidebar */}
//         {mobileOpen && (
//           <div className="lg:hidden fixed inset-0 z-50">
//             <div
//               className="absolute inset-0 bg-black/40"
//               onClick={() => setMobileOpen(false)}
//             />
//             <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
//               <Sidebar />
//             </div>
//           </div>
//         )}

//         {/* Right side scrollable content */}
//         <main className="flex-1 min-w-0 overflow-y-auto p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
export default function AdminDasboards() {
  const Links = [
    { href: "", txt: 'dasboard' },
    { href: "lead-list", txt: 'leads' },
    { href: "pipeline", txt: 'pipeline' },
    { href: "call", txt: 'calls' },
    { href: "payment", txt: 'payments' },
    { href: "report", txt: 'report' },
    { href: "automation", txt: 'automations' },
    { href: "settings", txt: 'settings' },
  ]
  return (
    <>
      <header>
        <nav className="bg-gray-100 fixed items-center flex-wrap top-20 z-10 w-full p-3 flex gap-3 justify-around ">
           {Links.map((items,i)=>{
              return(
                <>
                  <Link className="text-white font-bold bg-blue-400 px-3 py-1 rounded-2xl " to={`/admin/${items.href}`}>{items.txt}</Link>
                </>
              )
           })}
        </nav>
      </header>
    </>
  )
}