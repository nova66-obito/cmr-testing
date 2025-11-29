// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   GitBranch,
//   Phone,
//   CreditCard,
//   BarChart3,
//   Zap,
//   ChevronDown,
//   X,
// } from "lucide-react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import Navbar from "../../Navbar/Nav"; 
// // ⬆️ change this path if Navbar location differs

// export default function ManagerDashboardLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [role, setRole] = useState("Manager");

//   // ✅ paths RELATIVE to /manager
//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
//     { id: "pipeline", label: "Pipeline", icon: GitBranch, path: "pipeline" },
//     { id: "calls", label: "Calls", icon: Phone, path: "call" },
//     { id: "payments", label: "Payments", icon: CreditCard, path: "payment" },
//     { id: "reports", label: "Reports", icon: BarChart3, path: "reports" },
//     { id: "automation", label: "Automations", icon: Zap, path: "automation" },
//   ];

//   // ✅ active highlight based on /manager/*
//   const activeId =
//     menuItems.find(
//       (m) =>
//         location.pathname === `/manager/${m.path}` ||
//         location.pathname.startsWith(`/manager/${m.path}/`)
//     )?.id || "dashboard";

//   const Sidebar = ({ isMobile = false }) => (
//     <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
//       {/* Mobile header inside drawer */}
//       {isMobile && (
//         <div className="flex items-center justify-between px-4 py-4 border-b">
//           <h2 className="font-bold text-lg">Manager Panel</h2>
//           <button onClick={() => setMobileOpen(false)}>
//             <X className="w-6 h-6 text-gray-700" />
//           </button>
//         </div>
//       )}

//       {/* Menu */}
//       <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeId === item.id;

//           return (
//             <button
//               key={item.id}
//               onClick={() => {
//                 navigate(item.path); // ✅ goes to /manager/{path}
//                 setMobileOpen(false);
//               }}
//               className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition
//                 ${isActive
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-gray-700 hover:bg-gray-50"}
//               `}
//             >
//               <Icon
//                 className={`w-5 h-5 ${
//                   isActive ? "text-blue-600" : "text-gray-600"
//                 }`}
//               />
//               <span className="text-[17px] font-medium">{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>

//       {/* Role dropdown bottom */}
//       {/* <div className="p-4 border-t border-gray-200">
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
//       </div> */}
//     </aside>
//   );

//   return (
//     <div className="h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
//       {/* ✅ Common Navbar (toggle opens sidebar) */}
//       <Navbar
//         showSidebarToggle={true}
//         onOpenSidebar={() => setMobileOpen(true)}
//         userRole="Manager"
//       />

//       <div className="flex flex-1 min-h-0">
//         {/* Desktop sidebar */}
//         <div className="hidden lg:flex h-full">
//           <Sidebar />
//         </div>

//         {/* Mobile sidebar drawer */}
//         {mobileOpen && (
//           <div className="lg:hidden fixed inset-0 z-50">
//             <div
//               className="absolute inset-0 bg-black/40"
//               onClick={() => setMobileOpen(false)}
//             />
//             <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
//               <Sidebar isMobile />
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         <main className="flex-1 min-w-0 overflow-y-auto p-4 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
export default function ManagerDasboards() {
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
                  <Link className="text-white font-bold bg-blue-400 px-3 py-1 rounded-2xl " to={`/manager/${items.href}`}>{items.txt}</Link>
                </>
              )
           })}
        </nav>
      </header>
    </>
  )
}