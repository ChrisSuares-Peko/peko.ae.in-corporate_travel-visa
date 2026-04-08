import React, { useState, useEffect } from 'react'
import { COUNTRIES } from '../data/constants.js'
import Footer from '../components/Footer.jsx'

const SERVICE_TABS = [
  { id: 'hotels',  label: '🏨 Hotel Booking', available: true },
  { id: 'flights', label: '✈️ Air Tickets',   available: false },
  { id: 'esim',    label: '📱 Travel eSIM',   available: false },
]

const GUEST_OPTIONS = [
  '1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests',
]

// ─── shared style helpers ────────────────────────────────────────────────────

const inputBase = {
  width: '100%',
  border: '1px solid #EBEBEB',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
  background: '#FFFFFF',
  color: '#1A1A1A',
  transition: 'border-color 0.15s',
  fontFamily: 'inherit',
}

const labelBase = {
  fontSize: 11,
  color: '#8A8A8A',
  marginBottom: 6,
  display: 'block',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 0.4,
}

function Field({ label, children }) {
  return (
    <div>
      <label style={labelBase}>{label}</label>
      {children}
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export default function CorporateTravel() {
  const [activeTab, setActiveTab] = useState('hotels')
  const [isMobile, setIsMobile]   = useState(window.innerWidth < 640)
  const [isTablet, setIsTablet]   = useState(window.innerWidth < 960)

  const [form, setForm] = useState({
    location:           '',
    checkIn:            '',
    checkOut:           '',
    guests:             '2 Guests',
    nationality:        'India',
    countryOfResidence: 'India',
  })
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth < 960)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const focusRed  = e => { e.target.style.borderColor = '#E83838' }
  const blurGrey  = e => { e.target.style.borderColor = '#EBEBEB' }

  // desktop: inputs in two rows + CTA to the right
  // tablet:  2-column grid rows + CTA below
  // mobile:  fully stacked
  const row1Cols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '2fr 1fr 1fr 1fr'
  const row2Cols = isMobile ? '1fr' : '1fr 1fr'

  return (
    <div style={{ minHeight: '100%' }}>
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: isMobile ? '28px 16px 0' : '48px 32px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        {/* ── HERO HEADER ─────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', maxWidth: 680, marginBottom: 36 }}>
          <div style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700, color: '#E83838',
            textTransform: 'uppercase', letterSpacing: 1.2,
            background: '#FFF0F0', borderRadius: 20,
            padding: '4px 14px', marginBottom: 18,
          }}>
            Corporate Travel
          </div>

          <h1 style={{
            fontSize: isMobile ? 24 : isTablet ? 30 : 36,
            fontWeight: 800,
            color: '#1A1A1A',
            lineHeight: 1.22,
            letterSpacing: -0.5,
            marginBottom: 16,
          }}>
            The modern way to manage<br />
            corporate travel —&nbsp;all in one place
          </h1>

          <p style={{ fontSize: 16, color: '#8A8A8A', lineHeight: 1.65 }}>
            Book hotels, flights, and manage visa applications for your entire
            team from a single platform.
          </p>
        </div>

        {/* ── SERVICE TABS — pill style ────────────────────────────────────── */}
        <div
          style={{
            display: 'inline-flex',
            background: '#F3F4F6',
            borderRadius: 50,
            padding: 5,
            gap: 3,
            marginBottom: 36,
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          {SERVICE_TABS.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => tab.available && setActiveTab(tab.id)}
                style={{
                  padding: isMobile ? '9px 14px' : '10px 22px',
                  borderRadius: 50,
                  border: 'none',
                  cursor: tab.available ? 'pointer' : 'not-allowed',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#E83838' : (tab.available ? '#4A4A4A' : '#BBBBBB'),
                  fontWeight: isActive ? 700 : 400,
                  fontSize: isMobile ? 13 : 14,
                  boxShadow: isActive ? '0 2px 10px rgba(0,0,0,0.09)' : 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => { if (!isActive && tab.available) e.currentTarget.style.color = '#1A1A1A' }}
                onMouseLeave={e => { if (!isActive && tab.available) e.currentTarget.style.color = '#4A4A4A' }}
              >
                {tab.label}
                {!tab.available && (
                  <span style={{ fontSize: 10, marginLeft: 5, opacity: 0.65 }}>Soon</span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── HOTEL SEARCH CARD ───────────────────────────────────────────── */}
        {activeTab === 'hotels' && (
          <div
            style={{
              width: '100%',
              background: '#FFFFFF',
              borderRadius: 20,
              padding: isMobile ? '20px 16px 24px' : '28px 32px 32px',
              boxShadow: '0 4px 28px rgba(0,0,0,0.08)',
              border: '1px solid #EBEBEB',
              marginBottom: 0,
            }}
          >
            {/* Card top bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>Find Hotels</div>
                <div style={{ fontSize: 13, color: '#8A8A8A', marginTop: 2 }}>Search across 500,000+ properties worldwide</div>
              </div>
              <button
                style={{
                  border: '1.5px solid #EBEBEB', borderRadius: 10,
                  background: '#fff', color: '#1A1A1A',
                  fontWeight: 500, cursor: 'pointer',
                  padding: '8px 16px', fontSize: 13,
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}
              >
                📋 Manage Booking
              </button>
            </div>

            {/* Search area: fields + CTA */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexDirection: isMobile ? 'column' : 'row' }}>
              {/* Fields column */}
              <div style={{ flex: 1, minWidth: 0 }}>

                {/* Row 1 — Location / Check-in / Check-out / Guests */}
                <div style={{ display: 'grid', gridTemplateColumns: row1Cols, gap: 12, marginBottom: 12 }}>
                  <Field label="📍 Location">
                    <input
                      placeholder="City, airport or hotel name"
                      value={form.location}
                      onChange={e => set('location', e.target.value)}
                      style={inputBase}
                      onFocus={focusRed} onBlur={blurGrey}
                    />
                  </Field>

                  <Field label="📅 Check-in">
                    <input
                      type="date"
                      value={form.checkIn}
                      onChange={e => set('checkIn', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      style={inputBase}
                      onFocus={focusRed} onBlur={blurGrey}
                    />
                  </Field>

                  <Field label="📅 Check-out">
                    <input
                      type="date"
                      value={form.checkOut}
                      onChange={e => set('checkOut', e.target.value)}
                      min={form.checkIn || new Date().toISOString().split('T')[0]}
                      style={inputBase}
                      onFocus={focusRed} onBlur={blurGrey}
                    />
                  </Field>

                  <Field label="👥 Guests">
                    <select
                      value={form.guests}
                      onChange={e => set('guests', e.target.value)}
                      style={{ ...inputBase, cursor: 'pointer' }}
                      onFocus={focusRed} onBlur={blurGrey}
                    >
                      {GUEST_OPTIONS.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Row 2 — Nationality / Country of Residence */}
                <div style={{ display: 'grid', gridTemplateColumns: row2Cols, gap: 12 }}>
                  <Field label="🌍 Traveller Nationality">
                    <input
                      value={form.nationality}
                      onChange={e => set('nationality', e.target.value)}
                      style={inputBase}
                      onFocus={focusRed} onBlur={blurGrey}
                    />
                  </Field>

                  <Field label="🏠 Country of Residence">
                    <select
                      value={form.countryOfResidence}
                      onChange={e => set('countryOfResidence', e.target.value)}
                      style={{ ...inputBase, cursor: 'pointer' }}
                      onFocus={focusRed} onBlur={blurGrey}
                    >
                      {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>
              </div>

              {/* Primary CTA */}
              <div style={{ flexShrink: 0, width: isMobile ? '100%' : 'auto', paddingBottom: isMobile ? 0 : 0 }}>
                <button
                  onClick={() => setSearched(true)}
                  style={{
                    width: isMobile ? '100%' : 'auto',
                    border: 'none',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(200,40,40,0.30)',
                    padding: isMobile ? '13px 28px' : '13px 32px',
                    fontSize: 16,
                    whiteSpace: 'nowrap',
                    fontFamily: 'inherit',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Search Hotels →
                </button>
              </div>
            </div>

            {/* Coming soon notice after search */}
            {searched && (
              <div style={{
                marginTop: 20,
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: 10,
                padding: '11px 16px',
                fontSize: 14,
                color: '#92400E',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                ⚠️ Hotel search is coming soon. Use the <strong>Prototype Panel</strong> (→ right edge) to navigate visa flows.
              </div>
            )}
          </div>
        )}

        {/* ── COMING SOON STATE for other tabs ─────────────────────────────── */}
        {activeTab !== 'hotels' && (
          <div style={{
            width: '100%',
            background: '#FFFFFF',
            borderRadius: 20,
            padding: '60px 32px',
            textAlign: 'center',
            boxShadow: '0 4px 28px rgba(0,0,0,0.08)',
            border: '1px solid #EBEBEB',
          }}>
            <div style={{ fontSize: 42, marginBottom: 14 }}>🚧</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Coming Soon</div>
            <div style={{ fontSize: 14, color: '#8A8A8A' }}>This service is under development. Check back soon.</div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  )
}
