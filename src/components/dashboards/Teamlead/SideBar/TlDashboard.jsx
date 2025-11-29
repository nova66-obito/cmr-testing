// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
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

// export default function TeamLeadDashboardLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [role, setRole] = useState("Team Lead");

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
//     { id: "leads", label: "Leads", icon: Users, path: "lead-list" },
//     { id: "pipeline", label: "Pipeline", icon: GitBranch, path: "pipeline" },
//     { id: "calls", label: "Calls", icon: Phone, path: "calls" },
//     { id: "payments", label: "Payments", icon: CreditCard, path: "payments" },
//     { id: "reports", label: "Reports", icon: BarChart3, path: "reports" },
//     { id: "automations", label: "Automations", icon: Zap, path: "automation" },
//   ];

//   const activeId =
//     menuItems.find(
//       (m) =>
//         location.pathname === `/teamlead/${m.path}` ||
//         location.pathname.startsWith(`/teamlead/${m.path}/`)
//     )?.id || "dashboard";

//   const Sidebar = ({ isMobile = false }) => (
//     <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
//       {isMobile && (
//         <div className="flex items-center justify-between px-4 py-4 border-b">
//           <h2 className="font-bold text-lg">Team Lead Panel</h2>
//           <button onClick={() => setMobileOpen(false)}>
//             <X className="w-6 h-6 text-gray-700" />
//           </button>
//         </div>
//       )}

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
//                 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
//             >
//               <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-600"}`} />
//               <span className="text-[17px] font-medium">{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>

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

//       {/* ✅ Navbar controls sidebar toggle */}
//       <Navbar
//         showSidebarToggle={true}
//         onOpenSidebar={() => setMobileOpen(true)}
//         userName="Karthik"
//         userRole="Team Lead"
//       />

//       <div className="flex flex-1 min-h-0">
//         {/* Desktop sidebar */}
//         <div className="hidden lg:flex h-full">
//           <Sidebar />
//         </div>

//         {/* Mobile drawer */}
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

//         {/* Page content */}
//         <main className="flex-1 min-w-0 overflow-y-auto p-4 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
export default function TlDasboards() {
  const Links = [
    { href: "", txt: 'dasboard' },
    { href: "lead-list", txt: 'leads' },
    { href: "pipeline", txt: 'pipeline' },
    { href: "call", txt: 'calls' },
    { href: "payment", txt: 'payments' },
    { href: "report", txt: 'report' },
    { href: "automation", txt: 'automations' },
  ]
  return (
    <>
      <header>
        <nav className="bg-gray-100 fixed items-center flex-wrap top-20 z-10 w-full p-3 flex gap-3 justify-around ">
           {Links.map((items,i)=>{
              return(
                <>
                  <Link className="text-white font-bold bg-blue-400 px-3 py-1 rounded-2xl " to={`/teamlead/${items.href}`}>{items.txt}</Link>
                </>
              )
           })}
        </nav>
      </header>
    </>
  )
}