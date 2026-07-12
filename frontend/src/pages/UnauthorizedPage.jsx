import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

export default function UnauthorizedPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'grid', placeItems: 'center', p: 3 }}>
      <Box sx={{ maxWidth: 480, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight={600}>
          401
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          You’re not authorized to view this page.
        </Typography>
        <Button component={RouterLink} to="/login" variant="contained" sx={{ mt: 3 }}>
          Go to sign in
        </Button>
      </Box>
    </Box>
  )
}
