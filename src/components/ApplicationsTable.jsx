import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_APPLICATIONS } from '../data/constants.js'
import StatusBadge from './StatusBadge.jsx'

export default function ApplicationsTable({ limit = null }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const statuses = ['All', 'Approved', 'Under Review', 'Processing', 'Pending Documents', 'Rejected']

  const filtered = MOCK_APPLICATIONS
    .filter(a => {
      const q = search.toLowerCase()
      return a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q) || a.destination.toLowerCase().includes(q)
    })
    .filter(a => statusFilter === 'All' || a.status === statusFilter)
    .slice(0, limit || undefined)

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          placeholder="Search by name, ID or destination..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 200px', border: '1px solid #EBEBEB', borderRadius: 10, padding: '9px 14px', fontSize: 14, outline: 'none', background: '#fff' }}
          onFocus={e => e.target.style.borderColor = '#E83838'}
          onBlur={e => e.target.style.borderColor = '#EBEBEB'}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ border: '1px solid #EBEBEB', borderRadius: 8, padding: '9px 10px', fontSize: 14, background: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}
        >
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 12, overflowX: 'auto', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <tr style={{ background: '#F7F7F7' }}>
              {['Employee', 'Travel Date', 'Destination', 'Visa Type', 'Format', 'Status', ''].map(h => (
                <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontWeight: 600, color: '#8A8A8A', borderBottom: '1px solid #EBEBEB', whiteSpace: 'nowrap', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
                  <div style={{ color: '#8A8A8A', fontSize: 14 }}>No applications match your search — try a different name or ID.</div>
                </td>
              </tr>
            ) : filtered.map((a, i) => (
              <tr key={a.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F7F7F7', borderBottom: '1px solid #EBEBEB' }}>
                <td style={{ padding: '13px 14px' }}>
                  <div style={{ fontWeight: 500 }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: '#8A8A8A' }}>{a.email}</div>
                </td>
                <td style={{ padding: '13px 14px', color: '#4A4A4A' }}>{a.travelDate}</td>
                <td style={{ padding: '13px 14px', fontWeight: 500 }}>{a.destination}</td>
                <td style={{ padding: '13px 14px', color: '#4A4A4A' }}>{a.type}</td>
                <td style={{ padding: '13px 14px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: a.format === 'eVisa' ? '#F0F4FF' : '#F5F3FF', color: a.format === 'eVisa' ? '#3548C8' : '#4527A0' }}>{a.format}</span>
                </td>
                <td style={{ padding: '13px 14px' }}><StatusBadge status={a.status} /></td>
                <td style={{ padding: '13px 14px' }}>
                  <button
                    onClick={() => navigate(a.format === 'eVisa' ? '/visa/status' : '/visa/status-stamp')}
                    style={{ border: '1.5px solid #EBEBEB', borderRadius: 8, background: '#fff', color: '#1A1A1A', fontWeight: 500, cursor: 'pointer', padding: '6px 14px', fontSize: 13 }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#E83838'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#EBEBEB'}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
