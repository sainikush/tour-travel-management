const VARIANTS = {
  success: "bg-success-bg text-success-fg",
  pending: "bg-pending-bg text-pending-fg",
  danger:  "bg-danger-bg  text-danger-fg",
  neutral: "bg-primary-soft text-primary",
};

export default function Badge({ variant = "neutral", children }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-sm
                  text-xs font-medium whitespace-nowrap
                  ${VARIANTS[variant] || VARIANTS.neutral}`}
    >
      {children}
    </span>
  );
}