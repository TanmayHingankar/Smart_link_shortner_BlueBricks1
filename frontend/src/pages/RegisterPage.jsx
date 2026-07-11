import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Loader2, Mail, UserPlus, LockKeyhole } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, authLoading, refreshAndGetMe } = useAuth()
  const [formError, setFormError] = useState('')

  const {
    register: rhfRegister,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { name: '', email: '', password: '' }
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

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F9FAFB]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.08)] shadow-soft flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">Smart Link</div>
              <div className="text-xs text-[#9CA3AF]">Create, analyze, and optimize</div>
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
            <div className="text-3xl font-semibold tracking-tight">Create account</div>
            <div className="mt-2 text-sm text-[#9CA3AF]">
              Premium SaaS analytics for all your shortened links.
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <label className="block">
                  <div className="text-sm text-[#9CA3AF]">Name</div>
                  <input
                    aria-label="Name"
                    className="mt-2 w-full rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#F9FAFB] placeholder-[#9CA3AF] shadow-soft focus:border-primary/60"
                    placeholder="Jane Doe"
                    type="text"
                    {...rhfRegister('name', { required: 'Name is required' })}
                  />
                  {errors.name?.message && (
                    <div className="mt-2 text-xs text-danger" role="alert">
                      {errors.name.message}
                    </div>
                  )}
                </label>

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
                    {...rhfRegister('email', { required: 'Email is required' })}
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
                    {...rhfRegister('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
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
                      Creating…
                    </>
                  ) : (
                    <>Create account</>
                  )}
                </motion.button>
              </div>

              <div className="mt-5 text-center text-sm text-[#9CA3AF]">
                Already have an account?{' '}
                <Link className="text-primary hover:text-hover" to="/login">
                  Sign in
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
            <div className="text-lg font-semibold">Why Smart Link?</div>
            <div className="mt-2 text-sm text-[#9CA3AF]">
              Built for real-world traffic with rate limiting and deep analytics.
            </div>

            <div className="mt-6 space-y-4">
              {[
                { title: 'Fast UX', desc: 'Loading states, empty states, and premium UI polish.' },
                { title: 'Actionable analytics', desc: 'Charts that help you understand clicks by device and country.' },
                { title: 'Secure auth', desc: 'Refresh tokens in httpOnly cookies; no frontend secrets.' }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-secondaryCard/40 border border-[rgba(255,255,255,0.08)] p-4">
                  <div className="font-medium">{item.title}</div>
                  <div className="mt-1 text-sm text-[#9CA3AF]">{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

