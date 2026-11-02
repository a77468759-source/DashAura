import { Bell, Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const pageTitles = {
  "/": "Overview",
  "/users": "User management",
  "/reports": "Reports & analytics",
  "/settings": "Workspace settings",
};

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    const search = query.trim();
    navigate(search ? `/users?q=${encodeURIComponent(search)}` : "/users");
  }

  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-5 backdrop-blur md:px-8">
      <div>
        <p className="text-xs font-medium text-slate-500">Workspace / {pageTitles[pathname] ?? "Page"}</p>
        <h1 className="mt-1 text-lg font-semibold tracking-tight text-ink">{pageTitles[pathname] ?? "Dashaura"}</h1>
      </div>
      <div className="flex items-center gap-3">
        <form className="hidden h-10 w-64 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-400 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 sm:flex" role="search" onSubmit={handleSearch}>
          <label className="flex min-w-0 flex-1 items-center gap-2" htmlFor="workspace-search">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search workspace users</span>
            <input id="workspace-search" className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-slate-400" type="search" placeholder="Search workspace..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <button type="submit" className="sr-only">Search</button>
        </form>
        <button
          className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          aria-pressed={theme === "dark"}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
        <button className="relative grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600" type="button" aria-label="Notifications, 3 unread">
          <Bell size={18} aria-hidden="true" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-violet-600" />
        </button>
        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
          <div className="grid size-9 place-items-center rounded-full bg-violet-100 text-xs font-semibold text-violet-800" aria-hidden="true">AD</div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-ink">AasthaDev</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
