import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Bolt, Link as LinkIcon, TrendingUp } from 'lucide-react'
import Loader from '../components/Loader.jsx'

export default function DashboardPage() {
  // Backend API for dashboard-level aggregation is not present in routes.
  // This page will still be functional using existing data sources when linked.
  const [ready, setReady] = useState(true)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return (
      <div className="p-6">
        <Loader label="Loading dashboard…" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold tracking-tight">Dashboard</div>
            <div className="mt-1 text-sm text-[#9CA3AF]">Premium overview of your link performance.</div>
          </div>
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] px-4 py-2 text-sm text-[#9CA3AF]">
            Session active
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Links', value: '—', icon: LinkIcon },
            { label: 'Total Clicks', value: '—', icon: TrendingUp },
            { label: "Today's Clicks", value: '—', icon: Bolt },
            { label: 'Active Links', value: '—', icon: BarChart3 }
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-[#9CA3AF]">{c.label}</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">{c.value}</div>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-secondaryCard/40 border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#9CA3AF]">Latest Links</div>
                <div className="mt-1 font-semibold tracking-tight">No recent data yet</div>
              </div>
              <div className="text-sm text-[#9CA3AF]">—</div>
            </div>
            <div className="mt-4 h-32 rounded-2xl bg-secondaryCard/40 border border-[rgba(255,255,255,0.08)]" />
          </div>
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5 shadow-soft">
            <div className="text-sm text-[#9CA3AF]">Quick Actions</div>
            <div className="mt-1 font-semibold tracking-tight">Create & manage</div>
            <div className="mt-4 space-y-3">
              {[{ t: 'Create Link', d: 'Shorten a URL' }, { t: 'My Links', d: 'Search & delete' }].map((x) => (
                <div key={x.t} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-secondaryCard/40 px-4 py-3">
                  <div className="font-medium">{x.t}</div>
                  <div className="mt-1 text-sm text-[#9CA3AF]">{x.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5 shadow-soft">
          <div className="text-sm text-[#9CA3AF]">Recent Activity</div>
          <div className="mt-1 font-semibold tracking-tight">Analytics-ready events</div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {['Link created', 'First click', 'Analytics updated'].map((s) => (
              <div key={s} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-secondaryCard/40 px-4 py-3">
                <div className="font-medium">{s}</div>
                <div className="mt-1 text-sm text-[#9CA3AF]">—</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

