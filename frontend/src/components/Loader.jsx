import { Box, CircularProgress, Typography } from '@mui/material'

export default function Loader({ label = 'Loading…' }) {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}
    >
      <CircularProgress size={18} thickness={5} color="primary" />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  )
}
