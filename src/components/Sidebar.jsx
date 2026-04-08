import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function NavSection({ label, children }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ padding: '10px 20px 4px', fontSize: 11, color: '#8A8A8A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
      {children}
    </div>
  )
}

function NavItem({ icon, label, active, disabled, onClick, badge }) {
  const [hovered, setHovered] = useState(false)

  if (disabled) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 20px', color: '#C8C8C8', cursor: 'not-allowed', fontSize: 14, borderLeft: '3px solid transparent' }}>
        <span style={{ fontSize: 16, opacity: 0.5 }}>{icon}</span>
        <span style={{ flex: 1 }}>{label}</span>
        <span style={{ fontSize: 10, background: '#F3F4F6', color: '#8A8A8A', borderRadius: 4, padding: '1px 6px', fontWeight: 500 }}>Soon</span>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 20px', cursor: 'pointer', fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? '#E83838' : (hovered ? '#1A1A1A' : '#4A4A4A'),
        background: active ? '#FFF0F0' : (hovered ? '#F7F7F7' : 'transparent'),
        borderLeft: active ? '3px solid #E83838' : '3px solid transparent',
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span style={{ fontSize: 10, background: 'linear-gradient(135deg,#FF6B6B,#C62828)', color: '#fff', borderRadius: 20, padding: '2px 7px', fontWeight: 600 }}>{badge}</span>
      )}
    </div>
  )
}

export default function Sidebar({ isMobile, isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()

  const go = (path) => {
    navigate(path)
    if (isMobile) onClose()
  }

  const isActive = (path) => location.pathname === path

  const style = {
    width: 210,
    minWidth: 210,
    background: '#FFFFFF',
    borderRight: '1px solid #EBEBEB',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    overflow: 'hidden',
    ...(isMobile ? {
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      zIndex: 101,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.25s ease',
      boxShadow: isOpen ? '4px 0 24px rgba(0,0,0,0.12)' : 'none',
    } : {}),
  }

  return (
    <div style={style}>
      {/* Logo */}
      <div style={{ padding: '0 20px', height: 58, display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #EBEBEB', flexShrink: 0 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13 }}>P</div>
        <span style={{ fontWeight: 800, fontSize: 18, color: '#1A1A1A', letterSpacing: -0.3 }}>Peko</span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, paddingTop: 12, overflowY: 'auto' }}>
        <NavSection label="Main">
          <NavItem icon="⊞" label="Dashboard" active={isActive('/corporate-travel')} onClick={() => go('/corporate-travel')} />
        </NavSection>
        <NavSection label="Services">
          <NavItem icon="🛂" label="Visas" active={isActive('/corporate-travel') && location.search !== ''} onClick={() => go('/corporate-travel')} badge="Active" />
          <NavItem icon="🏨" label="Hotels" disabled />
          <NavItem icon="✈️" label="Air Travel" disabled />
        </NavSection>
        <NavSection label="Manage">
          <NavItem icon="📋" label="Applications" active={isActive('/manage-applications')} onClick={() => go('/manage-applications')} />
          <NavItem icon="💳" label="Payments" disabled />
          <NavItem icon="📊" label="Reports" disabled />
        </NavSection>
        <NavSection label="Settings">
          <NavItem icon="🏢" label="Company" disabled />
          <NavItem icon="👥" label="Team" disabled />
        </NavSection>
      </nav>

      {/* User footer */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid #EBEBEB', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FFF0F0', color: '#E83838', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>AC</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Acme Corp</div>
            <div style={{ fontSize: 11, color: '#8A8A8A' }}>Admin</div>
          </div>
        </div>
      </div>
    </div>
  )
}
