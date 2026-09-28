import { Link, useNavigate } from "react-router-dom";
import {
  CalendarCheck, Package, IndianRupee, Users,
  TrendingUp, ArrowRight, Star, Clock,
} from "lucide-react";

import Badge from "../components/Badge";
import DataTable from "../components/DataTable";
import {
  adminStats, recentBookings, adminTours, adminCustomers,
} from "../data/adminData";

/* ---------- Helpers ---------- */
const formatCurrency = (n) => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}k`;
  return `₹${n}`;
};

const statusVariant = (status) =>
  status === "confirmed" ? "success" :
  status === "pending"   ? "pending" :
  status === "cancelled" ? "danger"  :
  "neutral";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

/* ---------- Weekly chart mock ---------- */
const weekData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 81 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 120 },
  { day: "Sun", value: 72 },
];

const maxWeek = Math.max(...weekData.map((d) => d.value));

/* ---------- Activity feed mock ---------- */
const activity = [
  { id: 1, text: "Priya Sharma booked Bali Escape",        time: "12 min ago",  icon: CalendarCheck, tone: "accent" },
  { id: 2, text: "New tour published: Kyoto Cherry Blossoms", time: "1 hr ago",  icon: Package,       tone: "primary" },
  { id: 3, text: "Rohan Verma's payment is pending",        time: "3 hrs ago",   icon: Clock,         tone: "warning" },
  { id: 4, text: "Anita Rao left a 5-star review",          time: "5 hrs ago",   icon: Star,          tone: "success" },
  { id: 5, text: "Karan Mehta cancelled Santorini Sunset",  time: "Yesterday",   icon: CalendarCheck, tone: "danger" },
];

const toneMap = {
  accent:  "bg-accent-soft text-accent",
  primary: "bg-primary-soft text-primary",
  warning: "bg-pending-bg text-pending-fg",
  success: "bg-success-bg text-success-fg",
  danger:  "bg-danger-bg text-danger-fg",
};

/* ============================================================
   COMPONENT
   ============================================================ */
export default function AdminDashboard() {
  const navigate = useNavigate();

  /* --- Stat cards config --- */
  const stats = [
    {
      label: "Total bookings",
      value: adminStats.totalBookings.toLocaleString(),
      trend: "+12.4%",
      trendUp: true,
      icon: CalendarCheck,
    },
    {
      label: "Active packages",
      value: adminStats.activePackages,
      trend: "+3 this month",
      trendUp: true,
      icon: Package,
    },
    {
      label: "Revenue this month",
      value: formatCurrency(adminStats.revenueThisMonth),
      trend: "+8.1%",
      trendUp: true,
      icon: IndianRupee,
    },
    {
      label: "Total customers",
      value: adminStats.totalCustomers,
      trend: "+24 new",
      trendUp: true,
      icon: Users,
    },
  ];

  /* --- Recent bookings table config --- */
  const bookingColumns = [
    { key: "customer", label: "Customer" },
    { key: "tour",     label: "Tour" },
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
  ];

  /* --- Top tours (by featured flag, fallback to first 4) --- */
  const topTours = adminTours.filter((t) => t.featured).slice(0, 4);
  const toursToShow = topTours.length ? topTours : adminTours.slice(0, 4);

  return (
    <div className="space-y-6">

      {/* ===================== WELCOME BANNER ===================== */}
      <div className="relative overflow-hidden rounded-xl bg-primary text-text-inverse">
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row
                        md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-text-inverse/60 mb-1.5">
              {today}
            </p>
            <h1 className="text-2xl md:text-3xl font-display text-white mb-1.5">
              Welcome back, Admin
            </h1>
            <p className="text-sm text-text-inverse/70 max-w-md">
              You have{" "}
              <span className="text-accent font-medium">
                {recentBookings.filter((b) => b.status === "pending").length} pending bookings
              </span>{" "}
              to review today.
            </p>
          </div>

          <Link
            to="/admin/bookings"
            className="inline-flex items-center gap-2 self-start md:self-auto
                       bg-accent text-white px-5 py-2.5 rounded-md
                       text-sm font-medium
                       hover:bg-accent-hover transition-colors"
          >
            Review bookings
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        {/* Decorative circle */}
        <div className="hidden md:block absolute -right-16 -top-16 w-64 h-64
                        rounded-full bg-white/5" />
        <div className="hidden md:block absolute -right-8 -bottom-20 w-48 h-48
                        rounded-full bg-white/5" />
      </div>

      {/* ===================== STAT CARDS ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-surface border border-border rounded-lg p-5
                       hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="inline-flex items-center justify-center
                               w-10 h-10 rounded-lg
                               bg-primary-soft text-primary">
                <s.icon size={18} strokeWidth={1.75} />
              </span>

              {s.trendUp && (
                <span className="inline-flex items-center gap-1
                                 text-xs font-medium text-success-fg
                                 bg-success-bg px-2 py-1 rounded-sm">
                  <TrendingUp size={12} strokeWidth={2} />
                  {s.trend}
                </span>
              )}
            </div>

            <p className="text-xs uppercase tracking-[0.08em] text-text-muted mb-1">
              {s.label}
            </p>
            <p className="text-2xl md:text-3xl font-display font-semibold text-primary">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ===================== CHART + ACTIVITY ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Weekly chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-lg p-5 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium text-text">Bookings this week</h3>
              <p className="text-xs text-text-muted mt-0.5">
                Total: {weekData.reduce((a, b) => a + b.value, 0)} bookings
              </p>
            </div>
            <span className="text-xs text-text-muted px-2 py-1 rounded-sm bg-bg">
              Last 7 days
            </span>
          </div>

          <div className="flex items-end justify-between gap-2 h-40">
            {weekData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-32">
                  <div
                    className="w-full max-w-[42px] rounded-t-md bg-primary
                               hover:bg-accent transition-colors"
                    style={{ height: `${(d.value / maxWeek) * 100}%` }}
                    title={`${d.value} bookings`}
                  />
                </div>
                <span className="text-xs text-text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-surface border border-border rounded-lg p-5 md:p-6">
          <h3 className="text-base font-medium text-text mb-5">Recent activity</h3>

          <ul className="space-y-4">
            {activity.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.id} className="flex items-start gap-3">
                  <span className={`inline-flex items-center justify-center
                                    w-8 h-8 rounded-md shrink-0
                                    ${toneMap[a.tone]}`}>
                    <Icon size={14} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-text leading-snug">
                      {a.text}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {a.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ===================== TOP TOURS + RECENT BOOKINGS ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Top tours */}
        <div className="bg-surface border border-border rounded-lg p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-medium text-text">Top tours</h3>
            <Link
              to="/admin/tours"
              className="text-xs text-accent hover:text-accent-hover font-medium"
            >
              View all
            </Link>
          </div>

          <ul className="space-y-3">
            {toursToShow.map((t) => (
              <li
                key={t.id}
                onClick={() => navigate(`/admin/tours/${t.id}/edit`)}
                className="flex items-center gap-3 p-2 -mx-2 rounded-md
                           cursor-pointer hover:bg-bg transition-colors"
              >
                {/* Thumbnail placeholder */}
                <div className="w-12 h-12 rounded-md bg-gradient-to-br
                                from-secondary to-primary shrink-0
                                flex items-center justify-center
                                text-white text-xs font-medium">
                  {t.destination.slice(0, 2).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text truncate">
                    {t.title}
                  </p>
                  <p className="text-xs text-text-muted truncate">
                    {t.destination} · ₹{t.price.toLocaleString()}
                  </p>
                </div>

                <Badge variant={t.status === "live" ? "success" : "pending"}>
                  {t.seats} seats
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent bookings table */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-text">Recent bookings</h3>
            <Link
              to="/admin/bookings"
              className="text-xs text-accent hover:text-accent-hover font-medium"
            >
              View all
            </Link>
          </div>

          <DataTable
            columns={bookingColumns}
            data={recentBookings}
            onRowClick={() => navigate("/admin/bookings")}
            emptyMessage="No recent bookings."
          />
        </div>
      </div>

      {/* ===================== CUSTOMER SNAPSHOT ===================== */}
      <div className="bg-surface border border-border rounded-lg p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-medium text-text">New customers</h3>
            <p className="text-xs text-text-muted mt-0.5">
              Latest sign-ups in the last 30 days
            </p>
          </div>
          <Link
            to="/admin/customers"
            className="text-xs text-accent hover:text-accent-hover font-medium"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {adminCustomers.slice(0, 6).map((c) => (
            <div
              key={c.id}
              className="flex flex-col items-center text-center
                         p-3 rounded-md border border-border
                         hover:border-primary/30 hover:bg-bg
                         transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-primary-soft text-primary
                              flex items-center justify-center
                              text-sm font-medium mb-2">
                {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <p className="text-xs font-medium text-text truncate w-full">
                {c.name}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                {c.joined}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}