import { motion } from 'framer-motion'

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="text-2xl font-semibold tracking-tight">Analytics</div>
        <div className="mt-1 text-sm text-[#9CA3AF]">Interactive charts for clicks and traffic.</div>

        <div className="mt-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 shadow-soft">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-secondaryCard/40" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

