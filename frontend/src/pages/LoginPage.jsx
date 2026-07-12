import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const FEATURES = [
  { title: 'Premium link analytics', desc: 'Clicks, browsers, OS, platform, and country insights.' },
  { title: 'Secure JWT auth', desc: 'Refresh token handling backed by httpOnly cookies.' },
  { title: 'Rate limiting', desc: 'Protect your API from bursts while keeping UX smooth.' }
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, authLoading, refreshAndGetMe } = useAuth()
  const [formError, setFormError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: { email: '', password: '' } })


  const { ref: emailRef, ...emailField } = register('email', { required: 'Email is required' })
  const { ref: passwordRef, ...passwordField } = register('password', { required: 'Password is required' })

  const onSubmit = async (values) => {
    setFormError('')
    try {
      await login(values)
      await refreshAndGetMe()
      toast.success('Welcome back')
      navigate('/app/dashboard')
    } catch (e) {
      const msg = e?.response?.data?.message || 'Login failed'
      setFormError(msg)
      toast.error(msg)
    }
  }

  const busy = authLoading || isSubmitting

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 5, sm: 7 } }}>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 5 }}>
          <Paper sx={{ width: 40, height: 40, display: 'grid', placeItems: 'center' }}>
            <LockOutlinedIcon color="primary" fontSize="small" />
          </Paper>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Smart Link
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Premium analytics & rate limiting
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            alignItems: 'stretch'
          }}
        >
          <Paper sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage links, view analytics, and keep performance under control.
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Stack spacing={2.5}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  placeholder="you@company.com"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  inputRef={emailRef}
                  {...emailField}
                />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((v) => !v)}
                            edge="end"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                  inputRef={passwordRef}
                  {...passwordField}
                />

                {formError && <Alert severity="error">{formError}</Alert>}

                <Button type="submit" variant="contained" size="large" fullWidth disabled={busy}>
                  {busy ? 'Signing in…' : 'Sign in'}
                </Button>
              </Stack>

              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2.5 }}>
                New here?{' '}
                <Link component={RouterLink} to="/register" underline="hover">
                  Create account
                </Link>
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h6">What you get</Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {FEATURES.map((item) => (
                <Paper key={item.title} variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
                  <Typography fontWeight={600}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              ))}
            </Stack>
            <Paper
              variant="outlined"
              sx={{ mt: 3, p: 2, background: 'linear-gradient(180deg, rgba(99,102,241,0.15), transparent)' }}
            >
              <Typography variant="caption" color="text.secondary">
                Tip
              </Typography>
              <Typography fontWeight={600} sx={{ mt: 0.5 }}>
                After sign in, your dashboard is protected.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Refresh tokens in httpOnly cookies; no frontend secrets.
              </Typography>
            </Paper>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}
