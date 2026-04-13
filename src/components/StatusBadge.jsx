const STATUS_MAP = {
  'Approved': { bg: '#F0FFF4', color: '#276749' },
  'Active': { bg: '#F0FFF4', color: '#276749' },
  'Paid': { bg: '#F0FFF4', color: '#276749' },
  'Completed': { bg: '#F0FFF4', color: '#276749' },
  'Under Review': { bg: '#F0F4FF', color: '#3548C8' },
  'Processing': { bg: '#F5F3FF', color: '#4527A0' },
  'Pending Documents': { bg: '#FFF7ED', color: '#C2410C' },
  'Pending': { bg: '#FFF7ED', color: '#C2410C' },
  'Rejected': { bg: '#FFF0F0', color: '#FF4F4F' },
  'Failed': { bg: '#FFF0F0', color: '#FF4F4F' },
  'Submitted': { bg: '#FFF7ED', color: '#C2410C' },
  'Inactive': { bg: '#F3F4F6', color: '#6B7280' },
}

export default function StatusBadge({ status, size = 'sm' }) {
  const c = STATUS_MAP[status] || { bg: '#F3F4F6', color: '#6B7280' }
  return (
    <span style={{
      display: 'inline-block',
      padding: size === 'lg' ? '4px 12px' : '3px 10px',
      borderRadius: 20,
      fontSize: size === 'lg' ? 13 : 11,
      fontWeight: 600,
      background: c.bg,
      color: c.color,
      whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  )
}
