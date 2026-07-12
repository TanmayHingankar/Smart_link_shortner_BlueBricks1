import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Chip,
  Container,
  Link,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BoltIcon from '@mui/icons-material/Bolt'
import BarChartIcon from '@mui/icons-material/BarChart'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ProfileMenu from '../components/ProfileMenu.jsx'
import { linkApi } from '../api/linkApi'
import { env } from '../config/env'

const shortUrlFor = (link) => `${env.apiBaseUrl}/${link.customAlias || link.shortCode}`

const EMPTY_STATS = { totalLinks: 0, activeLinks: 0, totalClicks: 0, todaysClicks: 0 }

function StatCard({ label, value, icon, loading }) {
  return (
    <Paper sx={{ p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {loading ? '—' : value.toLocaleString()}
          </Typography>
        </Box>
        <Paper variant="outlined" sx={{ width: 40, height: 40, display: 'grid', placeItems: 'center', bgcolor: 'action.hover' }}>
          {icon}
        </Paper>
      </Stack>
    </Paper>
  )
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState([])
  const [stats, setStats] = useState(EMPTY_STATS)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const [statsRes, listRes] = await Promise.all([linkApi.stats(), linkApi.list()])
        if (cancelled) return
        setStats(statsRes?.data?.data ?? EMPTY_STATS)
        setLinks(listRes?.data?.data ?? [])
      } catch {
        if (!cancelled) {
          setLinks([])
          setStats(EMPTY_STATS)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const latest = links.slice(0, 5)

  const cards = [
    { label: 'Total Links', value: stats.totalLinks, icon: <LinkIcon color="primary" /> },
    { label: 'Total Clicks', value: stats.totalClicks, icon: <TrendingUpIcon color="primary" /> },
    { label: "Today's Clicks", value: stats.todaysClicks, icon: <BoltIcon color="primary" /> },
    { label: 'Active Links', value: stats.activeLinks, icon: <BarChartIcon color="primary" /> }
  ]

  const quickActions = [
    { t: 'Create Link', d: 'Shorten a URL', to: '/app/create' },
    { t: 'My Links', d: 'Search & manage', to: '/app/links' }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h4">Dashboard</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Premium overview of your link performance.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Chip label="Session active" variant="outlined" />
            <ProfileMenu />
          </Stack>
        </Stack>

        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }
          }}
        >
          {cards.map((c) => (
            <StatCard key={c.label} {...c} loading={loading} />
          ))}
        </Box>

        <Box
          sx={{
            mt: 2,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }
          }}
        >
          <Paper sx={{ p: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Latest Links
                </Typography>
                <Typography fontWeight={600} sx={{ mt: 0.5 }}>
                  {loading ? 'Loading…' : latest.length ? 'Most recent' : 'No recent data yet'}
                </Typography>
              </Box>
              <Link component={RouterLink} to="/app/links" underline="hover" variant="body2">
                View all
              </Link>
            </Stack>

            <Stack spacing={1} sx={{ mt: 2 }}>
              {loading ? (
                <Box sx={{ height: 128, borderRadius: 2, bgcolor: 'action.hover' }} />
              ) : latest.length === 0 ? (
                <Paper
                  variant="outlined"
                  sx={{ height: 128, display: 'grid', placeItems: 'center', borderStyle: 'dashed' }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Create your first link to get started.
                    </Typography>
                    <Link component={RouterLink} to="/app/create" underline="hover" variant="body2" sx={{ mt: 1, display: 'inline-block' }}>
                      Create link
                    </Link>
                  </Box>
                </Paper>
              ) : (
                latest.map((link) => (
                  <Paper
                    key={link._id}
                    variant="outlined"
                    sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, bgcolor: 'action.hover' }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Link
                        href={shortUrlFor(link)}
                        target="_blank"
                        rel="noreferrer"
                        underline="hover"
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}
                      >
                        /{link.customAlias || link.shortCode}
                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                      </Link>
                      <Typography variant="caption" color="text.secondary" noWrap component="div" title={link.longUrl}>
                        {link.longUrl}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                      {link.createdAt ? new Date(link.createdAt).toLocaleDateString() : ''}
                    </Typography>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>

          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary">
              Quick Actions
            </Typography>
            <Typography fontWeight={600} sx={{ mt: 0.5 }}>
              Create & manage
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {quickActions.map((x) => (
                <Paper
                  key={x.t}
                  component={RouterLink}
                  to={x.to}
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    bgcolor: 'action.hover',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: 'primary.main' }
                  }}
                >
                  <Typography fontWeight={600}>{x.t}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {x.d}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}
