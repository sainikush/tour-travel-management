import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function DataTable({
  columns,
  data,
  onRowClick,
  emptyMessage = "No records found.",
}) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });

  const sortedData = [...data].sort((a, b) => {
    if (!sort.key) return 0;
    const av = a[sort.key];
    const bv = b[sort.key];
    if (av === bv) return 0;
    const cmp = av > bv ? 1 : -1;
    return sort.dir === "asc" ? cmp : -cmp;
  });

  const toggleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => {
                const sortable = col.sortable !== false;
                const isSorted = sort.key === col.key;
                return (
                  <th
                    key={col.key}
                    onClick={sortable ? () => toggleSort(col.key) : undefined}
                    className={`text-left uppercase text-xs font-semibold tracking-[0.04em]
                                text-text-muted px-4 py-3 whitespace-nowrap
                                ${sortable ? "cursor-pointer select-none hover:text-text" : ""}`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.label}
                      {sortable && isSorted && (
                        sort.dir === "asc"
                          ? <ChevronUp size={12} />
                          : <ChevronDown size={12} />
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-text-muted py-12"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`border-b border-border last:border-b-0
                              ${onRowClick ? "cursor-pointer hover:bg-bg" : ""}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3.5 align-middle">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}