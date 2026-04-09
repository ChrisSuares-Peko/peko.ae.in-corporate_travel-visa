import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { EMPLOYEES } from '../data/constants.js'
import Stepper from '../components/Stepper.jsx'
import Footer from '../components/Footer.jsx'

function TravellerForm({ index, data, onChange, label }) {
  const inputStyle = { width: '100%', border: '1px solid #EBEBEB', borderRadius: 10, padding: '10px 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#FFFFFF', color: '#1A1A1A', transition: 'border-color 0.15s' }
  const labelStyle = { fontSize: 13, color: '#8A8A8A', marginBottom: 6, display: 'block', fontWeight: 500 }

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>
          <span style={{ display: 'inline-block', width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B6B,#C62828)', color: '#fff', textAlign: 'center', lineHeight: '26px', fontSize: 12, fontWeight: 700, marginRight: 10 }}>{index + 1}</span>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, color: '#8A8A8A', fontWeight: 500 }}>Auto-fill from:</label>
          <select
            onChange={e => {
              const emp = EMPLOYEES.find(em => em.id === e.target.value)
              if (emp) onChange({ firstName: emp.firstName, lastName: emp.lastName, dob: emp.dob, passport: emp.passport, contactNumber: emp.contactNumber || '' })
            }}
            defaultValue=""
            style={{ border: '1px solid #EBEBEB', borderRadius: 8, padding: '7px 10px', fontSize: 13, background: '#fff', cursor: 'pointer' }}
          >
            <option value="">Select employee...</option>
            {EMPLOYEES.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { key: 'firstName',     label: 'First Name',      required: true },
          { key: 'lastName',      label: 'Last Name',        required: true },
          { key: 'dob',           label: 'Date of Birth',    required: true, type: 'date' },
          { key: 'passport',      label: 'Passport Number',  required: true },
          { key: 'contactNumber', label: 'Contact Number',   required: true, type: 'tel', placeholder: '+91 98765 43210' },
        ].map(({ key, label: fl, required, type = 'text', placeholder }) => (
          <div key={key}>
            <label style={labelStyle}>{required && <span style={{ color: '#E83838' }}>* </span>}{fl}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={data[key] || ''}
              onChange={e => onChange({ [key]: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#E83838'}
              onBlur={e => e.target.style.borderColor = '#EBEBEB'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TravellerDetails() {
  const navigate = useNavigate()
  const { appData, updateApp } = useApp()
  const { selectedVisa, travellersCount } = appData
  const totalTravellers = (travellersCount?.adults || 1) + (travellersCount?.children || 0) + (travellersCount?.infants || 0)

  const [travellers, setTravellers] = useState(() =>
    Array.from({ length: totalTravellers }, () => ({ firstName: '', lastName: '', dob: '', passport: '', contactNumber: '' }))
  )
  const [billing, setBilling] = useState(appData.billingDetails)
  const [error, setError] = useState('')

  const labelStyle = { fontSize: 13, color: '#8A8A8A', marginBottom: 6, display: 'block', fontWeight: 500 }
  const inputStyle = { width: '100%', border: '1px solid #EBEBEB', borderRadius: 10, padding: '10px 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#FFFFFF', color: '#1A1A1A', transition: 'border-color 0.15s' }

  const updateTraveller = (i, updates) => {
    setTravellers(prev => prev.map((t, idx) => idx === i ? { ...t, ...updates } : t))
  }

  const handleProceed = () => {
    const incomplete = travellers.some(t => !t.firstName || !t.lastName || !t.dob || !t.passport || !t.contactNumber)
    if (incomplete) return setError('Please fill in all traveller details, including contact number.')
    setError('')
    updateApp({ travellers, billingDetails: billing })
    navigate('/visa/documents')
  }

  const travellerLabels = []
  let ai = 1, ci = 1, ii = 1
  for (let i = 0; i < totalTravellers; i++) {
    if (i < (travellersCount?.adults || 1)) travellerLabels.push(`Adult ${ai++}`)
    else if (i < (travellersCount?.adults || 1) + (travellersCount?.children || 0)) travellerLabels.push(`Child ${ci++}`)
    else travellerLabels.push(`Infant ${ii++}`)
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 16 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/corporate-travel')}>Corporate Travel</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/visa/options')}>Select Visa</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ color: '#E83838', fontWeight: 500 }}>Traveller Details</span>
      </div>

      <Stepper currentStep={2} />

      {selectedVisa && (
        <div style={{ background: '#FFF0F0', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 18px', marginBottom: 24, fontSize: 14, color: '#C62828', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <strong>{selectedVisa.name}</strong>
          <span>·</span><span>{selectedVisa.duration}</span>
          <span>·</span><span>{selectedVisa.entryType}</span>
          <span>·</span><span>{selectedVisa.processingTime}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
        {travellers.map((t, i) => (
          <TravellerForm key={i} index={i} data={t} label={travellerLabels[i]} onChange={updates => updateTraveller(i, updates)} />
        ))}
      </div>

      {/* Billing Details */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px 24px', marginBottom: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Billing Details</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { key: 'company', label: 'Company Name' },
            { key: 'email', label: 'Billing Email' },
            { key: 'phone', label: 'Phone Number' },
            { key: 'address', label: 'Billing Address' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input
                value={billing[key] || ''}
                onChange={e => setBilling(p => ({ ...p, [key]: e.target.value }))}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#E83838'}
                onBlur={e => e.target.style.borderColor = '#EBEBEB'}
              />
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ background: '#FFF0F0', border: '1px solid #FECACA', borderRadius: 8, padding: '9px 14px', fontSize: 13, color: '#FF4F4F', marginBottom: 20 }}>⚠️ {error}</div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button onClick={() => navigate('/visa/options')} style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '10px 22px', fontSize: 15 }}>Back</button>
        <button onClick={handleProceed} style={{ border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(200,40,40,0.25)', padding: '10px 28px', fontSize: 15 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          Proceed to Documents →
        </button>
      </div>
      <Footer />
    </div>
  )
}
