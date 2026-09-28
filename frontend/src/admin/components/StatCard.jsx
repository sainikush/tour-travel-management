export default function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs uppercase tracking-[0.08em] text-text-muted">
          {label}
        </p>
        {Icon && (
          <span className="inline-flex items-center justify-center w-8 h-8
                           rounded-md bg-primary-soft text-primary">
            <Icon size={16} strokeWidth={1.75} />
          </span>
        )}
      </div>

      <p className="text-2xl md:text-3xl font-display font-semibold text-primary mb-1">
        {value}
      </p>

      {hint && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  );
}