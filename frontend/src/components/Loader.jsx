import { Loader2 } from 'lucide-react'

export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-[#9CA3AF]" role="status" aria-live="polite">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{label}</span>
    </div>
  )
}

