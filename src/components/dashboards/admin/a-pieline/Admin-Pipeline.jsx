// import React from "react";
// import { useState, useMemo } from 'react';
// import { 
//   Plus, 
//   Filter, 
//   ArrowRight, 
//   GripVertical, 
//   X, 
//   Calendar as CalendarIcon,
//   Trash2,
//   Phone,
//   Building,
//   IndianRupee,
//   User
// } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export default function AdminPipeline() {

//     const [draggedLead, setDraggedLead] = useState(null);
//     const [draggedFromColumn, setDraggedFromColumn] = useState(null);
//     const [showFilterPopover, setShowFilterPopover] = useState(false);
//     const [showAddDealModal, setShowAddDealModal] = useState(false);
//     const [newDeal, setNewDeal] = useState({name: '',company: '',value: '',phone: '',});
//     const [formErrors, setFormErrors] = useState({});
//     const [formSuccess, setFormSuccess] = useState({});


//     const [columns, setColumns] = useState([
//         {
//             id: 'new',
//             title: 'New Leads',
//             color: 'bg-gray-100',
//             leads: [
//                 { id: '1', name: 'Priya Sharma', company: 'Tech Corp', value: '₹45,000', assignedTo: 'K', phone: '+91 98765 43210' },
//                 { id: '2', name: 'Rajesh Kumar', company: 'Digital Solutions', value: '₹1,20,000', assignedTo: 'P', phone: '+91 98765 43211' },
//             ],
//         },
//         {
//             id: 'contacted',
//             title: 'Contacted',
//             color: 'bg-blue-100',
//             leads: [
//                 { id: '3', name: 'Anita Desai', company: 'Marketing Inc', value: '₹38,000', assignedTo: 'A', phone: '+91 98765 43212' },
//                 { id: '4', name: 'Vikram Singh', company: 'Startup XYZ', value: '₹95,000', assignedTo: 'S', phone: '+91 98765 43213' },
//             ],
//         },
//         {
//             id: 'qualified',
//             title: 'Qualified',
//             color: 'bg-purple-100',
//             leads: [
//                 { id: '5', name: 'Meera Patel', company: 'Enterprise Co', value: '₹52,000', assignedTo: 'R', phone: '+91 98765 43214' },
//             ],
//         },
//         {
//             id: 'proposal',
//             title: 'Proposal Sent',
//             color: 'bg-orange-100',
//             leads: [
//                 { id: '6', name: 'Amit Verma', company: 'Consulting Ltd', value: '₹28,000', assignedTo: 'K', phone: '+91 98765 43215' },
//                 { id: '7', name: 'Sneha Reddy', company: 'Finance Group', value: '₹67,000', assignedTo: 'P', phone: '+91 98765 43216' },
//             ],
//         },
//         {
//             id: 'negotiation',
//             title: 'Negotiation',
//             color: 'bg-yellow-100',
//             leads: [
//                 { id: '8', name: 'Rahul Joshi', company: 'Retail Chain', value: '₹85,000', assignedTo: 'A', phone: '+91 98765 43217' },
//             ],
//         },
//         {
//             id: 'won',
//             title: 'Won',
//             color: 'bg-green-100',
//             leads: [
//                 { id: '9', name: 'Deepak Malhotra', company: 'Trading Co', value: '₹42,000', assignedTo: 'R', phone: '+91 98765 43218' },
//             ],
//         },
//     ]);

//     // Calculate stats dynamically
//     const stats = useMemo(() => {
//         // Total Pipeline Value - Sum of all leads in all columns
//         const totalPipelineValue = columns.reduce((sum, column) => {
//             return sum + column.leads.reduce((colSum, lead) => {
//                 const value = parseInt(lead.value.replace(/[^\d]/g, '')) || 0;
//                 return colSum + value;
//             }, 0);
//         }, 0);

//         // Total Deals - Count of all leads
//         const totalDeals = columns.reduce((sum, column) => sum + column.leads.length, 0);

//         // Average Deal Size
//         const avgDealSize = totalDeals > 0 ? Math.round(totalPipelineValue / totalDeals) : 0;

//         // Won This Month - Count of leads in 'won' column
//         const wonThisMonth = columns.find(col => col.id === 'won')?.leads.length || 0;

//         // Format values
//         const formatCurrency = (value) => {
//             if (value >= 100000) {
//                 return `₹${(value / 100000).toFixed(1)}L`;
//             } else if (value >= 1000) {
//                 return `₹${(value / 1000).toFixed(1)}K`;
//             }
//             return `₹${value}`;
//         };

//         const formatCompact = (value) => {
//             if (value >= 100000) {
//                 return `₹${(value / 100000).toFixed(1)}L`;
//             } else if (value >= 1000) {
//                 return `₹${(value / 1000).toFixed(0)}K`;
//             }
//             return `₹${value}`;
//         };

//         return [
//             {
//                 id: 1,
//                 title: "Total Pipeline Value",
//                 value: formatCurrency(totalPipelineValue)
//             },
//             {
//                 id: 2,
//                 title: "Total Deals",
//                 value: totalDeals
//             },
//             {
//                 id: 3,
//                 title: "Avg Deal Size",
//                 value: formatCompact(avgDealSize)
//             },
//             {
//                 id: 4,
//                 title: "Won This Month",
//                 value: wonThisMonth
//             },
//         ];
//     }, [columns]);

//     const handleDragStart = (lead, columnId) => {
//         setDraggedLead(lead);
//         setDraggedFromColumn(columnId);
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//     };

//     const handleDrop = (targetColumnId) => {
//         if (!draggedLead || !draggedFromColumn) return;

//         const sourceColumn = columns.find((col) => col.id === draggedFromColumn);
//         const targetColumn = columns.find((col) => col.id === targetColumnId);

//         if (!sourceColumn || !targetColumn) return;

//         // Remove from source
//         const sourceLeads = sourceColumn.leads.filter((l) => l.id !== draggedLead.id);

//         // Add to target
//         const targetLeads = [...targetColumn.leads, draggedLead];

//         setColumns(
//             columns.map((col) => {
//                 if (col.id === draggedFromColumn) {
//                     return { ...col, leads: sourceLeads };
//                 }
//                 if (col.id === targetColumnId) {
//                     return { ...col, leads: targetLeads };
//                 }
//                 return col;
//             })
//         );

//         toast.success(`Lead moved to ${targetColumn.title}`);
//         setDraggedLead(null);
//         setDraggedFromColumn(null);
//     };

//     const handleDragEnd = () => {
//         setDraggedLead(null);
//         setDraggedFromColumn(null);
//     };

//     // Delete function - Fixed
//     const handleDeleteDeal = (columnId, leadId) => {
//         setColumns(prevColumns =>
//             prevColumns.map(column => {
//                 if (column.id === columnId) {
//                     const updatedLeads = column.leads.filter(lead => lead.id !== leadId);
//                     return {
//                         ...column,
//                         leads: updatedLeads
//                     };
//                 }
//                 return column;
//             })
//         );

//         toast.success("Deal deleted successfully 🗑️");
//     };

//     const handleAddDeal = (e) => {
//         e.preventDefault();

//         const errors = {};
//         const success = {};

//         if (newDeal.name.trim().length < 3) {
//             errors.name = "Name must be at least 3 characters";
//         } else {
//             success.name = "Looks good ✔";
//         }

//         if (!newDeal.company.trim()) {
//             errors.company = "Company is required";
//         } else {
//             success.company = "Looks good ✔";
//         }

//         if (!newDeal.value || Number(newDeal.value) <= 0) {
//             errors.value = "Value must be greater than 0";
//         } else {
//             success.value = "Valid value ✔";
//         }

//         if (!/^[0-9]{10}$/.test(newDeal.phone)) {
//             errors.phone = "Phone must be 10 digits";
//         } else {
//             success.phone = "Valid number ✔";
//         }

//         setFormErrors(errors);
//         setFormSuccess(success);

//         if (Object.keys(errors).length > 0) return;

//         // Create the final lead object
//         const finalLead = {
//             id: Date.now().toString(),
//             name: newDeal.name.trim(),
//             company: newDeal.company.trim(),
//             value: `₹${parseInt(newDeal.value).toLocaleString()}`,
//             assignedTo: 'K',
//             phone: `+91 ${newDeal.phone}`,
//             rawValue: parseInt(newDeal.value), // Store the raw numeric value
//             timestamp: new Date().toISOString()
//         };

//         // Log the final input values in JSON format to console
//         console.log("🎯 New Deal Added - Form Input Values (JSON):");
//         console.log(JSON.stringify([{
//             formInputs: {
//                 name: newDeal.name.trim(),
//                 company: newDeal.company.trim(),
//                 value: newDeal.value,
//                 phone: newDeal.phone,
//                 formattedValue: `₹${parseInt(newDeal.value).toLocaleString()}`,
//                 formattedPhone: `+91 ${newDeal.phone}`
//             },
//             finalLead: finalLead,
//             timestamp: new Date().toISOString()
//         }], null, 2));

//         // Also log in a more readable format
//         console.log("📋 New Deal Details:");
//         console.table([{
//             Name: newDeal.name.trim(),
//             Company: newDeal.company.trim(),
//             Value: `₹${newDeal.value}`,
//             'Raw Value': newDeal.value,
//             Phone: newDeal.phone,
//             'Formatted Phone': `+91 ${newDeal.phone}`,
//             'Assigned To': 'K',
//             'Lead ID': finalLead.id
//         }]);

//         setColumns(prev =>
//             prev.map(col =>
//                 col.id === 'new'
//                     ? { ...col, leads: [...col.leads, finalLead] }
//                     : col
//             )
//         );

//         toast.success("Deal added successfully!");
//         setShowAddDealModal(false);
//         setNewDeal({ name: '', company: '', value: '', phone: '' });
//         setFormErrors({});
//         setFormSuccess({});
//     };

//     return (
//         <div className="space-y-6 p-4 sm:p-6 ">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div className="text-center sm:text-left">
//                     <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pipeline</h1>
//                     <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage deals through your sales pipeline</p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <button
//                         className="rounded-xl flex w-full hover:bg-gray-200 sm:w-auto cursor-pointer justify-center border border-gray-400 p-1 pl-4 pr-4"
//                         onClick={() => setShowFilterPopover(!showFilterPopover)}
//                     >
//                         <span className="mt-1"><Filter className="w-4 h-4 mr-2" /></span>
//                         <span>Filters</span>
//                     </button>
//                     <button
//                         className="bg-blue-600 flex text-white cursor-pointer hover:bg-blue-700 rounded-xl w-full sm:w-auto justify-center p-1 pl-4 pr-4"
//                         onClick={() => setShowAddDealModal(true)}
//                     >
//                         <span className="mt-1"><Plus className="w-4 h-4 mr-2" /></span>
//                         <span>Add Deal</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                 {stats.map((item) => (
//                     <div key={item.id} className="rounded-xl border border-gray-200 shadow-sm">
//                         <div className="p-4 sm:p-6">
//                             <p className="text-sm text-gray-500">{item.title}</p>
//                             <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-2">
//                                 {item.value}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pipeline Board */}
//             <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4">
//                 {columns.map((column) => (
//                     <div key={column.id} className="flex-shrink-0 w-72 sm:w-80">
//                         <div className="rounded-xl border border-gray-200 shadow-sm">
//                             <div className={`${column.color} rounded-t-xl p-4`}>
//                                 <div className="flex items-center justify-between">
//                                     <h1 className="text-sm font-semibold">{column.title}</h1>
//                                     <div className="rounded-xl border-gray-400 border h-6 w-7 text-center">
//                                         <p className="">
//                                             {column.leads.length}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div
//                                 onDragOver={handleDragOver}
//                                 onDrop={() => handleDrop(column.id)}
//                                 className="p-3 sm:p-4 space-y-3 min-h-[300px] sm:min-h-[400px] transition-colors"
//                             >
//                                 {column.leads.map((lead) => (
//                                     <div
//                                         key={lead.id}
//                                         draggable
//                                         onDragStart={() => handleDragStart(lead, column.id)}
//                                         onDragEnd={handleDragEnd}
//                                         className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 cursor-move hover:shadow-md transition-all hover:border-blue-300 active:opacity-50"
//                                     >
//                                         <div className="flex items-start justify-between mb-3">
//                                             <div className="flex items-start gap-2 flex-1">
//                                                 <GripVertical className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                                                 <div className="flex-1 min-w-0">
//                                                     <h4 className="text-sm font-medium text-gray-900 truncate">{lead.name}</h4>
//                                                     <p className="text-xs text-gray-600 mt-1 truncate">{lead.company}</p>
//                                                 </div>
//                                             </div>
//                                             <div className="w-7 h-7 rounded-full bg-blue-100 sm:w-8 sm:h-8 flex-shrink-0">
//                                                 <h1 className="text-md ml-3 mt-1 text-blue-600">
//                                                     {lead.assignedTo}
//                                                 </h1>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <span className="text-sm font-medium text-gray-900">{lead.value}</span>

//                                             <div className="flex gap-2">
//                                                 {/* <Trash2
//                                                     onClick={() => handleDeleteDeal(column.id, lead.id)}
//                                                     className="w-4 h-4 text-gray-800 cursor-pointer hover:text-red-500 transition-colors"
//                                                 /> */}
//                                                 <ArrowRight className="w-4 h-4 text-gray-400" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 {column.leads.length === 0 && (
//                                     <div className="flex items-center justify-center h-32 sm:h-40 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
//                                         Drop leads here
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Add Deal Modal */}
//             {showAddDealModal && (
//                 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-xl space-y-4 w-[400px] max-w-[90vw]">
//                         <div className="flex justify-between">
//                             <div>
//                                 <h2 className="text-lg font-semibold">Add New Deal</h2>
//                                 <p className="text-gray-500 text-sm">Add a new deal to your pipeline.</p>
//                             </div>
//                             <button
//                                 onClick={() => setShowAddDealModal(false)}
//                                 className="text-gray-700 hover:text-black"
//                             >
//                                 <X className="w-5 h-5" />
//                             </button>
//                         </div>

//                         <form onSubmit={handleAddDeal} className="space-y-4">
//                             {/* NAME */}
//                             <div>
//                                 <label className="text-sm font-medium flex items-center gap-2">
//                                     <User className="w-4 h-4" />
//                                     Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={newDeal.name}
//                                     onChange={(e) => setNewDeal({ ...newDeal, name: e.target.value })}
//                                     placeholder="Enter lead name"
//                                 />
//                                 {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
//                                 {!formErrors.name && formSuccess.name && (
//                                     <p className="text-green-600 text-xs mt-1">{formSuccess.name}</p>
//                                 )}
//                             </div>

//                             {/* COMPANY */}
//                             <div>
//                                 <label className="text-sm font-medium flex items-center gap-2">
//                                     <Building className="w-4 h-4" />
//                                     Company
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={newDeal.company}
//                                     onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
//                                     placeholder="Enter company name"
//                                 />
//                                 {formErrors.company && <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>}
//                                 {!formErrors.company && formSuccess.company && (
//                                     <p className="text-green-600 text-xs mt-1">{formSuccess.company}</p>
//                                 )}
//                             </div>

//                             {/* VALUE */}
//                             <div>
//                                 <label className="text-sm font-medium flex items-center gap-2">
//                                     <IndianRupee className="w-4 h-4" />
//                                     Value
//                                 </label>
//                                 <input
//                                     type="number"
//                                     className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={newDeal.value}
//                                     onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
//                                     placeholder="Enter deal value"
//                                 />
//                                 {formErrors.value && <p className="text-red-500 text-xs mt-1">{formErrors.value}</p>}
//                                 {!formErrors.value && formSuccess.value && (
//                                     <p className="text-green-600 text-xs mt-1">{formSuccess.value}</p>
//                                 )}
//                             </div>

//                             {/* PHONE */}
//                             <div>
//                                 <label className="text-sm font-medium flex items-center gap-2">
//                                     <Phone className="w-4 h-4" />
//                                     Phone
//                                 </label>
//                                 <input
//                                     type="text"
//                                     maxLength="10"
//                                     className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={newDeal.phone}
//                                     onChange={(e) => {
//                                         const value = e.target.value.replace(/\D/g, "").slice(0, 10);
//                                         setNewDeal({ ...newDeal, phone: value });
//                                     }}
//                                     placeholder="Enter phone number"
//                                 />
//                                 {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
//                                 {!formErrors.phone && formSuccess.phone && (
//                                     <p className="text-green-600 text-xs mt-1">{formSuccess.phone}</p>
//                                 )}
//                             </div>

//                             {/* BUTTONS */}
//                             <div className="flex justify-end gap-2 pt-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowAddDealModal(false)}
//                                     className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg font-semibold transition-colors flex items-center gap-2"
//                                 >
//                                     <X className="w-4 h-4" />
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-black text-white px-4 py-2 hover:bg-gray-800 rounded-lg font-semibold transition-colors flex items-center gap-2"
//                                 >
//                                     <Plus className="w-4 h-4" />
//                                     Add Deal
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Toast Container */}
//             <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
//         </div>
//     );
// }

import React from "react";
import { useState, useMemo } from 'react';
import {
    Plus,
    Filter,
    ArrowRight,
    GripVertical,
    X,
    Calendar as CalendarIcon,
    Trash2,
    Phone,
    Building,
    IndianRupee,
    User
} from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function AdminPipeline() {
    const [draggedLead, setDraggedLead] = useState(null);
    const [draggedFromColumn, setDraggedFromColumn] = useState(null);
    const [showFilterPopover, setShowFilterPopover] = useState(false);
    const [showAddDealModal, setShowAddDealModal] = useState(false);
    const [newDeal, setNewDeal] = useState({ name: '', company: '', value: '', phone: '', });
    const [formErrors, setFormErrors] = useState({});
    const [formSuccess, setFormSuccess] = useState({});
    const navigate = useNavigate();

    const [columns, setColumns] = useState([
        {
            id: 'new',
            title: 'New Leads',
            color: 'bg-gray-100',
            leads: [
                { id: '1', name: 'Priya Sharma', company: 'Tech Corp', value: '₹45,000', assignedTo: 'K', phone: '+91 98765 43210', email: 'priya.sharma@email.com', source: 'Meta Ads', status: 'Hot', location: 'Mumbai, Maharashtra', utmSource: 'facebook', utmMedium: 'cpc', utmCampaign: 'winter-sale-2024' },
                { id: '2', name: 'Rajesh Kumar', company: 'Digital Solutions', value: '₹1,20,000', assignedTo: 'P', phone: '+91 98765 43211', email: 'rajesh.kumar@email.com', source: 'Google Ads', status: 'Warm', location: 'Delhi, NCR', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'summer-2024' },
            ],
        },
        {
            id: 'contacted',
            title: 'Contacted',
            color: 'bg-blue-100',
            leads: [
                { id: '3', name: 'Anita Desai', company: 'Marketing Inc', value: '₹38,000', assignedTo: 'A', phone: '+91 98765 43212', email: 'anita.desai@email.com', source: 'Referral', status: 'Hot', location: 'Bangalore, Karnataka', utmSource: 'direct', utmMedium: 'none', utmCampaign: 'referral' },
                { id: '4', name: 'Vikram Singh', company: 'Startup XYZ', value: '₹95,000', assignedTo: 'S', phone: '+91 98765 43213', email: 'vikram.singh@email.com', source: 'LinkedIn', status: 'Cold', location: 'Hyderabad, Telangana', utmSource: 'linkedin', utmMedium: 'social', utmCampaign: 'b2b-leads' },
            ],
        },
        {
            id: 'qualified',
            title: 'Qualified',
            color: 'bg-purple-100',
            leads: [
                { id: '5', name: 'Meera Patel', company: 'Enterprise Co', value: '₹52,000', assignedTo: 'R', phone: '+91 98765 43214', email: 'meera.patel@email.com', source: 'Website', status: 'Hot', location: 'Chennai, Tamil Nadu', utmSource: 'organic', utmMedium: 'search', utmCampaign: 'organic-search' },
            ],
        },
        {
            id: 'proposal',
            title: 'Proposal Sent',
            color: 'bg-orange-100',
            leads: [
                { id: '6', name: 'Amit Verma', company: 'Consulting Ltd', value: '₹28,000', assignedTo: 'K', phone: '+91 98765 43215', email: 'amit.verma@email.com', source: 'Meta Ads', status: 'Warm', location: 'Pune, Maharashtra', utmSource: 'facebook', utmMedium: 'cpc', utmCampaign: 'consulting-leads' },
                { id: '7', name: 'Sneha Reddy', company: 'Finance Group', value: '₹67,000', assignedTo: 'P', phone: '+91 98765 43216', email: 'sneha.reddy@email.com', source: 'Email Marketing', status: 'Hot', location: 'Ahmedabad, Gujarat', utmSource: 'email', utmMedium: 'email', utmCampaign: 'newsletter' },
            ],
        },
        {
            id: 'negotiation',
            title: 'Negotiation',
            color: 'bg-yellow-100',
            leads: [
                { id: '8', name: 'Rahul Joshi', company: 'Retail Chain', value: '₹85,000', assignedTo: 'A', phone: '+91 98765 43217', email: 'rahul.joshi@email.com', source: 'Google Ads', status: 'Hot', location: 'Kolkata, West Bengal', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'retail-expansion' },
            ],
        },
        {
            id: 'won',
            title: 'Won',
            color: 'bg-green-100',
            leads: [
                { id: '9', name: 'Deepak Malhotra', company: 'Trading Co', value: '₹42,000', assignedTo: 'R', phone: '+91 98765 43218', email: 'deepak.malhotra@email.com', source: 'Referral', status: 'Won', location: 'Lucknow, Uttar Pradesh', utmSource: 'direct', utmMedium: 'referral', utmCampaign: 'partner-ref' },
            ],
        },
    ]);

    // Calculate stats dynamically
    const stats = useMemo(() => {
        const totalPipelineValue = columns.reduce((sum, column) => {
            return sum + column.leads.reduce((colSum, lead) => {
                const value = parseInt(lead.value.replace(/[^\d]/g, '')) || 0;
                return colSum + value;
            }, 0);
        }, 0);

        const totalDeals = columns.reduce((sum, column) => sum + column.leads.length, 0);
        const avgDealSize = totalDeals > 0 ? Math.round(totalPipelineValue / totalDeals) : 0;
        const wonThisMonth = columns.find(col => col.id === 'won')?.leads.length || 0;

        const formatCurrency = (value) => {
            if (value >= 100000) {
                return `₹${(value / 100000).toFixed(1)}L`;
            } else if (value >= 1000) {
                return `₹${(value / 1000).toFixed(1)}K`;
            }
            return `₹${value}`;
        };

        const formatCompact = (value) => {
            if (value >= 100000) {
                return `₹${(value / 100000).toFixed(1)}L`;
            } else if (value >= 1000) {
                return `₹${(value / 1000).toFixed(0)}K`;
            }
            return `₹${value}`;
        };

        return [
            {
                id: 1,
                title: "Total Pipeline Value",
                value: formatCurrency(totalPipelineValue)
            },
            {
                id: 2,
                title: "Total Deals",
                value: totalDeals
            },
            {
                id: 3,
                title: "Avg Deal Size",
                value: formatCompact(avgDealSize)
            },
            {
                id: 4,
                title: "Won This Month",
                value: wonThisMonth
            },
        ];
    }, [columns]);

    const handleDragStart = (lead, columnId) => {
        setDraggedLead(lead);
        setDraggedFromColumn(columnId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (targetColumnId) => {
        if (!draggedLead || !draggedFromColumn) return;

        const sourceColumn = columns.find((col) => col.id === draggedFromColumn);
        const targetColumn = columns.find((col) => col.id === targetColumnId);

        if (!sourceColumn || !targetColumn) return;

        const sourceLeads = sourceColumn.leads.filter((l) => l.id !== draggedLead.id);
        const targetLeads = [...targetColumn.leads, draggedLead];

        setColumns(
            columns.map((col) => {
                if (col.id === draggedFromColumn) {
                    return { ...col, leads: sourceLeads };
                }
                if (col.id === targetColumnId) {
                    return { ...col, leads: targetLeads };
                }
                return col;
            })
        );

        toast.success(`Lead moved to ${targetColumn.title}`);
        setDraggedLead(null);
        setDraggedFromColumn(null);
    };

    const handleDragEnd = () => {
        setDraggedLead(null);
        setDraggedFromColumn(null);
    };

    const handleDeleteDeal = (columnId, leadId) => {
        setColumns(prevColumns =>
            prevColumns.map(column => {
                if (column.id === columnId) {
                    const updatedLeads = column.leads.filter(lead => lead.id !== leadId);
                    return {
                        ...column,
                        leads: updatedLeads
                    };
                }
                return column;
            })
        );

        toast.success("Deal deleted successfully 🗑️");
    };

    const handleAddDeal = (e) => {
        e.preventDefault();

        const errors = {};
        const success = {};

        if (newDeal.name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters";
        } else {
            success.name = "Looks good ✔";
        }

        if (!newDeal.company.trim()) {
            errors.company = "Company is required";
        } else {
            success.company = "Looks good ✔";
        }

        if (!newDeal.value || Number(newDeal.value) <= 0) {
            errors.value = "Value must be greater than 0";
        } else {
            success.value = "Valid value ✔";
        }

        if (!/^[0-9]{10}$/.test(newDeal.phone)) {
            errors.phone = "Phone must be 10 digits";
        } else {
            success.phone = "Valid number ✔";
        }

        setFormErrors(errors);
        setFormSuccess(success);

        if (Object.keys(errors).length > 0) return;

        const finalLead = {
            id: Date.now().toString(),
            name: newDeal.name.trim(),
            company: newDeal.company.trim(),
            value: `₹${parseInt(newDeal.value).toLocaleString()}`,
            assignedTo: 'K',
            phone: `+91 ${newDeal.phone}`,
            email: `${newDeal.name.toLowerCase().replace(' ', '.')}@email.com`,
            source: 'Website',
            status: 'New',
            location: 'Mumbai, Maharashtra',
            utmSource: 'organic',
            utmMedium: 'direct',
            utmCampaign: 'organic-search',
            rawValue: parseInt(newDeal.value),
            timestamp: new Date().toISOString()
        };

        console.log("🎯 New Deal Added - Form Input Values (JSON):");
        console.log(JSON.stringify([{
            formInputs: {
                name: newDeal.name.trim(),
                company: newDeal.company.trim(),
                value: newDeal.value,
                phone: newDeal.phone,
                formattedValue: `₹${parseInt(newDeal.value).toLocaleString()}`,
                formattedPhone: `+91 ${newDeal.phone}`
            },
            finalLead: finalLead,
            timestamp: new Date().toISOString()
        }], null, 2));

        setColumns(prev =>
            prev.map(col =>
                col.id === 'new'
                    ? { ...col, leads: [...col.leads, finalLead] }
                    : col
            )
        );

        toast.success("Deal added successfully!");
        setShowAddDealModal(false);
        setNewDeal({ name: '', company: '', value: '', phone: '' });
        setFormErrors({});
        setFormSuccess({});
    };

    const handleLeadClick = (lead, column) => {
        navigate(`/admin/lead-details/${lead.id}`, {
            state: {
                lead: lead,
                column: column,
                fromPipeline: true
            }
        });
    };

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pipeline</h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage deals through your sales pipeline</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                        className="rounded-xl flex w-full hover:bg-gray-200 sm:w-auto cursor-pointer justify-center border border-gray-400 p-1 pl-4 pr-4"
                        onClick={() => setShowFilterPopover(!showFilterPopover)}
                    >
                        <span className="mt-1"><Filter className="w-4 h-4 mr-2" /></span>
                        <span>Filters</span>
                    </button>
                    <button
                        className="bg-blue-600 flex text-white cursor-pointer hover:bg-blue-700 rounded-xl w-full sm:w-auto justify-center p-1 pl-4 pr-4"
                        onClick={() => setShowAddDealModal(true)}
                    >
                        <span className="mt-1"><Plus className="w-4 h-4 mr-2" /></span>
                        <span>Add Deal</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((item) => (
                    <div key={item.id} className="rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-4 sm:p-6">
                            <p className="text-sm text-gray-500">{item.title}</p>
                            <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-2">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pipeline Board */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                {columns.map((column) => (
                    <div key={column.id} className="flex-shrink-0 w-72 sm:w-80">
                        <div className="rounded-xl border border-gray-200 shadow-sm">
                            <div className={`${column.color} rounded-t-xl p-4`}>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-sm font-semibold">{column.title}</h1>
                                    <div className="rounded-xl border-gray-400 border h-6 w-7 text-center">
                                        <p className="">{column.leads.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(column.id)}
                                className="p-3 sm:p-4 space-y-3 min-h-[300px] sm:min-h-[400px] transition-colors"
                            >
                                {column.leads.map((lead) => (
                                    <div
                                        key={lead.id}
                                        draggable
                                        onDragStart={() => handleDragStart(lead, column.id)}
                                        onDragEnd={handleDragEnd}
                                        onClick={() => handleLeadClick(lead, column)}
                                        className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 cursor-pointer hover:shadow-md transition-all hover:border-blue-300 active:opacity-50"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start gap-2 flex-1">
                                                <GripVertical className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">{lead.name}</h4>
                                                    <p className="text-xs text-gray-600 mt-1 truncate">{lead.company}</p>
                                                </div>
                                            </div>
                                            <div className="w-7 h-7 rounded-full bg-blue-100 sm:w-8 sm:h-8 flex-shrink-0">
                                                <h1 className="text-md ml-3 mt-1 text-blue-600">
                                                    {lead.assignedTo}
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900">{lead.value}</span>
                                            <div className="flex gap-2">
                                                {/* <Trash2
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteDeal(column.id, lead.id);
                                                    }}
                                                    className="w-4 h-4 text-gray-800 cursor-pointer hover:text-red-500 transition-colors"
                                                /> */}
                                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {column.leads.length === 0 && (
                                    <div className="flex items-center justify-center h-32 sm:h-40 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                                        Drop leads here
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Deal Modal */}
            {showAddDealModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl space-y-4 w-[400px] max-w-[90vw]">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Add New Deal</h2>
                                <p className="text-gray-500 text-sm">Add a new deal to your pipeline.</p>
                            </div>
                            <button
                                onClick={() => setShowAddDealModal(false)}
                                className="text-gray-700 hover:text-black"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddDeal} className="space-y-4">
                            {/* NAME */}
                            <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newDeal.name}
                                    onChange={(e) => setNewDeal({ ...newDeal, name: e.target.value })}
                                    placeholder="Enter lead name"
                                />
                                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                                {!formErrors.name && formSuccess.name && (
                                    <p className="text-green-600 text-xs mt-1">{formSuccess.name}</p>
                                )}
                            </div>

                            {/* COMPANY */}
                            <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Building className="w-4 h-4" />
                                    Company
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newDeal.company}
                                    onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
                                    placeholder="Enter company name"
                                />
                                {formErrors.company && <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>}
                                {!formErrors.company && formSuccess.company && (
                                    <p className="text-green-600 text-xs mt-1">{formSuccess.company}</p>
                                )}
                            </div>

                            {/* VALUE */}
                            <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <IndianRupee className="w-4 h-4" />
                                    Value
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newDeal.value}
                                    onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                                    placeholder="Enter deal value"
                                />
                                {formErrors.value && <p className="text-red-500 text-xs mt-1">{formErrors.value}</p>}
                                {!formErrors.value && formSuccess.value && (
                                    <p className="text-green-600 text-xs mt-1">{formSuccess.value}</p>
                                )}
                            </div>

                            {/* PHONE */}
                            <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    maxLength="10"
                                    className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newDeal.phone}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                                        setNewDeal({ ...newDeal, phone: value });
                                    }}
                                    placeholder="Enter phone number"
                                />
                                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                                {!formErrors.phone && formSuccess.phone && (
                                    <p className="text-green-600 text-xs mt-1">{formSuccess.phone}</p>
                                )}
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddDealModal(false)}
                                    className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg font-semibold transition-colors flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 hover:bg-gray-800 rounded-lg font-semibold transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Deal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
}
