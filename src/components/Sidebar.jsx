import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// ─── nav items matching reference image ───────────────────────────────────────

const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',            icon: '⊞',  path: '/corporate-travel' },
  { id: 'money',      label: 'Peko Money',            icon: '💳',  badge: 'New' },
  { id: 'bills',      label: 'Bill Payments',         icon: '📄' },
  { id: 'travel',     label: 'Corporate Travel',      icon: '🧳',  path: '/corporate-travel' },
  { id: 'payroll',    label: 'Payroll',               icon: '👥',  badge: 'New' },
  { id: 'supplies',   label: 'Office Supplies',       icon: '🛒' },
  { id: 'software',   label: 'Softwares',             icon: '💻' },
  { id: 'logistics',  label: 'Logistics',             icon: '🚚' },
  { id: 'gifts',      label: 'Gift Cards',            icon: '🎁' },
  { id: 'market',     label: 'Marketplace',           icon: '🏪',  badge: 'Free' },
  { id: 'tax',        label: 'Tax & More',            icon: '📊',  badge: 'New' },
  { id: 'accounting', label: 'Accounting',            icon: '📒' },
  { id: 'invoicing',  label: 'Invoicing',             icon: '🧾' },
  { id: 'insurance',  label: 'Insurance',             icon: '🛡️' },
  { id: 'cards',      label: 'Corporate Cards',       icon: '💳' },
  { id: 'hub',        label: 'Hub',                   icon: '🔗' },
  { id: 'whatsapp',   label: 'WhatsApp for Business', icon: '💬' },
  { id: 'cofounder',  label: 'Co Founder',            icon: '👤' },
  { id: 'more',       label: 'More Services',         icon: '⊞' },
]

const BADGE_COLORS = {
  New:  { background: '#EEF2FF', color: '#4F46E5' },
  Free: { background: '#F0FDF4', color: '#16A34A' },
}

// ─── single nav item ──────────────────────────────────────────────────────────

function NavItem({ item, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  const badge = item.badge ? BADGE_COLORS[item.badge] : null
  const clickable = !!item.path || false

  return (
    <div
      onClick={clickable ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        margin: '1px 8px',
        cursor: clickable ? 'pointer' : 'default',
        fontSize: 13,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? '#E83838' : hovered && clickable ? '#1A1A1A' : '#374151',
        background: isActive ? '#FFF0F0' : hovered && clickable ? '#F9FAFB' : 'transparent',
        borderRadius: 8,
        transition: 'all 0.13s',
        userSelect: 'none',
      }}
    >
      <span style={{
        fontSize: 15,
        flexShrink: 0,
        opacity: isActive ? 1 : 0.65,
        lineHeight: 1,
      }}>
        {item.icon}
      </span>
      <span style={{
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {item.label}
      </span>
      {badge && (
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          padding: '2px 6px',
          borderRadius: 4,
          flexShrink: 0,
          lineHeight: 1.5,
          ...badge,
        }}>
          {item.badge}
        </span>
      )}
    </div>
  )
}

// ─── sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar({ isMobile, isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isVisaPath = location.pathname.startsWith('/visa/')
  const isTravelActive = location.pathname === '/corporate-travel' || isVisaPath

  const getActiveId = () => {
    if (isTravelActive) return 'travel'
    if (location.pathname === '/manage-applications') return 'manage'
    return null
  }
  const activeId = getActiveId()

  const handleClick = (item) => {
    if (!item.path) return
    navigate(item.path)
    if (isMobile) onClose()
  }

  const sidebarStyle = {
    width: 220,
    minWidth: 220,
    background: '#FFFFFF',
    borderRight: '1px solid #F0F0F0',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    ...(isMobile ? {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 101,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.25s ease',
      boxShadow: isOpen ? '4px 0 24px rgba(0,0,0,0.12)' : 'none',
    } : {}),
  }

  return (
    <div style={sidebarStyle}>

      {/* ── LOGO ─────────────────────────────────────────────────────────── */}
      <div style={{
        padding: '0 18px',
        height: 58,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: '#1A1A1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: 14,
          letterSpacing: -0.5,
          flexShrink: 0,
        }}>
          P
        </div>
        <span style={{
          fontWeight: 700,
          fontSize: 17,
          color: '#1A1A1A',
          letterSpacing: -0.3,
        }}>
          Peko
        </span>
      </div>

      {/* ── NAV ITEMS ────────────────────────────────────────────────────── */}
      <nav style={{
        flex: 1,
        overflowY: 'auto',
        paddingTop: 8,
        paddingBottom: 8,
        scrollbarWidth: 'none',
      }}>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            onClick={() => handleClick(item)}
          />
        ))}
      </nav>

      {/* ── USER FOOTER ──────────────────────────────────────────────────── */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #F3F4F6',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: '#FFF0F0',
          color: '#E83838',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 11,
          flexShrink: 0,
        }}>
          AC
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#1A1A1A',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            Acme Corp
          </div>
          <div style={{ fontSize: 11, color: '#8A8A8A' }}>Admin</div>
        </div>
      </div>
    </div>
  )
}
