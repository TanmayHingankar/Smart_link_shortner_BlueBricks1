import { createTheme } from '@mui/material/styles'

const BORDER = 'rgba(255,255,255,0.08)'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366F1', dark: '#4F46E5', contrastText: '#0B1220' },
    background: { default: '#0B1220', paper: '#111827' },
    text: { primary: '#F9FAFB', secondary: '#9CA3AF' },
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    warning: { main: '#F59E0B' },
    info: { main: '#06B6D4' },
    divider: BORDER
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600 }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${BORDER}`
        }
      },
      variants: [
        {
          props: { variant: 'elevation' },
          style: { boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }
        },
        {
          props: { variant: 'outlined' },
          style: { boxShadow: 'none' }
        }
      ]
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, paddingInline: 16 }
      }
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 10 } }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#0B1220',
          borderRadius: 12
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderColor: BORDER,
          '&.Mui-selected': {
            backgroundColor: 'rgba(99,102,241,0.15)',
            color: '#818CF8'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: BORDER },
        head: { color: '#9CA3AF', fontWeight: 600 }
      }
    }
  }
})

export default theme
