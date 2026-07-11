export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F9FAFB] flex items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <div className="text-5xl font-semibold tracking-tight">401</div>
        <div className="mt-4 text-[#9CA3AF]">You’re not authorized to view this page.</div>
      </div>
    </div>
  )
}

