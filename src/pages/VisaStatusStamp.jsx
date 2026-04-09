import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import Footer from '../components/Footer.jsx'

const TIMELINE_STEPS = [
  { label: 'Application Created', date: '18 Jan 2025', done: true },
  { label: 'Application Submitted', date: '20 Jan 2025', done: true },
  { label: 'Documents Under Review', date: '22 Jan 2025', done: true },
  { label: 'Passport Collection', date: '28 Jan 2025', current: true },
  { label: 'Under Embassy Processing', date: 'Pending', pending: true },
  { label: 'Visa Stamped', date: 'Pending', pending: true },
  { label: 'Passport Delivery', date: 'Pending', pending: true },
  { label: 'Closed', date: 'Pending', pending: true },
]

const MOCK_DOCS = [
  { id: 'd1', name: 'Passport Front', status: 'approved', file: 'passport_front.jpg' },
  { id: 'd2', name: 'Passport Back', status: 'approved', file: 'passport_back.jpg' },
  { id: 'd3', name: 'Photograph', status: 'approved', file: 'photo.jpg' },
  { id: 'd4', name: 'Bank Statement', status: 'rejected', file: 'statement.pdf', reason: 'Statement older than 3 months — please provide a recent one.' },
  { id: 'd5', name: 'Flight Ticket', status: 'approved', file: 'ticket.pdf' },
]

function DocStatus({ status }) {
  if (status === 'approved') return <span style={{ fontSize: 11, background: '#F0FFF4', color: '#276749', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>✓ Approved</span>
  if (status === 'rejected') return <span style={{ fontSize: 11, background: '#FFF0F0', color: '#FF4F4F', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>✗ Rejected</span>
  return <span style={{ fontSize: 11, background: '#FFF7ED', color: '#C2410C', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>⏳ Pending</span>
}

export default function VisaStatusStamp() {
  const navigate = useNavigate()
  const { appData } = useApp()
  const { selectedVisa, travellers, orderNumber, searchCriteria } = appData
  const [reuploadDoc, setReuploadDoc] = useState(null)
  const [docs, setDocs] = useState(MOCK_DOCS)

  const order = orderNumber || 'PKO-2025-0002'
  const visa = selectedVisa || { name: '30 Day Tourist Visa (Multiple Entry)', duration: '30 Days/Visit', entryType: 'Multiple Entry' }
  const dest = searchCriteria?.destination || 'United Kingdom'

  const handleReupload = (docId) => {
    setDocs(prev => prev.map(d => d.id === docId ? { ...d, status: 'pending', file: 'reuploaded.pdf', reason: null } : d))
    setReuploadDoc(null)
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 16 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/corporate-travel')}>Corporate Travel</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/manage-applications')}>Applications</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ color: '#E83838', fontWeight: 500 }}>Application Status</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>{order}</h1>
            <StatusBadge status="Processing" size="lg" />
            <span style={{ fontSize: 11, background: '#F5F3FF', color: '#4527A0', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>Stamp Visa</span>
          </div>
          <p style={{ fontSize: 15, color: '#8A8A8A' }}>{dest} · {visa.name}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '9px 18px', fontSize: 14 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}>
            🧾 Download Receipt
          </button>
          <button style={{ border: '1.5px solid #E83838', borderRadius: 10, background: '#fff', color: '#E83838', fontWeight: 600, cursor: 'pointer', padding: '9px 18px', fontSize: 14 }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            💬 Contact Support
          </button>
        </div>
      </div>

      <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '11px 16px', fontSize: 14, color: '#92400E', marginBottom: 20, display: 'flex', gap: 8 }}>
        ⚠️ Please keep your passport ready for collection. Our courier will reach you within 1–2 business days.
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Main content */}
        <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Extended timeline (8 steps) */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Application Timeline</div>
            {TIMELINE_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < TIMELINE_STEPS.length - 1 ? 18 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 12,
                    background: step.done ? '#E83838' : (step.current ? '#FFF0F0' : '#F3F4F6'),
                    color: step.done ? '#fff' : (step.current ? '#E83838' : '#8A8A8A'),
                    border: step.current ? '2px solid #E83838' : 'none',
                  }}>
                    {step.done ? '✓' : (i + 1)}
                  </div>
                  {i < TIMELINE_STEPS.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: step.done ? '#E83838' : '#EBEBEB', marginTop: 6 }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < TIMELINE_STEPS.length - 1 ? 6 : 0 }}>
                  <div style={{ fontWeight: step.current ? 700 : 600, fontSize: 15, color: step.current ? '#E83838' : (step.pending ? '#8A8A8A' : '#1A1A1A') }}>
                    {step.label}
                    {step.current && <span style={{ marginLeft: 8, fontSize: 11, background: '#FFF7ED', color: '#C2410C', fontWeight: 600, padding: '2px 8px', borderRadius: 20 }}>In Progress</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8A8A', marginTop: 2 }}>{step.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Documents Uploaded</div>
            {docs.map(doc => (
              <div key={doc.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: '1px solid #EBEBEB' }}>
                <div style={{ fontSize: 20, marginTop: 2 }}>
                  {doc.status === 'approved' ? '📄' : doc.status === 'rejected' ? '⚠️' : '🕐'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{doc.name}</div>
                  {doc.file && <div style={{ fontSize: 11, color: '#8A8A8A' }}>{doc.file}</div>}
                  {doc.reason && <div style={{ fontSize: 12, color: '#FF4F4F', marginTop: 3 }}>{doc.reason}</div>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <DocStatus status={doc.status} />
                  {doc.status === 'rejected' && (
                    <button
                      onClick={() => setReuploadDoc(doc.id)}
                      style={{ border: '1.5px solid #E83838', borderRadius: 8, background: '#fff', color: '#E83838', fontWeight: 600, cursor: 'pointer', padding: '5px 12px', fontSize: 12 }}
                    >
                      Re-upload
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'sticky', top: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Application Details</div>
            {[
              ['Order No.', order],
              ['Destination', dest],
              ['Visa', visa.name],
              ['Duration', visa.duration],
              ['Entry', visa.entryType],
              ['Format', 'Stamp Visa'],
              ['Travellers', String(travellers?.length || 1)],
              ['Status', 'Processing'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}>
                <span style={{ color: '#8A8A8A' }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Re-upload modal */}
      {reuploadDoc && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#FFFFFF', borderRadius: 20, width: 420, boxShadow: '0 12px 48px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
            <div style={{ padding: '22px 28px', borderBottom: '1px solid #EBEBEB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>Re-upload Document</div>
              <button onClick={() => setReuploadDoc(null)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#8A8A8A' }}>✕</button>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <div style={{ background: '#FFF7ED', border: '1px solid #FDE68A', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#92400E', marginBottom: 20 }}>
                ⚠️ {docs.find(d => d.id === reuploadDoc)?.reason}
              </div>
              <div style={{ border: '2px dashed #E83838', borderRadius: 12, padding: '32px', textAlign: 'center', cursor: 'pointer', background: '#FFF5F5' }} onClick={() => handleReupload(reuploadDoc)}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Click to select file</div>
                <div style={{ fontSize: 12, color: '#8A8A8A' }}>JPG, PNG or PDF · Max 5 MB</div>
              </div>
            </div>
            <div style={{ padding: '16px 28px', borderTop: '1px solid #EBEBEB', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setReuploadDoc(null)} style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '9px 18px', fontSize: 14 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
