export default function FormField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  as = "input",
  rows = 4,
  children,
}) {
  const inputClass = `input ${error ? "border-danger-fg" : ""}`;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-text mb-1.5">
          {label}
          {required && <span className="text-danger-fg ml-0.5">*</span>}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={inputClass}
        />
      ) : as === "select" ? (
        <select id={id} value={value} onChange={onChange} className={inputClass}>
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {error && (
        <p className="text-xs text-danger-fg mt-1">{error}</p>
      )}
    </div>
  );
}