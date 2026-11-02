import { ChartNoAxesCombined, LayoutDashboard, Layers3, Settings, UsersRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: UsersRound },
  { to: "/reports", label: "Reports", icon: ChartNoAxesCombined },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col bg-sidebar text-white md:sticky md:top-0 md:h-screen md:w-[252px]" aria-label="Workspace sidebar">
      <Link className="flex h-[76px] items-center gap-3 border-b border-white/10 px-6 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-violet-300" to="/" aria-label="Dashaura home">
        <span className="grid size-10 place-items-center rounded-xl bg-violet-600"><Layers3 size={21} aria-hidden="true" /></span>
        <span>
          <span className="block text-lg font-semibold tracking-tight">Dashaura</span>
          <span className="block text-[10px] font-semibold tracking-[0.18em] text-slate-400">SMART WORKSPACE</span>
        </span>
      </Link>
      <p className="px-6 pb-3 pt-7 text-[10px] font-semibold tracking-[0.16em] text-slate-400">WORKSPACE</p>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible" aria-label="Main navigation">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${
                isActive ? "bg-violet-600 text-white shadow-sm" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto hidden p-4 md:block">
        <section className="rounded-xl border border-white/10 bg-white/5 p-4" aria-labelledby="plan-heading">
          <p id="plan-heading" className="text-xs font-medium text-slate-300">Workspace plan</p>
          <p className="mt-1 text-sm font-semibold">Professional</p>
          <div className="mt-4 flex justify-between text-[11px] text-slate-400"><span>Storage used</span><span>75%</span></div>
          <div className="mt-2 h-1.5 rounded-full bg-white/10" role="progressbar" aria-label="Storage used" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div className="h-full w-3/4 rounded-full bg-violet-400" />
          </div>
        </section>
        <footer className="px-2 pt-5 text-[11px] text-slate-500">© 2026 Dashaura</footer>
      </div>
    </aside>
  );
}

export default Sidebar;
