import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function CreateLinkPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="text-2xl font-semibold tracking-tight">Create Link</div>
        <div className="mt-1 text-sm text-[#9CA3AF]">Shorten URLs and track performance.</div>

        <div className="mt-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-secondaryCard/40 border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold tracking-tight">Link creation form</div>
              <div className="text-sm text-[#9CA3AF]">Will be wired to backend in the next feature step.</div>
            </div>
          </div>
          <div className="mt-5 h-40 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-secondaryCard/40" />
        </div>
      </motion.div>
    </div>
  )
}

