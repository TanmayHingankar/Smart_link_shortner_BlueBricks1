export default function Badge({ children, variant = 'default' }) {
  const styles =
    variant === 'success'
      ? 'border border-success/30 bg-success/10 text-success'
      : variant === 'danger'
        ? 'border border-danger/30 bg-danger/10 text-danger'
        : variant === 'warning'
          ? 'border border-warning/30 bg-warning/10 text-warning'
          : variant === 'info'
            ? 'border border-info/30 bg-info/10 text-info'
            : 'border border-[rgba(255,255,255,0.08)] bg-secondaryCard/40 text-[#9CA3AF]'

  return (
    <span
      className={`inline-flex items-center rounded-2xl px-3 py-1 text-xs font-medium ${styles}`}
      aria-label={typeof children === 'string' ? children : 'badge'}
    >
      {children}
    </span>
  )
}
