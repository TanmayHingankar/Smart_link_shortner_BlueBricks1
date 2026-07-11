import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { LockKeyhole, Mail, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, authLoading, refreshAndGetMe } = useAuth()
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { email: '', password: '' }
  })

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

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F9FAFB]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.08)] shadow-soft flex items-center justify-center">
              <LockKeyhole className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">Smart Link</div>
              <div className="text-xs text-[#9CA3AF]">Premium analytics & rate limiting</div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[#111827] to-[#0B1220] p-7 shadow-soft"
          >
            <div className="text-3xl font-semibold tracking-tight">Sign in</div>
            <div className="mt-2 text-sm text-[#9CA3AF]">
              Manage links, view analytics, and keep performance under control.
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <label className="block">
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                  <input
                    aria-label="Email"
                    className="mt-2 w-full rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#F9FAFB] placeholder-[#9CA3AF] shadow-soft focus:border-primary/60"
                    placeholder="you@company.com"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email?.message && (
                    <div className="mt-2 text-xs text-danger" role="alert">
                      {errors.email.message}
                    </div>
                  )}
                </label>

                <label className="block">
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <LockKeyhole className="h-4 w-4" />
                    Password
                  </div>
                  <input
                    aria-label="Password"
                    className="mt-2 w-full rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#F9FAFB] placeholder-[#9CA3AF] shadow-soft focus:border-primary/60"
                    placeholder="••••••••"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                  />
                  {errors.password?.message && (
                    <div className="mt-2 text-xs text-danger" role="alert">
                      {errors.password.message}
                    </div>
                  )}
                </label>

                {formError ? (
                  <div className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
                    {formError}
                  </div>
                ) : null}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={authLoading || isSubmitting}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-[#0B1220] shadow-soft hover:bg-hover disabled:opacity-60"
                >
                  {authLoading || isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>Sign in</>
                  )}
                </motion.button>
              </div>

              <div className="mt-5 text-center text-sm text-[#9CA3AF]">
                New here?{' '}
                <Link className="text-primary hover:text-hover" to="/register">
                  Create account
                </Link>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-7 shadow-soft"
          >
            <div className="text-lg font-semibold">What you get</div>
            <div className="mt-2 space-y-4">
              {[
                { title: 'Premium link analytics', desc: 'Clicks, browsers, OS, platform, and country insights.' },
                { title: 'Secure JWT auth', desc: 'Refresh token handling backed by httpOnly cookies.' },
                { title: 'Rate limiting', desc: 'Protect your API from bursts while keeping UX smooth.' }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-secondaryCard/40 border border-[rgba(255,255,255,0.08)] p-4">
                  <div className="font-medium">{item.title}</div>
                  <div className="mt-1 text-sm text-[#9CA3AF]">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-primary/15 to-transparent p-4">
              <div className="text-sm text-[#9CA3AF]">Tip</div>
              <div className="mt-1 font-medium">After sign in, your dashboard is protected.</div>
              <div className="mt-1 text-sm text-[#9CA3AF]">No API routes are changed—only UI is built.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

