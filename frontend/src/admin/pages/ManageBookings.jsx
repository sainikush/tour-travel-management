import { useState } from "react";
import Badge from "../components/Badge";
import DataTable from "../components/DataTable";
import Tabs from "../components/Tabs";
import { adminBookings } from "../data/adminData";

const statusVariant = (status) =>
  status === "confirmed" ? "success" :
  status === "pending"   ? "pending" :
  status === "cancelled" ? "danger"  :
  "neutral";

export default function ManageBookings() {
  const [filter, setFilter] = useState("all");

  const counts = {
    all:       adminBookings.length,
    confirmed: adminBookings.filter((b) => b.status === "confirmed").length,
    pending:   adminBookings.filter((b) => b.status === "pending").length,
    cancelled: adminBookings.filter((b) => b.status === "cancelled").length,
  };

  const rows =
    filter === "all"
      ? adminBookings
      : adminBookings.filter((b) => b.status === filter);

  const columns = [
    { key: "customer",   label: "Customer" },
    { key: "tour",       label: "Tour" },
    { key: "travellers", label: "Travellers" },
    {
      key: "amount",
      label: "Amount",
      render: (row) => `₹${row.amount.toLocaleString()}`,
    },
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
      render: () => <span className="text-sm text-text-muted">Manage</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center
                      sm:justify-between gap-4">
        <h3 className="text-base font-medium">Manage bookings</h3>

        <Tabs
          value={filter}
          onChange={setFilter}
          tabs={[
            { value: "all",       label: `All (${counts.all})` },
            { value: "confirmed", label: `Confirmed (${counts.confirmed})` },
            { value: "pending",   label: `Pending (${counts.pending})` },
            { value: "cancelled", label: `Cancelled (${counts.cancelled})` },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={rows}
        onRowClick={(row) => console.log("Open booking:", row.id)}
        emptyMessage="No bookings in this category."
      />
    </div>
  );
}