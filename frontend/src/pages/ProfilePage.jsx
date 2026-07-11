import { motion } from 'framer-motion'

export default function ProfilePage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="text-2xl font-semibold tracking-tight">Profile</div>
        <div className="mt-1 text-sm text-[#9CA3AF]">Account details & settings.</div>

        <div className="mt-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 shadow-soft">
          <div className="h-40 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-secondaryCard/40" />
        </div>
      </motion.div>
    </div>
  )
}

