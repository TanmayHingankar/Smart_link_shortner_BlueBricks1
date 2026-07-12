import { Link as RouterLink } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const initialsFor = (name, email) => {
  const source = (name || email || '?').trim()
  const parts = source.split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return source.slice(0, 2).toUpperCase()
}

function Field({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ mt: 0.25 }}>{value || '—'}</Typography>
    </Box>
  )
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Signed out')
      navigate('/login', { replace: true })
    } catch {
      toast.error('Could not sign out')
    }
  }

  const fmt = (d) => (d ? new Date(d).toLocaleString() : '—')

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h4">Profile</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Account details & settings.
            </Typography>
          </Box>
          <Button component={RouterLink} to="/app/dashboard" variant="outlined" color="inherit" startIcon={<DashboardIcon />}>
            Go to Dashboard
          </Button>
        </Stack>

        <Paper sx={{ mt: 3, p: { xs: 2.5, sm: 3 } }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}>
              {user ? initialsFor(user.name, user.email) : '?'}
            </Avatar>
            <Box>
              <Typography variant="h6">{user?.name || 'Account'}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
            <Field label="Name" value={user?.name} />
            <Field label="Email" value={user?.email} />
            <Field label="Member since" value={fmt(user?.createdAt)} />
            <Field label="Last updated" value={fmt(user?.updatedAt)} />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Button onClick={handleLogout} variant="outlined" color="error" startIcon={<LogoutIcon />}>
            Log out
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}
