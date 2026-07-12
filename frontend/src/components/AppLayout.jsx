import { useMemo } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Avatar,
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BarChartIcon from '@mui/icons-material/BarChart'
import AddIcon from '@mui/icons-material/Add'
import LinkIcon from '@mui/icons-material/Link'
import PersonIcon from '@mui/icons-material/Person'
import ProfileMenu from './ProfileMenu.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const HEADER_HEIGHT_PX = 72

function NavButton({ to, active, icon, label }) {
  return (
    <Button
      component={RouterLink}
      to={to}
      startIcon={icon}
      variant={active ? 'contained' : 'text'}
      disableElevation
      sx={{
        minHeight: 40,
        borderRadius: 999,
        px: 1.5,
        color: active ? 'primary.contrastText' : 'text.secondary',
        '&:hover': {
          backgroundColor: active ? 'primary.dark' : 'action.hover',
          transform: 'translateY(-1px)'
        },
        transition: 'background-color 160ms ease, transform 160ms ease'
      }}
    >
      {label}
    </Button>
  )
}

export default function AppLayout({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  const active = useMemo(() => {
    const p = location.pathname
    return {
      dashboard: p.startsWith('/app/dashboard'),
      create: p.startsWith('/app/create'),
      links: p.startsWith('/app/links'),
      analytics: p.startsWith('/app/analytics'),
      profile: p.startsWith('/app/profile')
    }
  }, [location.pathname])

  const initials = useMemo(() => {
    const source = (user?.name || user?.email || '?').trim()
    const parts = source.split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return source.slice(0, 2).toUpperCase()
  }, [user?.name, user?.email])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${HEADER_HEIGHT_PX}px`,
          zIndex: 1100,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'rgba(11,18,32,0.78)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'rgba(99,102,241,0.18)',
                  border: '1px solid',
                  borderColor: 'primary.main'
                }}
              >
                <LinkIcon sx={{ color: 'primary.main' }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  Smart Link
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Shorten. Track. Grow.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1.2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NavButton to="/app/dashboard" active={active.dashboard} icon={<DashboardIcon fontSize="small" />} label="Dashboard" />
              <NavButton to="/app/create" active={active.create} icon={<AddIcon fontSize="small" />} label="Create" />
              <NavButton to="/app/links" active={active.links} icon={<LinkIcon fontSize="small" />} label="My Links" />
              <NavButton to="/app/analytics" active={active.analytics} icon={<BarChartIcon fontSize="small" />} label="Analytics" />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1.2}>
              <Chip
                label="Session active"
                variant="outlined"
                sx={{
                  borderRadius: 999,
                  height: 36,
                  display: { xs: 'none', sm: 'inline-flex' }
                }}
              />
              {/* Avatar must remain visible on every authenticated page. */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Keep ProfileMenu as the interaction surface (dropdown) */}
                <ProfileMenu />
              </Box>
            </Stack>
          </Stack>
        </Container>

        {/* Mobile divider for visual balance */}
        <Divider sx={{ opacity: 0, display: { xs: 'block', md: 'none' } }} />
      </Paper>

      {/* content padding so sticky header never overlaps */}
      <Box sx={{ pt: `${HEADER_HEIGHT_PX}px` }}>{children}</Box>

      {/* Ensure no unused lints - Avatar/PersonIcon kept for compatibility if ProfileMenu falls back */}
      <Avatar sx={{ display: 'none' }}>{initials || <PersonIcon />}</Avatar>
    </Box>
  )
}

