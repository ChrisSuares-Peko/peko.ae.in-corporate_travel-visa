import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import Stepper from '../components/Stepper.jsx'
import Footer from '../components/Footer.jsx'

const DOC_TYPES = ['Passport Front', 'Passport Back', 'Photograph']

function UploadZone({ docType, file, onUpload }) {
  const inputRef = useRef()
  const [hover, setHover] = useState(false)

  return (
    <div
      onClick={() => inputRef.current.click()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: file ? '2px solid #276749' : `2px dashed ${hover ? '#E83838' : '#EBEBEB'}`,
        borderRadius: 12,
        padding: '22px 16px',
        textAlign: 'center',
        cursor: 'pointer',
        background: file ? '#F0FFF4' : (hover ? '#FFF5F5' : '#FAFAFA'),
        transition: 'all 0.15s',
      }}
    >
      <input ref={inputRef} type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={e => e.target.files[0] && onUpload(e.target.files[0].name)} />
      <div style={{ fontSize: 28, marginBottom: 8 }}>{file ? '✅' : '📎'}</div>
      <div style={{ fontWeight: 600, fontSize: 14, color: file ? '#276749' : '#1A1A1A', marginBottom: 4 }}>{docType}</div>
      {file
        ? <div style={{ fontSize: 12, color: '#276749' }}>{file}</div>
        : <div style={{ fontSize: 12, color: '#8A8A8A' }}>Click to upload · JPG, PNG, PDF</div>
      }
    </div>
  )
}

export default function DocumentUpload() {
  const navigate = useNavigate()
  const { appData, updateApp } = useApp()
  const { travellers } = appData

  const [selectedIdx, setSelectedIdx] = useState(0)
  const [docs, setDocs] = useState(() => {
    const init = {}
    travellers.forEach((_, i) => { init[i] = {} })
    return init
  })
  const [hubProgress, setHubProgress] = useState(null)
  const [hubDone, setHubDone] = useState(false)

  const uploadDoc = (travIdx, docType, filename) => {
    setDocs(prev => ({ ...prev, [travIdx]: { ...prev[travIdx], [docType]: filename } }))
  }

  const isComplete = (idx) => DOC_TYPES.every(d => docs[idx]?.[d])
  const allComplete = travellers.every((_, i) => isComplete(i))

  const simulateHub = () => {
    setHubProgress(0)
    setHubDone(false)
    const interval = setInterval(() => {
      setHubProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setHubDone(true)
          // Auto-fill all docs for current traveller
          const fakeDocs = {}
          DOC_TYPES.forEach(d => { fakeDocs[d] = `hub_${d.toLowerCase().replace(' ', '_')}.jpg` })
          setDocs(prev => ({ ...prev, [selectedIdx]: fakeDocs }))
          return 100
        }
        return p + 4
      })
    }, 60)
  }

  const handleProceed = () => {
    updateApp({ documents: docs })
    navigate('/visa/payment')
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 16 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/corporate-travel')}>Corporate Travel</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/visa/travellers')}>Traveller Details</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ color: '#E83838', fontWeight: 500 }}>Upload Documents</span>
      </div>

      <Stepper currentStep={3} />

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Left: traveller list */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #EBEBEB', fontWeight: 600, fontSize: 14 }}>Travellers</div>
            {travellers.map((t, i) => {
              const done = isComplete(i)
              const active = selectedIdx === i
              return (
                <div
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  style={{
                    padding: '12px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #EBEBEB',
                    background: active ? '#FFF0F0' : '#fff',
                    borderLeft: active ? '3px solid #E83838' : '3px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: active ? '#FFF0F0' : '#F3F4F6', color: active ? '#E83838' : '#8A8A8A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>
                    {t.firstName?.[0] || (i + 1)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.firstName} {t.lastName}</div>
                    <div style={{ fontSize: 11, color: done ? '#276749' : '#C2410C' }}>
                      {done ? '✓ All uploaded' : `${Object.keys(docs[i] || {}).length}/${DOC_TYPES.length} docs`}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: upload area */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {travellers[selectedIdx]?.firstName} {travellers[selectedIdx]?.lastName}
              </div>
              <button
                onClick={simulateHub}
                disabled={hubProgress !== null && !hubDone}
                style={{
                  border: 'none', borderRadius: 10,
                  background: (hubProgress !== null && !hubDone) ? '#E8E8E8' : 'linear-gradient(135deg,#9B59B6,#4527A0)',
                  color: (hubProgress !== null && !hubDone) ? '#8A8A8A' : '#fff',
                  fontWeight: 600, cursor: (hubProgress !== null && !hubDone) ? 'not-allowed' : 'pointer',
                  padding: '9px 16px', fontSize: 13,
                  boxShadow: (hubProgress !== null && !hubDone) ? 'none' : '0 2px 8px rgba(69,39,160,0.25)',
                }}
              >
                ⚡ Upload from Hub
              </button>
            </div>

            {hubProgress !== null && !hubDone && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#8A8A8A', marginBottom: 6 }}>
                  <span>Fetching from Peko Hub...</span>
                  <span>{hubProgress}%</span>
                </div>
                <div style={{ background: '#F0F0F0', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(135deg,#9B59B6,#4527A0)', width: `${hubProgress}%`, transition: 'width 0.05s linear' }} />
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
              {DOC_TYPES.map(docType => (
                <UploadZone
                  key={docType}
                  docType={docType}
                  file={docs[selectedIdx]?.[docType]}
                  onUpload={(filename) => uploadDoc(selectedIdx, docType, filename)}
                />
              ))}
            </div>
          </div>

          {/* Progress summary */}
          <div style={{ background: '#F7F7F7', border: '1px solid #EBEBEB', borderRadius: 10, padding: '12px 18px', fontSize: 13, color: '#4A4A4A' }}>
            📊 {travellers.filter((_, i) => isComplete(i)).length} of {travellers.length} traveller{travellers.length !== 1 ? 's' : ''} complete
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 28 }}>
        <button onClick={() => navigate('/visa/travellers')} style={{ border: '1.5px solid #EBEBEB', borderRadius: 10, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '10px 22px', fontSize: 15 }}>Back</button>
        <button
          onClick={handleProceed}
          disabled={!allComplete}
          style={{ border: 'none', borderRadius: 10, background: allComplete ? 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)' : '#E8E8E8', color: allComplete ? '#fff' : '#8A8A8A', fontWeight: 600, cursor: allComplete ? 'pointer' : 'not-allowed', boxShadow: allComplete ? '0 2px 8px rgba(200,40,40,0.25)' : 'none', padding: '10px 28px', fontSize: 15 }}
          onMouseEnter={e => allComplete && (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Proceed to Payment →
        </button>
      </div>
      <Footer />
    </div>
  )
}
