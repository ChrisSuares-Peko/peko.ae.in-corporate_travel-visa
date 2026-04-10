import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PrototypePanel from './components/PrototypePanel.jsx'
import CorporateTravel from './pages/CorporateTravel.jsx'
import ManageApplications from './pages/ManageApplications.jsx'
import VisaOptions from './pages/VisaOptions.jsx'
import TravellerDetails from './pages/TravellerDetails.jsx'
import DocumentUpload from './pages/DocumentUpload.jsx'
import ReviewPayment from './pages/ReviewPayment.jsx'
import ThankYou from './pages/ThankYou.jsx'
import VisaStatus from './pages/VisaStatus.jsx'

import VisaApproved from './pages/VisaApproved.jsx'

export const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

const defaultBilling = {
  company: 'Acme Corp',
  email: 'founder@acme.ae',
  phone: '+971 50 123 4567',
  address: '123 Business Bay, Dubai, UAE',
}

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', background: '#F7F7F7', position: 'relative' }}>
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.45)', zIndex: 100 }}
        />
      )}
      <Sidebar isMobile={isMobile} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar onMenuToggle={() => setSidebarOpen(o => !o)} isMobile={isMobile} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
      <PrototypePanel />
    </div>
  )
}

export default function App() {
  const [appData, setAppData] = useState({
    searchCriteria: null,
    selectedVisa: null,
    travellersCount: { adults: 1, children: 0, infants: 0 },
    travellers: [],
    documents: {},
    addons: [],
    billingDetails: defaultBilling,
    orderNumber: null,
  })

  function updateApp(updates) {
    setAppData(prev => ({ ...prev, ...updates }))
  }

  return (
    <AppContext.Provider value={{ appData, updateApp }}>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/corporate-travel" replace />} />
            <Route path="/corporate-travel" element={<CorporateTravel />} />
            <Route path="/manage-applications" element={<ManageApplications />} />
            <Route path="/visa/options" element={
              <ProtectedRoute requires="searchCriteria">
                <VisaOptions />
              </ProtectedRoute>
            } />
            <Route path="/visa/travellers" element={
              <ProtectedRoute requires="selectedVisa">
                <TravellerDetails />
              </ProtectedRoute>
            } />
            <Route path="/visa/documents" element={
              <ProtectedRoute requires="travellers">
                <DocumentUpload />
              </ProtectedRoute>
            } />
            <Route path="/visa/payment" element={
              <ProtectedRoute requires="documents">
                <ReviewPayment />
              </ProtectedRoute>
            } />
            <Route path="/visa/thank-you" element={<ThankYou />} />
            <Route path="/visa/status" element={<VisaStatus />} />
            <Route path="/visa/status-stamp" element={<VisaStatusStamp />} />
            <Route path="/visa/approved" element={<VisaApproved />} />
            <Route path="*" element={<Navigate to="/corporate-travel" replace />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
