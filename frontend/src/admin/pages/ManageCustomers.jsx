import Badge from "../components/Badge";
import DataTable from "../components/DataTable";
import { adminCustomers } from "../data/adminData";

export default function ManageCustomers() {
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-soft text-primary
                          flex items-center justify-center text-xs font-medium shrink-0">
            {row.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          <span className="text-text font-medium">{row.name}</span>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "bookings",
      label: "Total bookings",
      render: (row) => row.bookings,
    },
    { key: "joined", label: "Joined" },
    {
      key: "status",
      label: "Status",
      sortable: false,
      render: (row) => (
        <Badge variant={row.status === "banned" ? "danger" : "success"}>
          {row.status === "banned" ? "Banned" : "Active"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: () => <span className="text-sm text-text-muted">View</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-base font-medium">Customer directory</h3>

      <DataTable
        columns={columns}
        data={adminCustomers}
        onRowClick={(row) => console.log("View customer:", row.id)}
        emptyMessage="No customers yet."
      />
    </div>
  );
}