import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { COUNTRIES, DESTINATION_COUNTRIES } from '../data/constants.js'

export default function VisaSearch() {
  const navigate = useNavigate()
  const { updateApp } = useApp()
  const [form, setForm] = useState({
    nationality: 'India',
    countryOfResidence: 'India',
    destination: '',
    visaType: 'Tourist',
    travelDate: '',
  })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSearch = () => {
    if (!form.destination) return setError('Please select a destination country.')
    if (!form.travelDate) return setError('Please select a travel date.')
    setError('')
    updateApp({ searchCriteria: form })
    navigate('/visa/options')
  }

  const inputStyle = {
    width: '100%', border: '1px solid #EBEBEB', borderRadius: 10,
    padding: '10px 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box',
    background: '#FFFFFF', color: '#1A1A1A', transition: 'border-color 0.15s',
  }
  const labelStyle = { fontSize: 13, color: '#8A8A8A', marginBottom: 6, display: 'block', fontWeight: 500 }

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '24px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Search Visa</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Nationality</label>
          <input
            value={form.nationality}
            onChange={e => set('nationality', e.target.value)}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#E83838'}
            onBlur={e => e.target.style.borderColor = '#EBEBEB'}
          />
        </div>

        <div>
          <label style={labelStyle}>Country of Residence</label>
          <select
            value={form.countryOfResidence}
            onChange={e => set('countryOfResidence', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' }}
            onFocus={e => e.target.style.borderColor = '#E83838'}
            onBlur={e => e.target.style.borderColor = '#EBEBEB'}
          >
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}><span style={{ color: '#E83838' }}>* </span>Destination Country</label>
          <select
            value={form.destination}
            onChange={e => set('destination', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', borderColor: error && !form.destination ? '#E83838' : '#EBEBEB' }}
            onFocus={e => e.target.style.borderColor = '#E83838'}
            onBlur={e => e.target.style.borderColor = form.destination ? '#EBEBEB' : (error ? '#E83838' : '#EBEBEB')}
          >
            <option value="">Select destination...</option>
            {DESTINATION_COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}><span style={{ color: '#E83838' }}>* </span>Travel Date</label>
          <input
            type="date"
            value={form.travelDate}
            onChange={e => set('travelDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            style={{ ...inputStyle, borderColor: error && !form.travelDate ? '#E83838' : '#EBEBEB' }}
            onFocus={e => e.target.style.borderColor = '#E83838'}
            onBlur={e => e.target.style.borderColor = form.travelDate ? '#EBEBEB' : (error ? '#E83838' : '#EBEBEB')}
          />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Visa Type</label>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Tourist', 'Business'].map(type => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15 }}>
              <input
                type="radio"
                name="visaType"
                value={type}
                checked={form.visaType === type}
                onChange={() => set('visaType', type)}
                style={{ accentColor: '#E83838', width: 16, height: 16 }}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ background: '#FFF0F0', border: '1px solid #FECACA', borderRadius: 8, padding: '9px 14px', fontSize: 13, color: '#FF4F4F', marginBottom: 16 }}>
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={handleSearch}
        style={{ border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(200,40,40,0.25)', padding: '11px 28px', fontSize: 15 }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        Search Visas →
      </button>
    </div>
  )
}
