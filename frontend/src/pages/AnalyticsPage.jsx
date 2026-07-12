import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Container,


  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
// DashboardIcon removed from page header (global nav lives in AppLayout)

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Loader from '../components/Loader.jsx'
import { analyticsApi } from '../api/analyticsApi'
import { linkApi } from '../api/linkApi'
import { env } from '../config/env'

const PRIMARY = '#6366F1'
const MUTED = '#9CA3AF'
const GRID = 'rgba(255,255,255,0.08)'

const RANGES = [
  { key: 'all', label: 'All time' },
  { key: '7d', label: '7 days' },
  { key: '30d', label: '30 days' },
  { key: '90d', label: '90 days' }
]

function ChartTooltip({ active, payload, label, unit = 'clicks' }) {
  if (!active || !payload?.length) return null
  return (
    <Paper sx={{ px: 1.5, py: 1, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="caption" fontWeight={700} component="div">
        {label}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {payload[0].value.toLocaleString()} {unit}
      </Typography>
    </Paper>
  )
}

function BreakdownCard({ title, data, nameKey, emptyLabel }) {
  const rows = (data ?? []).map((d) => ({ name: d[nameKey] || 'Unknown', clicks: d.clicks }))
  return (
    <Paper sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 10px 30px rgba(0,0,0,0.16)' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      {rows.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontWeight: 600 }}>
          {emptyLabel}
        </Typography>
      ) : (
        <Box sx={{ mt: 2, height: Math.max(rows.length * 40, 132) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
              <CartesianGrid horizontal={false} stroke={GRID} />
              <XAxis type="number" allowDecimals={false} tick={{ fill: MUTED, fontSize: 12 }} stroke={GRID} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fill: MUTED, fontSize: 12 }} stroke={GRID} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} content={<ChartTooltip />} />
              <Bar dataKey="clicks" fill={PRIMARY} radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  )
}

function formatCountryForDisplay(country) {
  const v = (country ?? '').toString().trim()
  if (!v) return 'India'
  if (v.toLowerCase() === 'unknown') return 'India'
  return v
}

export default function AnalyticsPage() { 
  
  const [params] = useSearchParams()
  const id = params.get('id')

  const [range, setRange] = useState('all')
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [link, setLink] = useState(null)


  useEffect(() => {
    if (!id) return
    let cancelled = false
    linkApi
      .list()
      .then((res) => {
        if (cancelled) return
        setLink((res?.data?.data ?? []).find((l) => l._id === id) ?? null)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError('')
    analyticsApi
      .linkAnalytics({ id, range: range === 'all' ? undefined : range })
      .then((res) => {
        if (!cancelled) setData(res?.data?.data ?? null)
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.message || 'Failed to load analytics')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, range])

  const overTime = useMemo(
    () => (data?.clicksOverTime ?? []).map((d) => ({ date: d.date, clicks: d.clicks })),
    [data]
  )

  const shortLabel = link ? `/${link.customAlias || link.shortCode}` : id
  const shortUrl = link ? `${env.apiBaseUrl}/${link.customAlias || link.shortCode}` : null

  if (!id) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4">Analytics</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Interactive charts for clicks and traffic.
          </Typography>
          <Paper variant="outlined" sx={{ mt: 3, borderStyle: 'dashed', px: 3, py: 8, textAlign: 'center' }}>
            <BarChartIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography fontWeight={600} sx={{ mt: 1.5 }}>
              No link selected
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Open a link&apos;s analytics from your links list.
            </Typography>
            <Button component={RouterLink} to="/app/links" variant="contained" sx={{ mt: 2 }}>
              Go to My Links
            </Button>

          </Paper>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="h4">Analytics</Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="primary" fontWeight={600}>
              {shortLabel}
            </Typography>
            {shortUrl && (
              <Link href={shortUrl} target="_blank" rel="noreferrer" color="primary" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <OpenInNewIcon sx={{ fontSize: 14 }} />
              </Link>
            )}
          </Stack>
        </Box>


        {loading ? (
          <Box sx={{ mt: 3, py: 8, display: 'grid', placeItems: 'center' }}>
            <Loader label="Loading analytics…" />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        ) : (
          <>
            <Box
              sx={{
                mt: 3,
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }
              }}
            >
              <Paper sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Clicks
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 1 }}>
                      {(data?.totalClicks || 0).toLocaleString()}
                    </Typography>
                  </Box>
                  <Paper variant="outlined" sx={{ width: 40, height: 40, display: 'grid', placeItems: 'center', bgcolor: 'action.hover' }}>
                    <TrendingUpIcon color="primary" />
                  </Paper>
                </Stack>
              </Paper>
              <Paper sx={{ p: 2.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Browsers
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {(data?.browserBreakdown?.length || 0).toLocaleString()}
                </Typography>
              </Paper>
              <Paper sx={{ p: 2.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Referrers
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {(data?.topReferrers?.length || 0).toLocaleString()}
                </Typography>
              </Paper>
            </Box>

            <Paper sx={{ mt: 2, p: 2.5 }}>
              <Typography variant="subtitle2">Clicks over time</Typography>
              {overTime.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                  No clicks recorded in this range.
                </Typography>
              ) : (
                <Box sx={{ mt: 2, height: 256 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={overTime} margin={{ left: 4, right: 12, top: 8, bottom: 4 }}>
                      <defs>
                        <linearGradient id="clicksFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke={GRID} />
                      <XAxis dataKey="date" tick={{ fill: MUTED, fontSize: 12 }} stroke={GRID} minTickGap={24} />
                      <YAxis allowDecimals={false} tick={{ fill: MUTED, fontSize: 12 }} stroke={GRID} width={32} />
                      <Tooltip cursor={{ stroke: PRIMARY, strokeWidth: 1 }} content={<ChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke={PRIMARY}
                        strokeWidth={2}
                        fill="url(#clicksFill)"
                        dot={false}
                        activeDot={{ r: 4, fill: PRIMARY }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Paper>

            <Box
              sx={{
                mt: 2,
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }
              }}
            >
              <BreakdownCard title="By browser" data={data?.browserBreakdown} nameKey="browser" emptyLabel="No browser data yet." />
              <BreakdownCard title="By device" data={data?.deviceBreakdown} nameKey="device" emptyLabel="No device data yet." />
              <BreakdownCard title="Top referrers" data={data?.topReferrers} nameKey="referrer" emptyLabel="No referrer data yet." />
            </Box>

            <Paper sx={{ mt: 2, p: 2.5 }}>
              <Typography variant="subtitle2">Recent clicks</Typography>
              {data?.latestClicks?.length ? (
                <Box sx={{ mt: 2, overflowX: 'auto' }}>
                  <Table size="small" sx={{ minWidth: 520 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Referrer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.latestClicks.map((c, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {c.timestamp ? new Date(c.timestamp).toLocaleString() : '—'}
                            </Typography>
                          </TableCell>
                          <TableCell>{formatCountryForDisplay(c.country)}</TableCell>

                          <TableCell sx={{ maxWidth: 240 }}>
                            <Typography variant="body2" color="text.secondary" noWrap title={c.referrer}>
                              {c.referrer || 'Direct'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                  No clicks recorded yet.
                </Typography>
              )}
            </Paper>
          </>
        )}
      </Container>
    </Box>
  )
}
