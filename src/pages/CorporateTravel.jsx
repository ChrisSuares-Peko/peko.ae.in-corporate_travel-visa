import { useState, useEffect } from 'react'
import Footer from '../components/Footer.jsx'

// ─── input style ─────────────────────────────────────────────────────────────

const inputStyle = {
  flex: 1,
  minWidth: 200,
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #EBEBEB',
  outline: 'none',
  fontSize: 14,
  fontFamily: 'inherit',
  color: '#1A1A1A',
  background: '#FFFFFF',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}

// ─── service tabs ─────────────────────────────────────────────────────────────

const ServiceTabs = () => {
  const tabs = ['Air Tickets', 'Hotel Booking', 'Travel eSIM']

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        background: '#FFF',
        padding: 6,
        borderRadius: 999,
        border: '1px solid #EBEBEB',
        marginBottom: 24,
        flexWrap: 'wrap',
      }}
    >
      {tabs.map(tab => {
        const isActive = tab === 'Hotel Booking'
        return (
          <div
            key={tab}
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              background: isActive ? '#FFEAEA' : 'transparent',
              color: isActive ? '#E83838' : '#1A1A1A',
              fontWeight: isActive ? 600 : 500,
              cursor: 'pointer',
              fontSize: 14,
              whiteSpace: 'nowrap',
              transition: 'background 0.15s',
            }}
          >
            {tab}
          </div>
        )
      })}
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export default function CorporateTravel() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const focusRed = e => { e.target.style.borderColor = '#E83838' }
  const blurGrey = e => { e.target.style.borderColor = '#EBEBEB' }

  return (
    <div style={{ minHeight: '100%' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 32,
            maxWidth: 720,
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? 22 : 28,
              fontWeight: 700,
              color: '#1A1A1A',
              marginBottom: 8,
              lineHeight: 1.3,
            }}
          >
            The modern way to manage corporate travel — all in one place
          </h1>
          <p style={{ fontSize: 14, color: '#8A8A8A', margin: 0 }}>
            Manage visas, hotels and flights for your team from a single platform
          </p>
        </div>

        {/* ── SERVICE TABS ─────────────────────────────────────────────────── */}
        <ServiceTabs />

        {/* ── SEARCH CARD ─────────────────────────────────────────────────── */}
        <div
          style={{
            width: '100%',
            background: '#FFF',
            borderRadius: 16,
            border: '1px solid #EBEBEB',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            boxSizing: 'border-box',
          }}
        >
          {/* Row 1 — Location / Check-in / Check-out / Guests */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <input
              placeholder="Location"
              style={inputStyle}
              onFocus={focusRed}
              onBlur={blurGrey}
            />
            <input
              placeholder="Check-in"
              type="date"
              style={inputStyle}
              onFocus={focusRed}
              onBlur={blurGrey}
            />
            <input
              placeholder="Check-out"
              type="date"
              style={inputStyle}
              onFocus={focusRed}
              onBlur={blurGrey}
            />
            <input
              placeholder="Guests"
              style={inputStyle}
              onFocus={focusRed}
              onBlur={blurGrey}
            />
          </div>

          {/* Row 2 — Nationality / Country of Residence */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <input
              placeholder="Traveller Nationality"
              style={inputStyle}
              onFocus={focusRed}
              onBlur={blurGrey}
            />
            <input
              placeholder="Country of Residence"
              style={inputStyle}
              onFocus={focusRed}
              onBlur={blurGrey}
            />
          </div>

          {/* CTA Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <button
              style={{
                background: '#FFF',
                border: '1px solid #EBEBEB',
                padding: '10px 16px',
                borderRadius: 8,
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'inherit',
                color: '#1A1A1A',
                width: isMobile ? '100%' : 'auto',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}
            >
              📋 Manage Booking
            </button>

            <button
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #E03030 60%, #C62828 100%)',
                color: '#FFF',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 4px 14px rgba(200,40,40,0.25)',
                width: isMobile ? '100%' : 'auto',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Search Hotels →
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
