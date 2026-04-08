import React from 'react'
import { useNavigate } from 'react-router-dom'
import ApplicationsTable from '../components/ApplicationsTable.jsx'
import Footer from '../components/Footer.jsx'

export default function ManageApplications() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 16 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/corporate-travel')}>Corporate Travel</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ color: '#E83838', fontWeight: 500 }}>Manage Applications</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Manage Applications</h1>
          <p style={{ fontSize: 15, color: '#8A8A8A' }}>View and track all visa applications for your team.</p>
        </div>
        <button
          onClick={() => navigate('/corporate-travel')}
          style={{ border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(200,40,40,0.25)', padding: '10px 22px', fontSize: 15 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          + New Application
        </button>
      </div>

      <ApplicationsTable />
      <Footer />
    </div>
  )
}
