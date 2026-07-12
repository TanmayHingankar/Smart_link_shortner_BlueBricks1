import { Navigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader.jsx'

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'grid', placeItems: 'center' }}>
        <Loader label="Checking session…" />
      </Box>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

