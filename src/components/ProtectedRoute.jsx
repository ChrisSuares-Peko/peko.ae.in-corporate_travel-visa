import { Navigate } from 'react-router-dom'
import { useApp } from '../App.jsx'

export default function ProtectedRoute({ children, requires }) {
  const { appData } = useApp()

  const isValid = () => {
    const val = appData[requires]
    if (val === null || val === undefined) return false
    if (Array.isArray(val)) return val.length > 0
    if (typeof val === 'object') return Object.keys(val).length > 0
    return Boolean(val)
  }

  return isValid() ? children : <Navigate to="/corporate-travel" replace />
}
