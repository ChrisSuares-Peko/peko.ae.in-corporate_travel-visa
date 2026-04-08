import React from 'react'

const STEPS = ['Select Visa', 'Traveller Details', 'Documents', 'Review & Pay', 'Tracking']

export default function Stepper({ currentStep }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
      {STEPS.map((label, i) => {
        const step = i + 1
        const done = step < currentStep
        const active = step === currentStep
        return (
          <React.Fragment key={step}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 70 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, flexShrink: 0,
                background: done ? '#E83838' : (active ? '#FFF0F0' : '#F3F4F6'),
                color: done ? '#FFFFFF' : (active ? '#E83838' : '#8A8A8A'),
                border: active ? '2px solid #E83838' : (done ? 'none' : '2px solid #EBEBEB'),
              }}>
                {done ? '✓' : step}
              </div>
              <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? '#E83838' : '#8A8A8A', whiteSpace: 'nowrap', textAlign: 'center' }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ height: 2, flex: 1, background: done ? '#E83838' : '#EBEBEB', marginTop: 15, minWidth: 20 }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
