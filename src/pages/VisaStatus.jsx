import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import Footer from '../components/Footer.jsx'

// ─── timeline config ──────────────────────────────────────────────────────────

const TIMELINE_CONFIG = {
  evisa: [
    { label: 'Application Created',      date: '25 Jan 2025', state: 'completed' },
    { label: 'Application Submitted',    date: '26 Jan 2025', state: 'completed' },
    { label: 'Documents Under Review',   date: '28 Jan 2025', state: 'active' },
    { label: 'Processing',               date: 'Pending',     state: 'upcoming' },
    { label: 'Visa Issued / Closed',     date: 'Pending',     state: 'upcoming' },
  ],
  visa1: [
    { label: 'Application Created',      date: '25 Jan 2025', state: 'completed' },
    { label: 'Application Submitted',    date: '26 Jan 2025', state: 'completed' },
    { label: 'Documents Under Review',   date: '28 Jan 2025', state: 'completed' },
    { label: 'Document Pickup Scheduled',date: '02 Feb 2025', state: 'active',   pickup: true },
    { label: 'Embassy Submission',       date: 'Pending',     state: 'upcoming' },
    { label: 'Visa Issued / Closed',     date: 'Pending',     state: 'upcoming' },
    { label: 'Documents Returned',       date: '08 Feb 2025', state: 'upcoming', returnDetails: true },
  ],
  visa2: [
    { label: 'Application Created',      date: '25 Jan 2025', state: 'completed' },
    { label: 'Application Submitted',    date: '26 Jan 2025', state: 'completed' },
    { label: 'Documents Under Review',   date: '28 Jan 2025', state: 'completed' },
    { label: 'Appointment Booked',       date: '01 Feb 2025', state: 'active',   appointment: true },
    { label: 'Embassy Visit',            date: '10 Feb 2025', state: 'upcoming', external: true },
  ],
}

const PROCESS_INFO = {
  evisa: null,
  visa1: 'Physical document handling required. Our team will collect and submit documents on your behalf.',
  visa2: 'Embassy visit required. Our team will assist with preparation and appointment booking.',
}

const PROCESS_BADGES = {
  evisa: { label: 'E-Visa',               bg: '#EFF6FF', color: '#2563EB' },
  visa1: { label: 'Full Service',          bg: '#FFF7ED', color: '#C2410C' },
  visa2: { label: 'Embassy Visit Required',bg: '#F3F4F6', color: '#4A4A4A' },
}

const PROCESS_TABS = [
  { id: 'evisa', label: 'E-Visa' },
  { id: 'visa1', label: 'Visa 1 — Full Service' },
  { id: 'visa2', label: 'Visa 2 — Embassy Visit' },
]

// ─── step dot ─────────────────────────────────────────────────────────────────

function StepDot({ state, index }) {
  const cfg = {
    completed:        { bg: '#E83838',  color: '#fff',    border: 'none',                 label: '✓' },
    active:           { bg: '#FFF0F0',  color: '#E83838', border: '2px solid #E83838',    label: String(index + 1) },
    upcoming:         { bg: '#F3F4F6',  color: '#8A8A8A', border: 'none',                 label: String(index + 1) },
    action_required:  { bg: '#FFF7ED',  color: '#C2410C', border: '2px solid #F59E0B',   label: '!' },
    external:         { bg: '#F0F4FF',  color: '#3548C8', border: '2px dashed #3548C8',  label: String(index + 1) },
  }
  const s = cfg[state] || cfg.upcoming
  return (
    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, background: s.bg, color: s.color, border: s.border }}>
      {s.label}
    </div>
  )
}

// ─── pickup card ──────────────────────────────────────────────────────────────

function PickupCard() {
  const [address, setAddress] = useState('123 Business Bay, Dubai, UAE')
  return (
    <div style={{ marginTop: 12, padding: 14, background: '#FFF7ED', border: '1px solid #FCD9BD', borderRadius: 10 }}>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#92400E', marginBottom: 10 }}>
        📦 Please keep the following documents ready for pickup on <strong>02 Feb 2025</strong>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#8A8A8A', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>Pickup Address</label>
        <input
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ width: '100%', border: '1px solid #FCD9BD', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', background: '#fff', color: '#1A1A1A', boxSizing: 'border-box', fontFamily: 'inherit' }}
          onFocus={e => e.target.style.borderColor = '#E83838'}
          onBlur={e => e.target.style.borderColor = '#FCD9BD'}
        />
      </div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, color: '#92400E', marginBottom: 12 }}>
        <span>📅 Date: <strong>02 Feb 2025</strong></span>
        <span>🕐 Time: <strong>10:00 AM – 1:00 PM</strong></span>
        <span>👤 Contact: <strong>Peko Operations Team</strong></span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#92400E', marginBottom: 6 }}>Required Documents for Pickup:</div>
      {['Original Passport', 'Bank Statement', 'Photograph (recent)', 'Visa Application Form'].map(d => (
        <div key={d} style={{ fontSize: 12, color: '#92400E', marginBottom: 3 }}>✓ {d}</div>
      ))}
    </div>
  )
}

// ─── return card ──────────────────────────────────────────────────────────────

const RETURN_DETAILS = {
  date:         '08 Feb 2025',
  time:         '2:00 PM – 4:00 PM',
  contactName:  'Peko Operations Team',
  contactPhone: '+971 50 123 4567',
  status:       'Scheduled',
  address:      '456 Marina Business Tower, Dubai, UAE',
  documents:    ['Original Passport', 'Bank Statement', 'Visa Application Form', 'Supporting Documents'],
}

function ReturnCard() {
  const r = RETURN_DETAILS
  return (
    <div style={{ marginTop: 12, padding: 14, background: '#F7FBF7', border: '1px solid #CFE8CF', borderRadius: 10 }}>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#276749', marginBottom: 10 }}>
        📬 Your documents are scheduled to be returned on <strong>{r.date}</strong>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#8A8A8A', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>Return Address</label>
        <div style={{ padding: '9px 12px', background: '#FFFFFF', border: '1px solid #DCEAD9', borderRadius: 8, fontSize: 13, color: '#1A1A1A' }}>
          {r.address}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, color: '#276749', marginBottom: 12, alignItems: 'center' }}>
        <span>📅 Date: <strong>{r.date}</strong></span>
        <span>🕐 Time: <strong>{r.time}</strong></span>
        <span>👤 Contact: <strong>{r.contactName}</strong></span>
        <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 20, background: '#D1FAE5', color: '#065F46' }}>
          {r.status}
        </span>
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, color: '#276749', marginBottom: 6 }}>Documents Being Returned:</div>
      {r.documents.map(d => (
        <div key={d} style={{ fontSize: 12, color: '#276749', marginBottom: 3 }}>✓ {d}</div>
      ))}
    </div>
  )
}

// ─── appointment card ─────────────────────────────────────────────────────────

function AppointmentCard() {
  return (
    <div style={{ marginTop: 12, padding: 14, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, fontSize: 13 }}>
      <div style={{ fontWeight: 600, color: '#1D4ED8', marginBottom: 10 }}>📅 Appointment Details</div>
      {[
        ['Date',    '10 February 2025'],
        ['Time',    '9:30 AM'],
        ['Embassy', 'US Consulate General, Mumbai'],
        ['Address', 'C-49, G-Block, Bandra Kurla Complex, Mumbai'],
      ].map(([k, v]) => (
        <div key={k} style={{ display: 'flex', gap: 8, marginBottom: 5, color: '#1E3A8A' }}>
          <span style={{ minWidth: 64, color: '#6B7280' }}>{k}:</span>
          <strong>{v}</strong>
        </div>
      ))}
    </div>
  )
}

// ─── embassy handover notice ──────────────────────────────────────────────────

function EmbassyHandoverCard() {
  return (
    <>
      <div style={{ marginTop: 12, padding: 12, background: '#F9FAFB', border: '1px dashed #EBEBEB', borderRadius: 10, fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
        From this stage onward, the remaining visa process is managed directly by the embassy or consulate. Live status tracking will not be available beyond this point.
      </div>
      <div style={{ marginTop: 10, padding: 12, background: '#F0F4FF', border: '1px solid #C7D2FE', borderRadius: 10, fontSize: 12 }}>
        <div style={{ fontWeight: 600, color: '#3548C8', marginBottom: 6 }}>Documents to Carry to Embassy:</div>
        {['Original Passport', 'Appointment Confirmation', 'Bank Statement (last 3 months)', 'Photographs (as specified)', 'All Supporting Documents'].map(d => (
          <div key={d} style={{ color: '#4A4A4A', marginBottom: 3 }}>✓ {d}</div>
        ))}
      </div>
    </>
  )
}

// ─── doc status badge ─────────────────────────────────────────────────────────

function DocStatus({ status }) {
  if (status === 'approved') return <span style={{ fontSize: 11, background: '#F0FFF4', color: '#276749', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>✓ Approved</span>
  if (status === 'rejected') return <span style={{ fontSize: 11, background: '#FFF0F0', color: '#FF4F4F', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>✗ Rejected</span>
  return <span style={{ fontSize: 11, background: '#FFF7ED', color: '#C2410C', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>⏳ Pending</span>
}

const MOCK_DOCS = [
  { id: 'd1', name: 'Passport Front',  status: 'approved', file: 'passport_front.jpg' },
  { id: 'd2', name: 'Passport Back',   status: 'rejected', file: 'passport_back.jpg', reason: 'Document unclear — please re-upload a clearer scan.' },
  { id: 'd3', name: 'Photograph',      status: 'approved', file: 'photo.jpg' },
  { id: 'd4', name: 'Bank Statement',  status: 'pending',  file: null },
  { id: 'd5', name: 'Flight Ticket',   status: 'approved', file: 'ticket.pdf' },
]

// ─── main component ───────────────────────────────────────────────────────────

export default function VisaStatus() {
  const navigate = useNavigate()
  const { appData } = useApp()
  const { selectedVisa, travellers, orderNumber, searchCriteria } = appData

  const [processType, setProcessType] = useState('evisa')
  const [reuploadDoc, setReuploadDoc] = useState(null)
  const [docs, setDocs] = useState(MOCK_DOCS)

  const order = orderNumber || 'PKO-2025-0001'
  const visa  = selectedVisa || { name: '30 Day Tourist eVisa', duration: '30 Days', entryType: 'Single Entry' }
  const dest  = searchCriteria?.destination || 'United States'

  const steps = TIMELINE_CONFIG[processType]
  const badge = PROCESS_BADGES[processType]
  const info  = PROCESS_INFO[processType]

  const handleReupload = (docId) => {
    setDocs(prev => prev.map(d => d.id === docId ? { ...d, status: 'pending', file: 'reuploaded.jpg', reason: null } : d))
    setReuploadDoc(null)
  }

  const stateLabelMap = { completed: null, active: 'In Progress', upcoming: null, action_required: 'Action Required', external: 'Embassy Controlled' }
  const stateLabelColor = { active: '#C2410C', action_required: '#B45309', external: '#3548C8' }
  const stateLabelBg = { active: '#FFF7ED', action_required: '#FEF3C7', external: '#EFF6FF' }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 16 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/corporate-travel')}>Corporate Travel</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/manage-applications')}>Applications</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ color: '#E83838', fontWeight: 500 }}>Application Status</span>
      </div>

      {/* ── PROTOTYPE SELECTOR ───────────────────────────────────────────── */}
      <div style={{ background: '#F7F7F7', border: '1px solid #EBEBEB', borderRadius: 12, padding: '10px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>Tracking Flow</span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {PROCESS_TABS.map(tab => {
            const isActive = processType === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setProcessType(tab.id)}
                style={{
                  padding: '7px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  background: isActive ? '#FFEAEA' : 'transparent',
                  color: isActive ? '#E83838' : '#4A4A4A',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 13,
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{order}</h1>
            <StatusBadge status="Under Review" size="lg" />
            <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: badge.bg, color: badge.color }}>
              {badge.label}
            </span>
          </div>
          <p style={{ fontSize: 15, color: '#8A8A8A', margin: 0 }}>{dest} · {visa.name}</p>
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

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Process info card */}
          {info && (
            <div style={{ background: '#FFF', border: '1px solid #EBEBEB', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#4A4A4A', lineHeight: 1.6 }}>
              ℹ️ {info}
            </div>
          )}

          {/* Timeline */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Application Timeline</div>
            {steps.map((step, i) => {
              const stateLabel = stateLabelMap[step.state]
              return (
                <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < steps.length - 1 ? 22 : 0 }}>
                  {/* Dot + connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StepDot state={step.state} index={i} />
                    {i < steps.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: step.state === 'completed' ? '#E83838' : '#EBEBEB', marginTop: 6 }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: i < steps.length - 1 ? 6 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: step.state === 'active' ? 700 : 600, fontSize: 15, color: step.state === 'active' ? '#E83838' : step.state === 'upcoming' ? '#8A8A8A' : '#1A1A1A' }}>
                        {step.label}
                      </span>
                      {stateLabel && (
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: stateLabelBg[step.state] || '#F3F4F6', color: stateLabelColor[step.state] || '#8A8A8A' }}>
                          {stateLabel}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: '#8A8A8A', marginTop: 2 }}>{step.date}</div>

                    {/* Special step cards */}
                    {step.pickup         && <PickupCard />}
                    {step.returnDetails  && <ReturnCard />}
                    {step.appointment    && <AppointmentCard />}
                    {step.external       && <EmbassyHandoverCard />}
                  </div>
                </div>
              )
            })}
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

        {/* ── RIGHT SIDEBAR ─────────────────────────────────────────────── */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'sticky', top: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Application Details</div>
            {[
              ['Order No.',   order],
              ['Destination', dest],
              ['Visa',        visa.name],
              ['Duration',    visa.duration],
              ['Entry',       visa.entryType],
              ['Travellers',  String(travellers?.length || 1)],
              ['Submitted',   '26 Jan 2025'],
              ['Status',      'Under Review'],
              ['Process',     badge.label],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}>
                <span style={{ color: '#8A8A8A' }}>{k}</span>
                <span style={{ fontWeight: 500, textAlign: 'right', maxWidth: 140 }}>{v}</span>
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
