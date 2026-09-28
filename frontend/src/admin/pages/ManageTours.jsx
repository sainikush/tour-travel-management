import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";

import Badge from "../components/Badge";
import DataTable from "../components/DataTable";
import { adminTours } from "../data/adminData";

const statusVariant = (status) =>
  status === "live"     ? "success" :
  status === "draft"    ? "pending" :
  "neutral";

export default function ManageTours() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = adminTours.filter((t) =>
    `${t.title} ${t.destination}`.toLowerCase().includes(query.toLowerCase())
  );

  const columns = [
    { key: "title",       label: "Package" },
    { key: "destination", label: "Destination" },
    {
      key: "price",
      label: "Price",
      render: (row) => `₹${row.price.toLocaleString()}`,
    },
    { key: "seats", label: "Seats" },
    {
      key: "status",
      label: "Status",
      sortable: false,
      render: (row) => (
        <Badge variant={statusVariant(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: () => (
        <span className="text-sm text-text-muted">Edit</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center
                      sm:justify-between gap-4">
        <h3 className="text-base font-medium">Tour packages</h3>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-surface border border-border
                          rounded-md px-3 py-2 w-full sm:w-56">
            <Search size={16} className="text-text-muted shrink-0" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search packages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-text
                         placeholder:text-text-muted/70 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/tours/new")}
            className="btn-primary whitespace-nowrap"
          >
            <Plus size={16} strokeWidth={2} />
            Add package
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        onRowClick={(row) => navigate(`/admin/tours/${row.id}/edit`)}
        emptyMessage="No packages match your search."
      />
    </div>
  );
}