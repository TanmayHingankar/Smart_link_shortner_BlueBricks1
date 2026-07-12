import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  InputAdornment,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BarChartIcon from '@mui/icons-material/BarChart'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import toast from 'react-hot-toast'
import { linkApi } from '../api/linkApi'
import { env } from '../config/env'
import Loader from '../components/Loader.jsx'

const shortUrlFor = (link) => `${env.apiBaseUrl}/${link.customAlias || link.shortCode}`
const isExpired = (link) => link.expiresAt && new Date(link.expiresAt).getTime() < Date.now()

export default function MyLinksPage() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await linkApi.list()
      setLinks(res?.data?.data ?? [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load links')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return links
    return links.filter(
      (l) =>
        l.longUrl?.toLowerCase().includes(q) ||
        l.shortCode?.toLowerCase().includes(q) ||
        l.customAlias?.toLowerCase().includes(q)
    )
  }, [links, query])

  const copy = async (link) => {
    try {
      await navigator.clipboard.writeText(shortUrlFor(link))
      setCopiedId(link._id)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopiedId((id) => (id === link._id ? null : id)), 1500)
    } catch {
      toast.error('Could not copy')
    }
  }

  const statusChip = (link) => {
    const expired = isExpired(link)
    const active = link.isActive && !expired
    if (expired) return <Chip size="small" color="error" variant="outlined" label="Expired" />
    if (active) return <Chip size="small" color="primary" variant="outlined" label="Active" />
    return <Chip size="small" color="default" variant="outlined" label="Inactive" />
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'flex-start' }}
          spacing={2}
        >
          <Box>
            <Typography variant="h4">My Links</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Search and manage your shortened links.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button component={RouterLink} to="/app/dashboard" variant="outlined" color="inherit" startIcon={<DashboardIcon />}>
              Go to Dashboard
            </Button>
            <Button onClick={load} variant="outlined" color="inherit" startIcon={<RefreshIcon />}>
              Refresh
            </Button>
            <Button component={RouterLink} to="/app/create" variant="contained" startIcon={<AddIcon />}>
              New link
            </Button>
          </Stack>
        </Stack>

        <Paper sx={{ mt: 3, p: 2.5 }}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by URL, code, or alias"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }
            }}
          />

          <Box sx={{ mt: 2.5 }}>
            {loading ? (
              <Box sx={{ py: 5, display: 'grid', placeItems: 'center' }}>
                <Loader label="Loading links…" />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : filtered.length === 0 ? (
              <Paper variant="outlined" sx={{ borderStyle: 'dashed', px: 3, py: 6, textAlign: 'center' }}>
                <Typography fontWeight={600}>{links.length === 0 ? 'No links yet' : 'No matches'}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {links.length === 0 ? 'Create your first short link to see it here.' : 'Try a different search.'}
                </Typography>
                {links.length === 0 && (
                  <Button component={RouterLink} to="/app/create" variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }}>
                    Create link
                  </Button>
                )}
              </Paper>
            ) : (
              <Box sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 640 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Short link</TableCell>
                      <TableCell>Destination</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered.map((link) => (
                      <TableRow key={link._id} hover>
                        <TableCell>
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
                        </TableCell>
                        <TableCell sx={{ maxWidth: 280 }}>
                          <Typography variant="body2" color="text.secondary" noWrap title={link.longUrl}>
                            {link.longUrl}
                          </Typography>
                        </TableCell>
                        <TableCell>{statusChip(link)}</TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {link.createdAt ? new Date(link.createdAt).toLocaleDateString() : '—'}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button
                              component={RouterLink}
                              to={`/app/analytics?id=${link._id}`}
                              size="small"
                              variant="outlined"
                              color="inherit"
                              startIcon={<BarChartIcon />}
                            >
                              Analytics
                            </Button>
                            <Button
                              onClick={() => copy(link)}
                              size="small"
                              variant="outlined"
                              color={copiedId === link._id ? 'primary' : 'inherit'}
                              startIcon={copiedId === link._id ? <CheckIcon /> : <ContentCopyIcon />}
                            >
                              {copiedId === link._id ? 'Copied' : 'Copy'}
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
