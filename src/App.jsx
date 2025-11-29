// import { useState } from 'react'
// import './App.css';
// import { BrowserRouter , Route ,Routes } from 'react-router-dom';
// import { LoginPage } from './components/auth/loginPage';
// import Header from './components/header/header';
// // admin page import
// import AdminPage from './components/dashboards/admin/adminPage';
// import LeadsList from './components/dashboards/admin/a-lead/lead-list/admin-Lead-list';
// import LeadDetail from './components/dashboards/admin/a-lead/lead-details/admin-Lead-Details';
// import { AutomationsModule } from './components/dashboards/admin/a-automodel/admin-automodel';
// import AdminSettings from './components/dashboards/admin/a-settings/admin-settings';
// import { AdminCallPage } from './components/dashboards/admin/a-Calls/Admin-Calls';
// import { PaymentsModule } from './components/dashboards/admin/a-payments/Admin-payments-Pages';
// import { AdminReports } from './components/dashboards/admin/a-reports/Admin-Reports';
// import AdminPipeline from './components/dashboards/admin/a-pieline/Admin-Pipeline';
// // manager page import
// import MainManagerDashboard from './components/dashboards/Manager/ManagerDashboard';
// import { ManagerAutomationsModule } from './components/dashboards/Manager/ManagerAutomation/ManagerAutomation';
// import { ManagerCallsModule } from './components/dashboards/Manager/ManagerCalls/ManagerCalls';
// import ManagerLeadsList from './components/dashboards/Manager/ManagerLead/lead-list/manager-Lead-list';
// import ManagerLeadDetail from './components/dashboards/Manager/ManagerLead/lead-details/Manager-Lead-Details';
// import ManagerPaymentsModule from './components/dashboards/Manager/ManagerPayments/ManagerPayments';
// import ManagerPipeline from './components/dashboards/Manager/ManagerPieline/Manager-Pipeline';
// import { ManagerReportsModule } from './components/dashboards/Manager/ManagerReports/ManagerReports';
// import ManagerSettings from './components/dashboards/Manager/Managersettings/manager-settings';
// // team-lead
// import { TeamLeadDashboard } from './components/dashboards/Teamlead/Dashboard/Dashboard';
// import { TeamLeadAutomationsModule } from './components/dashboards/Teamlead/Automation/TlAutomation';
// import { TeamLeadCallsModule } from './components/dashboards/Teamlead/Calls/TeamleadCalls';
// import TeamLeadsList from './components/dashboards/Teamlead/Leads/tl-lead-list/Tl-Lead-list';
// import TeamLeadPaymentsModule from './components/dashboards/Teamlead/Payment/TlPayment';
// import TeamLeadPipeline from './components/dashboards/Teamlead/Pipeline/TlPipeline';
// import { TeamLeadReportsModule } from './components/dashboards/Teamlead/Reports/TlReports';
// import TeamleadLeadDetail from './components/dashboards/Teamlead/Leads/tl-lead-details/TL-Lead-Details';
// // sales Executive
// import SalesExecutiveDashboard from './components/dashboards/SalesExecutive/SalesDashboard/SalesDashboard';
// import { SalesCallsModule } from './components/dashboards/SalesExecutive/Calls/SalesCall';
// import SalesPaymentsModule from './components/dashboards/SalesExecutive/Payments/SalesPayment';
// import { SalesReportsModule } from './components/dashboards/SalesExecutive/Reports/SalesReports';
// import SalesleadPipeline from './components/dashboards/SalesExecutive/Pipeline/SalesPipeline';
// import SalesLeadsList from './components/dashboards/SalesExecutive/salesLead/sales-lead-list/sales-Lead-list';
// import SalesLeadDetail from './components/dashboards/SalesExecutive/salesLead/sales-lead-details/sales-Lead-Details';
// function App() {
//   return (
//    <>
//      <BrowserRouter>
//         <Routes>
//             <Route path='/' element={<Header/>}/>
//             <Route path='/login' element={<LoginPage/>}/>
//             {/* admin section */}
//             <Route path='/admin' element={<AdminPage/>}/>
//             <Route path='/admin/lead-list' element={<LeadsList/>}/>
//             <Route path='/admin/lead-details/:id' element={<LeadDetail/>}/>
//             <Route path='/admin/automation' element={<AutomationsModule/>}/>
//             <Route path='/admin/settings' element={<AdminSettings/>}/>
//             <Route path='/admin/call' element={<AdminCallPage/>}/>
//             <Route path='/admin/Payment' element={<PaymentsModule/>}/>
//             <Route path='/admin/report' element={<AdminReports/>}/>
//             <Route path='/admin/pipeline' element={<AdminPipeline/>}/>
//             {/* manager section */}
//             <Route path='/manager' element={<MainManagerDashboard/>}/>
//             <Route path='/manager/lead-list' element={<ManagerLeadsList/>}/>
//             <Route path='/manager/lead-details/:id' element={<ManagerLeadDetail/>}/>
//             <Route path='/manager/call' element={<ManagerCallsModule/>}/>
//             <Route path='/manager/settings' element={<ManagerSettings/>}/>
//             <Route path='/manager/report' element={<ManagerReportsModule/>}/>
//             <Route path='/manager/pipeline' element={<ManagerPipeline/>}/>
//             <Route path='/manager/payment' element={<ManagerPaymentsModule/>}/>
//             <Route path='/manager/automation' element={<ManagerAutomationsModule/>}/>
//             {/*team-Lead section */}
//             <Route path='/teamlead' element={<TeamLeadDashboard/>}/>
//             <Route path='/teamlead/automation' element={<TeamLeadAutomationsModule/>}/>
//             <Route path='/teamlead/call' element={<TeamLeadCallsModule/>}/>
//             <Route path='/teamLead/lead-list' element={<TeamLeadsList/>}/>
//             <Route path='/teamlead/payment' element={<TeamLeadPaymentsModule/>}/>
//             <Route path='/teamlead/automation' element={<TeamLeadAutomationsModule/>}/>
//             <Route path='/teamlead/report' element={<TeamLeadReportsModule/>}/>
//             <Route path='/teamlead/pipeline' element={<TeamLeadPipeline/>}/>
//             <Route path='/teamlead/lead-details/:id' element={<TeamleadLeadDetail/>}/>
//             {/* sales executive */}
//             <Route path='/salesexecutive' element={<SalesExecutiveDashboard/>}/>
//             <Route path='/salesexecutive/call' element={<SalesCallsModule/>}/>
//             <Route path='/salesexecutive/lead-list' element={<SalesLeadsList/>}/>
//             <Route path='/salesexecutive/pipeline' element={<SalesleadPipeline/>}/>
//             <Route path='/salesexecutive/report' element={<SalesReportsModule/>}/>
//             <Route path='/salesexecutive/payment' element={<SalesPaymentsModule/>}/>
//             <Route path='/salesexective/lead-details/:id' element={<SalesLeadDetail/>}/>
//         </Routes>
//      </BrowserRouter>
//    </>
//   )
// }

// export default App


import { useState, lazy, Suspense } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Lazy load components
const Header = lazy(() => import('./components/header/header'));
const LoginPage = lazy(() => import('./components/auth/loginPage'));

// Admin components - lazy loaded
const AdminPage = lazy(() => import('./components/dashboards/admin/adminPage'));
const LeadsList = lazy(() => import('./components/dashboards/admin/a-lead/lead-list/admin-Lead-list'));
const LeadDetail = lazy(() => import('./components/dashboards/admin/a-lead/lead-details/admin-Lead-Details'));
const AutomationsModule = lazy(() => import('./components/dashboards/admin/a-automodel/admin-automodel'));
const AdminSettings = lazy(() => import('./components/dashboards/admin/a-settings/admin-settings'));
const AdminCallPage = lazy(() => import('./components/dashboards/admin/a-Calls/Admin-Calls'));
const PaymentsModule = lazy(() => import('./components/dashboards/admin/a-payments/Admin-payments-Pages'));
const AdminReports = lazy(() => import('./components/dashboards/admin/a-reports/Admin-Reports'));
const AdminPipeline = lazy(() => import('./components/dashboards/admin/a-pieline/Admin-Pipeline'));

// Manager components - lazy loaded
const MainManagerDashboard = lazy(() => import('./components/dashboards/Manager/ManagerDashboard'));
const ManagerAutomationsModule = lazy(() => import('./components/dashboards/Manager/ManagerAutomation/ManagerAutomation'));
const ManagerCallsModule = lazy(() => import('./components/dashboards/Manager/ManagerCalls/ManagerCalls'));
const ManagerLeadsList = lazy(() => import('./components/dashboards/Manager/ManagerLead/lead-list/manager-Lead-list'));
const ManagerLeadDetail = lazy(() => import('./components/dashboards/Manager/ManagerLead/lead-details/Manager-Lead-Details'));
const ManagerPaymentsModule = lazy(() => import('./components/dashboards/Manager/ManagerPayments/ManagerPayments'));
const ManagerPipeline = lazy(() => import('./components/dashboards/Manager/ManagerPieline/Manager-Pipeline'));
const ManagerReportsModule = lazy(() => import('./components/dashboards/Manager/ManagerReports/ManagerReports'));
const ManagerSettings = lazy(() => import('./components/dashboards/Manager/Managersettings/manager-settings'));

// Team Lead components - lazy loaded
const TeamLeadDashboard = lazy(() => import('./components/dashboards/Teamlead/Dashboard/Dashboard'));
const TeamLeadAutomationsModule = lazy(() => import('./components/dashboards/Teamlead/Automation/TlAutomation'));
const TeamLeadCallsModule = lazy(() => import('./components/dashboards/Teamlead/Calls/TeamleadCalls'));
const TeamLeadsList = lazy(() => import('./components/dashboards/Teamlead/Leads/tl-lead-list/Tl-Lead-list'));
const TeamLeadPaymentsModule = lazy(() => import('./components/dashboards/Teamlead/Payment/TlPayment'));
const TeamLeadPipeline = lazy(() => import('./components/dashboards/Teamlead/Pipeline/TlPipeline'));
const TeamLeadReportsModule = lazy(() => import('./components/dashboards/Teamlead/Reports/TlReports'));
const TeamleadLeadDetail = lazy(() => import('./components/dashboards/Teamlead/Leads/tl-lead-details/TL-Lead-Details'));

// Sales Executive components - lazy loaded
const SalesExecutiveDashboard = lazy(() => import('./components/dashboards/SalesExecutive/SalesDashboard/SalesDashboard'));
const SalesCallsModule = lazy(() => import('./components/dashboards/SalesExecutive/Calls/SalesCall'));
const SalesPaymentsModule = lazy(() => import('./components/dashboards/SalesExecutive/Payments/SalesPayment'));
const SalesReportsModule = lazy(() => import('./components/dashboards/SalesExecutive/Reports/SalesReports'));
const SalesleadPipeline = lazy(() => import('./components/dashboards/SalesExecutive/Pipeline/SalesPipeline'));
const SalesLeadsList = lazy(() => import('./components/dashboards/SalesExecutive/salesLead/sales-lead-list/sales-Lead-list'));
const SalesLeadDetail = lazy(() => import('./components/dashboards/SalesExecutive/salesLead/sales-lead-details/sales-Lead-Details'));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    flexDirection: 'column',
    gap: '10px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p>Loading...</p>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// Route-based code splitting
const AdminRoutes = () => (
  <>
    <Route path='/admin' element={<AdminPage />} />
    <Route path='/admin/lead-list' element={<LeadsList />} />
    <Route path='/admin/lead-details/:id' element={<LeadDetail />} />
    <Route path='/admin/automation' element={<AutomationsModule />} />
    <Route path='/admin/settings' element={<AdminSettings />} />
    <Route path='/admin/call' element={<AdminCallPage />} />
    <Route path='/admin/Payment' element={<PaymentsModule />} />
    <Route path='/admin/report' element={<AdminReports />} />
    <Route path='/admin/pipeline' element={<AdminPipeline />} />
  </>
);

const ManagerRoutes = () => (
  <>
    <Route path='/manager' element={<MainManagerDashboard />} />
    <Route path='/manager/lead-list' element={<ManagerLeadsList />} />
    <Route path='/manager/lead-details/:id' element={<ManagerLeadDetail />} />
    <Route path='/manager/call' element={<ManagerCallsModule />} />
    <Route path='/manager/settings' element={<ManagerSettings />} />
    <Route path='/manager/report' element={<ManagerReportsModule />} />
    <Route path='/manager/pipeline' element={<ManagerPipeline />} />
    <Route path='/manager/payment' element={<ManagerPaymentsModule />} />
    <Route path='/manager/automation' element={<ManagerAutomationsModule />} />
  </>
);

const TeamLeadRoutes = () => (
  <>
    <Route path='/teamlead' element={<TeamLeadDashboard />} />
    <Route path='/teamlead/automation' element={<TeamLeadAutomationsModule />} />
    <Route path='/teamlead/call' element={<TeamLeadCallsModule />} />
    <Route path='/teamLead/lead-list' element={<TeamLeadsList />} />
    <Route path='/teamlead/payment' element={<TeamLeadPaymentsModule />} />
    <Route path='/teamlead/report' element={<TeamLeadReportsModule />} />
    <Route path='/teamlead/pipeline' element={<TeamLeadPipeline />} />
    <Route path='/teamlead/lead-details/:id' element={<TeamleadLeadDetail />} />
  </>
);

const SalesExecutiveRoutes = () => (
  <>
    <Route path='/salesexecutive' element={<SalesExecutiveDashboard />} />
    <Route path='/salesexecutive/call' element={<SalesCallsModule />} />
    <Route path='/salesexecutive/lead-list' element={<SalesLeadsList />} />
    <Route path='/salesexecutive/pipeline' element={<SalesleadPipeline />} />
    <Route path='/salesexecutive/report' element={<SalesReportsModule />} />
    <Route path='/salesexecutive/payment' element={<SalesPaymentsModule />} />
    <Route path='/salesexective/lead-details/:id' element={<SalesLeadDetail />} />
  </>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path='/' element={<Header />} />
            <Route path='/login' element={<LoginPage />} />
            
            {/* Role-based routes */}
            {AdminRoutes()}
            {ManagerRoutes()}
            {TeamLeadRoutes()}
            {SalesExecutiveRoutes()}

            {/* 404 Fallback */}
            <Route path='*' element={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column'
              }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App