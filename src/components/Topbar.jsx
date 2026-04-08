import React from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/corporate-travel': 'Corporate Travel',
  '/manage-applications': 'Manage Applications',
  '/visa/options': 'Select Visa',
  '/visa/travellers': 'Traveller Details',
  '/visa/documents': 'Upload Documents',
  '/visa/payment': 'Review & Pay',
  '/visa/thank-you': 'Booking Confirmed',
  '/visa/status': 'Application Status',
  '/visa/status-stamp': 'Application Status',
  '/visa/approved': 'Visa Approved',
}

export default function Topbar({ onMenuToggle, isMobile }) {
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] || 'Corporate Travel'

  return (
    <div style={{ height: 58, background: '#FFFFFF', borderBottom: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 14, flexShrink: 0, zIndex: 10 }}>
      {isMobile && (
        <button
          onClick={onMenuToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#4A4A4A', padding: 4, display: 'flex', alignItems: 'center' }}
        >
          ☰
        </button>
      )}

      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg,#FF6B6B,#C62828)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 11 }}>P</div>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#1A1A1A' }}>Peko</span>
        </div>
      )}

      <div style={{ flex: 1 }}>
        {!isMobile && (
          <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{title}</span>
        )}
        {isMobile && (
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{title}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#8A8A8A', position: 'relative', padding: 4 }}>
          🔔
          <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', background: '#E83838', border: '2px solid #fff' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B6B,#C62828)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>FP</div>
          {!isMobile && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>Founder</div>
              <div style={{ fontSize: 11, color: '#8A8A8A' }}>founder@acme.ae</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
