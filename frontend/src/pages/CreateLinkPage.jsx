import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LinkIcon from '@mui/icons-material/Link'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import toast from 'react-hot-toast'
import { linkApi } from '../api/linkApi'
import { env } from '../config/env'

export default function CreateLinkPage() {
  const [created, setCreated] = useState(null)
  const [copied, setCopied] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: { longUrl: '', customAlias: '', expiresAt: '' } })

  const { ref: longUrlRef, ...longUrlField } = register('longUrl', {
    required: 'Destination URL is required',
    pattern: { value: /^https?:\/\/.+/i, message: 'Enter a valid http(s) URL' }
  })
  const { ref: aliasRef, ...aliasField } = register('customAlias', {
    minLength: { value: 3, message: 'At least 3 characters' },
    maxLength: { value: 30, message: 'At most 30 characters' },
    pattern: { value: /^[a-zA-Z0-9_-]*$/, message: 'Letters, numbers, - and _ only' }
  })
  const { ref: expiresRef, ...expiresField } = register('expiresAt')

  const shortUrl = created ? `${env.apiBaseUrl}/${created.customAlias || created.shortCode}` : ''

  const onSubmit = async (values) => {
    const payload = { longUrl: values.longUrl.trim() }
    const alias = values.customAlias?.trim()
    if (alias) payload.customAlias = alias
    if (values.expiresAt) payload.expiresAt = new Date(values.expiresAt).toISOString()

    try {
      const res = await linkApi.create(payload)
      setCreated(res?.data?.data ?? null)
      setCopied(false)
      toast.success('Short link created')
      reset()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to create link')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error('Could not copy')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h4">Create Link</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Shorten URLs and track performance.
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/app/dashboard"
            variant="outlined"
            color="inherit"
            startIcon={<DashboardIcon />}
          >
            Go to Dashboard
          </Button>
        </Stack>

        <Paper sx={{ mt: 3, p: { xs: 2.5, sm: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Paper variant="outlined" sx={{ width: 40, height: 40, display: 'grid', placeItems: 'center', bgcolor: 'action.hover' }}>
              <AddIcon color="primary" />
            </Paper>
            <Box>
              <Typography fontWeight={600}>Link creation form</Typography>
              <Typography variant="body2" color="text.secondary">
                Paste a long URL and optionally set an alias and expiry.
              </Typography>
            </Box>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Stack spacing={2.5}>
              <TextField
                label="Destination URL"
                fullWidth
                placeholder="https://example.com/very/long/link"
                error={!!errors.longUrl}
                helperText={errors.longUrl?.message}
                inputRef={longUrlRef}
                {...longUrlField}
              />
              <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                <TextField
                  label="Custom alias (optional)"
                  fullWidth
                  placeholder="my-link"
                  error={!!errors.customAlias}
                  helperText={errors.customAlias?.message}
                  inputRef={aliasRef}
                  {...aliasField}
                />
                <TextField
                  label="Expiry (optional)"
                  type="datetime-local"
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                  inputRef={expiresRef}
                  {...expiresField}
                />
              </Box>
              <Box>
                <Button type="submit" variant="contained" size="large" startIcon={<AddIcon />} disabled={isSubmitting}>
                  {isSubmitting ? 'Creating…' : 'Create short link'}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>

        {created && (
          <Paper
            variant="outlined"
            sx={{
              mt: 3,
              p: { xs: 2.5, sm: 3 },
              borderColor: 'primary.main',
              background: 'linear-gradient(180deg, rgba(99,102,241,0.10), transparent)'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
              <LinkIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" color="text.secondary">
                Your short link
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ mt: 1.5 }}
            >
              <Link
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                underline="hover"
                sx={{ fontWeight: 600, wordBreak: 'break-all', display: 'inline-flex', alignItems: 'center', gap: 1 }}
              >
                {shortUrl}
                <OpenInNewIcon sx={{ fontSize: 16, flexShrink: 0 }} />
              </Link>
              <Button
                onClick={copyToClipboard}
                variant="outlined"
                color={copied ? 'primary' : 'inherit'}
                startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                sx={{ flexShrink: 0 }}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block', wordBreak: 'break-all' }}>
              Redirects to {created.longUrl}
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  )
}
