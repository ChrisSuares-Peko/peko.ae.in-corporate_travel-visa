import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { VISA_OPTIONS, EMPLOYEES } from '../data/constants.js'

const PROTO_GROUPS = [
  {
    group: 'Main',
    links: [
      { label: '🏠 Corporate Travel', path: '/corporate-travel' },
      { label: '🗂 Manage Applications', path: '/manage-applications' },
    ],
  },
  {
    group: 'Visa Flow',
    links: [
      { label: '🛂 Select Visa', path: '/visa/options', mock: true },
      { label: '👤 Traveller Details', path: '/visa/travellers', mock: true },
      { label: '📎 Upload Documents', path: '/visa/documents', mock: true },
      { label: '💳 Review & Pay', path: '/visa/payment', mock: true },
      { label: '✅ Booking Confirmed', path: '/visa/thank-you', mock: true },
    ],
  },
  {
    group: 'Application Status',
    links: [
      { label: '📊 eVisa Status', path: '/visa/status' },

      { label: '🎉 Visa Approved', path: '/visa/approved', mock: true },
    ],
  },
]

export default function PrototypePanel() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { updateApp } = useApp()

  const seedMockData = () => {
    updateApp({
      searchCriteria: {
        destination: 'United States',
        travelDate: '2025-06-15',
        visaType: 'Tourist',
        nationality: 'India',
        countryOfResidence: 'India',
      },
      selectedVisa: VISA_OPTIONS[0],
      travellersCount: { adults: 2, children: 0, infants: 0 },
      travellers: [
        { firstName: EMPLOYEES[0].firstName, lastName: EMPLOYEES[0].lastName, dob: EMPLOYEES[0].dob, passport: EMPLOYEES[0].passport },
        { firstName: EMPLOYEES[1].firstName, lastName: EMPLOYEES[1].lastName, dob: EMPLOYEES[1].dob, passport: EMPLOYEES[1].passport },
      ],
      documents: {
        0: { 'Passport Front': 'passport_front.jpg', 'Passport Back': 'passport_back.jpg', 'Photograph': 'photo.jpg' },
        1: { 'Passport Front': 'passport_front.jpg', 'Passport Back': 'passport_back.jpg', 'Photograph': 'photo.jpg' },
      },
    })
  }

  const handleNav = (link) => {
    if (link.mock) seedMockData()
    navigate(link.path)
  }

  return (
    <>
      {/* Toggle button — floats on the right edge, vertically centered */}
      <button
        onClick={() => setIsOpen(o => !o)}
        title={isOpen ? 'Close prototype nav' : 'Prototype navigation'}
        style={{
          position: 'fixed',
          right: isOpen ? 284 : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 201,
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          borderRight: isOpen ? '1px solid #EBEBEB' : 'none',
          borderRadius: isOpen ? '8px 0 0 8px' : '8px 0 0 8px',
          width: 28,
          height: 52,
          cursor: 'pointer',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.08)',
          transition: 'right 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          color: '#8A8A8A',
          writingMode: 'horizontal-tb',
          padding: 0,
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Three line hamburger */}
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 12, height: 1.5, background: isOpen ? '#E83838' : '#8A8A8A', borderRadius: 2, transition: 'all 0.2s' }} />
        ))}
      </button>

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100vh',
          width: 284,
          background: '#FFFFFF',
          borderLeft: '1px solid #EBEBEB',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.07)',
          zIndex: 200,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Panel header */}
        <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #EBEBEB', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A' }}>Prototype Pages</div>
              <div style={{ fontSize: 11, color: '#8A8A8A', marginTop: 2 }}>Click to jump between screens</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 0 3px #E8F5E9' }} title="Prototype active" />
          </div>
        </div>

        {/* Navigation links */}
        <div style={{ flex: 1, paddingTop: 8, paddingBottom: 8, overflowY: 'auto' }}>
          {PROTO_GROUPS.map(group => (
            <div key={group.group} style={{ marginBottom: 4 }}>
              <div style={{ padding: '8px 20px 4px', fontSize: 10, fontWeight: 700, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: 0.6 }}>
                {group.group}
              </div>
              {group.links.map(link => {
                const isActive = location.pathname === link.path
                return (
                  <div
                    key={link.path}
                    onClick={() => handleNav(link)}
                    style={{
                      padding: '9px 20px',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#E83838' : '#1A1A1A',
                      background: isActive ? '#FFF0F0' : 'transparent',
                      borderLeft: `3px solid ${isActive ? '#E83838' : 'transparent'}`,
                      transition: 'all 0.13s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F7F7F7' }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span style={{ flex: 1 }}>{link.label}</span>
                    {link.mock && (
                      <span style={{ fontSize: 9, color: '#8A8A8A', background: '#F3F4F6', padding: '2px 6px', borderRadius: 4, fontWeight: 500, flexShrink: 0 }}>
                        seeds data
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Panel footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #EBEBEB', flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: '#BBBBBB', textAlign: 'center' }}>
            Peko Corporate Travel · Prototype v1.0
          </div>
        </div>
      </div>
    </>
  )
}
