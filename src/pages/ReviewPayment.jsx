import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { ADDONS } from '../data/constants.js'
import Stepper from '../components/Stepper.jsx'
import Footer from '../components/Footer.jsx'

function fmt(n) { return '₹' + n.toLocaleString('en-IN') }

export default function ReviewPayment() {
  const navigate = useNavigate()
  const { appData, updateApp } = useApp()
  const { selectedVisa, travellers, travellersCount, billingDetails } = appData
  const [selectedAddons, setSelectedAddons] = useState([])
  const [tooltip, setTooltip] = useState(null)
  const [paying, setPaying] = useState(false)

  const total = (travellersCount?.adults || 1) + (travellersCount?.children || 0) + (travellersCount?.infants || 0)

  const toggleAddon = (id) => setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const platformTotal = selectedVisa ? Math.round((selectedVisa.serviceFee + selectedVisa.platformFee) * total * 1.18) : 0
  const govTotal = selectedVisa ? selectedVisa.govFee * total : 0

  const addonTotal = ADDONS
    .filter(a => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + (a.pricing === 'per_traveller' ? a.price * total : a.price), 0)

  const payNow = Math.round(platformTotal + addonTotal * 1.18)

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      const order = 'PKO-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000)
      updateApp({ orderNumber: order, addons: selectedAddons })
      navigate('/visa/thank-you')
    }, 1800)
  }

  if (!selectedVisa) return null

  return (
    <div style={{ padding: '28px 36px' }}>
      <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 16 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/corporate-travel')}>Corporate Travel</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/visa/documents')}>Documents</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ color: '#E83838', fontWeight: 500 }}>Review & Pay</span>
      </div>

      <Stepper currentStep={4} />

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Left column */}
        <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Application summary */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Application Summary</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 14 }}>
              {[
                ['Visa', selectedVisa.name],
                ['Duration', selectedVisa.duration],
                ['Entry Type', selectedVisa.entryType],
                ['Processing', selectedVisa.processingTime],
                ['Travellers', `${total} (${travellersCount?.adults || 1}A ${travellersCount?.children || 0}C ${travellersCount?.infants || 0}I)`],
                ['Format', selectedVisa.format],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 12, color: '#8A8A8A', fontWeight: 500, marginBottom: 2 }}>{k}</div>
                  <div style={{ fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Travellers */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Travellers</div>
            {travellers.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < travellers.length - 1 ? '1px solid #EBEBEB' : 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFF0F0', color: '#E83838', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                  {t.firstName?.[0]}{t.lastName?.[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.firstName} {t.lastName}</div>
                  <div style={{ fontSize: 11, color: '#8A8A8A' }}>Passport: {t.passport} · DOB: {t.dob}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 11, background: '#F0FFF4', color: '#276749', fontWeight: 600, padding: '2px 8px', borderRadius: 20 }}>✓ Docs</span>
              </div>
            ))}
          </div>

          {/* Add-on Services */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'relative' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Add-on Services</div>
            <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 16 }}>Enhance your application with optional services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ADDONS.map(addon => {
                const checked = selectedAddons.includes(addon.id)
                const price = addon.pricing === 'per_traveller' ? addon.price * total : addon.price
                return (
                  <div
                    key={addon.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', borderRadius: 10,
                      border: checked ? '1.5px solid #E83838' : '1px solid #EBEBEB',
                      background: checked ? '#FFF0F0' : '#FAFAFA',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <input type="checkbox" checked={checked} onChange={() => {}} style={{ accentColor: '#E83838', width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A' }}>{addon.name}</div>
                      <div style={{ fontSize: 12, color: '#8A8A8A' }}>{addon.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: checked ? '#E83838' : '#1A1A1A' }}>₹{price}</div>
                      <div style={{ fontSize: 11, color: '#8A8A8A' }}>{addon.pricing === 'per_traveller' ? `₹${addon.price}/person` : 'flat fee'}</div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setTooltip(tooltip === addon.id ? null : addon.id) }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A8A8A', fontSize: 16, padding: 2 }}
                    >ℹ</button>
                    {tooltip === addon.id && (
                      <div style={{ position: 'absolute', right: 56, background: '#1A1A1A', color: '#fff', borderRadius: 8, padding: '10px 14px', fontSize: 12, maxWidth: 220, zIndex: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.15)', lineHeight: 1.5 }}>
                        {addon.tooltip}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Billing */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Billing Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
              {[['Company', billingDetails?.company], ['Email', billingDetails?.email], ['Phone', billingDetails?.phone], ['Address', billingDetails?.address]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 12, color: '#8A8A8A', fontWeight: 500, marginBottom: 2 }}>{k}</div>
                  <div style={{ background: '#F7F7F7', border: '1px solid #EBEBEB', borderRadius: 10, padding: '9px 14px', fontSize: 14, color: '#8A8A8A' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: sticky payment summary */}
        <div style={{ width: 300, flexShrink: 0, position: 'sticky', top: 20 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Payment Summary</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, marginBottom: 18 }}>
              {[
                ['Service Fee', fmt(selectedVisa.serviceFee * total)],
                ['Platform Fee', fmt(selectedVisa.platformFee * total)],
                ['GST (18%)', fmt(Math.round((selectedVisa.serviceFee + selectedVisa.platformFee) * total * 0.18))],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: '#4A4A4A' }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              {selectedAddons.length > 0 && (
                <>
                  <div style={{ borderTop: '1px dashed #EBEBEB', margin: '4px 0' }} />
                  {ADDONS.filter(a => selectedAddons.includes(a.id)).map(a => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#4A4A4A' }}>
                      <span style={{ fontSize: 13 }}>{a.name}</span>
                      <span>{fmt(a.pricing === 'per_traveller' ? a.price * total : a.price)}</span>
                    </div>
                  ))}
                </>
              )}
              <div style={{ borderTop: '2px solid #EBEBEB', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, color: '#E83838' }}>
                <span>Pay Now</span><span>{fmt(payNow)}</span>
              </div>
            </div>
            <button
              onClick={handlePay}
              disabled={paying}
              style={{ width: '100%', border: 'none', borderRadius: 10, background: paying ? '#E8E8E8' : 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)', color: paying ? '#8A8A8A' : '#fff', fontWeight: 700, cursor: paying ? 'not-allowed' : 'pointer', boxShadow: paying ? 'none' : '0 4px 14px rgba(200,40,40,0.30)', padding: '13px', fontSize: 16 }}
              onMouseEnter={e => !paying && (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {paying ? '⏳ Processing...' : `Pay ${fmt(payNow)}`}
            </button>
          </div>
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#C2410C' }}>
            ⚠️ Embassy fee of <strong>{fmt(govTotal)}</strong> will be collected separately after document approval.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
