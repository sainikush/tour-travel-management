import { Menu, Search, Bell, ExternalLink } from "lucide-react";

export default function AdminTopbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 bg-surface border-b border-border">
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 h-16">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden inline-flex items-center justify-center
                       w-9 h-9 rounded-md text-text hover:bg-bg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>

          <h2 className="text-lg md:text-xl font-display truncate">{title}</h2>
        </div>

        {/* Right: view site, search, bell, avatar */}
        <div className="flex items-center gap-2">
          {/* ✅ View site — always visible */}
          <a
            href="/home"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5
                       px-3 py-2 rounded-md text-sm
                       text-text-muted hover:text-text hover:bg-bg
                       transition-colors"
            title="Open public site in a new tab"
          >
            <ExternalLink size={14} strokeWidth={1.75} />
            <span className="hidden sm:inline">View site</span>
          </a>

          {/* Search — hidden on small screens */}
          <div
            className="hidden lg:flex items-center gap-2
                          bg-bg border border-border rounded-md
                          px-3 py-2 w-56"
          >
            <Search
              size={16}
              className="text-text-muted shrink-0"
              strokeWidth={1.75}
            />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent text-sm text-text
                         placeholder:text-text-muted/70 outline-none"
            />
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="relative inline-flex items-center justify-center
                       w-9 h-9 rounded-md text-text-muted
                       hover:bg-bg hover:text-text transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} strokeWidth={1.75} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
          </button>

          {/* Admin chip */}
          <div className="flex items-center gap-2 pl-2 ml-1 border-l border-border">
            <div
              className="w-8 h-8 rounded-full bg-primary text-white
                            flex items-center justify-center text-xs font-medium"
            >
              AD
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-medium text-text leading-tight">
                Admin
              </p>
              <p className="text-[11px] text-text-muted leading-tight">
                admin@wayfare.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
