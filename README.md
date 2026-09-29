# System Design & Architecture

**Wayfare — Travel & Tour Booking System**

This document describes the architecture, data flow, design decisions, and engineering trade-offs behind Wayfare.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Component Design](#3-component-design)
4. [Data Flow](#4-data-flow)
5. [Database Design](#5-database-design)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [API Design](#7-api-design)
8. [Frontend Architecture](#8-frontend-architecture)
9. [Backend Architecture](#9-backend-architecture)
10. [Deployment Architecture](#10-deployment-architecture)
11. [Security Model](#11-security-model)
12. [Design Decisions & Trade-offs](#12-design-decisions--trade-offs)
13. [Scalability Considerations](#13-scalability-considerations)
14. [Error Handling Strategy](#14-error-handling-strategy)
15. [Testing Strategy](#15-testing-strategy)

---

## 1. System Overview

Wayfare is a three-tier web application:

| Tier | Responsibility |
| --- | --- |
| **Presentation** | React SPA served as static assets |
| **Application** | Express REST API — business logic, auth, validation |
| **Data** | MongoDB Atlas — persistent storage |

Communication between tiers is over **HTTPS** using **JSON**.

The system supports two distinct user roles with different UX and different data visibility:

- **Customer** — browses, books, manages own bookings
- **Admin** — manages tours, bookings, customers

Both share the same API. Role enforcement happens server-side.

---

## 2. High-Level Architecture

```
                          ┌────────────────────────────────────────────┐
                          │                 CLIENT                     │
                          │                                            │
                          │   ┌────────────────────────────────────┐   │
                          │   │  React 19 SPA (Vite build)         │   │
                          │   │  ─────────────────────────────     │   │
                          │   │  • React Router v6                 │   │
                          │   │  • AuthContext (JWT in localStorage)│  │
                          │   │  • api.js (fetch wrapper)          │   │
                          │   │  • Tailwind CSS v4 design system   │   │
                          │   └────────────────┬───────────────────┘   │
                          └────────────────────┼───────────────────────┘
                                               │
                                               │ HTTPS / JSON
                                               │ Authorization: Bearer <JWT>
                                               │
                          ┌────────────────────▼───────────────────────┐
                          │             APPLICATION TIER               │
                          │                                            │
                          │   ┌────────────────────────────────────┐   │
                          │   │  Express 4 API (Node.js 24)        │   │
                          │   │  ─────────────────────────────     │   │
                          │   │  Middleware Stack:                 │   │
                          │   │   1. cors                          │   │
                          │   │   2. cookieParser                  │   │
                          │   │   3. express.json                  │   │
                          │   │   4. protect (JWT verify)          │   │
                          │   │   5. requireAdmin (role check)     │   │
                          │   │  Routers → Controllers → Models    │   │
                          │   │  Global error handler              │   │
                          │   └────────────────┬───────────────────┘   │
                          └────────────────────┼───────────────────────┘
                                               │
                                               │ Mongoose (TCP + TLS)
                                               │
                          ┌────────────────────▼───────────────────────┐
                          │               DATA TIER                    │
                          │                                            │
                          │   ┌────────────────────────────────────┐   │
                          │   │  MongoDB Atlas (M0 cluster)        │   │
                          │   │  ─────────────────────────────     │   │
                          │   │  Collections:                      │   │
                          │   │   • users                          │   │
                          │   │   • tours                          │   │
                          │   │   • bookings                       │   │
                          │   └────────────────────────────────────┘   │
                          └────────────────────────────────────────────┘
```

---

## 3. Component Design

### 3.1 Frontend Components

```
src/
├── admin/                    ⚙ Admin-only UI
│   ├── auth/
│   │   └── RequireAdmin.jsx  Role gate — redirects non-admins to login
│   ├── components/           Reusable admin primitives
│   │   ├── Badge.jsx         Status pill (success / pending / danger)
│   │   ├── DataTable.jsx     Sortable, clickable tables
│   │   ├── FormField.jsx     Labeled input / select / textarea
│   │   ├── StatCard.jsx      KPI card
│   │   └── Tabs.jsx          Segmented control
│   ├── layout/               Admin shell
│   │   ├── AdminLayout.jsx   Sidenav + Topbar + <Outlet />
│   │   ├── AdminSidenav.jsx  Collapsible nav with coral active state
│   │   └── AdminTopbar.jsx   Search + View site + notifications
│   └── pages/                Admin routes
│       ├── AdminDashboard.jsx
│       ├── ManageTours.jsx
│       ├── TourForm.jsx
│       ├── ManageBookings.jsx
│       └── ManageCustomers.jsx
│
├── Components/               Public site components
│   ├── Booking/Booking.jsx   Sticky booking sidebar with pricing
│   ├── Featured-tours/       Home page featured grid
│   ├── Footer/               Site footer
│   ├── Header/               Top nav with auth-aware actions
│   ├── Image-gallery/        Masonry gallery
│   ├── Layout/Layout.jsx     Public shell — Header + Outlet + Footer
│   └── Testimonial/          Testimonial grid
│
├── context/
│   └── AuthContext.jsx       Global auth state + login/logout/register
│
├── lib/
│   └── api.js                Central fetch wrapper — auto-attaches JWT
│
├── pages/                    Route-level pages
├── router/
│   └── Routers.jsx           All routes — public + admin + protected
├── shared/                   Cross-page components
└── utils/
    └── avgRating.js          Review aggregation
```

### 3.2 Backend Components

```
backend/
├── index.js                       Server entry
└── src/
    ├── config/
    │   └── db.js                  Mongoose connection
    ├── middleware/
    │   ├── auth.js                protect() + requireAdmin()
    │   └── error.js               notFound() + errorHandler()
    ├── models/
    │   ├── User.js                Schema + bcrypt pre-save hook + matchPassword
    │   ├── Tour.js                Schema + embedded review subschema
    │   └── Booking.js             Schema + auto-generated bookingCode
    ├── controllers/               Business logic
    │   ├── auth.controller.js
    │   ├── tour.controller.js
    │   ├── booking.controller.js
    │   ├── customer.controller.js
    │   └── stats.controller.js
    └── routes/
        ├── auth.routes.js
        ├── tour.routes.js
        ├── booking.routes.js
        ├── customer.routes.js
        └── stats.routes.js
```

### 3.3 Component Responsibilities

| Component | Responsibility | Doesn't do |
| --- | --- | --- |
| `api.js` | Attach JWT, parse JSON, throw on error | Business logic |
| `AuthContext` | Store user, expose login/logout | Talk to API directly |
| `RequireAdmin` | Route-level gate | Verify JWT (server does) |
| Controllers | Business logic + validation | Route matching |
| Middleware | Cross-cutting concerns | Business logic |
| Models | Schema + hooks + methods | Business logic |

**Clear separation** — each layer knows only what it must.

---

## 4. Data Flow

### 4.1 User Registration

```
1. User submits form          → Login.jsx / Register.jsx
2. Client calls               → api.post("/api/auth/register", {...})
3. api.js attaches            → Content-Type: application/json
4. Express receives           → POST /api/auth/register
5. Router matches             → auth.routes.js → register()
6. Controller:
   a. Validates input          → if missing, 400
   b. Checks email uniqueness  → User.findOne({ email })
   c. Creates user             → User.create({...})
   d. Mongoose pre-save hook   → bcrypt.hash(password, 10)
   e. Inserts into MongoDB
7. Controller signs JWT       → jwt.sign({ id }, JWT_SECRET, { expiresIn })
8. Sets cookie + sends JSON   → { token, user }
9. Client stores token        → localStorage.setItem("token", ...)
10. AuthContext updates user  → setUser(data.user)
11. UI re-renders             → Header shows "My bookings / Log out"
```

### 4.2 Booking a Tour

```
1. User on /tours/:id         → TourDetails.jsx
2. Page fetches tour          → api.get(`/api/tours/${id}`)
3. Booking form submit        → Booking.jsx handleSubmit()
4. Client calls               → api.post("/api/bookings", {
                                     tourId, travellers, bookAt, phone
                                  })
5. api.js attaches            → Authorization: Bearer <JWT>
6. Express receives           → POST /api/bookings
7. protect middleware         → jwt.verify(token) → req.user = user
8. Controller:
   a. Validates input
   b. Fetches tour            → Tour.findById(tourId)
   c. Checks seat availability
   d. Calculates amount       → tour.price * travellers + SERVICE_FEE
   e. Generates bookingCode   → WF-YYYYMMDD-XXXX
   f. Creates booking         → Booking.create({...})
   g. Decrements tour seats   → tour.seats -= travellers; tour.save()
9. Sends 201 { booking }
10. Client navigates          → /thank-you
```

### 4.3 Admin Updates Booking Status

```
1. Admin on /admin/bookings
2. Clicks booking row
3. Client calls               → api.patch(`/api/bookings/${id}/status`,
                                    { status: "confirmed" })
4. protect middleware         → jwt.verify(token) → req.user = admin
5. requireAdmin middleware    → if role !== "admin" → 403
6. Controller updates         → Booking.findByIdAndUpdate(...)
7. Sends 200 { booking }
8. UI refreshes               → Table shows new status
```

---

## 5. Database Design

### 5.1 Collections & Relationships

```
┌─────────────────────┐
│       users         │
├─────────────────────┤
│ _id          (PK)   │
│ name                │
│ email        (uniq) │
│ password     (hash) │
│ phone               │
│ role                │──────┐
│ status              │      │
│ createdAt           │      │
└─────────────────────┘      │
         ▲                   │
         │ user (ref)        │
         │                   │
┌────────┴─────────────┐     │
│      bookings        │     │
├──────────────────────┤     │
│ _id           (PK)   │     │
│ bookingCode   (uniq) │     │
│ user          (FK) ──┘     │
│ tour          (FK) ───┐    │
│ customer              │    │
│ email                 │    │
│ phone                 │    │
│ travellers            │    │
│ bookAt                │    │
│ amount                │    │
│ status                │    │
│ createdAt             │    │
└───────────────────────┘    │
                             │
                             │ tour (ref)
                             │
┌────────────────────────────▼──────┐
│            tours                  │
├───────────────────────────────────┤
│ _id            (PK)               │
│ title                             │
│ destination                       │
│ city, address, distance, duration │
│ description, price, seats         │
│ maxGroupSize, photo               │
│ featured, category, status        │
│ reviews [ {user, name, rating,    │
│            text, date} ]          │── embedded
│ createdAt, updatedAt              │
└───────────────────────────────────┘
```

### 5.2 Design Choices

| Decision | Rationale |
| --- | --- |
| **Reviews embedded in Tour** | Always accessed with tour; avoids a join. Small, bounded array. |
| **Booking references User + Tour** | Bookings are queried on their own and by user/tour. Need indexing. |
| **Denormalised customer/email on Booking** | Preserves data even if user changes name/email later. |
| **`role` on User (not separate collection)** | Simple two-role system. Avoids over-engineering. |
| **`status: banned` on User** | Enables soft-ban without deleting. |
| **Denormalised tour price into `amount`** | Price changes shouldn't rewrite historical bookings. |

### 5.3 Indexes

| Collection | Index | Purpose |
| --- | --- | --- |
| `users` | `email` (unique) | Fast login lookup |
| `bookings` | `bookingCode` (unique) | Fast booking ID lookup |
| `bookings` | `user` (implicit) | Filter by customer |
| `bookings` | `tour` (implicit) | Filter by tour |
| `tours` | `status` | Filter live tours |

---

## 6. Authentication & Authorization

### 6.1 Token Flow

```
   Login                          Every subsequent request
   ─────                          ────────────────────────

   POST /api/auth/login
        │
        ▼
   ┌─────────────────────┐
   │ Verify credentials  │
   │ (bcrypt.compare)    │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │ Sign JWT            │
   │ { id: user._id }    │
   │ expires: 7d         │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │ Return token        │
   │ + user object       │
   └──────────┬──────────┘
              │
              ▼
        Client stores
        in localStorage
              │
              │
              ▼
                                ┌─────────────────────┐
                                │ api.js attaches     │
                                │ Authorization:      │
                                │ Bearer <token>      │
                                └──────────┬──────────┘
                                           │
                                           ▼
                                ┌─────────────────────┐
                                │ protect middleware  │
                                │ jwt.verify(token)   │
                                │ → req.user          │
                                └──────────┬──────────┘
                                           │
                                           ▼
                                ┌─────────────────────┐
                                │ requireAdmin        │
                                │ if role != admin    │
                                │ → 403               │
                                └──────────┬──────────┘
                                           │
                                           ▼
                                     Controller
```

### 6.2 Role Enforcement Layers

**Defense in depth** — three layers, only one matters for security:

| Layer | Where | Purpose |
| --- | --- | --- |
| **UI hiding** | Frontend — tabs, links | UX only. **Not security.** |
| **Route guard** | `RequireAdmin` component | Prevent wrong screens. **Not security.** |
| **Server check** | `requireAdmin` middleware | **The real security.** |

**Key principle:** The frontend is a *convenience*. The backend is the *truth*.

Any user can bypass the frontend by calling the API directly with `curl`. The backend rejects them because `requireAdmin` reads the role from the DB on every request.

### 6.3 Why JWT + Not Sessions

| Consideration | JWT | Sessions |
| --- | --- | --- |
| Stateless | ✅ | ❌ (needs session store) |
| Cross-domain (Vercel ↔ Render) | ✅ | ⚠ (cookies + CORS pain) |
| Scales horizontally | ✅ | ⚠ (needs Redis) |
| Immediate revocation | ❌ | ✅ |

We chose JWT because:
- Frontend and backend are on **different domains** — cookies across domains are painful
- **Stateless** — Render's free tier spawns new instances on redeploy; JWTs survive
- **Short expiry (7 days)** keeps the risk acceptable

**Trade-off:** We can't instantly revoke a JWT. Mitigated by:
- Short expiry
- `status: "banned"` check on every request (`protect` middleware)

---

## 7. API Design

### 7.1 Principles

- **RESTful** — resource-based URLs, standard methods
- **Versioned implicitly** — `/api/*` prefix isolates from any future frontend routes
- **JSON-only** — no HTML, no XML
- **Consistent error shape** — every error is `{ "message": "..." }`
- **Stateless** — no server-side session

### 7.2 Resource Model

| Resource | Collection | Routes |
| --- | --- | --- |
| Auth | — | `/api/auth/*` |
| Tours | `tours` | `/api/tours/*` |
| Bookings | `bookings` | `/api/bookings/*` |
| Customers | `users` | `/api/customers/*` |
| Stats | aggregate | `/api/admin/stats` |

### 7.3 HTTP Status Codes

| Code | When |
| --- | --- |
| `200 OK` | Successful GET / PUT / PATCH |
| `201 Created` | Successful POST |
| `400 Bad Request` | Missing / invalid input |
| `401 Unauthorized` | No token, bad token, expired token |
| `403 Forbidden` | Valid token, wrong role |
| `404 Not Found` | Resource doesn't exist |
| `500 Internal Server Error` | Unhandled exception |

### 7.4 Query Conventions

| Pattern | Example | Purpose |
| --- | --- | --- |
| `?featured=true` | `/api/tours?featured=true` | Boolean filter |
| `?q=<term>` | `/api/tours?q=bali` | Text search |
| `?status=live` | `/api/tours?status=live` | Enum filter |

---

## 8. Frontend Architecture

### 8.1 Routing

```
PUBLIC (PublicLayout: Header + Footer)
  /                    → redirect to /home
  /home                → Home.jsx
  /about               → About.jsx
  /tours               → Tour.jsx
  /tours/:id           → TourDetails.jsx
  /login               → Login.jsx
  /register            → Register.jsx
  /thank-you           → ThankYou.jsx
  /my-bookings         → MyBookings.jsx  [protected by auth context]

ADMIN (AdminLayout: Sidenav + Topbar)
  /admin               → AdminDashboard.jsx   [RequireAdmin]
  /admin/tours         → ManageTours.jsx      [RequireAdmin]
  /admin/tours/new     → TourForm.jsx         [RequireAdmin]
  /admin/tours/:id/edit→ TourForm.jsx         [RequireAdmin]
  /admin/bookings      → ManageBookings.jsx   [RequireAdmin]
  /admin/customers     → ManageCustomers.jsx  [RequireAdmin]
```

### 8.2 State Management

**No Redux, no Zustand.** Just React Context + local component state.

| State type | Where | Why |
| --- | --- | --- |
| Auth state | `AuthContext` | Shared across header, pages, admin |
| Form state | Local to each component | Only used in one form |
| Fetched data | Local to the page that fetches | No cross-page cache needed |
| UI state (loading, error) | Local to each component | Belongs with the fetch |

**Why not a data-fetching library like React Query?**
- Small app, low cache churn
- Context + `useState` is enough
- Fewer dependencies = less to debug

### 8.3 API Client Design

`src/lib/api.js` is the single point of contact with the backend.

```js
// All calls go through this wrapper
api.get(path)           // → fetch with auto JWT
api.post(path, body)
api.put(path, body)
api.patch(path, body)
api.delete(path)
```

**Benefits:**
- One place to add `Authorization: Bearer` header
- One place to handle errors uniformly
- One place to add retries / logging / interceptors later
- Centralizes `VITE_API_URL` from env

### 8.4 Error Handling Pattern

Every fetch follows the same shape:

```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [data, setData] = useState(null);

useEffect(() => {
  let cancelled = false;
  api.get("/api/tours")
    .then(d => { if (!cancelled) setData(d); })
    .catch(e => { if (!cancelled) setError(e.message); })
    .finally(() => { if (!cancelled) setLoading(false); });
  return () => { cancelled = true; };
}, []);
```

Three states, always covered. The `cancelled` flag prevents the classic "setState on unmounted component" warning.

---

## 9. Backend Architecture

### 9.1 Request Lifecycle

```
Incoming request
      │
      ▼
┌──────────────────┐
│ express.json()   │  Parse JSON body
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ cors()           │  Reject untrusted origins
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ cookieParser()   │  Parse cookies
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Route match      │  Express router
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ protect          │  (if protected) JWT verify → req.user
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ requireAdmin     │  (if admin-only) role check → 403
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Controller       │  Business logic
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Mongoose model   │  DB operation
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ res.json()       │  Response
└──────────────────┘
```

### 9.2 Middleware Order (Matters!)

```js
app.use(express.json());          // 1. Parse body first
app.use(cors({...}));              // 2. CORS before routes
app.use(cookieParser());           // 3. Cookies before routes

app.use("/api/auth", authRoutes);  // 4. Routes
app.use("/api/tours", tourRoutes);
// ...

app.use(notFound);                 // 5. 404 for unmatched
app.use(errorHandler);             // 6. Error handler last
```

**Why order matters:** Each middleware can short-circuit. If CORS runs after routes, blocked origins still reach controllers. If `errorHandler` runs before routes, it never catches errors.

### 9.3 Model Design

**User model** uses a `pre("save")` hook to hash passwords:

```js
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

**Why `isModified`?** Prevents re-hashing on profile updates.

**Why no `next`?** Mongoose 7+ uses async/return, not callbacks. Mixing them breaks.

**Tour model** embeds reviews. **Booking model** auto-generates `bookingCode` in a controller (not a hook) — simpler to debug.

### 9.4 Central Error Handler

All uncaught errors funnel through one place:

```js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
};
```

Controllers also use try/catch for expected errors (400, 401, 404) — the handler is the last line of defense.

---

## 10. Deployment Architecture

### 10.1 Production Topology

```
       ┌──────────────────────────────────┐
       │            USERS                 │
       │  (browser, mobile, tablet)       │
       └──────────────┬───────────────────┘
                      │
                      │ HTTPS
                      │
       ┌──────────────▼───────────────────┐
       │        Vercel CDN                │
       │  ────────────────────────────    │
       │  • Static React build            │
       │  • Global edge caching           │
       │  • Automatic HTTPS               │
       │  • SPA rewrites (vercel.json)    │
       └──────────────┬───────────────────┘
                      │
                      │ fetch() to API URL
                      │
       ┌──────────────▼───────────────────┐
       │        Render                    │
       │  ────────────────────────────    │
       │  • Node.js container             │
       │  • Environment vars injected     │
       │  • Auto-redeploy on git push     │
       │  • Free tier (spins down)        │
       └──────────────┬───────────────────┘
                      │
                      │ Mongoose TCP + TLS
                      │
       ┌──────────────▼───────────────────┐
       │     MongoDB Atlas                │
       │  ────────────────────────────    │
       │  • Managed cluster               │
       │  • IP whitelist                  │
       │  • Automated backups (paid)      │
       └──────────────────────────────────┘
```

### 10.2 Environment Separation

| Environment | Frontend URL | Backend URL | Database |
| --- | --- | --- | --- |
| **Local dev** | `http://localhost:5173` | `http://localhost:4000` | Atlas (test) |
| **Production** | `*.vercel.app` | `*.onrender.com` | Atlas (test) |

Both environments read from the **same database** in dev/demo. In a real product you'd use separate databases per environment.

### 10.3 CI/CD

Both platforms auto-deploy on `git push` to `main`:

```
   Developer pushes to main
              │
              ▼
   GitHub receives commit
              │
              ├──────────────┐
              ▼              ▼
       Vercel webhook    Render webhook
              │              │
              ▼              ▼
       npm install       npm install
       npm run build     (no build)
              │              │
              ▼              ▼
       Deploy static    Restart container
       to edge CDN      with new code
```

**Deploy time:** Vercel ~1–2 min · Render ~2–3 min

### 10.4 Port Binding on Render

Render **injects** the `PORT` env var. Never set it manually.

```js
const port = process.env.PORT || 4000;
```

- Local: `process.env.PORT` is unset → falls back to `4000` ✅
- Render: `process.env.PORT` = injected value (e.g. `10000`) → app binds correctly ✅

Setting `PORT=4000` in Render's env vars breaks the routing. That was a real bug during this project's deployment.

---

## 11. Security Model

### 11.1 Threat Model

| Threat | Mitigation |
| --- | --- |
| Password theft | bcrypt hashing (10 rounds) + HTTPS |
| Token theft | Short expiry (7d) + HTTPS-only |
| CSRF | JWT in `Authorization` header (not cookie-only) |
| XSS | React escapes by default; no `dangerouslySetInnerHTML` |
| Injection | Mongoose schemas + typed fields |
| Role escalation | `role` field server-controlled, never client-settable |
| Banned user access | `status` checked in `protect` middleware |
| CORS abuse | Origin whitelist in `cors()` |
| Env leakage | `.env` gitignored; secrets via hosting dashboard |

### 11.2 Password Flow

```
Client sends "123456"
        │
        ▼
HTTPS to server
        │
        ▼
Controller receives plaintext
        │
        ▼
User.create({ password: "123456" })
        │
        ▼
pre("save") hook runs
        │
        ▼
bcrypt.genSalt(10) → "$2a$10$..."
        │
        ▼
bcrypt.hash("123456", salt) → "$2a$10$abc..."
        │
        ▼
Store hash in MongoDB
        │
        ▼
Plaintext never persisted
```

**Login** flow uses `bcrypt.compare(entered, storedHash)` — returns `true` / `false`, never reveals the hash.

### 11.3 Never Trust the Client

**Principle:** The frontend can lie. The backend must verify.

Example — booking ownership:

```js
// ❌ Never do this
const booking = await Booking.findById(req.params.id);
res.json(booking);   // Any user could read any booking!

// ✅ Always check ownership
const booking = await Booking.findById(req.params.id);
const isOwner = booking.user.toString() === req.user._id.toString();
if (!isOwner && req.user.role !== "admin") {
  return res.status(403).json({ message: "Not authorized" });
}
res.json(booking);
```

---

## 12. Design Decisions & Trade-offs

Every architectural choice has a trade-off. Here's what we chose and why.

| Decision | Alternative | Why we chose ours |
| --- | --- | --- |
| **JWT** for auth | Server-side sessions | Stateless, works cross-domain |
| **MongoDB** for data | PostgreSQL | Flexible schema for tour metadata |
| **React Context** for state | Redux / Zustand | Small app, no complex state |
| **Native `fetch`** | axios | Zero dependencies, modern browsers |
| **Tailwind CSS** | CSS Modules / styled-components | Utility-first, no CSS-in-JS runtime |
| **Reviews embedded** | Separate collection | Always accessed with tour |
| **`bookingCode` in controller** | Pre-save hook | Explicit, easier to debug |
| **Role on User** | Separate `roles` collection | Only two roles, simpler |
| **Vercel + Render** | AWS / Docker | Free tier, git-driven deploy |
| **Two `shared/` folders** | One unified folder | Separation of concerns (Components/shared vs src/shared) — later refactored to one |

---

## 13. Scalability Considerations

The current architecture scales to **thousands of users** without change. Beyond that, here's the roadmap.

### 13.1 What Scales Today

| Layer | Limit | Why |
| --- | --- | --- |
| Vercel CDN | Effectively infinite | Static files on edge |
| Render instance | ~1K concurrent requests | Node single-thread, 512 MB |
| MongoDB Atlas M0 | 512 MB storage | Free tier cap |

### 13.2 What to Change at Scale

**If traffic grows:**

1. **Upgrade Render** → paid instance ($7/mo) with no cold-start
2. **Horizontal scale** → multiple instances behind load balancer
3. **Add Redis** → cache tour listings, session state
4. **CDN images** → Cloudinary / CloudFront

**If data grows:**

1. **MongoDB M10+** → dedicated cluster with sharding
2. **Indexes** → add compound indexes on frequently-queried fields
3. **Archive** → move old bookings to cold storage

**If features grow:**

1. **Message queue** → RabbitMQ / SQS for emails, notifications
2. **Search** → Elasticsearch / Algolia for tour search
3. **Payments** → Razorpay / Stripe webhooks

### 13.3 Statelessness Enables Scaling

Because we use JWT (not sessions):
- Any Render instance can handle any request
- No sticky sessions needed
- Restart = deploy, no logout side effects

This was a deliberate choice for that reason.

---

## 14. Error Handling Strategy

### 14.1 Error Categories

| Category | Examples | How handled |
| --- | --- | --- |
| **Client errors** | Bad input, missing fields | 400 response with message |
| **Auth errors** | Missing token, expired token | 401 response |
| **Authorization** | Wrong role, not owner | 403 response |
| **Not found** | Invalid ID, deleted resource | 404 response |
| **Server errors** | DB down, bug in code | 500 response, error logged |

### 14.2 Controller Pattern

```js
export const someController = async (req, res) => {
  try {
    // Validate input
    if (!required) {
      return res.status(400).json({ message: "Missing fields" });
    }
    // Business logic
    const result = await Model.something();
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

**Why:** Every failure returns JSON with a `message`. No stack traces leak to clients.

### 14.3 Frontend Error Display

```jsx
{error && (
  <div className="px-3 py-2 rounded-md bg-danger-bg text-danger-fg text-sm">
    {error}
  </div>
)}
```

Consistent styling, clear message, non-blocking.

---

## 15. Testing Strategy

### 15.1 What We Test

| Layer | Method | Coverage |
| --- | --- | --- |
| API endpoints | Manual (Thunder Client / curl) | All routes |
| Auth flow | End-to-end via live UI | Register → login → protected routes |
| Booking flow | End-to-end via live UI | Browse → book → confirmation |
| Admin flow | End-to-end via live UI | Login → CRUD operations |
| Role enforcement | curl with wrong token | 401 / 403 responses |
| Invalid input | curl with bad data | 400 responses |

### 15.2 Manual Test Matrix

| Test | Expected |
| --- | --- |
| Register new user | 201 + JWT + user |
| Register duplicate email | 400 "Email already registered" |
| Login valid | 200 + JWT |
| Login wrong password | 401 "Invalid credentials" |
| GET /me with token | 200 + user |
| GET /me without token | 401 |
| Create tour as customer | 403 |
| Create tour as admin | 201 |
| Book with valid tourId | 201 + seats decrement |
| Book with invalid tourId | 404 |
| Update booking status as customer | 403 |
| Update booking status as admin | 200 |
| Invalid tour ObjectId | 404 (not 500) |

### 15.3 Future — Automated Tests

Post-MVP, add:
- **Jest + Supertest** for backend controllers
- **React Testing Library** for critical components
- **Playwright** for E2E user flows

---

## Summary

Wayfare is designed as a **
