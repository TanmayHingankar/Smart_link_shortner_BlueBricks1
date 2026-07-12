import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

export default function NotFoundPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'grid', placeItems: 'center', p: 3 }}>
      <Box sx={{ maxWidth: 480, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight={600}>
          404
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          This page doesn’t exist.
        </Typography>
        <Button component={RouterLink} to="/app/dashboard" variant="contained" sx={{ mt: 3 }}>
          Back to dashboard
        </Button>
      </Box>
    </Box>
  )
}
