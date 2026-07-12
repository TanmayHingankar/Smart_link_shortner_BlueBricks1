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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const REASONS = [
  { title: 'Fast UX', desc: 'Loading states, empty states, and premium UI polish.' },
  { title: 'Actionable analytics', desc: 'Charts that help you understand clicks by device and country.' },
  { title: 'Secure auth', desc: 'Refresh tokens in httpOnly cookies; no frontend secrets.' }
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, authLoading, refreshAndGetMe } = useAuth()
  const [formError, setFormError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register: rhfRegister,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: { name: '', email: '', password: '' } })

  const { ref: nameRef, ...nameField } = rhfRegister('name', { required: 'Name is required' })
  const { ref: emailRef, ...emailField } = rhfRegister('email', { required: 'Email is required' })
  const { ref: passwordRef, ...passwordField } = rhfRegister('password', {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' }
  })

  const onSubmit = async (values) => {
    setFormError('')
    try {
      await register(values)
      await refreshAndGetMe()
      toast.success('Account created')
      navigate('/app/dashboard')
    } catch (e) {
      const msg = e?.response?.data?.message || 'Registration failed'
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
            <PersonAddAlt1Icon color="primary" fontSize="small" />
          </Paper>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Smart Link
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Create, analyze, and optimize
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
              Create account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Premium SaaS analytics for all your shortened links.
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Stack spacing={2.5}>
                <TextField
                  label="Name"
                  fullWidth
                  placeholder="Jane Doe"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  inputRef={nameRef}
                  {...nameField}
                />
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
                  {busy ? 'Creating…' : 'Create account'}
                </Button>
              </Stack>

              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2.5 }}>
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h6">Why Smart Link?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Built for real-world traffic with rate limiting and deep analytics.
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {REASONS.map((item) => (
                <Paper key={item.title} variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
                  <Typography fontWeight={600}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.desc}
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
