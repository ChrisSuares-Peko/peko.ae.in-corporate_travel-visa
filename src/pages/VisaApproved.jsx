import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import Footer from '../components/Footer.jsx'

const NEXT_STEPS = [
  { icon: '📱', title: 'Save to Peko Hub', desc: 'Your approved visa has been saved to Peko Hub. Access it anytime from your digital wallet.' },
  { icon: '✈️', title: 'Ready to Travel', desc: 'Print a copy of your visa or keep the digital version. Present it at immigration upon arrival.' },
  { icon: '🔔', title: 'Expiry Reminders', desc: 'We will remind you 30 days before your visa expires so you can plan renewals in advance.' },
]

export default function VisaApproved() {
  const navigate = useNavigate()
  const { appData } = useApp()
  const { selectedVisa, travellers, orderNumber, searchCriteria } = appData

  const visa = selectedVisa || { name: 'Tourist eVisa', duration: '30 Days', entryType: 'Single Entry' }
  const order = orderNumber || 'PKO-2025-0001'
  const travellerList = travellers?.length ? travellers : [{ firstName: 'Rajesh', lastName: 'Kumar', passport: 'P1234567' }]

  return (
    <div style={{ padding: '28px 32px', maxWidth: 760, margin: '0 auto' }}>
      {/* Approval card */}
      <div style={{ background: '#FFFFFF', border: '1.5px solid #B7EBC3', borderRadius: 20, padding: '40px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#4CAF50,#276749)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px' }}>✅</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Visa Approved!</h1>
        <p style={{ fontSize: 15, color: '#8A8A8A', marginBottom: 8 }}>Congratulations! Your {visa.name} has been approved.</p>
        <div style={{ background: '#F0FFF4', border: '1px solid #B7EBC3', borderRadius: 8, padding: '8px 16px', display: 'inline-block', fontSize: 13, color: '#276749', fontWeight: 600 }}>
          ✅ Visa saved to Peko Hub
        </div>
      </div>

      {/* Details grid */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Application Details</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, fontSize: 14 }}>
          {[
            ['Order Number', order],
            ['Destination', searchCriteria?.destination || 'United States'],
            ['Visa Type', visa.name],
            ['Duration', visa.duration],
            ['Entry Type', visa.entryType],
            ['Travellers', String(travellerList.length)],
          ].map(([k, v]) => (
            <div key={k} style={{ background: '#F7F7F7', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, color: '#8A8A8A', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4 }}>{k}</div>
              <div style={{ fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Approved travellers */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Approved Travellers</div>
        {travellerList.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < travellerList.length - 1 ? '1px solid #EBEBEB' : 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#F0FFF4', color: '#276749', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>
              {t.firstName?.[0]}{t.lastName?.[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.firstName} {t.lastName}</div>
              <div style={{ fontSize: 11, color: '#8A8A8A' }}>Passport: {t.passport}</div>
            </div>
            <span style={{ fontSize: 11, background: '#F0FFF4', color: '#276749', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>✓ Approved</span>
          </div>
        ))}
      </div>

      {/* Download actions */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <button style={{ border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(200,40,40,0.25)', padding: '11px 22px', fontSize: 15 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          📄 Download Visa
        </button>
        <button style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '11px 22px', fontSize: 15 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}>
          🧾 Download Receipt
        </button>
        <button onClick={() => navigate('/corporate-travel')} style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '11px 22px', fontSize: 15 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}>
          Back to Dashboard
        </button>
      </div>

      {/* What's Next */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>What's next?</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {NEXT_STEPS.map((s, i) => (
            <div key={i} style={{ flex: '1 1 180px', background: '#F7F7F7', borderRadius: 12, padding: '16px' }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#8A8A8A', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
