import React from 'react'

export default function Footer() {
  return (
    <div style={{
      marginTop: 48,
      borderTop: '1px solid #EBEBEB',
      paddingTop: 20,
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      fontSize: 13,
      color: '#8A8A8A',
      gap: 8,
    }}>
      <span>© 2024-2026 Peko Payment Services LLC. All Rights Reserved.</span>
      <span style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {['Peko Platform Agreement', 'Privacy Policy', 'Refund Policy', 'Cookie Policy'].map(l => (
          <span key={l} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{l}</span>
        ))}
      </span>
    </div>
  )
}
