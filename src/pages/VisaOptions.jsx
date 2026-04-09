import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { VISA_OPTIONS } from '../data/constants.js'
import Stepper from '../components/Stepper.jsx'
import Footer from '../components/Footer.jsx'

function fmt(n) { return '₹' + n.toLocaleString('en-IN') }

export default function VisaOptions() {
  const navigate = useNavigate()
  const { appData, updateApp } = useApp()
  const { searchCriteria } = appData
  const [counts, setCounts] = useState({ adults: 1, children: 0, infants: 0 })
  const [selectedId, setSelectedId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const total = counts.adults + counts.children + counts.infants

  const adj = (key, delta) => {
    setCounts(prev => {
      const next = { ...prev, [key]: Math.max(0, prev[key] + delta) }
      if (key === 'adults' && next.adults < 1) return prev
      return next
    })
  }

  const selected = VISA_OPTIONS.find(v => v.id === selectedId)

  const calcTotal = (visa) => {
    const pax = counts.adults + counts.children + (counts.infants * 0.5)
    return Math.round((visa.govFee + visa.serviceFee + visa.platformFee) * pax * 1.18)
  }

  const handleProceed = () => {
    if (!selectedId) return
    updateApp({ selectedVisa: selected, travellersCount: counts, travellers: [] })
    navigate('/visa/travellers')
  }

  const counterStyle = { width: 30, height: 30, borderRadius: 8, border: '1.5px solid #EBEBEB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#1A1A1A' }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 16 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/corporate-travel')}>Corporate Travel</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ color: '#E83838', fontWeight: 500 }}>Select Visa</span>
      </div>

      <Stepper currentStep={1} />

      {/* Search summary */}
      {searchCriteria && (
        <div style={{ background: '#F7F7F7', border: '1px solid #EBEBEB', borderRadius: 12, padding: '14px 20px', marginBottom: 24, display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 14 }}>
          <span>📍 <strong>{searchCriteria.destination}</strong></span>
          <span>🗓 <strong>{searchCriteria.travelDate}</strong></span>
          <span>🧳 <strong>{searchCriteria.visaType}</strong></span>
          <span>🌍 <strong>From {searchCriteria.countryOfResidence}</strong></span>
        </div>
      )}

      {/* Traveller counts */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px 24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Number of Travellers</div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { key: 'adults', label: 'Adults', sub: '12+ years' },
            { key: 'children', label: 'Children', sub: '2–11 years' },
            { key: 'infants', label: 'Infants', sub: '< 2 years (50%)' },
          ].map(({ key, label, sub }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
                <div style={{ fontSize: 11, color: '#8A8A8A' }}>{sub}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button style={counterStyle} onClick={() => adj(key, -1)} onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'} onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}>−</button>
                <span style={{ width: 28, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>{counts[key]}</span>
                <button style={counterStyle} onClick={() => adj(key, 1)} onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'} onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visa option cards */}
      <div style={{ marginBottom: 12, fontWeight: 600, fontSize: 15 }}>
        Available Visas — {total} traveller{total !== 1 ? 's' : ''}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {VISA_OPTIONS.map(visa => {
          const isSelected = selectedId === visa.id
          const isExpanded = expandedId === visa.id
          const totalPrice = calcTotal(visa)
          const perPax = Math.round((visa.govFee + visa.serviceFee + visa.platformFee) * 1.18)

          return (
            <div
              key={visa.id}
              style={{
                background: isSelected ? '#FFF0F0' : '#FFFFFF',
                border: isSelected ? '1.5px solid #E83838' : '1.5px solid #EBEBEB',
                borderRadius: 14,
                boxShadow: isSelected ? '0 4px 16px rgba(232,56,56,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Card header */}
              <div
                style={{ padding: '18px 22px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}
                onClick={() => setSelectedId(isSelected ? null : visa.id)}
              >
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: isSelected ? 'none' : '2px solid #EBEBEB', background: isSelected ? '#E83838' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {isSelected && <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>✓</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A' }}>{visa.name}</div>
                  <div style={{ fontSize: 13, color: '#8A8A8A', marginTop: 2 }}>
                    {visa.duration} · {visa.entryType} · {visa.processingTime}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: isSelected ? '#E83838' : '#1A1A1A' }}>{fmt(totalPrice)}</div>
                  <div style={{ fontSize: 11, color: '#8A8A8A' }}>incl. taxes · {fmt(perPax)}/person</div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setExpandedId(isExpanded ? null : visa.id) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#8A8A8A', padding: '0 4px' }}
                >
                  {isExpanded ? '▲' : '▼'}
                </button>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid #EBEBEB', padding: '20px 22px', background: isSelected ? '#FFF5F5' : '#FAFAFA' }}>
                  <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 200px' }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 10 }}>Visa Info</div>
                      <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.6 }}>{visa.info}</p>
                      <div style={{ marginTop: 14 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>Required Documents</div>
                        {visa.documents.map((d, i) => (
                          <div key={i} style={{ fontSize: 13, color: '#4A4A4A', marginBottom: 4, display: 'flex', gap: 8 }}>
                            <span style={{ color: '#E83838', flexShrink: 0 }}>✓</span> {d}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ flex: '1 1 220px' }}>
                      {/* Total cost header */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4 }}>Total Visa Cost (2-step payment)</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>{fmt(calcTotal(visa))}</div>
                        <div style={{ fontSize: 11, color: '#8A8A8A', marginTop: 3 }}>Including platform and embassy fees for {total} traveller{total !== 1 ? 's' : ''}</div>
                      </div>

                      {/* Section title */}
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 10 }}>2-Step Payment Breakdown</div>

                      {/* PAY NOW */}
                      <div style={{ background: '#FFF5F5', border: '1px solid #F5C2C2', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#E83838', marginBottom: 2 }}>Pay Now — Platform Payment</div>
                        <div style={{ fontSize: 11, color: '#8A8A8A', marginBottom: 12 }}>Required to start your visa application</div>
                        {[
                          ['Service Fee', fmt(visa.serviceFee * total)],
                          ['Peko Platform Fee', fmt(visa.platformFee * total)],
                          ['GST (18%)', fmt(Math.round((visa.serviceFee + visa.platformFee) * total * 0.18))],
                        ].map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4A4A4A', marginBottom: 5 }}>
                            <span>{k}</span><span>{v}</span>
                          </div>
                        ))}
                        <div style={{ borderTop: '1px solid #F5C2C2', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 13, color: '#E83838' }}>
                          <span>Total Payable Now</span>
                          <span>{fmt(Math.round((visa.serviceFee + visa.platformFee) * total * 1.18))}</span>
                        </div>
                      </div>

                      {/* PAY LATER */}
                      <div style={{ background: '#F9F9F9', border: '1px solid #EBEBEB', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#4A4A4A', marginBottom: 2 }}>Pay Later — Embassy Payment</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4A4A4A', margin: '10px 0 8px' }}>
                          <span>Government / Embassy Fee</span><span>{fmt(visa.govFee * total)}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.5 }}>You will pay this directly at the embassy or consulate during your appointment.</div>
                      </div>

                      {/* Payment flow indicator */}
                      <div style={{ padding: '10px 12px', background: '#FFF', border: '1px dashed #EBEBEB', borderRadius: 10, fontSize: 12, color: '#6B7280', lineHeight: 1.7 }}>
                        <strong style={{ color: '#1A1A1A' }}>Step 1:</strong> Pay platform fees → Application starts<br />
                        <strong style={{ color: '#1A1A1A' }}>Step 2:</strong> Visit embassy → Pay government fees → Visa issued
                      </div>

                      {/* Disclaimer */}
                      <div style={{ fontSize: 11, color: '#8A8A8A', marginTop: 10, lineHeight: 1.5 }}>
                        Note: Embassy fees are not collected by Peko and must be paid directly at the embassy.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button onClick={() => navigate('/corporate-travel')} style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '10px 22px', fontSize: 15 }}>Back</button>
        <button
          onClick={handleProceed}
          disabled={!selectedId}
          style={{ border: 'none', borderRadius: 10, background: selectedId ? 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)' : '#E8E8E8', color: selectedId ? '#fff' : '#8A8A8A', fontWeight: 600, cursor: selectedId ? 'pointer' : 'not-allowed', boxShadow: selectedId ? '0 2px 8px rgba(200,40,40,0.25)' : 'none', padding: '10px 28px', fontSize: 15 }}
          onMouseEnter={e => selectedId && (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Proceed to Traveller Details →
        </button>
      </div>

      <Footer />
    </div>
  )
}
