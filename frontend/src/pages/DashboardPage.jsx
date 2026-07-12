import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Link, Paper, Stack, Typography } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BoltIcon from '@mui/icons-material/Bolt'
import BarChartIcon from '@mui/icons-material/BarChart'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import AddIcon from '@mui/icons-material/Add'
import { linkApi } from '../api/linkApi'
import { env } from '../config/env'

const shortUrlFor = (link) => `${env.apiBaseUrl}/${link.customAlias || link.shortCode}`

const EMPTY_STATS = { totalLinks: 0, activeLinks: 0, totalClicks: 0, todaysClicks: 0 }


function PremiumStatCard({ label, value, icon, loading }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(180deg, rgba(99,102,241,0.10), rgba(17,24,39,0.35))',
        height: 120,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 800, letterSpacing: '-0.02em' }}>
            {loading ? '—' : value.toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'rgba(99,102,241,0.16)',
            border: '1px solid',
            borderColor: 'primary.main',
            color: 'primary.main'
          }}
        >
          {icon}
        </Box>
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
    <Box sx={{ bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 720 }}>
            Premium overview of your link performance.
          </Typography>
        </Box>


        <Box sx={{ mt: 3, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' } }}>
          {cards.map((c) => (
            <PremiumStatCard key={c.label} {...c} loading={loading} />
          ))}
        </Box>

        <Box sx={{ mt: 2, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' } }}>
          <Paper sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                  Latest Links
                </Typography>
                <Typography fontWeight={700} sx={{ mt: 0.5 }}>
                  {loading ? 'Loading…' : latest.length ? 'Most recent' : 'No recent data yet'}
                </Typography>
              </Box>
              <Link component={RouterLink} to="/app/links" underline="hover" variant="body2" sx={{ fontWeight: 700 }}>
                View all
              </Link>
            </Stack>

            <Stack spacing={1.2} sx={{ mt: 2 }}>
              {loading ? (
                <Box sx={{ height: 148, borderRadius: 2.5, bgcolor: 'action.hover' }} />
              ) : latest.length === 0 ? (
                <Paper variant="outlined" sx={{ height: 148, display: 'grid', placeItems: 'center', borderStyle: 'dashed', borderRadius: 3, bgcolor: 'action.hover' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Create your first link to get started.
                    </Typography>
                    <Link component={RouterLink} to="/app/create" underline="hover" variant="body2" sx={{ mt: 1, display: 'inline-block', fontWeight: 700 }}>
                      Create link
                    </Link>
                  </Box>
                </Paper>
              ) : (
                latest.map((link) => (
                  <Paper
                    key={link._id}
                    variant="outlined"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        window.open(shortUrlFor(link), '_blank', 'noreferrer')
                      }
                    }}
                    component="div"
                    sx={{
                      p: 1.4,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      borderColor: 'divider',
                      bgcolor: 'rgba(255,255,255,0.02)',
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'transform 160ms ease, background-color 160ms ease, border-color 160ms ease',
                      '&:hover': { transform: 'translateY(-2px)', bgcolor: 'action.hover', borderColor: 'primary.main' }
                    }}
                    onClick={() => window.open(shortUrlFor(link), '_blank', 'noreferrer')}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 800 }}>
                            /{link.customAlias || link.shortCode}
                          </Typography>
                        </Box>
                        <OpenInNewIcon sx={{ fontSize: 14, color: 'primary.main' }} />
                      </Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        component="div"
                        title={link.longUrl}
                        sx={{ mt: 0.3, maxWidth: { xs: 220, sm: 320, md: 420 } }}
                      >
                        {link.longUrl}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0, fontWeight: 700 }}>
                      {link.createdAt ? new Date(link.createdAt).toLocaleDateString() : ''}
                    </Typography>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>

          <Paper sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
              Quick Actions
            </Typography>
            <Typography fontWeight={700} sx={{ mt: 0.5 }}>
              Create & manage
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {quickActions.map((x, idx) => (
                <Paper
                  key={x.t}
                  component={RouterLink}
                  to={x.to}
                  variant="outlined"
                  sx={{
                    p: 1.6,
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    bgcolor: 'rgba(255,255,255,0.02)',
                    borderColor: 'divider',
                    borderRadius: 3,
                    transition: 'transform 160ms ease, background-color 160ms ease, border-color 160ms ease',
                    '&:hover': { transform: 'translateY(-2px)', bgcolor: 'action.hover', borderColor: 'primary.main' },
                    cursor: 'pointer'
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.2}>
                    <Typography fontWeight={900} sx={{ fontSize: 14.5 }}>
                      {x.t}
                    </Typography>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 2.5,
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: 'rgba(99,102,241,0.15)',
                        border: '1px solid',
                        borderColor: 'primary.main'
                      }}
                    >
                      {idx === 0 ? <AddIcon sx={{ color: 'primary.main', fontSize: 16 }} /> : <LinkIcon sx={{ color: 'primary.main', fontSize: 16 }} />}
                    </Box>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6, lineHeight: 1.35 }}>
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

