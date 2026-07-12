import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const initialsFor = (name, email) => {
  const source = (name || email || '?').trim()
  const parts = source.split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return source.slice(0, 2).toUpperCase()
}

export default function ProfileMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const open = Boolean(anchorEl)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      toast.success('Signed out')
      navigate('/login', { replace: true })
    } catch {
      toast.error('Could not sign out')
    } finally {
      setLoggingOut(false)
      setAnchorEl(null)
    }
  }

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        aria-label="Open profile menu"
        sx={{ p: 0.5 }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'rgba(99,102,241,0.18)',
            color: 'primary.main',
            border: '1px solid',
            borderColor: 'primary.main',
            fontSize: 14,
            fontWeight: 700
          }}
        >
          {user ? initialsFor(user.name, user.email) : <PersonIcon fontSize="small" />}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { mt: 1, width: 240, overflow: 'hidden' } } }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name || 'Account'}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap component="div">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            navigate('/app/profile')
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} disabled={loggingOut} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          {loggingOut ? 'Signing out…' : 'Log out'}
        </MenuItem>
      </Menu>
    </>
  )
}
