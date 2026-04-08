import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import Footer from '../components/Footer.jsx'

const NEXT_STEPS = [
  { icon: '📄', title: 'Document Review', desc: 'Our team will review and verify all uploaded documents within 1–2 business days.' },
  { icon: '🏛️', title: 'Embassy Submission', desc: 'Once approved, your application is submitted to the embassy along with passport collection.' },
  { icon: '✈️', title: 'Visa Issued', desc: 'Your approved visa or stamp will be delivered to your registered address or emailed directly.' },
]

export default function ThankYou() {
  const navigate = useNavigate()
  const { appData } = useApp()
  const orderNumber = appData.orderNumber || 'PKO-2025-0001'

  return (
    <div style={{ padding: '28px 32px', maxWidth: 700 }}>
      {/* Success card */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 20, padding: '48px 40px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#F0FFF4', border: '4px solid #B7EBC3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>✅</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Booking Confirmed!</h1>
        <p style={{ fontSize: 15, color: '#8A8A8A', marginBottom: 28 }}>Your visa application has been submitted successfully. We will keep you updated via email.</p>

        <div style={{ background: '#F7F7F7', border: '1px solid #EBEBEB', borderRadius: 12, padding: '16px 24px', display: 'inline-block', marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: '#8A8A8A', fontWeight: 500, marginBottom: 4 }}>ORDER NUMBER</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#E83838', letterSpacing: 0.5 }}>{orderNumber}</div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/visa/status')}
            style={{ border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(200,40,40,0.25)', padding: '11px 24px', fontSize: 15 }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Track Application →
          </button>
          <button
            onClick={() => navigate('/corporate-travel')}
            style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '11px 24px', fontSize: 15 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* What's Next */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>What happens next?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {NEXT_STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < NEXT_STEPS.length - 1 ? 20 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
                {i < NEXT_STEPS.length - 1 && <div style={{ width: 2, flex: 1, background: '#EBEBEB', marginTop: 8 }} />}
              </div>
              <div style={{ paddingBottom: i < NEXT_STEPS.length - 1 ? 20 : 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                  <span style={{ color: '#E83838', marginRight: 6 }}>{i + 1}.</span>{s.title}
                </div>
                <div style={{ fontSize: 14, color: '#8A8A8A', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
