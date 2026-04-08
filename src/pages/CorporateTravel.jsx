import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VisaSearch from '../components/VisaSearch.jsx'
import ApplicationsTable from '../components/ApplicationsTable.jsx'
import Footer from '../components/Footer.jsx'

const STATS = [
  { label: 'Total Applications', value: '12', icon: '📋', bg: '#F0F4FF', iconBg: '#E0E7FF', color: '#3548C8' },
  { label: 'Approved', value: '8', icon: '✅', bg: '#F0FFF4', iconBg: '#D1FAE5', color: '#276749' },
  { label: 'Pending', value: '3', icon: '⏳', bg: '#FFF7ED', iconBg: '#FEE3C0', color: '#C2410C' },
  { label: 'This Month', value: '4', icon: '📅', bg: '#F5F3FF', iconBg: '#EDE9FE', color: '#4527A0' },
]

const TABS = ['Visas', 'Hotels', 'Air Travel']

export default function CorporateTravel() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Visas')

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Corporate Travel</h1>
        <p style={{ fontSize: 15, color: '#8A8A8A' }}>Manage visas, hotels and flights for your team from one place.</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        {STATS.map(s => (
          <div key={s.label} style={{ flex: '1 1 160px', background: s.bg, border: '1px solid #EBEBEB', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#8A8A8A', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '2px solid #EBEBEB' }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab
          const isDisabled = tab !== 'Visas'
          return (
            <button
              key={tab}
              onClick={() => !isDisabled && setActiveTab(tab)}
              style={{
                padding: '10px 22px', border: 'none', background: 'none',
                fontSize: 15, fontWeight: isActive ? 600 : 400,
                color: isActive ? '#E83838' : (isDisabled ? '#C8C8C8' : '#4A4A4A'),
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                borderBottom: isActive ? '2px solid #E83838' : '2px solid transparent',
                marginBottom: -2, transition: 'all 0.15s',
              }}
            >
              {tab} {isDisabled && <span style={{ fontSize: 11, color: '#8A8A8A' }}>(Soon)</span>}
            </button>
          )
        })}
      </div>

      {activeTab === 'Visas' && (
        <div>
          {/* Search */}
          <div style={{ marginBottom: 28 }}>
            <VisaSearch />
          </div>

          {/* Recent Applications */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>Recent Applications</h2>
                <p style={{ fontSize: 13, color: '#8A8A8A', marginTop: 2 }}>Showing latest 4 applications</p>
              </div>
              <button
                onClick={() => navigate('/manage-applications')}
                style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '9px 18px', fontSize: 14 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}
              >
                Manage All →
              </button>
            </div>
            <ApplicationsTable limit={4} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
