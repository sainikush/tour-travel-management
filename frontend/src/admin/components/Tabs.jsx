export default function Tabs({ tabs, value, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 bg-surface border border-border
                    rounded-md p-1">
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
              active
                ? "bg-primary text-white"
                : "text-text-muted hover:text-text"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}