import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { COUNTRIES, DESTINATION_COUNTRIES } from '../data/constants.js'
import Footer from '../components/Footer.jsx'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

// ─── tabs config ──────────────────────────────────────────────────────────────

const TABS = [
  { id: 'air',   label: 'Air Tickets',   icon: '✈️' },
  { id: 'hotel', label: 'Hotel Booking', icon: '🏨' },
  { id: 'esim',  label: 'Travel eSIM',   icon: '📱' },
  { id: 'visa',  label: 'Visa',          icon: '🛂' },
]

// ─── shared style constants ───────────────────────────────────────────────────

const labelStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: '#8A8A8A',
  marginBottom: 8,
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: 0.4,
}

const inputBase = {
  width: '100%',
  border: '1px solid #EBEBEB',
  borderRadius: 10,
  padding: '13px 16px',
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
  background: '#FFFFFF',
  color: '#1A1A1A',
  fontFamily: 'inherit',
  transition: 'border-color 0.15s',
}

const focusRed = e => { e.target.style.borderColor = '#E83838' }
const blurGrey = e => { e.target.style.borderColor = '#EBEBEB' }

const primaryBtn = (fullWidth) => ({
  background: 'linear-gradient(135deg, #FF6B6B 0%, #E03030 60%, #C62828 100%)',
  color: '#FFF',
  border: 'none',
  padding: '14px 28px',
  borderRadius: 12,
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  fontFamily: 'inherit',
  boxShadow: '0 4px 14px rgba(200,40,40,0.25)',
  whiteSpace: 'nowrap',
  width: fullWidth ? '100%' : 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  transition: 'opacity 0.2s',
})

const secondaryBtn = {
  border: '1.5px solid #E83838',
  borderRadius: 8,
  background: '#FFF',
  color: '#E83838',
  fontWeight: 500,
  cursor: 'pointer',
  padding: '9px 18px',
  fontSize: 14,
  fontFamily: 'inherit',
  transition: 'opacity 0.15s',
}


// ─── hotel card ───────────────────────────────────────────────────────────────

function HotelCard({ isMobile }) {
  const [form, setForm] = useState({
    location: '',
    checkIn:  '',
    checkOut: '',
    guests:   '',
    nationality: '',
    residence:   '',
  })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div style={{ padding: isMobile ? '20px 16px 24px' : '24px 32px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button style={secondaryBtn}>Manage Booking</button>
      </div>

      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Location</label>
          <input placeholder="Dubai, United Arab Emirates" value={form.location} onChange={e => set('location', e.target.value)} style={inputBase} onFocus={focusRed} onBlur={blurGrey} />
        </div>
        <div>
          <label style={labelStyle}>Check In</label>
          <input type="date" value={form.checkIn} onChange={e => set('checkIn', e.target.value)} min={new Date().toISOString().split('T')[0]} style={inputBase} onFocus={focusRed} onBlur={blurGrey} />
        </div>
        <div>
          <label style={labelStyle}>Check Out</label>
          <input type="date" value={form.checkOut} onChange={e => set('checkOut', e.target.value)} min={form.checkIn || new Date().toISOString().split('T')[0]} style={inputBase} onFocus={focusRed} onBlur={blurGrey} />
        </div>
        <div>
          <label style={labelStyle}>Guests</label>
          <input placeholder="1 Room, 1 Guest" value={form.guests} onChange={e => set('guests', e.target.value)} style={inputBase} onFocus={focusRed} onBlur={blurGrey} />
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr auto', gap: 16, alignItems: 'flex-end' }}>
        <div>
          <label style={labelStyle}>Traveller Nationality</label>
          <input placeholder="United Arab Emirates" value={form.nationality} onChange={e => set('nationality', e.target.value)} style={inputBase} onFocus={focusRed} onBlur={blurGrey} />
        </div>
        <div>
          <label style={labelStyle}>Traveller Country of Residence</label>
          <input placeholder="United Arab Emirates" value={form.residence} onChange={e => set('residence', e.target.value)} style={inputBase} onFocus={focusRed} onBlur={blurGrey} />
        </div>
        <button style={primaryBtn(isMobile)} onMouseEnter={e => e.currentTarget.style.opacity = '0.88'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          🔍 Search Hotels
        </button>
      </div>
    </div>
  )
}

// ─── visa card ────────────────────────────────────────────────────────────────

function VisaCard({ isMobile }) {
  const navigate       = useNavigate()
  const { updateApp }  = useApp()
  const [form, setForm] = useState({
    nationality: 'India',
    residence:   'India',
    destination: '',
    travelDate:  null,   // dayjs | null
    visaType:    'Tourist',
  })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const canSearch = form.destination && form.travelDate

  const handleSearch = () => {
    if (!canSearch) return
    updateApp({
      searchCriteria: {
        destination:        form.destination,
        travelDate:         form.travelDate.format('YYYY-MM-DD'),
        visaType:           form.visaType,
        nationality:        form.nationality,
        countryOfResidence: form.residence,
      },
    })
    navigate('/visa/options')
  }

  return (
    <div style={{ padding: isMobile ? '20px 16px 24px' : '24px 32px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button onClick={() => navigate('/manage-applications')} style={secondaryBtn}>
          Manage Applications
        </button>
      </div>

      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Nationality</label>
          <input placeholder="India" value={form.nationality} onChange={e => set('nationality', e.target.value)} style={inputBase} onFocus={focusRed} onBlur={blurGrey} />
        </div>
        <div>
          <label style={labelStyle}>Country of Residence</label>
          <select value={form.residence} onChange={e => set('residence', e.target.value)} style={{ ...inputBase, cursor: 'pointer' }} onFocus={focusRed} onBlur={blurGrey}>
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Destination Country</label>
          <select value={form.destination} onChange={e => set('destination', e.target.value)} style={{ ...inputBase, cursor: 'pointer', color: form.destination ? '#1A1A1A' : '#8A8A8A' }} onFocus={focusRed} onBlur={blurGrey}>
            <option value="">Select destination</option>
            {DESTINATION_COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Travel Date</label>
          <DatePicker
            value={form.travelDate}
            onChange={d => set('travelDate', d)}
            placeholder="Select date"
            format="DD MMM YYYY"
            placement="bottomLeft"
            disabledDate={d => d && d.isBefore(dayjs().startOf('day'))}
            getPopupContainer={trigger => trigger.parentNode}
            style={{ width: '100%', height: 44, borderRadius: 10 }}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <label style={labelStyle}>Visa Type</label>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Tourist', 'Business'].map(type => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15, color: '#1A1A1A', fontWeight: form.visaType === type ? 600 : 400 }}>
                <input type="radio" name="visaType" value={type} checked={form.visaType === type} onChange={() => set('visaType', type)} style={{ accentColor: '#E83838', width: 16, height: 16 }} />
                {type}
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleSearch}
          style={{ ...primaryBtn(isMobile), opacity: canSearch ? 1 : 0.55, cursor: canSearch ? 'pointer' : 'not-allowed' }}
          onMouseEnter={e => { if (canSearch) e.currentTarget.style.opacity = '0.88' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = canSearch ? '1' : '0.55' }}
        >
          🔍 Search Visas
        </button>
      </div>
    </div>
  )
}

// ─── coming soon card ─────────────────────────────────────────────────────────

function ComingSoonCard({ icon, label, description }) {
  return (
    <div style={{ padding: '72px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 14, color: '#8A8A8A', maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.65 }}>{description}</div>
      <div style={{ display: 'inline-block', background: '#F3F4F6', borderRadius: 20, padding: '8px 20px', fontSize: 13, color: '#8A8A8A', fontWeight: 500 }}>Coming Soon</div>
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export default function CorporateTravel() {
  const [activeTab, setActiveTab] = useState('hotel')
  const [isMobile, setIsMobile]   = useState(window.innerWidth < 640)
  const [isTablet, setIsTablet]   = useState(window.innerWidth < 960)

  useEffect(() => {
    const onResize = () => { setIsMobile(window.innerWidth < 640); setIsTablet(window.innerWidth < 960) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={{ minHeight: '100%' }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: isMobile ? '24px 16px 48px' : isTablet ? '32px 24px 48px' : '40px 40px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{ fontSize: isMobile ? 20 : isTablet ? 24 : 30, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', marginBottom: 28, lineHeight: 1.3, letterSpacing: -0.3 }}>
          The modern way to manage corporate travel — all in one place
        </h1>

        <div style={{ width: '100%', background: '#FFFFFF', borderRadius: 24, border: '1px solid #EBEBEB', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
          {/* Tab row */}
          <div style={{ display: 'flex', background: '#FEF0F0', padding: 8, gap: 4, flexWrap: isMobile ? 'wrap' : 'nowrap', borderRadius: '24px 24px 0 0' }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: isMobile ? 6 : 10,
                    padding: isMobile ? '12px 8px' : '14px 12px',
                    borderRadius: 16, border: 'none', cursor: 'pointer',
                    background: isActive ? '#FFE4E4' : 'transparent',
                    color: isActive ? '#E83838' : '#4A4A4A',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: isMobile ? 12 : 14,
                    fontFamily: 'inherit',
                    transition: 'all 0.18s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.5)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ fontSize: isMobile ? 18 : 22 }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          {activeTab === 'hotel' && <HotelCard isMobile={isMobile} />}
          {activeTab === 'visa'  && <VisaCard  isMobile={isMobile} />}
          {activeTab === 'air'   && <ComingSoonCard icon="✈️" label="Air Tickets"   description="Book flights for your team's corporate travel needs. Fast, easy, and fully managed from one platform." />}
          {activeTab === 'esim'  && <ComingSoonCard icon="📱" label="Travel eSIM"   description="Stay connected worldwide with instant eSIM activation — no physical SIM card needed." />}
        </div>

        <Footer />
      </div>
    </div>
  )
}
