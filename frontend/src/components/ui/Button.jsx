import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', isLoading = false, disabled = false, ...props },
  ref
) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-[#0B1220] disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-[#0B1220] hover:bg-hover shadow-soft',
    secondary: 'bg-[#111827] border border-[rgba(255,255,255,0.08)] text-[#F9FAFB] hover:bg-[#1F2937]/30 shadow-soft',
    ghost: 'bg-transparent border border-[rgba(255,255,255,0.08)] text-[#F9FAFB] hover:bg-[#111827]/60',
    danger: 'bg-danger/15 border border-danger/30 text-danger hover:bg-danger/20'
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs rounded-xl',
    md: 'px-4 py-3',
    lg: 'px-5 py-4 text-base'
  }

  return (
    <motion.button
      ref={ref}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    />
  )
})

export default Button
